# José Vinícius Guincho - Landing Page Redesign Spec

**Date:** 2026-08-18  
**Project:** José Vinícius Guincho Tow Truck Service Landing Page  
**Scope:** Complete redesign with GSAP animations, SEO optimization, video hero, photo carousel, and dynamic tire mark animation  
**Status:** Design Phase ✓ → Implementation Ready

---

## 1. Vision & Goals

Create a **premium, mobile-first landing page** for José Vinícius Guincho (tow truck service) serving Osasco, Taboão da Serra, Cotia, and São Paulo state. The site will showcase:

- **24/7 emergency towing service**
- **Fast response times**
- **Safe, modern fleet**
- **Coverage across SP state** (with focus on primary service areas)
- **Professional branding** with dynamic, smooth animations

**Key Success Metrics:**
- ✓ Mobile-first responsive design
- ✓ <100ms animation performance (60 FPS)
- ✓ SEO-optimized (structured data, sitemap, robots.txt)
- ✓ Video loads <10MB (mobile-friendly)
- ✓ All animations powered by GSAP + ScrollTrigger
- ✓ Watermark-free video in hero

---

## 2. Architecture Overview

### Page Structure (Section Hierarchy)

```
┌─────────────────────────────────────────┐
│ NAV (sticky, animated on scroll)        │
├─────────────────────────────────────────┤
│ HERO (full-width video + text reveal)   │
├─────────────────────────────────────────┤
│ SERVIÇOS + MAPA (side-by-side grid)     │
│ + Dynamic tire mark animation (↙)       │
├─────────────────────────────────────────┤
│ GALERIA (carousel de fotos do guincho)  │
├─────────────────────────────────────────┤
│ CTA SECTION (call-to-action + WhatsApp) │
│ + Tire mark animation on button         │
├─────────────────────────────────────────┤
│ SOBRE (brief description)               │
├─────────────────────────────────────────┤
│ FOOTER (copyright + links + phone)      │
└─────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **HTML** | Semantic HTML5 | Structure, accessibility |
| **CSS** | Modern CSS3 + Grid/Flexbox | Responsive, performant styling |
| **Animation** | GSAP 3.12+ + ScrollTrigger | Smooth, GPU-accelerated animations |
| **Video** | MP4 H.264 (1080×1920px) | Hero video, mobile-optimized |
| **Carousel** | GSAP Draggable or Swiper.js | Photo gallery with touch support |
| **Icons** | Inline SVG | Lightweight, scalable |

---

## 3. Detailed Section Specifications

### 3.1 Navigation Bar

**Behavior:**
- Fixed/sticky positioning
- Left: Logo only (no nav links)
- Right: WhatsApp icon button (minimal, no text)
- **Animation:** Background blur + color change on scroll (backdrop-filter)
- **Mobile:** Same layout (logo left, WhatsApp icon right)

**Responsive:**
- Desktop: logo left, WhatsApp icon right, full width
- Tablet: same layout, adjusted spacing
- Mobile: logo left, WhatsApp icon right, reduced logo size

**GSAP Implementation:**
```javascript
gsap.to("nav", {
  scrollTrigger: {
    trigger: "main",
    start: "top 0",
    onUpdate: (self) => {
      if (self.getVelocity() > 0 || self.progress > 0.05) {
        // Add background on scroll
        gsap.to("nav", { background: "rgba(0, 0, 0, 0.8)", duration: 0.3 });
      } else {
        gsap.to("nav", { background: "transparent", duration: 0.3 });
      }
    }
  }
});
```

---

### 3.2 Hero Section

**Layout:**
- Full-width, full-height (or 90vh on mobile)
- Split layout: left (text) + right (video/image)
- On mobile: stacked (text on top, video below)

**Content:**
- **Title:** "Seu carro parou na estrada? Já estamos a caminho." (animated line-by-line reveal)
- **Subtitle:** "Resgate expresso em Osasco, Taboão da Serra e Cotia. Cobertura em todo o Estado de São Paulo."
- **Feature Pills:** 
  - Guincho Plataforma Seguro
  - Orçamento Rápido
  - Pagamento Pix ou Cartão
- **CTA Button:** "Solicitar Resgate Agora" (links to WhatsApp)
- **Video/Image:** Full-width video (hero-reboque.mp4, watermark-removed)

**Video Specifications:**
- **File:** `hero-reboque.mp4` (watermark removed via https://videowatermarkremove.com)
- **Format:** H.264 codec, AAC audio
- **Resolution:** 1080 × 1920 px (9:16 vertical, mobile-first)
- **Bitrate:** 5-8 Mbps
- **File Size:** <10 MB (target: 6-8 MB)
- **HTML Attributes:** `<video muted autoplay loop playsinline preload="metadata" poster="[fallback-image]">`
- **Fallback:** Static image if video fails to load

**Animations (GSAP):**
- **Title:** Staggered line-by-line reveal with `clip-path` or `scaleY`
- **Subtitle:** Fade-in with slight delay
- **Feature Pills:** Slide-in from left with stagger (0.1s between each)
- **Video:** Fade-in and subtle zoom-in on load
- **Trigger:** All animations start on page load (not scroll)

```javascript
// Title reveal animation
gsap.from(".line-inner", {
  opacity: 0,
  y: 20,
  duration: 0.8,
  stagger: 0.15,
  ease: "power2.out"
});

