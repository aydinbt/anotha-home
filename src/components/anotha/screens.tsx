import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Lock,
  Pause,
  Play,
  RotateCcw,
  Map as MapIcon,
  Home,
  Settings,
  Star,
  Volume2,
  VolumeX,
  Vibrate,
  VibrateOff,
  X,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function Cloud({
  className = "",
  size = 64,
  slow = false,
}: {
  className?: string;
  size?: number;
  slow?: boolean;
}) {
  return (
    <div
      className={`pointer-events-none absolute ${slow ? "animate-drift-slow" : "animate-drift"} ${className}`}
      aria-hidden
    >
      <svg width={size} height={size * 0.6} viewBox="0 0 64 38" fill="none">
        <ellipse cx="22" cy="26" rx="16" ry="10" fill="white" opacity="0.9" />
        <ellipse cx="38" cy="20" rx="14" ry="12" fill="white" opacity="0.9" />
        <ellipse cx="46" cy="28" rx="12" ry="8" fill="white" opacity="0.9" />
      </svg>
    </div>
  );
}

function Flower({ className = "", tint = "var(--gold)" }: { className?: string; tint?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute ${className}`}
      width="18"
      height="22"
      viewBox="0 0 18 22"
      fill="none"
      aria-hidden
    >
      <path d="M9 22V10" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="9" cy="6" r="3.4" fill={tint} />
      <circle cx="4.5" cy="8.5" r="2.6" fill={tint} opacity="0.85" />
      <circle cx="13.5" cy="8.5" r="2.6" fill={tint} opacity="0.85" />
      <circle cx="9" cy="7.4" r="1.4" fill="var(--surface)" />
    </svg>
  );
}

function OutletSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute ${className}`}
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      aria-hidden
    >
      <rect x="8" y="8" width="40" height="40" rx="12" fill="var(--soft-border)" opacity="0.55" />
      <rect x="21" y="20" width="5" height="12" rx="2.5" fill="var(--raised)" />
      <rect x="30" y="20" width="5" height="12" rx="2.5" fill="var(--raised)" />
    </svg>
  );
}

/**
 * Placeholder for the team's own white cube / plug character.
 * Floats, blinks (eye dots), and bounces on tap. No character art here —
 * swap the inner box for the real asset later.
 */
function CharacterPlaceholder({ size = 128 }: { size?: number }) {
  const [bouncing, setBouncing] = useState(false);
  return (
    <button
      type="button"
      aria-label="Karakter alanı — kendi karakteriniz buraya gelecek"
      onClick={() => {
        setBouncing(true);
        window.setTimeout(() => setBouncing(false), 480);
      }}
      className={`relative cursor-pointer outline-none ${bouncing ? "animate-pop-bounce" : "animate-float-y"}`}
      style={{ width: size, height: size }}
    >
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-[28%] border-2 border-dashed border-soft-border bg-surface"
        style={{ boxShadow: "var(--shadow-soft)" }}
      >
        <div className="flex gap-3">
          <span className="block h-2.5 w-2.5 animate-blink rounded-full bg-foreground" />
          <span className="block h-2.5 w-2.5 animate-blink rounded-full bg-foreground" />
        </div>
        <span className="px-3 text-[10px] font-semibold uppercase tracking-widest text-secondary-text">
          Karakter Alanı
        </span>
      </div>
      {/* soft shadow blob under character */}
      <span
        className="absolute -bottom-5 left-1/2 h-3 w-16 -translate-x-1/2 rounded-full bg-foreground/10 blur-[3px]"
        aria-hidden
      />
    </button>
  );
}

