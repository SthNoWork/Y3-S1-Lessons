# Study Hub Authoring Guide

How to convert any subject's available source files (PDF slides, `.docx`/`.pdf` quizzes + answer keys, practical handouts, and teacher notes) into clean, accurate Study Hub `.md` files (`overview.md`, `study.md`, `quiz.md`).

> [!IMPORTANT]
> **Golden Rule:** Read **every** source file in full first — every slide page, every quiz, every answer key, every practical handout, and any teacher exam notes. Never skim, guess, or invent exam content that is not in the source materials.

---

## Step 1 — Gather & Read Every Source File

1. **Organize source files under `<Subject>/`:**
   - Place original `.pdf` slide decks in `<Subject>/Slides/` (automatically indexed by `.github/workflows/pages.yml`, rendered inline in Study Hub's PDF viewer, and cached offline by `sw.js`).
   - Place supplementary study guides, cheat sheets, or past exams in `<Subject>/Extra/` (indexed under the `Extra` sidebar group after exam guides and `Slides`, and also viewable inline in Study Hub).
   - Keep quizzes, practical handouts, and teacher notes in `<Subject>/Quizes/`, `<Subject>/Practical/`, or `<Subject>/<Exam>/`.
2. **Read everything page-by-page:**
   - Read every page of every PDF slide deck (`read_file` on `.pdf`), every extra PDF in `Extra/`, every quiz + instructor answer key, practical handout, and `TeachersNode.md` / syllabus.
   - Use `Extra/` materials to clarify hard topics and double-check formulas or common traps—without adding unrequested bloat to `study.md`.
   - **Windows tip for `.docx` files:** If `python` is unavailable, extract `word/document.xml` text from `.docx` archives using PowerShell `.NET` `System.IO.Compression.ZipFile` or `node.exe`.

---

## Step 2 — The 3-File Architecture (`<Subject>/<Exam>/`)

Place study guides under `<Subject>/<Exam>/` (for example, `Software Architecture/Midterm/`). The sidebar automatically sorts files in this order:
1. `overview.md` → **Course Overview**
2. `study.md` → **Study Guide**
3. `quiz.md` → **Quiz Guide**
4. Any other `.md` files (alphabetical)

*(Root-level `.md` files like `AUTHORING-GUIDE.md` and `workspace-summary.md` are excluded from `manifest.json` so they stay out of the student sidebar.)*

### 1. `overview.md` — Course Overview (Sorts 1st)
Give the student a plain-English big picture of the subject before they dive into individual slides:
- **Exact course definition quotes** from Week 1 slides (verbatim).
- **Simple Core Ideas** written in plain, everyday English — **no dense jargon walls**.
- **Full course week map** (table of weeks/topics and key focus).
- **Recurring case study** + exact numbers, scale targets, and constraints used across weeks.
- **Quick-reference cheat sheets** (e.g., HTTP status codes, key formulas, thresholds).
- **Hard Vocabulary Decoder** (plain-English definitions of terms that trip students up).

### 2. `study.md` — Slide Study Guide (Sorts 2nd)
`study.md` has two jobs:
1. **Explain the slides clearly** wherever a slide bullet, diagram, or shorthand is too brief to understand on its own.
2. **Surface "hidden questions"** buried inside bullet lists, comparison tables, diagrams, callout boxes, or summary slides — turning each slide topic into a simple, basic, quiz-style Q&A card.

#### How to Spot Hidden Questions (Checklist)
When reading each slide, scan for items a professor can turn into a simple direct question:
- **Named lists & numbered frameworks:** e.g., C4 model's *"4 levels of zoom"* on a C4 slide, *"5 jobs an architect actually does"*, *"5 Context Map relationships"*.
- **Embedded definitions, quotes, or laws:** e.g., Bass/Clements/Kazman architecture definition, Conway's Law, Fallacies of Distributed Computing.
- **Comparison tables & trade-off matrices:** e.g., Sync vs Async, Monolith vs Microservices, Strong vs Eventual Consistency → ask *"What is the difference / when should you choose X vs Y?"*
- **Formulas, thresholds, & worked math:** e.g., QPS, bandwidth, availability `99.9%` vs `99.99%` downtime.
- **Diagram steps, sequences, & legends:** e.g., Transactional Outbox flow, Saga compensation order, Event Storming sticky-note colors.
- **"Why / When / Trap" callout boxes** tucked in the corner of a slide.

#### "What is X?" Foundation Card Rule
- Whenever a slide jumps straight into parts, steps, or comparisons of an acronym or concept without first defining what it is (e.g., ADR, C4, QAS, TLS, DNS, JWT, CORS, Idempotency, DDD, Event Storming, 2PC), add a short plain-English **"What is X?"** foundation card (`data-meta="Concept · Slide N"`) right before the detail card so a beginner never memorizes parts of something they don't understand.

#### Strict Rules for `study.md`
- Organize by `## Section 1 — Week 1: <Title>` … `## Section K — Week K: <Title>`.
- **1 focused slide topic = 1 simple quiz-style `<details>` card** with `data-meta="Slide N"`. Never cram 3–4 unrelated slides into one mega-card.
- Preserve **exact slide wording**, verbatim quotes, tables, formulas, and code snippets. **Never just parrot terse slide bullets:** wherever a slide is vague or brief, add 1–2 concise **concrete examples, crash/attack walkthroughs, or exam tips** (especially useful in Slide-Sync Mode where the student already sees the original slide on the left) without introducing unrelated off-syllabus topics.
- **Zero invented bloat:** NO fake `CRITICAL` / `HIGH` priority badges, NO `Exam Radar` / `Predicted` labels, NO Gap Matrix tables, NO artificial Mock Midterms or Rapid Review Traps sections.

### 3. `quiz.md` — Quiz Guide (Sorts 3rd)
- Link at the top to `overview.md` and `study.md` (do **not** duplicate overview tables).
- Strict **1-to-1 mapping** of every original quiz question (`Question 1.1` … `K.N`) using exact original question wording, exact instructor answer keys, and grading rubrics (`data-meta="3 pts"` or `Teacher Highlight`).

---

## Step 3 — Study Hub & Audiobook Formatting Contract

Follow this exact HTML/Markdown contract so section filters, tag pills, Mermaid rendering, and the Web Speech Audiobook Player work cleanly without code changes:

1. **Section headings:**
   - Use `## Section <N> — Week <N>: <Title>`.
   - Populates `#mdSectionFilter` and is spoken aloud by the Audiobook Player whenever playback enters a new section.

2. **Card structure:**
   ```markdown
   <details data-tag="theory" data-meta="Slide 5">
   <summary><strong>Question 2.3:</strong> What are the 4 levels of zoom in the C4 model?</summary>

   **Key takeaway:** C4 zooms from the big picture down into code across 4 levels: Context, Container, Component, and Code.

   - **Level 1 — System Context:** ...
   </details>
   ```
   - Always leave a **blank line** immediately after `</summary>` so Markdown renders inside `<details>`.
   - Restart question numbering at `1` per section (`1.1`, `1.2`, `2.1`, …).
   - Keep `<summary>` concise (≤ ~150 chars), phrased directly as a clear question.

3. **Attributes (`data-tag`, `data-meta`):**
   - `data-tag`: space-separated filter categories (`theory`, `practical`, `radar` → displayed as `Suggested`, or custom tags like `formula`, `lab` which are auto-discovered and Title-Cased).
   - `data-meta` (optional): non-spoken pill badges separated by ` · ` (e.g., `Slide 5`, `3 pts · Teacher Highlight`).
   - **Never** put `[W1 · Q1]`, `[CRITICAL]`, `[HIGH]`, `[Theory]`, points, or `★` inside `<summary>`.

4. **Audiobook-friendly answers (`data-no-audio`):**
   - Start each answer with `**Key takeaway:** <1 concise sentence>`, followed by short paragraphs, bullets, or simple tables.
   - Keep each `<p>`, `<li>`, or `<tr>` ≤ ~450 chars (each block = 1 audiobook chunk).
   - Wrap any non-spoken hint or meta note inside `<details>` with `data-no-audio` (e.g., `<p data-no-audio>...</p>`). Never rely on hardcoded JS text filters.

5. **Diagrams & GitHub alerts:**
   - Embed `mermaid` (`flowchart TD`/`LR`, `sequenceDiagram`, `stateDiagram-v2`, `classDiagram`, `erDiagram`) or `event-storming` fenced blocks inside `<details>` surrounded by blank lines. They render lazily on open and are skipped by the audiobook.
   - Double-quote Mermaid node/edge labels containing `()`, `/`, `:`, or special characters; **never** use HTML tags (`<br>`, `<b>`) inside Mermaid labels.
   - Aim for ≤ ~2.5:1 width:height (use `flowchart TD` when chaining 3+ multi-node subgraphs).
   - Place GitHub alerts (`> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`) **outside** `<details>`.

---

## Step 4 — Verification Checklist

Before finishing any subject conversion:
- [ ] Every content slide across all weeks is covered (including hidden questions in lists, tables, diagrams, and callouts).
- [ ] Every verbatim quote, formula, and table matches the original slides.
- [ ] Every original quiz question is mapped 1-to-1 in `quiz.md` with its instructor key/rubric.
- [ ] Zero malformed `<summary>` tags, zero banned bracket/priority labels, and a blank line after every `</summary>`.
- [ ] `manifest.json` is regenerated (or rebuilt on push by `.github/workflows/pages.yml`) and root docs like `AUTHORING-GUIDE.md` are **not** listed in `manifest.json`.