// Feature pills reveal
gsap.from(".feature-item", {
  opacity: 0,
  x: -30,
  duration: 0.6,
  stagger: 0.1,
  ease: "power2.out"
});
```

---

### 3.3 Serviços + Mapa Section

**Layout:**
- **Desktop:** 2-column grid
  - Left: 4-card grid (2×2) of services
  - Right: Map image (mapa-brasil.gif) with SP region highlighted
- **Mobile:** Stacked (cards first, then map below)

**Services Cards (4 total):**
1. **Guincho 24h** — "Serviço disponível 24 horas para transporte seguro do seu veículo."
2. **Resgate Rápido** — "Chegamos rapidinho. Você não fica esperando na estrada."
3. **Pagamento Seguro** — "Pix, Cartão ou dinheiro. Orçamento sem surpresas."
4. **Cobertura Completa** — "Osasco, Taboão da Serra, Cotia e todo SP."

**Card Design:**
- Icon (SVG) + title + description
- Hover effect: shadow expand + slight scale (desktop only)
- Border-left accent color (red #E51A1A)

**Map:**
- **Image:** `public/mapa-brasil.gif` (or static PNG)
- **Highlight:** SP region with glow/pulse animation
- **Context:** Show that coverage spans Brazil, but primary focus is SP regions

**Dynamic Tire Mark Animation (PRIMARY FEATURE):**

This is the signature animation of the page. Tire marks appear as if a truck is driving diagonally across the section, leaving tracks that gradually fade out (disappear).

**Visual Effect:**
- 2 parallel tire marks (simulating dual wheels of a truck)
- Diagonal direction: top-right → bottom-left (↙)
- Marks appear as user scrolls into the Services section
- Marks disappear gradually (fade out) as if the truck drove past
- If user scrolls back up, marks reverse/disappear (marcha ré effect)

**SVG Structure:**
```html
<div class="tire-marks-container">
  <svg class="tire-marks" viewBox="0 0 1920 1080">
    <!-- Multiple parallel tire mark paths, staggered -->
    <g class="tire-mark-pair" data-index="0">
      <line class="tire-left" x1="1800" y1="100" x2="200" y2="800" stroke="#000" stroke-width="8"/>
      <line class="tire-right" x1="1850" y1="100" x2="250" y2="800" stroke="#000" stroke-width="8"/>
    </g>
    <g class="tire-mark-pair" data-index="1">
      <!-- ... more pairs -->
    </g>
  </svg>
</div>
```

**Animation Logic (GSAP + ScrollTrigger):**
```javascript
// For each tire mark pair, animate opacity + position based on scroll
gsap.to(".tire-mark-pair", {
  scrollTrigger: {
    trigger: ".servicos",
    start: "top center",
    end: "bottom center",
    scrub: 0.5,  // Smooth lag
    markers: false
  },
  // Each pair has different timing (stagger effect)
  stagger: 0.2,
  opacity: 0,  // Fade out as time progresses
  x: -200,     // Move left (direction of travel)
  duration: 1
});
```

**Mobile Considerations:**
- Scale down SVG on mobile devices
- Reduce opacity fade speed for performance
- Use `will-change: opacity, transform` for optimization

---

### 3.4 Galeria (Photo Carousel)

**Content:**
- Photos of truck in action (downloaded from WhatsApp)
- Minimum 5-6 photos

**Carousel Features:**
- **Desktop:** Arrows (prev/next) on sides, clickable
- **Mobile:** Touch swipe support, auto-loop (optional)
- **Transition:** Smooth fade + slide (GSAP)
- **Auto-play:** Optional (5-7s interval between images)

**Implementation Options:**
- **Option A:** GSAP Draggable (pure GSAP, lightweight)
- **Option B:** Swiper.js + GSAP hooks (more features, slightly heavier)

**Recommendation:** GSAP Draggable (lighter, no dependencies)

**GSAP Carousel Code Pattern:**
```javascript
gsap.registerPlugin(Draggable);