function ValleyDiorama() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 overflow-visible" aria-hidden>
      {/* distant hills */}
      <div className="absolute bottom-0 left-[-15%] h-24 w-[70%] rounded-[50%] bg-raised" />
      <div className="absolute bottom-0 right-[-15%] h-28 w-[70%] rounded-[50%] bg-raised" />
      {/* near ground */}
      <div className="absolute bottom-[-30px] left-1/2 h-20 w-[120%] -translate-x-1/2 rounded-[50%] bg-mint/30" />
      <OutletSilhouette className="bottom-16 right-6 opacity-70" />
      <Flower className="bottom-10 left-8" />
      <Flower className="bottom-14 left-20" tint="var(--hazard)" />
      <Flower className="bottom-9 right-24" tint="var(--gold)" />
    </div>
  );
}

function Stars({ filled, total = 3, size = 16 }: { filled: number; total?: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < filled ? "fill-gold text-gold" : "fill-raised text-soft-border"}
        />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Screen 1: Main Menu / Home                                          */
/* ------------------------------------------------------------------ */

export function HomeScreen({
  onContinue,
  onExplore,
}: {
  onContinue: () => void;
  onExplore: () => void;
}) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <Cloud className="left-[-8px] top-24" size={72} />
      <Cloud className="right-[-6px] top-44" size={52} slow />
      <Cloud className="left-10 top-[330px] opacity-70" size={40} slow />

      {/* top bar */}
      <header
        className="flex items-center justify-between px-6"
        style={{ paddingTop: "max(env(safe-area-inset-top), 20px)" }}
      >
        <span className="text-2xl font-extrabold tracking-[0.18em] text-foreground">
          ANOTHA
        </span>
        <button
          type="button"
          aria-label="Ayarlar"
          onClick={() => setSettingsOpen(true)}
          className="press flex h-11 w-11 items-center justify-center rounded-2xl bg-surface text-secondary-text"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <Settings size={20} />
        </button>
      </header>

      {/* character + diorama */}
      <main className="animate-fade-up relative flex flex-1 flex-col items-center justify-center">
        <CharacterPlaceholder />
        <ValleyDiorama />
      </main>

      {/* progress + actions */}
      <section
        className="animate-fade-up px-6 pb-6 [animation-delay:120ms]"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom), 24px)" }}
      >
        <div className="mb-5 rounded-3xl bg-surface px-5 py-4" style={{ boxShadow: "var(--shadow-soft)" }}>
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-secondary-text">
                Pamuk Vadisi
              </p>
              <p className="mt-0.5 text-lg font-extrabold text-foreground">Bölüm 02</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground">
              <Star size={15} className="fill-gold text-gold" />
              6 / 24
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-raised">
            <div className="h-full w-1/4 rounded-full bg-primary" />
          </div>
          <p className="mt-1.5 text-[11px] font-semibold text-secondary-text">6 / 24 YILDIZ</p>
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="press animate-breathe flex h-14 w-full items-center justify-center gap-2 rounded-[24px] bg-primary text-lg font-extrabold tracking-wide text-primary-foreground"
        >
          <Play size={20} className="fill-primary-foreground" />
          DEVAM ET
        </button>
        <button
          type="button"
          onClick={onExplore}
          className="press mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-[22px] border-2 border-soft-border bg-transparent text-sm font-bold text-foreground"
        >
          <MapIcon size={17} />
          BÖLÜMLERİ KEŞFET
        </button>

        <p className="mt-4 text-center text-[11px] font-medium tracking-wide text-secondary-text/70">
          bubeGame
        </p>
      </section>

      {settingsOpen && <SettingsSheet onClose={() => setSettingsOpen(false)} />}
    </div>
  );
}

