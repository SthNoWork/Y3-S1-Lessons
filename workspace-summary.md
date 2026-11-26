# Workspace Summary

## 1. Stack & Purpose
- GitHub Pages all-in-one Markdown study renderer (`index.html` + `manifest.json` + `sw.js` + `.github/workflows/pages.yml`), low-glare Deep Focus Slate (dark default) / Soft Daylight palette. Renders pure `.md` guides (`Software Architecture/Midterm/*.md`) with Mermaid, `event-storming` boards, `<details>` Q&A cards, section/tag filters, and a built-in eyes-closed Q&A Audiobook Player (browser Web Speech API, no packages).

## 2. Map & Flow
- `index.html`: Study Hub shell (`manifest.json` + GitHub Trees API fallback on `*.github.io`); fonts Space Grotesk / IBM Plex Sans / IBM Plex Mono; 25-min Focus Sprint (`#timerBtn`), Focus Mode (`F`), progress beam, sidebar (`Ctrl+K`/`/`), auto-TOC (`#mdOutline`), `##` mastery checkpoints (`localStorage`), section dropdown (`#mdSectionFilter`), `Hide done` toggle (`#mdHideDoneBtn`, `study-hide-done`), tag filters (`All`, `Suggested`=`radar`, `Theory`, `Practical`, `Review (N)`, plus any custom `data-tag` auto-discovered, Title-Cased), 1-per-row `.qa-grid`, GitHub alerts, Mermaid, `event-storming` sticky boards.
  - **Audiobook Player** (`#mdAudioBtn` permanent in `.topbar-right`, disabled when no Q&A cards; `.qa-play-btn` "▶ Listen" per card, `#audioDock` bottom dock): Web Speech TTS + Web Audio chime earcons. Playlist = visible (filter/section/hide-done-respecting) `<details>`. Reads: section title (on entering a new `##` section, ignores `Mark done` button) → full question as 1 chunk → each `<p>` / `<li>` / `<tr>` of the answer as 1 chunk (`splitBlockOnlyIfHuge`, split only if >450 chars). Keys: `↑/↓` prev/next Q, `Shift+↑/↓` prev/next section, `←/→` prev/next bullet/block, `Space` play/pause, `Enter` Q↔A, `R` replay, `M` flag review, `S` shuffle, `Esc` close. Controls: Shuffle, Recall pause `0s/3s`, speed, voice (`localStorage`: `study-audio-rate|recall|voice`), auto-resume bookmark (`study-audio-pos:<path>`), review flags (`study-review:<path>`), MediaSession headphone keys (+ silent keepalive audio).
  - **Silent tag pills & non-spoken notes**: `.qa-tag-row`/`.qa-tag-pill` rendered in `<summary>` from `data-tag` + `data-meta` + `data-review`; stripped from TTS (`extractCardAudioData`). Elements with `data-no-audio` inside `<details>` are skipped by `collectBlocks()` (no hardcoded text filters).
- `sw.js`: service worker (network-first, cache-fallback, active only while cache `study-hub-offline-v1` exists). Handles `CACHE_ALL` / `CLEAR_CACHE` messages from `#offlineBtn`; serves cached `index.html` for offline navigations so page reloads work offline (needs HTTPS/GitHub Pages or localhost; not `file://`).
- `manifest.json`: auto-indexed `.md` tree.
- `.github/workflows/pages.yml`: on push to `main`/`master`, scans subject folders for `.md` and `.pdf` (`study.md` → `quiz.md` → alphabetical), regenerates `manifest.json`, deploys Pages.
- `#pdfPane` / `#pdfFrame` in `index.html`: renders `.pdf` slides inline (with `Open PDF` topbar link and offline caching via `sw.js`).
- `Software Architecture/Midterm/quiz.md`: Quick-reference tables + 7 sections (`## Section 1 — Week 1: …` .. `## Section 7 — Week 7: …`), 74 cards `Question N.M:` (points/`Teacher Highlight` in `data-meta`).
- `Software Architecture/Midterm/study.md`: Master brief + 9 sections: `Section 1` Suggested (`Question 1.1`–`1.12`, `Why likely` wrapped in `<p data-no-audio>`), `Sections 2–8` Weeks 1–7 (split single-topic cards `Question 2.1`–`8.6` with `**Key takeaway:**` first), Practical Templates, `Section 9` Mock Midterm (`Question 9.1`–`9.10`).
- `Software Architecture/Midterm/TeachersNode.md`: exam specs (Fri 27 Nov 2026, ~10 open questions, no QCM, 30% grade, 60% theory "explain" / 40% practical, Weeks 1–7).
- `Software Architecture/Lectures|Quizes/*`: source slides/handouts/quizzes (read in full).