let slides = gsap.utils.toArray(".carousel-slide");
let proxy = { slide: 0 },
    slideAnimation = gsap.timeline({ paused: true }),
    slideContent = gsap.timeline(),
    wrap = gsap.utils.wrap(0, slides.length),
    direction = 1;

function animateSlides(direction) {
  slideAnimation.to(proxy, {
    slide: proxy.slide + direction,
    onUpdate: updateSlide
  }, 0);
  slideAnimation.to(slides, { x: -100 * proxy.slide + "%" }, 0);
}

Draggable.create(".carousel-container", {
  type: "x",
  onDrag: updateSlide,
  onDragEnd: snap
});
```

---

### 3.5 CTA Section ("Sua Frota em Boas Mãos")

**Content:**
- **Title:** "Sua frota em boas mãos"
- **Subtitle:** "Orçamento rápido, resgate expresso, pagamento facilitado."
- **Primary CTA:** "Conversar no WhatsApp" button
- **Secondary:** Phone number "Ou ligue: (11) 99772-2725"

**Button Styling & Animation:**
- Button has **tire mark animation** (same as Services section)
- On hover/focus: scale + glow effect
- Tire marks appear diagonally across button on interaction

**Animation:**
```javascript
// Button hover effect with tire marks
gsap.to(".btn-primary", {
  scrollTrigger: {
    trigger: ".cta-section",
    start: "top 70%",
    markers: false
  },
  boxShadow: "0 0 30px rgba(229, 26, 26, 0.5)",
  duration: 0.3,
  yoyo: true
});
```

---

### 3.6 Sobre Section

**Content:**
- Brief description of the service
- Emphasis on: experience, modern fleet, safety, regional expertise
- Service name: "01 do Leilão"

**Text:** (updated)
"01 do Leilão — especialista em resgate de veículos com frota moderna e segura. Atua há anos na região de Osasco, Taboão da Serra e Cotia com compromisso de segurança e agilidade."

**Animation:** Simple fade-in on scroll (reveal effect)

---

### 3.7 Footer

**Content:**
- Copyright: "© 2026 José Vinícius Guincho. Resgate Expresso em SP."
- Phone: "(11) 99772-2725"
- Links: (if needed) Privacy, Terms, etc.

**Styling:** Dark background, minimal text

---

## 4. Animation Strategy (GSAP + ScrollTrigger)

### 4.1 General Principles

- **All animations use GSAP 3.12+** (no Intersection Observer, except for SEO/analytics)
- **ScrollTrigger for scroll-linked animations**
- **GPU-accelerated transforms** (use `transform: translate/scale/rotate`, avoid `top/left`)
- **Mobile-first:** Test on real devices, optimize performance
- **No emojis:** Do not use emojis in any part of the codebase or website content

### 4.2 Animation Types

| Section | Animation Type | Trigger | Duration |
|---------|---|---|---|
| **Nav** | Background blur + fade | Scroll 50px | 0.3s |
| **Hero Title** | Line-by-line reveal | Page load | 0.8s (staggered) |
| **Hero Subtitle** | Fade-in | Page load | 0.6s |
| **Feature Pills** | Slide-in from left | Page load | 0.6s (staggered) |
| **Service Cards** | Fade + slide-in | Scroll to section | 0.7s (staggered) |
| **Tire Marks** | Fade-out + translate | Scroll Services section | 2s (continuous) |
| **Map** | Fade-in + glow pulse | Scroll to map | 0.8s → repeat |
| **Carousel** | Fade + slide | Drag/click | 0.5s |
| **CTA** | Fade + scale on scroll | Scroll to CTA | 0.6s |
| **Button (WhatsApp)** | Pulse + glow hover | Scroll/hover | 0.3s |

### 4.3 Performance Optimization

- **Batching:** Group animations with `gsap.context()` to avoid layout thrashing
- **will-change:** Add to elements that animate frequently
- **GPU Layers:** Use `translateZ(0)` for expensive animations
- **Mobile:** Reduce animation complexity, use `prefers-reduced-motion` media query

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## 5. SEO Optimization

### 5.1 Files to Create/Modify

| File | Purpose |
|------|---------|
| `robots.txt` | Search engine crawl instructions |
| `sitemap.xml` | URL index for search engines |
| `index.html` | Meta tags, schema.org, OG tags |
| `.htaccess` or `_redirects` | Redirect rules (if needed) |

### 5.2 robots.txt

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /private

Sitemap: https://josevinicius-guincho.com/sitemap.xml
```

