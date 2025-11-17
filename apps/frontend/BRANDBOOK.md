# KBB — Brandbook (Executive, Minimal)

**Positioning (public):** KBB standardizes **cash‑settled via regulated rails, token‑registered** private debt for professional investors.
**Business copy may say:** *bank‑settled, token‑registered private credit.*
**Tech copy stays neutral:** *cash‑settled via regulated rails, token‑registered.*

**Attributes:** **authoritative · restrained · exacting**
**Personality:** *Reads like a capital‑markets prospectus—terse, precise, never performative.*

---

## 1) Brand Overview

KBB is a capital‑markets infrastructure layer that standardizes SME credit into auditable, professional‑grade instruments. Cash always settles on **regulated rails**; the token is the **register & distribution** layer. We build for regulators, transfer agents, and institutional allocators—not retail speculation.

**Core adjectives:** **authoritative, restrained, exacting**
**Personality:** *Capital‑markets documentation—terse, precise, zero performative language.*

---

## 2) Color System (tailored for finance UI)

> Principle: neutrals carry the interface; color is functional, not decorative.
> Contrast: WCAG **AA** minimum for all text.

### Primary (Actions & Focus)

* **Brand Navy (primary‑700)** `#0B1F2A` (default action/background)
* **Hover** `#0A1B24` (slightly darker)
* **Focus ring** `#1E4D7A` (brand‑500; used only for focus/outline)

### Accent (Sparingly: charts/links/emphasis)

* **Cobalt (accent‑700)** `#1D4ED8`
* **Hover** `#1A43BD`

### Neutrals (Surfaces & Typography)

* **Background** `#FAFAFA` (zinc‑50)
* **Surface** `#FFFFFF`
* **Text‑Primary** `#0F172A` (slate‑900)
* **Text‑Secondary** `#475569` (slate‑600)
* **Borders/Dividers** `#E2E8F0` (slate‑200)

### Status (Functional, muted)

* **Success** `#166534` (green‑700)
* **Warning** `#B45309` (amber‑700)
* **Error** `#B91C1C` (red‑700)
* **Info** `#0369A1` (sky‑700)

**Prohibitions:** No gradients, neon tones, or large color fields. Use accent only where meaning is conveyed.

**Accessibility:** Target WCAG **AA**. All status colors verified for contrast on white/light backgrounds.

---

## 3) Typography & Rhythm

**Primary font:** **Inter** (system fallback: `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Inter, Arial`)
**Optional mono (IDs, IBANs, hashes):** `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`
**Numerics:** enable **tabular‑nums** for columns and KPIs.

**Scale & usage**

* **text-xs (12px)** fine print, table meta
* **text-sm (14px)** labels, help text
* **text-base (16px)** body default
* **text-lg (18px)** section headers
* **text-2xl (24px)** page titles (sparingly)

**Line height:** body `1.6` (comfortable); headings `1.2` (tight).
**Grid:** 8‑pt system (4/8/16/24/32).
**Measure:** 70–85 characters per line (max).

**Case:** Sentence case for UI; Title Case for document/page titles only.

---

## 4) UI Primitives (serious defaults)

### Buttons

* **Primary:** `bg-[#0B1F2A] text-white hover:bg-[#0A1B24] focus:ring-2 focus:ring-[#1E4D7A] rounded-md h-10 px-4`
* **Secondary (outline):** `border border-slate-300 text-slate-900 bg-white hover:bg-slate-50 rounded-md h-10 px-4`
* **Ghost (tertiary):** `text-slate-700 hover:bg-slate-100 rounded-md h-10 px-3`
* **Destructive:** `bg-[#B91C1C] text-white hover:bg-[#991B1B] rounded-md h-10 px-4`

Rules: No emojis; no "loading" animations beyond a simple spinner; disabled uses `opacity-60`.

### Cards & Surfaces

* **Card:** `bg-white border border-slate-200 rounded-md p-24 shadow-[0_1px_2px_rgba(0,0,0,0.04)]`
* Avoid deep shadows; rely on borders and spacing.

### Inputs

* **Field:** `h-10 w-full rounded-md border border-slate-300 px-3 text-slate-900 placeholder-slate-400`
* **Focus:** `ring-2 ring-[#1E4D7A] ring-offset-1 outline-none`
* **Error:** `border-[#B91C1C]` + help text `text-[#B91C1C] text-sm mt-1`