function SettingsSheet({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-30 flex items-end justify-center">
      <button
        type="button"
        aria-label="Kapat"
        className="absolute inset-0 bg-foreground/25 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        className="animate-fade-up relative w-full rounded-t-[28px] bg-surface px-6 pb-8 pt-4"
        style={{ boxShadow: "var(--shadow-panel)", paddingBottom: "max(env(safe-area-inset-bottom), 32px)" }}
      >
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-soft-border" />
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-foreground">Ayarlar</h2>
          <button
            type="button"
            aria-label="Kapat"
            onClick={onClose}
            className="press flex h-11 w-11 items-center justify-center rounded-2xl bg-raised text-secondary-text"
          >
            <X size={18} />
          </button>
        </div>
        <div className="mt-4 space-y-2.5">
          {["Ses ve titreşim", "Bildirimler", "Yardım ve destek"].map((label) => (
            <button
              key={label}
              type="button"
              className="press flex h-12 w-full items-center justify-between rounded-2xl bg-background px-4 text-sm font-bold text-foreground"
            >
              {label}
              <span className="text-secondary-text">›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Screen 2: Level Select / World Map                                  */
/* ------------------------------------------------------------------ */

type Level = { id: number; stars: number | null; unlocked: boolean };

const LEVELS: Level[] = [
  { id: 1, stars: 3, unlocked: true },
  { id: 2, stars: 1, unlocked: true },
  { id: 3, stars: 2, unlocked: true },
  { id: 4, stars: null, unlocked: false },
  { id: 5, stars: null, unlocked: false },
  { id: 6, stars: null, unlocked: false },
  { id: 7, stars: null, unlocked: false },
  { id: 8, stars: null, unlocked: false },
];

/* gentle S-curve x offsets (percent of track width) */
const NODE_X = [50, 26, 50, 74, 50, 26, 50, 74];

export function LevelSelectScreen({
  onBack,
  onPlay,
}: {
  onBack: () => void;
  onPlay: () => void;
}) {
  const [selected, setSelected] = useState(2);
  const [lockedHint, setLockedHint] = useState<number | null>(null);
  const hintTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (hintTimer.current) window.clearTimeout(hintTimer.current);
  }, []);

  const showHint = (id: number) => {
    setLockedHint(id);
    if (hintTimer.current) window.clearTimeout(hintTimer.current);
    hintTimer.current = window.setTimeout(() => setLockedHint(null), 1800);
  };

  const sel = LEVELS.find((l) => l.id === selected)!;

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <Cloud className="right-[-10px] top-28" size={60} slow />
      <Cloud className="left-[-14px] top-64 opacity-80" size={46} />

      {/* header */}
      <header
        className="flex items-center justify-between px-5"
        style={{ paddingTop: "max(env(safe-area-inset-top), 20px)" }}
      >
        <button
          type="button"
          aria-label="Geri"
          onClick={onBack}
          className="press flex h-11 w-11 items-center justify-center rounded-2xl bg-surface text-foreground"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-sm font-extrabold uppercase tracking-[0.18em] text-foreground">
          Pamuk Vadisi
        </h1>
        <span className="flex h-11 items-center gap-1.5 rounded-2xl bg-surface px-3.5 text-sm font-extrabold text-foreground" style={{ boxShadow: "var(--shadow-soft)" }}>
          <Star size={15} className="fill-gold text-gold" />
          6 / 24
        </span>
      </header>

      {/* map path */}
      <div className="no-scrollbar relative flex-1 overflow-y-auto px-6 pb-4 pt-6">
        <div className="relative mx-auto max-w-[300px]" style={{ height: 560 }}>
          {/* soft path */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 300 560"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d={`M ${NODE_X.map((x, i) => `${(x / 100) * 300} ${(i / (LEVELS.length - 1)) * 540 + 10}`).join(" L ")}`}
              stroke="var(--primary)"
              strokeOpacity="0.25"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={`M ${NODE_X.map((x, i) => `${(x / 100) * 300} ${(i / (LEVELS.length - 1)) * 540 + 10}`).join(" L ")}`}
              stroke="var(--surface)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="1 12"
            />
          </svg>

          <Flower className="left-0 top-24" tint="var(--hazard)" />
          <Flower className="right-0 top-56" />
          <Flower className="left-2 top-[400px]" tint="var(--gold)" />

          {LEVELS.map((level, i) => {
            const top = (i / (LEVELS.length - 1)) * 540;
            const isSelected = level.id === selected;
            return (
              <div
                key={level.id}
                className="absolute"
                style={{ left: `${NODE_X[i]}%`, top, transform: "translate(-50%, 0)" }}
              >
                {lockedHint === level.id && (
                  <div className="animate-tooltip-in absolute -top-9 left-1/2 z-10 whitespace-nowrap rounded-xl bg-foreground px-3 py-1.5 text-[11px] font-bold text-surface">
                    Önce önceki bölümü tamamla
                  </div>
                )}
                <button
                  type="button"
                  aria-label={`Bölüm ${level.id}${level.unlocked ? "" : " — kilitli"}`}
                  onClick={() => (level.unlocked ? setSelected(level.id) : showHint(level.id))}
                  className={`press relative flex h-16 w-16 flex-col items-center justify-center rounded-[22px] transition-shadow ${
                    level.unlocked
                      ? "bg-surface"
                      : "border-2 border-dashed border-soft-border bg-raised/60"
                  }`}
                  style={
                    isSelected
                      ? { boxShadow: "0 0 0 3px var(--surface), 0 0 0 6px var(--primary), var(--shadow-soft)" }
                      : level.unlocked
                        ? { boxShadow: "var(--shadow-soft)" }
                        : undefined
                  }
                >
                  {level.unlocked ? (
                    <>
                      <span
                        className={`text-xl font-extrabold ${isSelected ? "text-primary" : "text-foreground"}`}
                      >
                        {level.id}
                      </span>
                      <Stars filled={level.stars ?? 0} size={11} />
                    </>
                  ) : (
                    <Lock size={18} className="text-secondary-text/70" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* selected level card */}
      <section
        className="px-5"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom), 20px)" }}
      >
        <div
          key={sel.id}
          className="animate-fade-up flex items-center justify-between gap-4 rounded-[26px] bg-surface p-4 pl-5"
          style={{ boxShadow: "var(--shadow-panel)" }}
        >
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-secondary-text">
              Bölüm {String(sel.id).padStart(2, "0")}
            </p>
            <p className="truncate text-lg font-extrabold text-foreground">
              {sel.id === 2 ? "Yumuşak Sıçrayış" : "Pamuk Vadisi"}
            </p>
            <div className="mt-1 flex items-center gap-1.5">
              <Stars filled={sel.stars ?? 0} size={13} />
              <span className="text-[11px] font-bold text-secondary-text">
                {sel.stars ?? 0} / 3 YILDIZ
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onPlay}
            className="press flex h-13 min-h-[52px] shrink-0 items-center gap-2 rounded-[20px] bg-primary px-7 text-base font-extrabold text-primary-foreground"
            style={{ boxShadow: "var(--shadow-button)" }}
          >
            <Play size={18} className="fill-primary-foreground" />
            OYNA
          </button>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Screen 3: Pause Menu (in-game overlay)                              */
/* ------------------------------------------------------------------ */

function GameplayBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <Cloud className="left-4 top-24" size={80} />
      <Cloud className="right-2 top-52" size={56} slow />
      {/* gentle platforms */}
      <div className="absolute bottom-44 left-8 h-5 w-28 rounded-full bg-mint/50" />
      <div className="absolute bottom-72 right-10 h-5 w-24 rounded-full bg-mint/40" />
      <div className="absolute bottom-[420px] left-16 h-5 w-20 rounded-full bg-mint/30" />
      <OutletSilhouette className="bottom-56 right-20" />
      <Flower className="bottom-48 left-14" />
      <Flower className="bottom-76 right-16" tint="var(--hazard)" />
      <div className="absolute bottom-[-40px] left-1/2 h-32 w-[130%] -translate-x-1/2 rounded-[50%] bg-mint/30" />
      {/* floating character placeholder mid-play */}
      <div className="absolute bottom-60 left-1/2 -translate-x-1/2">
        <CharacterPlaceholder size={84} />
      </div>
    </div>
  );
}

export function GameScreen({ onExit }: { onExit: () => void }) {
  const [paused, setPaused] = useState(true);

  return (
    <div className="relative h-full overflow-hidden">
      <GameplayBackdrop />

      {!paused && (
        <button
          type="button"
          aria-label="Duraklat"
          onClick={() => setPaused(true)}
          className="press absolute right-5 z-20 flex h-11 w-11 items-center justify-center rounded-2xl bg-surface text-foreground"
          style={{
            boxShadow: "var(--shadow-soft)",
            top: "max(env(safe-area-inset-top), 20px)",
          }}
        >
          <Pause size={19} />
        </button>
      )}

      {paused && <PauseMenu onResume={() => setPaused(false)} onExit={onExit} />}
    </div>
  );
}

function PauseMenu({ onResume, onExit }: { onResume: () => void; onExit: () => void }) {
  const [sound, setSound] = useState(true);
  const [haptics, setHaptics] = useState(true);

  const buzz = () => {
    if (haptics && "vibrate" in navigator) navigator.vibrate(10);
  };

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center px-7">
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-md" />
      <div
        className="animate-fade-up relative w-full max-w-[320px] rounded-[30px] bg-surface px-6 pb-6 pt-6"
        style={{ boxShadow: "var(--shadow-panel)" }}
      >
        <button
          type="button"
          aria-label="Devam et ve kapat"
          onClick={() => {
            buzz();
            onResume();
          }}
          className="press absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-raised text-secondary-text"
        >
          <X size={18} />
        </button>

        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Mola Zamanı</h2>
        <p className="mt-1 text-sm font-medium text-secondary-text">
          Hazır olduğunda devam edebilirsin.
        </p>

        <div className="mt-6 space-y-2.5">
          <button
            type="button"
            onClick={() => {
              buzz();
              onResume();
            }}
            className="press flex h-13 min-h-[52px] w-full items-center justify-center gap-2 rounded-[22px] bg-primary text-base font-extrabold text-primary-foreground"
            style={{ boxShadow: "var(--shadow-button)" }}
          >
            <Play size={18} className="fill-primary-foreground" />
            DEVAM ET
          </button>
          <button
            type="button"
            onClick={buzz}
            className="press flex h-12 w-full items-center justify-center gap-2 rounded-[20px] bg-raised text-sm font-bold text-foreground"
          >
            <RotateCcw size={16} />
            TEKRAR DENE
          </button>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => {
                buzz();
                onExit();
              }}
              className="press flex h-12 flex-1 items-center justify-center gap-2 rounded-[20px] bg-raised text-sm font-bold text-foreground"
            >
              <MapIcon size={16} />
              BÖLÜMLER
            </button>
            <button
              type="button"
              onClick={() => {
                buzz();
                onExit();
              }}
              className="press flex h-12 flex-1 items-center justify-center gap-2 rounded-[20px] bg-raised text-sm font-bold text-secondary-text"
            >
              <Home size={16} />
              ANA MENÜ
            </button>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-3 border-t border-soft-border pt-5">
          <button
            type="button"
            aria-label={sound ? "Sesi kapat" : "Sesi aç"}
            aria-pressed={sound}
            onClick={() => {
              setSound(!sound);
              buzz();
            }}
            className={`press flex h-12 w-12 items-center justify-center rounded-2xl ${
              sound ? "bg-raised text-foreground" : "bg-background text-secondary-text"
            }`}
          >
            {sound ? <Volume2 size={19} /> : <VolumeX size={19} />}
          </button>
          <button
            type="button"
            aria-label={haptics ? "Titreşimi kapat" : "Titreşimi aç"}
            aria-pressed={haptics}
            onClick={() => setHaptics(!haptics)}
            className={`press flex h-12 w-12 items-center justify-center rounded-2xl ${
              haptics ? "bg-raised text-foreground" : "bg-background text-secondary-text"
            }`}
          >
            {haptics ? <Vibrate size={19} /> : <VibrateOff size={19} />}
          </button>
        </div>
      </div>
    </div>
  );
}
