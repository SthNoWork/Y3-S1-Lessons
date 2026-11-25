# Workspace Summary

## 1. Stack & Purpose
- GitHub Pages all-in-one Markdown study renderer (`index.html` + `manifest.json` + `.github/workflows/pages.yml`) engineered for low-glare high-alertness studying with a Deep Focus Slate (default dark) / Soft Daylight palette, rendering pure `.md` study guides (`Software Architecture/Midterm/*.md`) with Mermaid, `event-storming` boards, 2-per-row `.qa-grid` `<details data-tag="...">` recall toggles, and tag filters.

## 2. Map & Flow
- `index.html`: full-viewport (`100vw × 100vh`) pure `.md` Study Hub shell (`manifest.json` + GitHub Trees API fallback on `*.github.io`), `Space Grotesk` + `IBM Plex Sans` + `IBM Plex Mono`, Deep Focus Slate (`#0F172A`/`#162033`/`#38BDF8`) default + Soft Daylight (`#E6EEF5`/`#F4F8FB`) light mode, 25-min Focus Sprint timer (`#timerBtn`), Focus Mode (`F`), 2px cyan reading progress beam, collapsible left sidebar (`Ctrl+K`/`/`), right-side auto-TOC (`#mdOutline`), `##` mastery checkpoints (`localStorage`), dynamic tag filter buttons (`All`, `Exam Radar`, `Theory · 60%`, `Practical · 40%`), 2-per-row `.qa-grid` wrapping consecutive `<details>`, `<details>` expand/collapse, GitHub alerts, dynamic Mermaid, and `event-storming` 4-color sticky boards.
- `manifest.json`: auto-indexed `.md` tree (`Software Architecture` -> `Midterm` -> `study.md`, `quiz.md`, `TeachersNode.md`).
- `.github/workflows/pages.yml`: GitHub Actions workflow scanning all subject folders for `.md` files only on push to `main`/`master` (`study.md` -> `quiz.md` -> alphabetical), regenerating `manifest.json`, and deploying to GitHub Pages.
- `Software Architecture/Midterm/quiz.md`: pure Markdown quiz-only study guide (exam blueprint, quick-reference math & comparison tables, Weeks 1–7 Mermaid diagrams outside `<details>`, 70 Part A "Explain…" + 21 Part B questions in tagged `<details data-tag="...">` cards with rubrics).
- `Software Architecture/Midterm/study.md`: pure Markdown comprehensive study guide covering Weeks 1–7 Slides, Handouts, Quizzes, `TeachersNode.md`, Exam Radar (Gap Matrix + 12 predicted questions), `event-storming` fenced board, Mermaid diagrams, 40% practical templates, and 10-question mock midterm.
- `Software Architecture/Midterm/TeachersNode.md` (L1-8): exam specs (Fri 27 Nov 2026, ~10 open questions, no QCM, 30% grade, 60% theory "explain" / 40% practical, Weeks 1–7).
- `Software Architecture/Lectures/Week 01-07 Slides.pdf`, `Week 01-07 Practice - Student Handout.docx`, `Software Architecture/Quizes/Week 01-07 Quiz.docx`: read in full.

## 3. Data & Conventions
- All study guides are pure `.md` files with `##` major sections, fenced `mermaid` / `event-storming` blocks outside `<details>`, GitHub `[!NOTE]`/`[!TIP]`/`[!IMPORTANT]`/`[!WARNING]` alerts, and `<details data-tag="theory|practical|radar theory|radar practical">` Q&A cards (blank line after `</summary>`).
- Theme state stored in `localStorage.getItem('study-theme')` + `document.documentElement.dataset.theme` (`'dark' | 'light'`).

## 4. Decisions
- Removed legacy `.html` study guides (`quiz.html`, `study.html`) and iframe viewer from `index.html` so every subject/lesson is pure `.md` rendered uniformly with zero duplicate CSS/JS and native GitHub/VS Code/Obsidian readability.
- Applied `frontend-design` skill + low-glare alertness palettes (Deep Focus Slate `#0F172A`/`#162033`/`#38BDF8` as default; Soft Daylight `#E6EEF5`/`#F4F8FB` instead of glaring white; coral reserved for focus-sprint completion and radar highlights) and avoided flowing background animations per Cognitive Load / NNG research.

## 5. State
- Done: `quiz.html` and `study.html` deleted; `index.html`, `manifest.json`, and `.github/workflows/pages.yml` updated to pure `.md` rendering with tag filters.
- Next: Push to GitHub and enable GitHub Pages (Settings -> Pages -> Source: GitHub Actions).
- Not Explored: Course folders outside `Software Architecture`.

## 6. Commands
- None required.

## 7. Verified Working
- None run.
