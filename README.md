# Aster's Arcade

A collection of standalone browser arcade games created by Aster Solas.

Visit [astersarcade.com](https://astersarcade.com) or open `index.html` locally.

## Cabinets

- NEONTRIS
- SCIENCE
- STAR DRIFT
- NEON BREAKER
- LUMEN FLIGHT
- TEMPEST
- LUMEN PANIC

Each game is a self-contained HTML page with no server-side runtime.

## Telegram Mini Apps

- The Telegram Arcade launcher (`telegram-arcade.html`) opens all seven cabinets from one mobile-first Telegram Mini App shell.
- Direct launcher URLs use `telegram-arcade.html?game=<slug>` for `neontris`, `science`, `star-drift`, `neon-breaker`, `lumen-flight`, `tempest`, and `lumen-panic`.
- Telegram Main Mini App links use `https://t.me/AsterSolasBot?startapp=<slug>`. The launcher accepts Telegram's `tgWebAppStartParam` and `Telegram.WebApp.initDataUnsafe.start_param` values only when they exactly match one of those seven slugs.
- A missing, empty, or invalid start parameter opens the main cabinet menu. Existing private-chat `?game=<slug>` Web App links remain supported.
- The original NEONTRIS wrapper (`telegram-tetris.html`) remains available for compatibility.

## Upstairs

A small `STAFF ONLY` door in the arcade leads to the Room Above the Arcade, Aster and Lumen's private quarters overlooking the neon floor.
