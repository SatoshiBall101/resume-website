"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

type Game = {
  id: string;
  label: string;
  basePath: string;
  js: string;
  factory: string;   // createStarFox / createMarioKart
  width: number;
  height: number;
};

export default function GamesPage() {
  const games: Game[] = useMemo(
    () => [
      { id: "mariokart", label: "Mario Kart", basePath: "/gamefiles/mariokart", js: "MarioKart.js", factory: "createMarioKart", width: 960, height: 720 },
      { id: "starfox",   label: "Star Fox",   basePath: "/gamefiles/starfox",   js: "StarFox.js",   factory: "createStarFox",   width: 960, height: 720 },
     // { id: "marioplatformer",   label: "Mario Platformer",   basePath: "/gamefiles/marioplatformer",   js: "MarioPlatformer.js",   factory: "createMarioPlatformer",   width: 960, height: 720 },

    ],
    []
  );

  const [selectedId, setSelectedId] = useState(games[0].id);
  const selected = games.find(g => g.id === selectedId)!;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef    = useRef<HTMLCanvasElement | null>(null);
  const scriptRef    = useRef<HTMLScriptElement | null>(null);
  const instanceRef  = useRef<any>(null);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [showStart, setShowStart] = useState(true);

  const resizeCanvas = () => {
    const el = containerRef.current, canvas = canvasRef.current;
    if (!el || !canvas) return;
    const rect = el.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = rect.width;
    const cssH = (rect.width * selected.height) / selected.width;
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
  };

  const cleanup = async () => {
    try {
      const inst: any = instanceRef.current;
      if (inst?.SDL2?.audioContext) {
        try { inst.SDL2.audioContext.suspend?.(); } catch {}
        try { inst.SDL2.audioContext.close?.(); } catch {}
      }
      if (inst?.browser?.mainLoop) {
        try { inst.browser.mainLoop.pause?.(); } catch {}
        try { inst.browser.mainLoop.func = null; } catch {}
      }
      if (typeof inst?.exit === "function") {
        try { inst.noExitRuntime = false; await Promise.resolve(inst.exit(0)); } catch {}
      }
    } catch {}
    instanceRef.current = null;
    if (scriptRef.current) { scriptRef.current.remove(); scriptRef.current = null; }
  };

  const ensureScript = (src: string) =>
    new Promise<void>((resolve, reject) => {
      const s = document.createElement("script");
      s.src = `${src}${process.env.NODE_ENV === "development" ? `?v=${Date.now()}` : ""}`;
      s.async = false;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.body.appendChild(s);
      scriptRef.current = s;
    });

    const startGame = async () => {
        setLoading(true);
        setErr(null);
        try {
          await cleanup();
          resizeCanvas();
      
          const jsUrl = `${selected.basePath}/${selected.js}`;
          await ensureScript(jsUrl);
      
          const factory = (window as any)[selected.factory];
          if (typeof factory !== "function") {
            setErr(`Factory ${selected.factory} not found`);
            return;
          }
      
          const canvas = canvasRef.current!;
          const inst = await factory({
            canvas,
            noInitialRun: true, // we'll start it manually if exported
            locateFile: (p: string) => `${selected.basePath}/${p}`,
          });
          instanceRef.current = inst;
      
          // Start program in the most compatible way available
          if (typeof inst.callMain === "function") {
            inst.callMain([]);
          } else if (typeof inst.run === "function") {
            inst.run();
          } else if (inst.noInitialRun === false || inst.calledRun) {
            // Already auto-started by build flags; nothing to do
          } else {
            setErr(
              "Module did not export callMain/run. Rebuild with -s EXPORTED_FUNCTIONS=['_main'] -s EXPORTED_RUNTIME_METHODS=['callMain','run']."
            );
            return;
          }
      
          setShowStart(false);
        } catch (e: any) {
          setErr(String(e?.message ?? e));
        } finally {
          setLoading(false);
        }
      };
      

  const stopGame = async () => {
    await cleanup();
    setShowStart(true);
  };

  useEffect(() => {
    const onResize = () => resizeCanvas();
    window.addEventListener("resize", onResize);
    resizeCanvas();
    return () => {
      window.removeEventListener("resize", onResize);
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    stopGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="mx-auto max-w-6xl p-6 space-y-6">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
              <line x1="9" y1="12" x2="21" y2="12"></line>
            </svg>
            <span className="text-sm">Back to Home</span>
          </Link>

          <h1 className="text-2xl font-semibold">C++ Game Prototypes</h1>

          <div className="flex items-center gap-3">
            <label htmlFor="game" className="text-sm opacity-80">Select game</label>
            <select
              id="game"
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              {games.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
            </select>
          </div>
        </header>

        <section className="rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
          <div className="w-full flex items-center justify-between px-4 py-2 bg-gray-900/60">
            <div className="text-xs opacity-80">{selected.label}</div>
            <div className="flex gap-2">
              {showStart ? (
                <button
                  className="text-xs px-3 py-1 rounded-md border border-gray-700 hover:bg-gray-800"
                  onClick={startGame}
                  disabled={loading}
                >
                  {loading ? "Loading…" : "Start"}
                </button>
              ) : (
                <button
                  className="text-xs px-3 py-1 rounded-md border border-gray-700 hover:bg-gray-800"
                  onClick={stopGame}
                >
                  Stop
                </button>
              )}
              <button
                className="text-xs px-3 py-1 rounded-md border border-gray-700 hover:bg-gray-800"
                onClick={() => canvasRef.current?.requestFullscreen?.()}
              >
                Fullscreen
              </button>
            </div>
          </div>

          <div
            ref={containerRef}
            className="relative w-full bg-black flex items-center justify-center"
            style={{ aspectRatio: `${selected.width}/${selected.height}` }}
          >
            <canvas ref={canvasRef} className="w-full h-full" />
            {showStart && !loading && (
              <div className="absolute inset-0 grid place-items-center bg-black/70">
                <button
                  onClick={startGame}
                  className="px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold"
                >
                  Start {selected.label}
                </button>
              </div>
            )}
          </div>
        </section>

        {err && <p className="text-sm text-red-400">{err}</p>}
      </div>
    </div>
  );
}