### 5.3 sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://josevinicius-guincho.com/</loc>
    <lastmod>2026-08-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 5.4 Meta Tags (HTML Head)

```html
<!-- SEO Meta Tags -->
<meta name="description" content="Resgate expresso 24h em Osasco, Taboão da Serra e Cotia. Guincho seguro, pagamento facilitado, resposta rápida.">
<meta name="keywords" content="guincho, reboque, tow truck, São Paulo, Osasco, Taboão da Serra, Cotia">
<meta name="author" content="José Vinícius Guincho">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#E51A1A">

<!-- Open Graph (Social Media) -->
<meta property="og:type" content="website">
<meta property="og:title" content="José Vinícius Guincho - Resgate Expresso 24h">
<meta property="og:description" content="Guincho seguro e rápido em São Paulo">
<meta property="og:image" content="https://josevinicius-guincho.com/public/og-image.png">
<meta property="og:url" content="https://josevinicius-guincho.com/">

<!-- Schema.org (LocalBusiness) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "José Vinícius Guincho",
  "image": "https://josevinicius-guincho.com/public/logo.png",
  "description": "Serviço de guincho e reboque 24h em São Paulo",
  "telephone": "+5511997728-2725",
  "areaServed": ["Osasco", "Taboão da Serra", "Cotia", "São Paulo"],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BR",
    "addressRegion": "SP"
  },
  "url": "https://josevinicius-guincho.com/",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  }
}
</script>

<!-- Canonical URL -->
<link rel="canonical" href="https://josevinicius-guincho.com/">
```

### 5.5 Additional SEO Best Practices

- **Image Optimization:** Use WebP with JPEG fallback, add `alt` text
- **Mobile Performance:** Test with Google PageSpeed Insights
- **Core Web Vitals:** LCP, FID, CLS optimization
- **Internal Linking:** Link to different sections using anchor links
- **Mobile-Friendly:** Responsive design, touch-friendly buttons
- **Load Time:** <3s target (video should be lazy-loaded below fold)

---

## 6. Media Assets

### 6.1 Video Processing

**Current:** `public/video-reboque.mp4` (has watermark)

**Process:**
1. Upload to https://videowatermarkremove.com
2. Remove watermark and background if possible
3. Download processed video
4. Optimize with FFmpeg:
   ```bash
   ffmpeg -i video-reboque.mp4 \
     -vf "scale=1080:1920" \
     -c:v libx264 \
     -preset fast \
     -crf 23 \
     -b:v 6000k \
     -c:a aac \
     -b:a 128k \
     hero-reboque-optimized.mp4
   ```
5. Verify file size <10MB, test on mobile devices

### 6.2 Images

- **Logo:** `public/logo.png` (already exists, 40×40px for nav)
- **Mapa Brasil:** `public/mapa-brasil.gif` (use for Services section)
- **OG Image:** Create 1200×630px version for social media
- **Carousel Photos:** Optimize all WhatsApp photos (compress, resize to max 800px width)
- **Poster Image:** Static fallback for video (use high-quality screenshot)

### 6.3 SVG Icons

- **Service Icons:** 4 custom SVGs (already in code)
- **Tire Marks:** Custom SVG path for tire mark animation
- All SVGs should be optimized (remove excess metadata)

---

## 7. Responsive Design Breakpoints

```css
/* Mobile-first approach */
$mobile: 320px;      /* min */
$tablet: 768px;      /* medium devices */
$desktop: 1024px;    /* large devices */
$wide: 1440px;       /* ultra-wide */
```