## 3. Markdown Authoring Spec (Instructions for Converting Any Future Subject)
Follow this exact structure when converting new lectures, slides, handouts, or quizzes into `.md` so the renderer, section/tag filters, and audiobook work cleanly without code changes:
1. **Path & order:** Save under `<Subject>/<Topic>/<file>.md`. `study.md` sorts first, `quiz.md` second, then alphabetical. Push to `main`; the workflow rebuilds `manifest.json`.
2. **Sequential sections (`##`):** Name every Q&A group `## Section <N> — <Clear Title>` in order `1 → K` (e.g. `## Section 2 — Week 2: Designing and Documenting Architecture`). The audiobook announces this heading when entering a new section, and `#mdSectionFilter` populates from it.
3. **One topic per card (no mega-cards):** Split multi-part topics into focused `<details>` cards phrased directly as **how the exam asks it** (aim for `<summary>` ≤ ~150 chars). Never cram 3–4 unrelated sub-questions into one card.
4. **Card attributes (`data-tag`, `data-meta`):**
   - `<details data-tag="..." data-meta="...">`
   - `data-tag`: space-separated filter categories (`theory`, `practical`, `radar`→"Suggested", or any custom tag like `formula`, `lab` — auto-discovered and Title-Cased).
   - `data-meta` (optional): non-spoken badges separated by ` · ` (e.g. `4 pts · W6 · Teacher Note`). Both render as silent pills and are never spoken.
5. **Question title (`<summary>`):**
   - `<summary><strong>Question <Section>.<Num>:</strong> <single clear exam prompt></summary>` followed by a blank line (required for Markdown inside `<details>`). Numbering restarts at 1 per section (`1.1`, `1.2`, `2.1`, …).
   - NEVER put `[CRITICAL]`, `[HIGH]`, `[Theory]`, `[W1 · Q1]`, points, or `★` in `<summary>`.
6. **Key-point-first answers (audiobook = 1 chunk per block):**
   - Start each answer with `**Key takeaway:** <1 concise sentence>`, followed by short bullets (`-` / `1.`) or simple tables. Keep each paragraph/bullet/row ≤ ~450 chars so TTS stays smooth.
   - Wrap any non-spoken hint/meta inside `<details>` with `data-no-audio` (e.g. `<p data-no-audio>...</p>`). Never rely on hardcoded JS text filters.
7. **Diagrams & alerts:** Place fenced `mermaid` and `event-storming` blocks inside `<details>` when answering drawing questions (rendered lazily on open, skipped by audiobook) or outside `<details>` for section overviews; place GitHub alerts (`> [!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`) outside `<details>`.
8. **Naming:** Call AI-suggested practice questions "Suggested" (`radar` tag); never label questions "predicted/critical/high".

## 4. Data & Conventions
- Theme in `localStorage['study-theme']` + `document.documentElement.dataset.theme` (`'dark' | 'light'`).
- Suggested (`radar`) cards use calm Soft Indigo (`--indigo`); `--coral` reserved for `[!CAUTION]` and timer-done pulse.
- Audiobook deck rebuilds via `rebuildAudioDeck()` after render, filter clicks, section filter, hide-done, or shuffle.

## 5. Decisions
- Pure `.md` rendering only; browser TTS + optional SW offline cache (`sw.js`).
- No hardcoded text filters in JS; non-spoken content uses `data-no-audio` or `data-tag`/`data-meta`.

## 6. State
- Done: Audiobook Player (full Q + 1 bullet/block, section announce/jump, shuffle, bookmark, MediaSession, review flags), Offline Save toggle + `sw.js`, Soft Indigo radar palette, split Week 1–7 `study.md` cards (`Sections 1–9`), updated authoring spec.
- Next: Push to GitHub and enable Pages (Settings → Pages → Source: GitHub Actions); test live in Edge/Chrome.
- Not Explored: Course folders outside `Software Architecture`.

## 7. Commands
- None required (static site). Inline scripts & `sw.js` syntax-checked via `node`.

## 8. Verified Working
- Inline `<script>` blocks + `sw.js` syntax-checked; all `study.md` & `quiz.md` `<summary>` titles match `Question N.M:`.
- Not yet verified: live audio playback & offline SW caching in a browser.
