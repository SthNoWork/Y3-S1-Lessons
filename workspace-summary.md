# Workspace Summary

## 1. Stack & Purpose
- GitHub Pages all-in-one Markdown study renderer (`index.html` + `manifest.json` + `sw.js` + `.github/workflows/pages.yml`), low-glare Deep Focus Slate (dark default) / Soft Daylight palette. Renders pure `.md` guides (`Software Architecture/Midterm/*.md`) with Mermaid, `event-storming` boards, `<details>` Q&A cards, section/tag filters, and a built-in eyes-closed Q&A Audiobook Player (browser Web Speech API, no packages).

## 2. Map & Flow
- `index.html`: Study Hub shell (`manifest.json` + GitHub Trees API fallback on `*.github.io`); fonts Space Grotesk / IBM Plex Sans / IBM Plex Mono; 25-min Focus Sprint (`#timerBtn`), Focus Mode (`F`), progress beam, sidebar (`Ctrl+K`/`/`), auto-TOC (`#mdOutline`), `##` mastery checkpoints (`localStorage`), section dropdown (`#mdSectionFilter`), `Hide done` toggle (`#mdHideDoneBtn`, `study-hide-done`), tag filters (`All`, `Suggested`=`radar`, `Theory`, `Practical`, `Review (N)`, plus any custom `data-tag` auto-discovered, Title-Cased), centered `max-width: 1000px` `.md-toolbar`/`.md-article` reading column with full-width prose/alerts, 1-per-row `.qa-grid`, GitHub alerts, `.md-mermaid-box` horizontal scroll + `renderMermaidBox()` readable scale floor (`>= 0.75x` or `>= 180px` tall via `.is-wide`), `event-storming` sticky boards.
  - **Audiobook Player** (`#mdAudioBtn` permanent in `.topbar-right`, disabled when no Q&A cards; `.qa-play-btn` "▶ Listen" per card, `#audioDock` bottom dock): Web Speech TTS + Web Audio chime earcons. Playlist = visible (filter/section/hide-done-respecting) `<details>`. Reads: section title (on entering a new `##` section, ignores `Mark done` button) → full question as 1 chunk → each `<p>` / `<li>` / `<tr>` of the answer as 1 chunk (`splitBlockOnlyIfHuge`, split only if >450 chars). Keys: `↑/↓` prev/next Q, `Shift+↑/↓` prev/next section, `←/→` prev/next bullet/block, `Space` play/pause, `Enter` Q↔A, `R` replay, `M` flag review, `S` shuffle, `Esc` close. Controls: Shuffle, Recall pause `0s/3s`, speed, voice (`localStorage`: `study-audio-rate|recall|voice`), auto-resume bookmark (`study-audio-pos:<path>`), review flags (`study-review:<path>`), MediaSession headphone keys (+ silent keepalive audio).
  - **Silent tag pills & non-spoken notes**: `.qa-tag-row`/`.qa-tag-pill` rendered in `<summary>` from `data-tag` + `data-meta` + `data-review`; stripped from TTS (`extractCardAudioData`). Elements with `data-no-audio` inside `<details>` are skipped by `collectBlocks()` (no hardcoded text filters).
  - **Slide-Sync Mode** (`#slideSyncBtn` + `#syncPane`): locked single-page PDF.js canvas on left + matching `study.md` / `study.json` Q&A cards on right (matched via `## Section/Week N` + `data-slides` / `data-meta` slide numbers; multi-slide cards shown on every matching slide), cross-week `◀ Prev` / `Next ▶` (`←`/`→`), `Hide Q&A` collapsible panel toggle (`study-sync-hide-qa`), `Skip empty` & `Auto-expand` toggles, Audiobook support on current slide, and full-CRUD per-slide Note Box (`study-sync-notes::<subject>`, rendered inside `#syncQaList` with Create/Edit/Delete + `Copy Notes (N)` Markdown export); PDF.js + worker cached by `sw.js`.
  - **JSON Master Bank & `_components/`** (`resolveJsonDeck` + `buildHtmlFromJsonDeck` + `loadComponentSlot`): renders `questions.json` (single source of truth) and thin filtered views (`study.json`, `quiz.json`, `what-to-remember.json` via `source` + `filter`), lazily loading `_components/*.md|mmd` Mermaid/Event-Storming snippets on card open.
