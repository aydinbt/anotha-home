# Anotha Home

Create a high-fidelity, mobile-first UI prototype for a premium casual platform game called “ANOTHA”.

Important: this must feel like a polished mobile game, not a SaaS dashboard, admin panel, generic card grid, or children’s educational app. The mood is fresh, soft, playful, airy, modern and premium. It should appeal to children and young players while still feeling refined.

Use Turkish UI text.

Do not design the playable character. Instead, create a prominent placeholder area for our own cute white cube / plug character. The placeholder should support idle float, blink and subtle interaction later, but do not draw a new character.

Visual direction:

Soft pastel world, open sky, clouds, gentle geometric valley shapes.

Large whitespace, rounded surfaces, restrained shadows, premium spacing.

No dark/neon visual style.

Do not make every element purple.

Avoid clutter, excessive gradients, excessive borders, tiny text, generic dashboard widgets, dense card grids and cartoon overload.

Use subtle motion concepts: fade-up entrances, soft breathing CTA, cloud parallax, gentle floating placeholder.

Design for 390x844 mobile portrait first, with safe-area support.

Typography:

Plus Jakarta Sans or a visually similar modern rounded sans-serif.

Strong readable hierarchy, short labels, generous spacing.

Color system:

Background: #F7F5FC

Raised background / distant structures: #EBE7F5

Surface: #FFFFFF

Primary amethyst: #6E56CF

Mint support: #84C9B5

Reward gold: #E8B84A

Success green: #4EAC88

Hazard pink-red: #E75D7F

Primary text / eyes: #29243A

Secondary text: #746D87

Soft structural border: #D6CEE8

Create these three screens and a clickable prototype flow:

MAIN MENU / HOME

This should be a living game home screen, not a dashboard.

Layout:

Top safe area: ANOTHA logo on the left, compact settings icon on the right.

Center: a large “character placeholder” floating above a small pastel Pamuk Vadisi diorama. Include soft clouds, minimal flowers and a distant wall outlet silhouette.

The character placeholder is the emotional focal point of the page.

Under it, one compact progress area:

“PAMUK VADİSİ”

“BÖLÜM 02”

“6 / 24 YILDIZ”

a slim premium progress bar, not a large analytics widget.

Main CTA: “DEVAM ET” in amethyst, wide rounded button with soft breathing animation.

Secondary action: “BÖLÜMLERİ KEŞFET” as a quiet outlined or text-style button.

Footer can contain a very subtle “bubeGame” label; do not make it prominent.

Keep the whole composition cinematic, calm and emotionally inviting.

Interaction:

Tapping the character placeholder gives a subtle bounce.

“DEVAM ET” opens the current level.

“BÖLÜMLERİ KEŞFET” opens the level selection screen.

Settings opens a small modal sheet.

LEVEL SELECT / WORLD MAP

Create a visual world map for “Pamuk Vadisi”, not a plain grid of rectangular cards.

Layout:

Top: back button, title “PAMUK VADİSİ”, small total star count such as “6 / 24”.

Main content: a vertical or gently curved illustrated path through a pastel valley.

Include 8 level nodes connected by a soft amethyst path.

Level 1, 2 and 3 are unlocked.

Level 2 is currently selected.

Levels 4–8 are locked and should feel hopeful, not dark or punishing.

Every node has:

level number

completed stars when unlocked

a subtle lock state when unavailable

Selected level expands into a small premium bottom card:

“BÖLÜM 02”

“YUMUŞAK SIÇRAYIŞ”

“2 / 3 YILDIZ”

primary button “OYNA”

Add gentle cloud and flower decoration around the route, but preserve readability.

Do not use a traditional game-world map with too many icons, coins, banners or noisy elements.

Interaction:

Tapping an unlocked node updates the selected level card.

Tapping “OYNA” starts that level.

Locked nodes show a friendly small tooltip: “Önce önceki bölümü tamamla”.

PAUSE MENU

This is an in-game overlay, not a separate full dashboard screen.

Layout:

Use a blurred/dimmed gameplay background behind the menu.

Center a soft rounded surface panel with generous breathing room.

Heading: “MOLA ZAMANI”

Small subtitle: “Hazır olduğunda devam edebilirsin.”

Main action: “DEVAM ET” in amethyst.

Secondary actions:

“TEKRAR DENE”

“BÖLÜMLER”

“ANA MENÜ”

Bottom area: two quiet icon toggles for sound and haptics.

Include a close or resume icon in the top-right of the panel.

Keep destructive navigation visually secondary.

Use tasteful micro-interactions: panel fade-up, button press scale, subtle haptic feedback notes.

Shared component rules:

Buttons: 20–28px rounded corners, clean shadows, no sharp edges.

Use icons where possible; do not use text labels for directional controls.

Keep touch targets at least 44px.

Use the same color and surface system across all screens.

The player should always understand the next action in under one second.

Provide polished hover/tap/pressed states for the prototype even though it is mobile-first.

Build the screens as reusable components with clean structure and responsive behavior.

Deliver a polished interactive prototype with Main Menu, Level Select and Pause Menu screens. Use placeholder content only for the actual playable character, because we will insert our own character later.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0d1c9a4b-59c7-46c5-9456-8bd50ab358c4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
