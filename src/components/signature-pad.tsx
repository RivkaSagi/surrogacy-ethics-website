"use client";

import { useEffect, useRef, useState } from "react";

interface SignaturePadProps {
  // Called with a PNG data URL whenever the user stops drawing.
  // Called with `null` when the pad is cleared.
  onChange: (dataUrl: string | null) => void;
  ariaLabel?: string;
}

export function SignaturePad({ onChange, ariaLabel = "חתימה ביד" }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const [hasInk, setHasInk] = useState(false);

  // Set up the canvas at the correct DPI on mount and on resize.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const w = Math.floor(rect.width * dpr);
      const h = Math.floor(rect.height * dpr);
      // Only resize if dimensions actually changed to avoid clearing on every render
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.scale(dpr, dpr);
          ctx.strokeStyle = "#1f1c1b";
          ctx.lineWidth = 2;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  function getRelativePoint(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  function handlePointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    e.preventDefault();
    canvasRef.current!.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    lastPointRef.current = getRelativePoint(e);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx || !lastPointRef.current) return;
    const point = getRelativePoint(e);
    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    lastPointRef.current = point;
    if (!hasInk) setHasInk(true);
  }

  function handlePointerUp() {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    lastPointRef.current = null;
    emitChange();
  }

  function emitChange() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!hasInk) {
      onChange(null);
      return;
    }
    onChange(canvas.toDataURL("image/png"));
  }

  function clear() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasInk(false);
    onChange(null);
  }

  return (
    <div>
      <div className="relative w-full">
        <canvas
          ref={canvasRef}
          aria-label={ariaLabel}
          role="img"
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="w-full h-40 bg-background/50 border border-border rounded-lg cursor-crosshair touch-none focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        {!hasInk && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-text/40 text-sm">
            ציירו את החתימה שלכם כאן
          </div>
        )}
      </div>
      <div className="mt-2 flex justify-between items-center">
        <span className="text-xs text-text/50">השתמשו בעכבר או באצבע</span>
        <button
          type="button"
          onClick={clear}
          disabled={!hasInk}
          className="text-sm text-primary font-bold hover:underline disabled:opacity-40 disabled:cursor-not-allowed"
        >
          נקה
        </button>
      </div>
    </div>
  );
}