- `sw.js`: service worker (network-first, cache-fallback, active only while cache `study-hub-offline-v1` exists). Handles `CACHE_ALL` / `CLEAR_CACHE` messages from `#offlineBtn`; serves cached `index.html` for offline navigations so page reloads work offline (needs HTTPS/GitHub Pages or localhost; not `file://`).
- `manifest.json`: auto-indexed `.md`, `.pdf`, and `.json` tree (excludes root-level `.md` files and `_*` component folders; collects `_*/*.md|mmd` into `assets[]` for offline caching; groups sorted `Midterm → Slides → Extra` via `rankGroup()`, ALL-CAPS filenames title-cased cleanly via `humanizeTitle()`).
- `.github/workflows/pages.yml`: on push to `main`/`master`, scans subject folders for `.md`, `.pdf`, and `.json` (`overview.md` → `study` → `quiz` → `what-to-remember` → alphabetical; groups `other → Slides → Extra`), indexes `_*` into `assets[]`, regenerates `manifest.json`, deploys Pages.
- `#pdfPane` / `#pdfFrame` in `index.html`: renders `.pdf` slides inline (with `Open PDF` topbar link and offline caching via `sw.js`).
- `AUTHORING-GUIDE.md`: full step-by-step playbook for converting any subject's slides, quizzes, handouts, and teacher notes into `overview.md`, `study.md`, and `quiz.md` (including how to explain slides clearly and spot hidden questions).
- `Software Architecture/Midterm/overview.md`: plain-English Course Overview (exact Week 1 Slide 6 quotes, simplified 6 Core Ideas, 16-week map, FoodHub numbers/constraints, Core Exam Formulas, HTTP status codes, Hard Vocabulary Decoder).
- `Software Architecture/Midterm/questions.json` + `_components/*.md`: master question bank (**229 cards**: `99 study`, `91 quiz`, `39 remember`) + 9 extracted Mermaid/Event-Storming component snippets.
- `Software Architecture/Midterm/study.json`, `quiz.json`, `what-to-remember.json`: thin filtered views referencing `questions.json` (`source` + `filter.bank`).
- `Software Architecture/Midterm/TeachersNode.md`: exam specs (Fri 27 Nov 2026, ~10 open questions, no QCM, 30% grade, 60% theory "explain" / 40% practical, Weeks 1–7).
- `Software Architecture/Slides|Practical|Quizes|Extra/*`: source slides, handouts, quizzes, and `SOFTWARE_ARCHITECTURE_EXAM_STUDY_GUIDE.pdf` (read in full).

