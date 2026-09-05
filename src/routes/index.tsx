import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GameScreen, HomeScreen, LevelSelectScreen } from "@/components/anotha/screens";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ANOTHA — Pamuk Vadisi'nde Yumuşak Bir Macera" },
      {
        name: "description",
        content:
          "ANOTHA ana menüsü, Pamuk Vadisi bölüm haritası ve mola ekranı — pastel, premium bir mobil platform oyunu prototipi.",
      },
      { property: "og:title", content: "ANOTHA" },
      {
        property: "og:description",
        content:
          "Pastel bulutlar ve yumuşak vadiler arasında geçen premium bir mobil platform oyunu prototipi.",
      },
    ],
  }),
  component: Index,
});

type Screen = "home" | "levels" | "game";

function Index() {
  const [screen, setScreen] = useState<Screen>("home");

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background sm:py-6">
      {/* phone frame on larger screens, full-bleed on mobile */}
      <div className="relative h-dvh w-full overflow-hidden bg-background sm:h-[844px] sm:max-h-[92dvh] sm:w-[390px] sm:rounded-[44px] sm:border-[6px] sm:border-surface sm:shadow-[var(--shadow-panel)]">
        <div key={screen} className="h-full animate-fade-up">
          {screen === "home" && (
            <HomeScreen
              onContinue={() => setScreen("game")}
              onExplore={() => setScreen("levels")}
            />
          )}
          {screen === "levels" && (
            <LevelSelectScreen
              onBack={() => setScreen("home")}
              onPlay={() => setScreen("game")}
            />
          )}
          {screen === "game" && <GameScreen onExit={() => setScreen("home")} />}
        </div>
      </div>
    </div>
  );
}
