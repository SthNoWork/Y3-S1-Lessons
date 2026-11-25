# Workspace Summary

## 1. Stack & Purpose
- GitHub Pages all-in-one Markdown study renderer (`index.html` + `manifest.json` + `.github/workflows/pages.yml`), low-glare Deep Focus Slate (dark default) / Soft Daylight palette. Renders pure `.md` guides (`Software Architecture/Midterm/*.md`) with Mermaid, `event-storming` boards, `<details>` Q&A cards, tag filters, and a built-in eyes-closed Q&A Audiobook Player (browser Web Speech API, no packages).

## 2. Map & Flow
- `index.html`: Study Hub shell (`manifest.json` + GitHub Trees API fallback on `*.github.io`); fonts Space Grotesk / IBM Plex Sans / IBM Plex Mono; 25-min Focus Sprint (`#timerBtn`), Focus Mode (`F`), progress beam, sidebar (`Ctrl+K`/`/`), auto-TOC (`#mdOutline`), `##` mastery checkpoints (`localStorage`), tag filters (`All`, `Suggested`=`radar`, `Theory`, `Practical`, plus any custom `data-tag` auto-discovered, Title-Cased; no hardcoded percentages), 2-per-row `.qa-grid`, GitHub alerts, Mermaid, `event-storming` sticky boards.
  - **Audiobook Player** (`#mdAudioBtn` permanent in `.topbar-right`, disabled when no Q&A cards; `.qa-play-btn` "▶ Listen" per card, `#audioDock` bottom dock): Web Speech TTS + Web Audio chime earcons. Playlist = visible (filter-respecting) `<details>`. Reads: section title (on entering a new `##` section, ignores `Mark done` button) → full question as 1 chunk → each `<p>` / `<li>` / `<tr>` of the answer as 1 chunk (`splitBlockOnlyIfHuge`, split only if >450 chars), except editorial paragraphs prefixed `Why likely:`. Keys: `↑/↓` prev/next question, `←/→` prev/next bullet/block, `Space` play/pause, `Enter` question↔answer, `Esc` close. Controls: Recall pause `0s/3s`, speed, voice (persisted in `localStorage`: `study-audio-rate|recall|voice`).
  - **Silent tag pills**: `.qa-tag-row`/`.qa-tag-pill` rendered in `<summary>` from `data-tag` + `data-meta`; stripped from TTS text (`extractCardAudioData`).
- `manifest.json`: auto-indexed `.md` tree.
- `sw.js`: service worker (network-first, cache-fallback, active only while cache `study-hub-offline-v1` exists). Handles `CACHE_ALL` / `CLEAR_CACHE` messages from `#offlineBtn`; serves cached `index.html` for offline navigations so page reloads work offline (needs HTTPS/GitHub Pages or localhost; not `file://`).
- Offline toggle `#offlineBtn` (topbar): `Save Offline` ↔ `Offline Ready`; caches `index.html`, `manifest.json`, all `.md` files, CDN libs (marked, mermaid) and fonts; re-syncs silently on each online load while enabled.
- Audiobook extras: auto-resume bookmark per file (`study-audio-pos:<path>`), MediaSession headphone/media keys (+ silent keepalive audio), `Shift+↑/↓` section jump, `R` replay, `M` flag review (`study-review:<path>`) with `Review (N)` filter + `★ Review` pill.
- `.github/workflows/pages.yml`: on push to `main`/`master`, scans subject folders for `.md` (`study.md` → `quiz.md` → alphabetical), regenerates `manifest.json`, deploys Pages.
- `Software Architecture/Midterm/quiz.md`: Quick-reference tables + 7 sections (`## Section N — Week N: <title>`), 74 cards `Question N.M:` (theory + practical, points/`Teacher Highlight` in `data-meta`).
- `Software Architecture/Midterm/study.md`: Master brief, `## Section 1 — Suggested Practice Questions (Based on Quizzes)` (`Question 1.1`–`1.12`, tag `radar`), Week 1–7 notes, practical templates, `## Section 2 — Mock Midterm Paper (60% Theory / 40% Practical)` (`Question 2.1`–`2.10`).
- `Software Architecture/Midterm/TeachersNode.md`: exam specs (Fri 27 Nov 2026, ~10 open questions, no QCM, 30% grade, 60% theory "explain" / 40% practical, Weeks 1–7).
- `Software Architecture/Lectures|Quizes/*`: source slides/handouts/quizzes (read in full).