## 3. Markdown Authoring Spec (Instructions for Converting Any Future Subject)
Full playbook: see `AUTHORING-GUIDE.md`.
Follow this exact structure when converting new lectures, slides, handouts, or quizzes into `.md` so the renderer, section/tag filters, and audiobook work cleanly without code changes:
1. **Path & order:** Save under `<Subject>/<Topic>/<file>.md` (plus `.pdf` slides if any). `overview.md` sorts first (`Course Overview`), `study.md` second (`Study Guide`), `quiz.md` third (`Quiz Guide`), then alphabetical. Push to `main`; `.github/workflows/pages.yml` rebuilds `manifest.json`.
2. **Standard guide layout order (`overview.md`, `study.md`, `quiz.md`):**
   - `overview.md`: exact course definition quotes, plain-English 6 Core Ideas (simple everyday wording), week-by-week course map, recurring case study + numbers, HTTP/quick reference, Hard Vocabulary Decoder.
   - `study.md`: `# <Subject> — Slide Study Guide` → `> [!IMPORTANT]` Exam Blueprint → links to `overview.md` & `quiz.md` → `## Section 1 — Week 1: …` .. `## Section K — Week K: …`. Explains the slides clearly where slides are brief (pairing exact slide wording with concrete FoodHub examples, crash/attack walkthroughs, or exam tips so Slide-Sync Mode adds real value instead of repeating the slide), adds short plain-English **"What is X?"** foundation cards (`data-meta="Concept · Slide N"`) before any slide that jumps straight into parts/steps of an undefined term (e.g., ADR, C4, QAS, TLS, DNS, CORS, 2PC), and recognizes **"hidden questions"** tucked inside lists, tables, diagrams, and callout boxes (e.g., C4's 4 levels of zoom), turning each slide topic into **1 simple quiz-style question** (`data-meta="Slide N"`), with zero invented filler or mock exams.
   - `quiz.md`: links to `overview.md` & `study.md` + `## Section <N> — Week <N>: <Title>` with all quiz questions mapped 1-to-1 verbatim with instructor answer keys & rubrics.
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
7. **Diagrams & alerts:**
   - **Aspect ratio & readability:** Target ≤ ~2.5:1 width:height so diagrams fit cleanly inside the centered `1000px` reading column. Use `flowchart TD` (not `flowchart LR`) when chaining 3+ multi-node subgraphs; `renderMermaidBox()` enforces a readable floor (`>= 0.75x` or `>= 180px` tall) with horizontal scroll for wide diagrams.
   - **Mermaid syntax:** Supported types only (`flowchart TD`/`LR`, `sequenceDiagram`, `stateDiagram-v2`, `classDiagram`, `erDiagram`); ALWAYS double-quote node/edge labels containing `()`, `/`, `:`, or special chars; NEVER use HTML tags (`<br>`, `<b>`) inside Mermaid labels. Leave blank lines around fenced blocks inside `<details>` (rendered lazily on open, skipped by audiobook); place GitHub alerts (`> [!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`) outside `<details>`.
8. **Naming:** Call AI-suggested practice questions "Suggested" (`radar` tag); never label questions "predicted/critical/high".

## 4. Data & Conventions
- Theme in `localStorage['study-theme']` + `document.documentElement.dataset.theme` (`'dark' | 'light'`).
- Suggested (`radar`) cards use calm Soft Indigo (`--indigo`); `--coral` reserved for `[!CAUTION]` and timer-done pulse.
- Audiobook deck rebuilds via `rebuildAudioDeck()` after render, filter clicks, section filter, hide-done, or shuffle.

## 5. Decisions
- Pure `.md` rendering only; browser TTS + optional SW offline cache (`sw.js`).
- No hardcoded text filters in JS; non-spoken content uses `data-no-audio` or `data-tag`/`data-meta`.

## 6. State
- Done: Audiobook Player (full Q + 1 bullet/block, section announce/jump, shuffle, bookmark, MediaSession, review flags), Offline Save toggle + `sw.js` (including PDF.js & `_components/`), inline PDF slide viewer (`#pdfPane`/`#pdfFrame`), **Slide-Sync Mode** (`#syncPane` locked single-page PDF.js + matching Q&A cards + `Hide Q&A` toggle + full-CRUD Note Box & `Copy Notes`), **Master `questions.json` + thin views (`study.json`, `quiz.json`, `what-to-remember.json`) + `_components/*.md`**, `Extra/` folder indexing (`rankGroup()` + ALL-CAPS `humanizeTitle()`), Soft Indigo radar palette, centered `1000px` reading column, Mermaid aspect-ratio readability floor (`.is-wide` + `flowchart TD`), `Software Architecture/Midterm/overview.md`, `AUTHORING-GUIDE.md`, and updated `workspace-summary.md`.
- Next: Push to GitHub and enable Pages (Settings → Pages → Source: GitHub Actions); test live in Edge/Chrome.
- Not Explored: Course folders outside `Software Architecture`.

## 7. Commands
- None required (static site). Inline scripts & `sw.js` syntax-checked via `node`.

## 8. Verified Working
- Inline `<script>` blocks + `sw.js` syntax-checked; `manifest.json` regenerated (`Midterm: 6`, `Slides: 7`, `Extra: 1`, `assets: 9`); `questions.json` verified (229 cards: `study: 99`, `quiz: 91`, `remember: 39`, 9 `_components/*.md` files exist, 0 unmapped study slides, 12 verbatim slide quotes verified).
- Not yet verified: live audio playback, inline PDF rendering, & offline SW caching in a browser.