### Tables

* Header row `text-slate-600 text-sm`, body `text-slate-900 text-sm`; 1px dividers; **no zebra stripes** by default.
* Right‑align numeric columns; use **tabular‑nums**.

---

## 5) Voice & Tone (capital‑markets)

**Formality:** Plain business English with legal exactness; no slang or emoji.
**Style:** Short sentences; concrete nouns; prescriptive verbs.

**Patterns**

* Labels ≤ **2–3 words**: "Review changes", "Settle order", "Attach evidence".
* Disclose constraints explicitly: "Professional investors only. Whitelisted transfers."
* Avoid promises: never say "instant", "risk‑free", or "retail‑ready".

**Approved technical phrasing**

* "cash‑settled via regulated rails, token‑registered"
* "DvP only; issuance on verified settlement evidence"
* "on‑chain events reference settlement identifiers for reconciliation"

---

## 6) Do / Don't (tone & UI)

| Do                                                             | Don't                        |
| -------------------------------------------------------------- | ---------------------------- |
| "Attach settlement evidence (ISO 20022/SWIFT)."                | "Drop your file here."       |
| "Settle order"                                                 | "Do the thing"               |
| "Whitelisted OTC transfers only."                              | "Free trading for everyone." |
| "Coupon run completed. 142 recipients. T+1 wires in progress." | "Payouts sent 🚀🚀"          |
| "Generate registrar extract (PDF)."                            | "Download stuff."            |

---

## 7) Content Patterns (ready to paste)

**Section titles**

* Reconciliation · Settlement evidence · Registrar extracts · Coupon runs

**CTAs**

* Review changes · Settle order · Attach evidence · Generate extract

**Empty state**

* "No settlement evidence provided. Attach ISO 20022 camt.054 or permitted stablecoin proof."

**Warnings/Errors**

* "Deadline approaching: order ORD‑1287 must settle within 2 hours."
* "Evidence mismatch: amount/currency do not reconcile to order ORD‑1287."

**Inline help**

* "KBB is **cash‑settled via regulated rails**. Tokens function as the **register & distribution** layer for professional investors."

---

## 8) Imagery & Diagrams

* **Diagrams only** (Mermaid/line icons). No mascots, illustrations, or stock photography.
* Axis, labels, and legends in neutrals; one **accent** series at most.

---

## 9) Tailwind Mapping (tokens)

```js
// tailwind.config.js (excerpt)
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#F2F5F8',
          100: '#E6ECF2',
          200: '#CCD8E5',
          300: '#B3C5D9',
          400: '#8AA4C2',
          500: '#1E4D7A',   // focus ring
          600: '#143A5C',
          700: '#0B1F2A',   // primary action
          800: '#0A1B24',
          900: '#09161D'
        },
        accent: {
          700: '#1D4ED8'    // cobalt, use sparingly
        }
      },
      borderRadius: {
        md: '6px'          // restrained curvature
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.04)'
      },
      fontFeatureSettings: {
        'tabular-nums': '"tnum" 1'
      }
    }
  }
}
```

---

## 10) Governance

* One owner for brand tokens (design systems) and one for copy style.
* All UI additions must pass: **contrast AA**, **tabular‑nums for financials**, and **no emoji/hype** checks.

---

## Quick Reference (1‑page sheet)

* **Adjectives:** authoritative · restrained · exacting
* **Personality:** capital‑markets prospectus, never hype
* **Primary:** brand‑700 `#0B1F2A` (actions); hover a shade darker; focus `#1E4D7A`
* **Accent:** cobalt `#1D4ED8` (sparingly)
* **Neutrals:** background `#FAFAFA`, text `#0F172A`, border `#E2E8F0`
* **Status:** green‑700 / amber‑700 / red‑700 / sky‑700
* **Type:** Inter; sentence case; tabular‑nums in tables
* **Buttons:** rounded‑md (6px), minimal shadow, no gradients
* **Cards:** border + subtle shadow, never heavy elevation
* **Inputs:** h‑10, rounded‑md, ring‑2 on focus, helpful error text
* **Voice:** legal‑grade clarity; verbs for actions; labels ≤3 words; no emoji
* **Prohibitions:** no gradients, no neon, no mascots, no retail promises