**Key Responsive Changes:**
- **Mobile:** Full-width, stacked layout, reduced animations, smaller fonts
- **Tablet:** 2-column grids where appropriate
- **Desktop:** Full 2-3 column layouts, enhanced animations
- **Wide:** Max-width containers (1400px) with centered content

---

## 8. Implementation Sequence

### Phase 1: Setup & Tooling
1. Install GSAP skills: `npx skills add https://github.com/greensock/gsap-skills`
2. Install GSAP npm: `npm install gsap`
3. Register GSAP plugins in main script
4. Setup directory structure (if needed)

### Phase 2: Core Markup & Styling
1. Update HTML with final structure (confirm all sections)
2. Refactor CSS (maintain current color palette, improve responsive)
3. Optimize images & video
4. Setup SEO files (robots.txt, sitemap.xml, meta tags)

### Phase 3: GSAP Animations (Section by Section)
1. Nav animation (scroll background)
2. Hero section (title reveal, feature pills, video fade-in)
3. Services cards (scroll reveal)
4. **Tire mark animation** (complex, needs careful implementation)
5. Carousel (Draggable or Swiper)
6. CTA section animations
7. About/Footer minimal animations

### Phase 4: Testing & Optimization
1. Mobile device testing (real devices, not just browser)
2. Performance profiling (60 FPS target)
3. Cross-browser testing
4. SEO validation (Google Search Console)
5. Video optimization & watermark removal
6. Accessibility audit (a11y)

### Phase 5: Deployment
1. Final QA
2. Deploy to staging
3. User review & feedback
4. Deploy to production

---

## 9. File Structure

```
jose-vinicius-guincho/
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-08-18-guincho-landing-redesign.md (this file)
├── public/
│   ├── images/
│   │   ├── logo_hd.png
│   │   ├── mapa-brasil.gif
│   │   ├── hero-reboque-optimized.mp4 (NEW)
│   │   ├── carousel-foto-1.jpg (multiple)
│   │   └── og-image.png (NEW)
│   └── ...
├── index.html
├── style.css
├── script.js
├── robots.txt (NEW)
├── sitemap.xml (NEW)
├── package.json
└── node_modules/

```

---

## 10. Known Constraints & Decisions

| Constraint | Decision | Rationale |
|---|---|---|
| **No watermark remover local** | Use web service | VideoWatermarkRemove-AI repo is placeholder only |
| **Video size** | <10MB | Mobile devices, 4G networks |
| **No depoimentos** | User preference | Keep focus on services, not testimonials |
| **No form** | WhatsApp links only | Simpler UX, matches user preference |
| **Tire marks** | Diagonal ↙ + fade out | More dynamic than static, fits mobile scroll |
| **GSAP over Intersection Observer** | Full refactor | Better control, performance, features |

---

## 11. Success Criteria

- ✓ All animations smooth (60 FPS on mobile)
- ✓ Video <10MB, watermark removed, plays on mobile
- ✓ SEO files created (robots.txt, sitemap.xml, schema.org)
- ✓ Tire mark animation working on Services section + button
- ✓ Carousel responsive (touch + desktop)
- ✓ Nav sticky with scroll animation
- ✓ Mobile performance score >90 (PageSpeed Insights)
- ✓ All links functional (WhatsApp, sections)
- ✓ Accessibility standards met (WCAG 2.1 AA)

---

## 12. Dependencies

```json
{
  "dependencies": {
    "gsap": "^3.12.2"
  },
  "devDependencies": {
    "ffmpeg": "for video optimization"
  }
}
```

**Optional (if using Swiper carousel):**
```json
{
  "swiper": "^11.0.0"
}
```

---

## 13. Timeline Estimate

| Phase | Effort | Duration |
|-------|--------|----------|
| Phase 1 (Setup) | Low | 30 min |
| Phase 2 (Markup/CSS) | Medium | 2-3 hours |
| Phase 3 (Animations) | High | 4-6 hours (tire marks = 2h) |
| Phase 4 (Testing) | Medium | 2-3 hours |
| Phase 5 (Deployment) | Low | 1 hour |
| **TOTAL** | | **10-14 hours** |

---

## Next Steps

1. ✅ User reviews and approves this spec
2. ➡️ Invoke `writing-plans` skill to create detailed implementation plan
3. ➡️ Begin implementation (Phase 1)

---

**Document Status:** Ready for User Review  
**Last Updated:** 2026-08-18 13:45 GMT-3  
**Author:** Claude Code (Brainstorming Skill)
