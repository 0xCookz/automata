"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { pay, site } from "@/lib/site";

type Stage = "idle" | "ready" | "recording" | "preview" | "sending" | "done";

const mimeType = () => {
  const candidates = [
    "video/mp4;codecs=avc1",
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
  ];
  return candidates.find((t) => typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(t));
};

export function Recorder() {
  const [stage, setStage] = useState<Stage>("idle");
  const [error, setError] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [clip, setClip] = useState<{ blob: Blob; url: string; seconds: number } | null>(null);
  const [task, setTask] = useState("");
  const [wallet, setWallet] = useState("");

  const liveRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const startedAt = useRef(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTracks = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => () => {
    stopTracks();
    if (timer.current) clearInterval(timer.current);
  }, [stopTracks]);

  const arm = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1920 } },
        audio: true,
      });
      streamRef.current = stream;
      if (liveRef.current) {
        liveRef.current.srcObject = stream;
        await liveRef.current.play().catch(() => {});
      }
      setStage("ready");
    } catch {
      setError("No camera access. Allow it in your browser, then try again.");
    }
  };

  const start = () => {
    const stream = streamRef.current;
    if (!stream) return;
    const type = mimeType();
    const recorder = new MediaRecorder(stream, type ? { mimeType: type, videoBitsPerSecond: 4_000_000 } : undefined);
    chunksRef.current = [];

    recorder.ondataavailable = (e) => e.data.size && chunksRef.current.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "video/webm" });
      const took = Math.min(pay.max, Math.max(1, Math.round((Date.now() - startedAt.current) / 1000)));
      setClip({ blob, url: URL.createObjectURL(blob), seconds: took });
      setStage(took < pay.min ? "ready" : "preview");
      if (took < pay.min) setError(`That was ${took}s. Keep going to at least ${pay.min}s.`);
    };

    startedAt.current = Date.now();
    setSeconds(0);
    recorder.start();
    recorderRef.current = recorder;
    setStage("recording");
    setError(null);

    timer.current = setInterval(() => {
      const elapsed = Math.round((Date.now() - startedAt.current) / 1000);
      setSeconds(elapsed);
      if (elapsed >= pay.max) stop();
    }, 200);
  };

  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    recorderRef.current?.state === "recording" && recorderRef.current.stop();
  };

  const retake = () => {
    if (clip) URL.revokeObjectURL(clip.url);
    setClip(null);
    setError(null);
    setStage(streamRef.current ? "ready" : "idle");
  };

  const send = async () => {
    if (!clip) return;
    if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) return setError("That wallet address does not look right.");
    if (task.trim().length < 3) return setError("Say what the clip shows, in a few words.");

    setStage("sending");
    setError(null);
    try {
      const ext = clip.blob.type.includes("mp4") ? "mp4" : "webm";
      const blob = await upload(`clips/${Date.now()}.${ext}`, clip.blob, {
        access: "public",
        handleUploadUrl: "/api/blob/upload",
        contentType: clip.blob.type,
      });

      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ wallet, task: task.trim(), seconds: clip.seconds, videoUrl: blob.url }),
      });
      if (!res.ok) throw new Error(((await res.json()) as { error?: string }).error ?? "submission failed");

      stopTracks();
      setStage("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not send the clip.");
      setStage("preview");
    }
  };

  if (stage === "done") {
    return (
      <div className="panel border border-line p-8 text-center md:p-12">
        <div className="eyebrow">In review</div>
        <h2 className="mt-4 font-display text-3xl md:text-4xl">Clip received.</h2>
        <p className="mx-auto mt-4 max-w-[46ch] text-bone-dim">
          A person watches every submission, usually within six hours. If it is approved,{" "}
          {pay.flat.toFixed(2)} {site.token} is sent to your wallet on {site.chain} and the
          transaction appears in the public ledger.
        </p>
        <button
          type="button"
          onClick={() => {
            retake();
            setTask("");
            setStage("idle");
          }}
          className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-bone px-6 text-sm font-medium text-ink"
        >
          Record another
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6 lg:gap-10">
      <div className="col-span-12 lg:col-span-7">
        <div className="panel relative overflow-hidden border border-line">
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint">
            <span>Camera</span>
            <span className="tnum">
              {stage === "recording" ? (
                <span className="flex items-center gap-2 text-signal">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
                  rec {String(seconds).padStart(2, "0")}s / {pay.max}s
                </span>
              ) : (
                `${pay.min}–${pay.max}s`
              )}
            </span>
          </div>

          <div className="relative aspect-[4/3] bg-black">
            {clip && stage !== "recording" ? (
              <video src={clip.url} controls playsInline className="h-full w-full object-contain" />
            ) : (
              <video ref={liveRef} muted playsInline className="h-full w-full object-cover" />
            )}

            {stage === "idle" ? (
              <button
                type="button"
                onClick={arm}
                className="absolute inset-0 grid place-items-center bg-ink/70 font-mono text-[11px] uppercase tracking-[0.16em] text-bone"
              >
                Turn the camera on
              </button>
            ) : null}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-line p-4">
            {stage === "recording" ? (
              <button
                type="button"
                onClick={stop}
                className="inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-signal px-6 text-sm font-medium text-ink"
              >
                Stop
              </button>
            ) : (
              <button
                type="button"
                onClick={clip ? retake : stage === "idle" ? arm : start}
                className="inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-bone px-6 text-sm font-medium text-ink"
              >
                {clip ? "Record again" : stage === "idle" ? "Turn the camera on" : "Start recording"}
              </button>
            )}
          </div>
        </div>

        <p className="mt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-bone-faint">
          Hold the phone at eye level · keep your hands in frame · one task, start to finish
        </p>
      </div>

      <div className="col-span-12 lg:col-span-5">
        <div className="panel border border-line p-6 md:p-8">
          <div className="eyebrow">Submit</div>

          <label htmlFor="task" className="mt-6 block text-sm text-bone-dim">
            What is happening in the clip?
          </label>
          <input
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Loading a dishwasher after dinner"
            className="mt-2 h-12 w-full rounded-xl border border-line bg-ink px-4 text-sm text-bone outline-none placeholder:text-bone-faint focus:border-bone/30"
          />

          <label htmlFor="wallet" className="mt-6 block text-sm text-bone-dim">
            Wallet address on {site.chain}
          </label>
          <input
            id="wallet"
            value={wallet}
            onChange={(e) => setWallet(e.target.value.trim())}
            placeholder="0x…"
            spellCheck={false}
            className="mt-2 h-12 w-full rounded-xl border border-line bg-ink px-4 font-mono text-sm text-bone outline-none placeholder:text-bone-faint focus:border-bone/30"
          />

          <button
            type="button"
            onClick={send}
            disabled={!clip || stage === "sending"}
            className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-xl bg-bone px-6 text-sm font-medium text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            {stage === "sending" ? "Sending…" : `Submit for ${pay.flat.toFixed(2)} ${site.token}`}
          </button>

          {error ? (
            <p role="alert" className="mt-4 text-sm text-signal">
              {error}
            </p>
          ) : (
            <p className="mt-4 text-[0.8125rem] leading-relaxed text-bone-faint">
              Nothing is published with your name on it. Clips with faces, screens or
              documents in frame are cut or rejected before they enter the set.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