## 3. Markdown Authoring Spec (Instructions for Future AI)
Follow exactly when generating or editing any study/quiz `.md` so the renderer, filters, and audiobook work:
1. **Path/order:** `<Subject>/<Topic>/<file>.md`. `study.md` sorts first, `quiz.md` second, then alphabetical. Push to `main`; the workflow rebuilds `manifest.json`.
2. **Sections:** every Q&A group is a `##` heading named `## Section <N> — <Clear Title>` (e.g. `## Section 2 — Week 2: Designing and Documenting Architecture`). The audiobook announces this title when playback enters the section.
3. **Card wrapper:** `<details data-tag="..." data-meta="...">`.
   - `data-tag`: space-separated filter categories. Known: `theory`, `practical`, `radar` (shown as "Suggested"). Any custom tag (e.g. `formula`, `lab`) is auto-discovered as a filter button + pill, Title-Cased.
   - `data-meta` (optional): non-spoken badges separated by ` · ` (e.g. `4 pts · W6 · Teacher Note`).
   - Both render as silent pills; never read aloud.
4. **Question title:** `<summary><strong>Question <Section>.<Num>:</strong> <full question prompt></summary>` then a blank line (required for Markdown inside `<details>`). Numbering restarts at 1 per section. NEVER put `[CRITICAL]`, `[HIGH]`, `[Theory]`, `[W1 · Q1]`, points, or `★` in `<summary>`; use `data-tag`/`data-meta`.
5. **Answer body (audiobook = 1 chunk per block):** short paragraphs, one bullet per point (`-` / `1.`), or simple tables. Keep each paragraph/bullet ≤ ~450 chars. Don't put the answer's key info only in code blocks or images. Wrap any non-spoken note/hint inside `<details>` with `data-no-audio` (e.g. `<p data-no-audio>...</p>`) so the audiobook skips it without hardcoded filters.
6. **Outside `<details>`:** fenced `mermaid` / `event-storming` blocks and GitHub alerts (`> [!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`).
7. **Naming:** do not label questions as "predicted/critical/high"; call AI-suggested practice questions "Suggested" (`radar` tag).

## 4. Data & Conventions
- Theme in `localStorage['study-theme']` + `document.documentElement.dataset.theme` (`'dark' | 'light'`).
- Filter classes: `.hidden-by-filter` on `<details>`; audiobook deck rebuilt via `rebuildAudioDeck()` after render and after each filter click.

## 5. Decisions
- Pure `.md` rendering only (legacy `.html` guides removed).
- Audiobook uses browser TTS (zero dependencies, works on Pages); pre-generated MP3s not implemented.
- Tags/metadata live in attributes, not in spoken `<summary>` text.

## 6. State
- Done: Audiobook Player; `Section N` / `Question N.M` restructure of `quiz.md` (74) and `study.md` (22); tag pills; Suggested rename.
- Next: Push to GitHub and enable Pages (Settings → Pages → Source: GitHub Actions); try audiobook in Edge/Chrome and tune.
- Not Explored: Course folders outside `Software Architecture`.

## 7. Commands
- None required (static site). Syntax check of inline scripts was done via `node` `new Function(...)`.

## 8. Verified Working
- Inline `<script>` blocks parse without syntax errors; all 96 `<summary>` titles match `Question N.M:` with no banned labels.
- Not yet verified: live audio playback in a browser.
