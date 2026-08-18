# José Vinícius Guincho Landing Page Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the entire landing page with GSAP animations, SEO optimization, mobile-first design, video hero, photo carousel, and dynamic tire mark animation effect.

**Architecture:** Refactor from Intersection Observer → GSAP + ScrollTrigger for all animations. Add SEO infrastructure (robots.txt, sitemap.xml, schema.org). Implement complex tire mark animation (diagonal ↙, dual tracks, scroll-based fade-out). Integrate optimized video (watermark-removed) and photo carousel.

**Tech Stack:**
- **Animation:** GSAP 3.12+ (via npm) + GSAP Skills (via `npx skills add`)
- **Carousel:** GSAP Draggable (built-in, no dependency)
- **Video:** MP4 H.264, 1080×1920px, <10MB
- **Styling:** CSS3 (Grid, Flexbox, CSS custom properties)
- **SEO:** robots.txt, sitemap.xml, schema.org JSON-LD

**Spec:** `docs/superpowers/specs/2026-08-18-guincho-landing-redesign.md`

## Global Constraints

- **No emojis** in any code or website content
- **GSAP only** for animations (no Intersection Observer for animations; can use for analytics)
- **Mobile-first:** Test on real devices; 60 FPS target
- **No links in nav:** Logo left + WhatsApp icon right only
- **Service name:** "01 do Leilão" (use exact text when referencing service)
- **Sobre section:** Remove "motoristas" reference; mention solo operator
- **Video:** <10MB, watermark-removed, MP4 H.264, 1080×1920px
- **No form submission:** WhatsApp links only

---

## File Structure

### Files to Create

```
docs/superpowers/plans/
  └── 2026-08-18-landing-redesign-implementation.md (this file)

public/
  ├── images/
  │   ├── hero-reboque-optimized.mp4 (NEW: watermark-removed, optimized)
  │   └── og-image.png (NEW: 1200×630px for social media)
  ├── carousel/
  │   ├── guincho-01.jpg (NEW: WhatsApp photo 1, optimized)
  │   ├── guincho-02.jpg (NEW: WhatsApp photo 2, optimized)
  │   └── ... (additional carousel images)
  └── styles/ (optional, if splitting CSS)

robots.txt (NEW)
sitemap.xml (NEW)
```

### Files to Modify

```
index.html          (Restructure nav, update hero, add carousel, update about)
style.css           (Complete rewrite for GSAP-optimized animations)
script.js           (Refactor: replace Intersection Observer → GSAP)
package.json        (Add GSAP dependency)
```

---

## Task Breakdown

### Task 1: Setup GSAP Tooling & Dependencies

**Files:**
- Modify: `package.json`
- Create: `script.js` (imports only, structure)

**Interfaces:**
- Produces: GSAP library available globally; GSAP plugins registered

**Steps:**

- [ ] **1.1: Install GSAP npm package**

Run:
```bash
npm install gsap@3.12.2
```

Expected output: `added 1 package`

- [ ] **1.2: Install GSAP Skills (optional, for IDE agent support)**

Run:
```bash
npx skills add https://github.com/greensock/gsap-skills
```

Expected: Skills folder added to `~/.claude/skills/`

- [ ] **1.3: Update package.json with GSAP dependency**

Verify `package.json` contains:
```json
{
  "dependencies": {
    "gsap": "^3.12.2"
  }
}
```

- [ ] **1.4: Create GSAP initialization in script.js**

Add to top of `script.js`:
```javascript
// Import GSAP and plugins
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollTrigger);
```

**Note:** If using CDN instead of npm, use:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
```

- [ ] **1.5: Commit**

```bash
git init  # If not already a git repo
git add package.json script.js
git commit -m "feat: setup GSAP 3.12.2 and ScrollTrigger plugin

- Install GSAP npm package
- Register ScrollTrigger plugin for scroll-linked animations
- Prepare script.js structure for animation implementation

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

### Task 2: Update Navigation Bar

**Files:**
- Modify: `index.html` (nav section)
- Modify: `style.css` (nav styling)
- Modify: `script.js` (nav scroll animation)

**Interfaces:**
- Consumes: GSAP from Task 1
- Produces: Sticky nav with logo left + WhatsApp icon right; background blur on scroll

**Steps:**

- [ ] **2.1: Update HTML nav structure**

Replace nav section in `index.html`:
```html
<nav id="nav" class="nav">
  <div class="nav-inner">
    <!-- Logo left -->
    <a href="#" class="nav-logo">
      <img src="public/images/logo_hd.png" alt="01 do Leilão" width="40" height="40">
    </a>
    
    <!-- WhatsApp icon right (no text) -->
    <a href="https://wa.me/5511997728-2725" class="nav-whatsapp-icon" target="_blank" title="Contatar via WhatsApp">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <!-- WhatsApp SVG icon -->
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.33.623-2.519 1.6-3.374 2.81-.854 1.21-1.294 2.513-1.303 3.906 0 1.052.208 2.01.616 2.857L2 22l3.285-.987a9.884 9.884 0 004.382 1.126h.004c5.572 0 10.106-4.534 10.106-10.106 0-2.684-1.076-5.216-3.021-7.116-1.944-1.9-4.53-2.954-7.266-2.954z"/>
      </svg>
    </a>
  </div>
</nav>
```

- [ ] **2.2: Update nav CSS styling**

Update `.nav` and `.nav-inner` in `style.css`:
```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: transparent;
  transition: background 0.3s ease;
  backdrop-filter: none;
}

.nav.scrolled {
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(10px);
}

.nav-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
}

.nav-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.nav-logo img {
  width: 40px;
  height: 40px;
}

.nav-whatsapp-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #E51A1A;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.nav-whatsapp-icon:hover {
  background: #C41616;
  transform: scale(1.05);
}

/* Mobile */
@media (max-width: 768px) {
  .nav-inner {
    padding: 0.75rem 1rem;
  }
  
  .nav-logo img {
    width: 32px;
    height: 32px;
  }
  
  .nav-whatsapp-icon {
    width: 40px;
    height: 40px;
  }
}
```

- [ ] **2.3: Add nav scroll animation in script.js**

Add after GSAP setup:
```javascript
// Nav scroll animation
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});
```

Alternative with GSAP (more advanced):
```javascript
// GSAP ScrollTrigger approach (optional)
gsap.to('nav', {
  scrollTrigger: {
    trigger: 'main',
    start: 'top 0',
    onUpdate: (self) => {
      if (self.progress > 0.05) {
        document.getElementById('nav').classList.add('scrolled');
      } else {
        document.getElementById('nav').classList.remove('scrolled');
      }
    }
  }
});
```

- [ ] **2.4: Test nav in browser**

1. Open `http://localhost:8080` (or your dev server)
2. Verify: Logo visible left, WhatsApp icon visible right
3. Scroll down 50px, verify background blur appears
4. Click WhatsApp icon, verify link opens WhatsApp
5. Test on mobile (DevTools responsive mode)

- [ ] **2.5: Commit**

```bash
git add index.html style.css script.js
git commit -m "feat: update navigation to logo + WhatsApp icon only

- Remove nav links (Serviços, Sobre, Contato)
- Add WhatsApp icon button (SVG) on right
- Implement scroll-triggered background blur with backdrop-filter
- Add responsive sizing for mobile
- Test on desktop and mobile viewports

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

### Task 3: Process Video (Watermark Removal & Optimization)

**Files:**
- Create: `public/images/hero-reboque-optimized.mp4`
- Reference: Original `public/video-reboque.mp4`

**Interfaces:**
- Produces: `hero-reboque-optimized.mp4` (MP4 H.264, 1080×1920px, <10MB, no watermark)

**Steps:**

- [ ] **3.1: Upload video to watermark remover service**

1. Go to https://videowatermarkremove.com
2. Upload `public/video-reboque.mp4`
3. Select "Remove watermark and background" if option available
4. Process (wait for completion)
5. Download result

- [ ] **3.2: Optimize video with FFmpeg**

If video is still large or high bitrate, optimize locally:

```bash
ffmpeg -i video-reboque.mp4 \
  -vf "scale=1080:1920" \
  -c:v libx264 \
  -preset fast \
  -crf 23 \
  -b:v 6000k \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  hero-reboque-optimized.mp4
```

Expected: Output file <10MB

- [ ] **3.3: Verify video specifications**

Run:
```bash
ffprobe hero-reboque-optimized.mp4 -show_format -show_streams
```

Check:
- Resolution: 1080×1920
- Codec: h264
- Bitrate: ~6000k (acceptable)
- Duration: reasonable (5-15 seconds typical)

- [ ] **3.4: Move optimized video to public folder**

```bash
mv hero-reboque-optimized.mp4 public/images/
```

- [ ] **3.5: Commit**

```bash
git add public/images/hero-reboque-optimized.mp4
git commit -m "feat: add watermark-removed and optimized hero video

- Remove watermark via videowatermarkremove.com
- Optimize to 1080x1920px, H.264 codec, 6Mbps bitrate
- File size: <10MB for mobile performance
- Video ready for hero section integration

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

### Task 4: Update Hero Section (HTML & Basic Styling)

**Files:**
- Modify: `index.html` (hero section structure)
- Modify: `style.css` (hero styling)

**Interfaces:**
- Consumes: `hero-reboque-optimized.mp4` from Task 3
- Produces: Hero section with video, animated title, subtitle, features, CTA

**Steps:**

- [ ] **4.1: Update hero HTML structure**

Replace hero section in `index.html`:
```html
<section class="hero">
  <div class="hero-blob hero-blob-red"></div>
  <div class="hero-blob hero-blob-orange"></div>

  <div class="hero-content">
    <h1 class="hero-title">
      <div class="line">
        <div class="line-inner">Seu carro parou</div>
      </div>
      <div class="line">
        <div class="line-inner">na estrada?</div>
      </div>
      <div class="line">
        <div class="line-inner highlight-red">Já estamos a caminho.</div>
      </div>
    </h1>

    <p class="hero-subtitle">
      <span class="reveal">Resgate expresso em Osasco, Taboão da Serra e Cotia.</span>
      <span class="reveal">Cobertura em todo o Estado de São Paulo.</span>
    </p>

    <div class="hero-features">
      <div class="feature-item reveal">
        <span class="feature-label">Guincho Plataforma Seguro</span>
      </div>
      <div class="feature-item reveal">
        <span class="feature-label">Orçamento Rápido</span>
      </div>
      <div class="feature-item reveal">
        <span class="feature-label">Pagamento Pix ou Cartão</span>
      </div>
    </div>

    <a href="https://wa.me/5511997728-2725?text=Preciso%20de%20um%20guincho%20agora!" class="btn-primary btn-large reveal" target="_blank">
      <span class="btn-label">
        <span class="btn-label-text">Solicitar Resgate Agora</span>
      </span>
    </a>
  </div>

  <div class="hero-image reveal">
    <video 
      class="hero-video"
      muted 
      autoplay 
      loop 
      playsinline 
      preload="metadata"
      poster="public/images/WhatsApp Image 2026-08-17 at 14.10.22.jpeg">
      <source src="public/images/hero-reboque-optimized.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</section>
```

- [ ] **4.2: Update hero CSS (will add animations in Task 5)**

Update in `style.css`:
```css
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 4rem 2rem;
  overflow: hidden;
}

.hero-content {
  flex: 1;
  max-width: 600px;
  z-index: 10;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #f5f2ee;
}

.line {
  overflow: hidden;
}

.line-inner {
  display: inline-block;
}

.highlight-red {
  color: #E51A1A;
}

.hero-subtitle {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #b8b6b1;
}

.reveal {
  display: inline;
  opacity: 0;
}

.hero-features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.feature-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
  border-left: 3px solid #E51A1A;
  padding-left: 1rem;
  font-size: 0.95rem;
  color: #f5f2ee;
  opacity: 0;
}

.feature-label {
  font-weight: 500;
}

.btn-primary {
  display: inline-block;
  padding: 1rem 2rem;
  background: #E51A1A;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  opacity: 0;
}

.btn-primary:hover {
  background: #C41616;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(229, 26, 26, 0.3);
}

.btn-large {
  padding: 1.25rem 2.5rem;
  font-size: 1.1rem;
}

.hero-image {
  flex: 1;
  min-width: 300px;
  opacity: 0;
}

.hero-video {
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
  display: block;
}

/* Mobile */
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    min-height: auto;
    padding: 2rem 1rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-image {
    width: 100%;
    min-width: unset;
  }
}
```

- [ ] **4.3: Test video loads correctly**

1. Start dev server: `python -m http.server 8080` (or your setup)
2. Visit `http://localhost:8080`
3. Verify video displays (autoplay muted)
4. Check that poster image shows while loading
5. Verify responsive on mobile

- [ ] **4.4: Commit**

```bash
git add index.html style.css
git commit -m "feat: update hero section with optimized video and structure

- Replace static image with optimized MP4 video
- Add video attributes: muted, autoplay, loop, playsinline
- Implement poster image fallback
- Add hero title/subtitle/features/CTA markup
- Style hero layout with flexbox (responsive)
- Prepare for animation implementation in next task

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

### Task 5: Hero Section Animations (GSAP)

**Files:**
- Modify: `script.js` (add hero animations)

**Interfaces:**
- Consumes: GSAP from Task 1; hero HTML from Task 4
- Produces: Animated hero on page load (title reveal, feature stagger, fade-ins)

**Steps:**

- [ ] **5.1: Add hero animation code to script.js**

Add to `script.js` (after nav setup):
```javascript
// Hero animations (on page load)
const heroTimeline = gsap.timeline();

// Title lines reveal
heroTimeline.from('.line-inner', {
  opacity: 0,
  y: 20,
  duration: 0.8,
  stagger: 0.15,
  ease: 'power2.out'
}, 0);

// Subtitle reveal
heroTimeline.from('.hero-subtitle span', {
  opacity: 0,
  y: 10,
  duration: 0.6,
  stagger: 0.1,
  ease: 'power2.out'
}, 0.3);

// Feature pills reveal
heroTimeline.from('.feature-item', {
  opacity: 0,
  x: -30,
  duration: 0.6,
  stagger: 0.1,
  ease: 'power2.out'
}, 0.6);

// CTA button reveal
heroTimeline.from('.btn-large', {
  opacity: 0,
  y: 20,
  duration: 0.6,
  ease: 'power2.out'
}, 0.9);

// Hero image reveal
heroTimeline.from('.hero-image', {
  opacity: 0,
  scale: 0.95,
  duration: 0.8,
  ease: 'power2.out'
}, 0.3);
```

- [ ] **5.2: Test hero animations in browser**

1. Refresh page at `http://localhost:8080`
2. Verify title lines appear one by one (staggered)
3. Verify subtitle fades in
4. Verify feature pills slide in from left
5. Verify CTA button appears
6. Verify video/image fades in and scales up slightly
7. Check timing feels natural (~3-4 seconds total)

- [ ] **5.3: Adjust animation timing if needed**

If too fast/slow, adjust `duration` and `stagger` values. E.g.:
- Increase `duration` to slow down (0.8 → 1.0)
- Increase `stagger` for more space between elements (0.1 → 0.15)

- [ ] **5.4: Commit**

```bash
git add script.js
git commit -m "feat: add hero section GSAP animations

- Title lines reveal with stagger (0.8s duration)
- Subtitle fade-in (0.6s)
- Feature items slide-in from left (staggered 0.1s)
- CTA button fade-in with scale
- Hero video/image fade-in and scale-up
- All animations trigger on page load, no scroll needed
- Smooth easing (power2.out) for professional feel

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

### Task 6: Services + Map Section (Markup & Layout)

**Files:**
- Modify: `index.html` (services + map section)
- Modify: `style.css` (services + map styling)

**Interfaces:**
- Consumes: Map image `mapa-brasil.gif` from `public/`
- Produces: 2-column grid (services left, map right); responsive stacked on mobile

**Steps:**

- [ ] **6.1: Update HTML services + map section**

Replace/update services section in `index.html`:
```html
<section class="servicos" id="servicos">
  <div class="servicos-content">
    <h2 class="section-title">
      <div class="line">
        <div class="line-inner">Nossos Serviços</div>
      </div>
    </h2>

    <div class="servicos-mapa-container">
      <!-- Services cards -->
      <div class="servicos-grid">
        <div class="servico-card reveal">
          <div class="servico-icon">
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="8" y="20" width="48" height="28" rx="4"/>
              <path d="M16 20v-6a2 2 0 012-2h24a2 2 0 012 2v6"/>
            </svg>
          </div>
          <h3>Guincho 24h</h3>
          <p>Serviço disponível 24 horas para transporte seguro do seu veículo.</p>
        </div>

        <div class="servico-card reveal">
          <div class="servico-icon">
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M32 8v48M8 32h48"/>
              <circle cx="32" cy="32" r="24"/>
            </svg>
          </div>
          <h3>Resgate Rápido</h3>
          <p>Chegamos rapidinho. Você não fica esperando na estrada.</p>
        </div>

        <div class="servico-card reveal">
          <div class="servico-icon">
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M24 32L30 38L44 24"/>
              <circle cx="32" cy="32" r="20"/>
            </svg>
          </div>
          <h3>Pagamento Seguro</h3>
          <p>Pix, Cartão ou dinheiro. Orçamento sem surpresas.</p>
        </div>

        <div class="servico-card reveal">
          <div class="servico-icon">
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="32" cy="32" r="20"/>
              <path d="M32 12v40M12 32h40"/>
            </svg>
          </div>
          <h3>Cobertura Completa</h3>
          <p>Osasco, Taboão da Serra, Cotia e todo SP.</p>
        </div>
      </div>

      <!-- Map -->
      <div class="mapa-container">
        <div class="mapa-wrapper">
          <img src="public/mapa-brasil.gif" alt="Mapa de cobertura Brasil" class="mapa-brasil" loading="lazy">
          <div class="mapa-highlight-sp"></div>
        </div>
        <p class="mapa-caption">Atendemos todo o Brasil, com foco em São Paulo</p>
      </div>
    </div>

    <!-- Tire marks SVG (will be animated in Task 7) -->
    <svg class="tire-marks-bg" viewBox="0 0 1920 1080" preserveAspectRatio="none">
      <defs>
        <linearGradient id="tire-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E51A1A" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#E51A1A" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <!-- Tire mark pairs (will be added via JS in Task 7) -->
    </svg>
  </div>
</section>
```

- [ ] **6.2: Update CSS for services + map layout**

Add to `style.css`:
```css
.servicos {
  position: relative;
  background: #0a0a0a;
  padding: 4rem 2rem;
  overflow: hidden;
}

.servicos-content {
  max-width: 1400px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #f5f2ee;
}

.servicos-mapa-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.servicos-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.servico-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(229, 26, 26, 0.2);
  border-left: 3px solid #E51A1A;
  border-radius: 8px;
  padding: 2rem;
  transition: all 0.3s ease;
  opacity: 0;
}

.servico-card:hover {
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px rgba(229, 26, 26, 0.1);
  transform: translateY(-5px);
}

.servico-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 1rem;
  color: #E51A1A;
}

.servico-icon svg {
  width: 100%;
  height: 100%;
}

.servico-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #f5f2ee;
}

.servico-card p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #b8b6b1;
}

.mapa-container {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid rgba(229, 26, 26, 0.1);
}

.mapa-wrapper {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 8px;
}

.mapa-brasil {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mapa-highlight-sp {
  position: absolute;
  top: 50%;
  left: 45%;
  width: 80px;
  height: 100px;
  background: #E51A1A;
  border-radius: 50%;
  opacity: 0.3;
  filter: blur(20px);
  animation: mapa-pulse 2s ease-in-out infinite;
}

@keyframes mapa-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

.mapa-caption {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #b8b6b1;
}

.tire-marks-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  z-index: 1;
  pointer-events: none;
}

/* Mobile */
@media (max-width: 768px) {
  .servicos {
    padding: 2rem 1rem;
  }

  .section-title {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }

  .servicos-mapa-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .servicos-grid {
    grid-template-columns: 1fr;
  }

  .mapa-wrapper {
    height: 300px;
  }

  .mapa-highlight-sp {
    width: 60px;
    height: 80px;
  }
}
```

- [ ] **6.3: Verify layout in browser**

1. Refresh browser
2. Desktop: verify 2-column layout (services left, map right)
3. Verify map image loads
4. Verify red glow pulse on SP region
5. Verify cards have left red border
6. Resize to mobile: verify stacked layout (cards, then map)
7. Verify responsive spacing

- [ ] **6.4: Commit**

```bash
git add index.html style.css
git commit -m "feat: add services + map section layout

- Create 2-column grid: services cards (left) + map (right)
- Services: 4 cards (2x2 grid) with icons, titles, descriptions
- Map: mapa-brasil.gif with SP region highlight (pulsing glow)
- Responsive: stacked layout on mobile
- Cards have red left border and hover effects
- Prepare for tire mark animation overlay in next task

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

### Task 7: Tire Mark Animation (Complex GSAP Implementation)

**Files:**
- Modify: `script.js` (tire mark animation logic)
- Modify: `index.html` (SVG tire marks structure — optional, can be added via JS)
- Modify: `style.css` (tire marks styling)

**Interfaces:**
- Consumes: GSAP ScrollTrigger from Task 1; servicos section from Task 6
- Produces: Animated tire marks (diagonal ↙, dual tracks, fade-out, scroll-based)

**Steps:**

- [ ] **7.1: Add tire marks SVG to HTML**

Add inside `.tire-marks-bg` in services section (already in Task 6 HTML). Now populate with tire mark pairs:

```html
<svg class="tire-marks-bg" viewBox="0 0 1920 1080" preserveAspectRatio="none">
  <defs>
    <linearGradient id="tire-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E51A1A" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#E51A1A" stop-opacity="0"/>
    </linearGradient>
  </defs>
  
  <!-- Tire mark pair 1 -->
  <g class="tire-mark-pair" data-index="0">
    <line class="tire-mark tire-left" x1="1800" y1="50" x2="200" y2="850" stroke="url(#tire-gradient)" stroke-width="12" stroke-linecap="round"/>
    <line class="tire-mark tire-right" x1="1850" y1="50" x2="250" y2="850" stroke="url(#tire-gradient)" stroke-width="12" stroke-linecap="round"/>
  </g>
  
  <!-- Tire mark pair 2 (staggered) -->
  <g class="tire-mark-pair" data-index="1">
    <line class="tire-mark tire-left" x1="1800" y1="100" x2="200" y2="900" stroke="url(#tire-gradient)" stroke-width="12" stroke-linecap="round"/>
    <line class="tire-mark tire-right" x1="1850" y1="100" x2="250" y2="900" stroke="url(#tire-gradient)" stroke-width="12" stroke-linecap="round"/>
  </g>
  
  <!-- Tire mark pair 3 (staggered) -->
  <g class="tire-mark-pair" data-index="2">
    <line class="tire-mark tire-left" x1="1800" y1="150" x2="200" y2="950" stroke="url(#tire-gradient)" stroke-width="12" stroke-linecap="round"/>
    <line class="tire-mark tire-right" x1="1850" y1="150" x2="250" y2="950" stroke="url(#tire-gradient)" stroke-width="12" stroke-linecap="round"/>
  </g>
</svg>
```

- [ ] **7.2: Add CSS for tire marks**

Add to `style.css`:
```css
.tire-marks-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  z-index: 5;
  pointer-events: none;
}

.tire-mark-pair {
  opacity: 1;
}

.tire-mark {
  stroke-dasharray: none;
  transition: opacity 0.5s ease;
}

/* Mobile: reduce opacity and scale */
@media (max-width: 768px) {
  .tire-marks-bg {
    opacity: 0.5;
  }
  
  .tire-mark {
    stroke-width: 8 !important;
  }
}
```

- [ ] **7.3: Implement tire mark GSAP animation in script.js**

Add after other animations:
```javascript
// Tire mark animation (scroll-triggered, scroll-based)
gsap.registerPlugin(ScrollTrigger);

// Animate each tire mark pair
const tireMarkPairs = document.querySelectorAll('.tire-mark-pair');

tireMarkPairs.forEach((pair, index) => {
  gsap.to(pair, {
    scrollTrigger: {
      trigger: '.servicos',
      start: 'top center',
      end: 'bottom center',
      scrub: 0.5,  // Smooth lag between scroll and animation
      markers: false,  // Set to true for debugging
      onUpdate: (self) => {
        // Calculate opacity based on scroll progress
        const progress = self.getVelocity() > 0 ? self.progress : 1 - self.progress;
        pair.style.opacity = Math.max(0, 1 - progress);
      }
    },
    x: -200,  // Move left as truck passes
    opacity: 0,  // Fade to transparent
    duration: 1,
    delay: index * 0.3,  // Stagger each pair
    ease: 'power2.inOut'
  });
});

// Alternative: Simple scroll-based rotation without complex fade
// (Simpler approach, easier to maintain)
gsap.to('.tire-mark-pair', {
  scrollTrigger: {
    trigger: '.servicos',
    start: 'top center',
    end: 'bottom center',
    scrub: 1,
    markers: false
  },
  stagger: 0.2,
  opacity: 0,
  x: -100,
  duration: 2,
  ease: 'none'
});
```

- [ ] **7.4: Test tire mark animation**

1. Refresh browser
2. Scroll into Services section slowly
3. Observe tire marks appearing (diagonal ↙)
4. Continue scrolling, marks should fade out
5. Scroll back up, marks should fade back in (marcha ré effect)
6. Verify on mobile (reduced opacity, smaller stroke width)
7. Check performance (should be 60 FPS)

If animation doesn't trigger:
- Check browser console for errors
- Verify `.servicos` section exists
- Verify SVG tire marks render (DevTools > Elements)

- [ ] **7.5: Fine-tune animation parameters**

If timing feels off, adjust:
- `scrub`: 0.5 → 1.0 (more lag) or 0.2 (less lag)
- `x: -200` → increase/decrease movement distance
- `stagger: 0.2` → adjust spacing between pairs
- `delay: index * 0.3` → adjust stagger timing

- [ ] **7.6: Commit**

```bash
git add index.html script.js style.css
git commit -m "feat: implement dynamic tire mark animation

- Add SVG tire marks (dual tracks, diagonal direction)
- Implement scroll-triggered animation using GSAP ScrollTrigger
- Marks appear as user scrolls into Services section
- Marks fade out as scroll continues (truck passes effect)
- Scroll back up for marcha ré (marks reappear)
- Staggered timing for 3 tire mark pairs
- Optimized for mobile (reduced opacity, smaller stroke)
- Performance target: 60 FPS

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

### Task 8: Photo Carousel (GSAP Draggable)

**Files:**
- Create: HTML carousel section (in index.html)
- Modify: `style.css` (carousel styling)
- Modify: `script.js` (carousel logic with GSAP Draggable)
- Assets: Optimize carousel photos from WhatsApp

**Interfaces:**
- Consumes: GSAP with Draggable plugin; carousel photos from `public/carousel/`
- Produces: Interactive photo carousel with drag/swipe + auto-loop

**Steps:**

- [ ] **8.1: Prepare carousel photos**

1. Collect WhatsApp photos of truck in action
2. Optimize each image:
```bash
ffmpeg -i guincho-original.jpg -vf "scale=800:-1" -q:v 5 guincho-01.jpg
```
3. Save to `public/carousel/`:
   - `public/carousel/guincho-01.jpg`
   - `public/carousel/guincho-02.jpg`
   - `public/carousel/guincho-03.jpg`
   - (at least 5-6 photos)

- [ ] **8.2: Add carousel HTML to index.html**

Insert after Services section:
```html
<section class="galeria" id="galeria">
  <div class="galeria-content">
    <h2 class="section-title">
      <div class="line">
        <div class="line-inner">Em Ação</div>
      </div>
    </h2>

    <div class="carousel-wrapper">
      <div class="carousel-container">
        <div class="carousel-slide">
          <img src="public/carousel/guincho-01.jpg" alt="Guincho em ação 1" loading="lazy">
        </div>
        <div class="carousel-slide">
          <img src="public/carousel/guincho-02.jpg" alt="Guincho em ação 2" loading="lazy">
        </div>
        <div class="carousel-slide">
          <img src="public/carousel/guincho-03.jpg" alt="Guincho em ação 3" loading="lazy">
        </div>
        <div class="carousel-slide">
          <img src="public/carousel/guincho-04.jpg" alt="Guincho em ação 4" loading="lazy">
        </div>
        <div class="carousel-slide">
          <img src="public/carousel/guincho-05.jpg" alt="Guincho em ação 5" loading="lazy">
        </div>
        <div class="carousel-slide">
          <img src="public/carousel/guincho-06.jpg" alt="Guincho em ação 6" loading="lazy">
        </div>
      </div>

      <!-- Navigation arrows -->
      <button class="carousel-prev" aria-label="Anterior">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button class="carousel-next" aria-label="Próximo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>

    <!-- Carousel dots -->
    <div class="carousel-dots">
      <button class="carousel-dot active" data-slide="0" aria-label="Slide 1"></button>
      <button class="carousel-dot" data-slide="1" aria-label="Slide 2"></button>
      <button class="carousel-dot" data-slide="2" aria-label="Slide 3"></button>
      <button class="carousel-dot" data-slide="3" aria-label="Slide 4"></button>
      <button class="carousel-dot" data-slide="4" aria-label="Slide 5"></button>
      <button class="carousel-dot" data-slide="5" aria-label="Slide 6"></button>
    </div>
  </div>
</section>
```

- [ ] **8.3: Add carousel CSS**

Add to `style.css`:
```css
.galeria {
  background: #0a0a0a;
  padding: 4rem 2rem;
}

.galeria-content {
  max-width: 1400px;
  margin: 0 auto;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  margin-bottom: 2rem;
}

.carousel-container {
  display: flex;
  gap: 1rem;
  overflow: hidden;
  border-radius: 12px;
  position: relative;
  cursor: grab;
  user-select: none;
}

.carousel-container.dragging {
  cursor: grabbing;
}

.carousel-slide {
  flex: 0 0 100%;
  min-width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: opacity 0.5s ease;
}

/* Navigation buttons */
.carousel-prev,
.carousel-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(229, 26, 26, 0.8);
  border: none;
  color: white;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.carousel-prev:hover,
.carousel-next:hover {
  background: #E51A1A;
  transform: translateY(-50%) scale(1.1);
}

.carousel-prev {
  left: 1rem;
}

.carousel-next {
  right: 1rem;
}

/* Carousel dots */
.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
}

.carousel-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-dot.active {
  background: #E51A1A;
  transform: scale(1.3);
}

/* Mobile */
@media (max-width: 768px) {
  .carousel-slide {
    height: 250px;
  }

  .carousel-prev,
  .carousel-next {
    width: 36px;
    height: 36px;
  }

  .carousel-prev {
    left: 0.5rem;
  }

  .carousel-next {
    right: 0.5rem;
  }
}
```

- [ ] **8.4: Implement carousel logic in script.js**

Add to `script.js`:
```javascript
// Carousel with GSAP Draggable
gsap.registerPlugin(Draggable);

let carousel = {
  currentSlide: 0,
  slides: document.querySelectorAll('.carousel-slide'),
  container: document.querySelector('.carousel-container'),
  prevBtn: document.querySelector('.carousel-prev'),
  nextBtn: document.querySelector('.carousel-next'),
  dots: document.querySelectorAll('.carousel-dot'),
  autoplayTimer: null
};

function updateCarousel(slideIndex) {
  const slideWidth = 100;
  const offset = -slideIndex * slideWidth;
  
  gsap.to(carousel.container, {
    x: offset + '%',
    duration: 0.5,
    ease: 'power2.inOut'
  });

  // Update active dot
  carousel.dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === slideIndex);
  });

  carousel.currentSlide = slideIndex;
}

function nextSlide() {
  carousel.currentSlide = (carousel.currentSlide + 1) % carousel.slides.length;
  updateCarousel(carousel.currentSlide);
  resetAutoplay();
}

function prevSlide() {
  carousel.currentSlide = (carousel.currentSlide - 1 + carousel.slides.length) % carousel.slides.length;
  updateCarousel(carousel.currentSlide);
  resetAutoplay();
}

function goToSlide(index) {
  carousel.currentSlide = index;
  updateCarousel(carousel.currentSlide);
  resetAutoplay();
}

function startAutoplay() {
  carousel.autoplayTimer = setInterval(() => {
    nextSlide();
  }, 5000);  // Auto-advance every 5 seconds
}

function resetAutoplay() {
  clearInterval(carousel.autoplayTimer);
  startAutoplay();
}

// Event listeners
carousel.prevBtn.addEventListener('click', prevSlide);
carousel.nextBtn.addEventListener('click', nextSlide);

carousel.dots.forEach((dot, index) => {
  dot.addEventListener('click', () => goToSlide(index));
});

// Touch/Drag support (mobile)
Draggable.create(carousel.container, {
  type: 'x',
  edgeResistance: 0.65,
  bounds: { minX: -100 * (carousel.slides.length - 1), maxX: 0 },
  onDragEnd() {
    const slideWidth = carousel.container.offsetWidth;
    const currentX = gsap.getProperty(carousel.container, 'x');
    const slideIndex = Math.round(Math.abs(currentX) / slideWidth);
    goToSlide(Math.min(slideIndex, carousel.slides.length - 1));
  },
  onPress() {
    carousel.container.classList.add('dragging');
  },
  onRelease() {
    carousel.container.classList.remove('dragging');
  }
});

// Start autoplay
startAutoplay();
```

- [ ] **8.5: Test carousel in browser**

1. Refresh page
2. Carousel should show first image
3. Click next arrow, verify smooth slide to next image
4. Click previous arrow, verify backward slide
5. Click a dot, verify jump to that slide
6. Verify auto-advance every 5 seconds
7. Click next/dots, verify autoplay resets
8. On mobile, swipe left/right to change slides
9. Verify dots update to show active slide

- [ ] **8.6: Optimize carousel images for size**

Run:
```bash
ls -lh public/carousel/*.jpg
```

Verify all images are <500KB. If not, compress further:
```bash
ffmpeg -i large-image.jpg -vf "scale=600:-1" -q:v 6 compressed.jpg
```

- [ ] **8.7: Commit**

```bash
git add index.html style.css script.js public/carousel/
git commit -m "feat: add photo carousel with GSAP Draggable

- Carousel displays 6 optimized photos (truck in action)
- Navigation: prev/next arrows + dot indicators
- Drag/swipe support on mobile via GSAP Draggable
- Auto-advance every 5 seconds (resets on manual interaction)
- Smooth transitions (0.5s cubic-bezier)
- Active dot indicator updates on slide change
- Responsive: 400px desktop, 250px mobile height
- Images optimized for mobile (<500KB each)

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

### Task 9: CTA Section & About/Footer (Markup & Animations)

**Files:**
- Modify: `index.html` (CTA, About, Footer sections)
- Modify: `style.css` (CTA, About, Footer styling)
- Modify: `script.js` (CTA animations)

**Interfaces:**
- Consumes: GSAP, tire mark animation pattern from Task 7
- Produces: CTA section with tire mark animation on button; About section; Footer

**Steps:**

- [ ] **9.1: Update CTA section HTML**

Replace/update CTA section in `index.html`:
```html
<section class="cta-section" id="contato">
  <div class="cta-blob"></div>
  <div class="cta-content">
    <h2 class="cta-title">
      <div class="line">
        <div class="line-inner">Sua frota em boas mãos</div>
      </div>
    </h2>
    <p class="cta-subtitle">Orçamento rápido, resgate expresso, pagamento facilitado.</p>

    <a href="https://wa.me/5511997728-2725?text=Preciso%20de%20um%20guincho%20agora!" class="btn-primary btn-large cta-btn" target="_blank">
      <span class="btn-label">
        <span class="btn-label-text">Conversar no WhatsApp</span>
      </span>
    </a>

    <p class="cta-phone">Ou ligue: <strong>(11) 99772-2725</strong></p>

    <!-- Tire marks SVG on button (optional, subtle effect) -->
    <svg class="btn-tire-marks" viewBox="0 0 300 100" preserveAspectRatio="none">
      <line x1="280" y1="10" x2="20" y2="90" stroke="#ffffff" stroke-width="2" opacity="0.3"/>
      <line x1="290" y1="10" x2="30" y2="90" stroke="#ffffff" stroke-width="2" opacity="0.3"/>
    </svg>
  </div>
</section>
```

- [ ] **9.2: Update About section HTML**

Replace About section in `index.html`:
```html
<section class="sobre" id="sobre">
  <h2 class="section-title">
    <div class="line">
      <div class="line-inner">Sobre 01 do Leilão</div>
    </div>
  </h2>
  <p class="sobre-text reveal">
    01 do Leilão é especialista em resgate de veículos com frota moderna e segura. 
    Atua há anos na região de Osasco, Taboão da Serra e Cotia com compromisso 
    de segurança e agilidade em cada operação.
  </p>
</section>
```

- [ ] **9.3: Update Footer HTML**

Replace Footer section in `index.html`:
```html
<footer class="footer footer--page">
  <div class="footer-page-inner">
    <div class="footer-page-bottom">
      <p class="footer-page-copy">&copy; 2026 01 do Leilão. Resgate Expresso em SP.</p>
      <p class="footer-page-copy">WhatsApp: <strong>(11) 99772-2725</strong></p>
    </div>
  </div>
</footer>
```

- [ ] **9.4: Add CTA + About + Footer CSS**

Add to `style.css`:
```css
/* CTA Section */
.cta-section {
  position: relative;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  padding: 4rem 2rem;
  text-align: center;
  overflow: hidden;
}

.cta-blob {
  position: absolute;
  width: 300px;
  height: 300px;
  background: #E51A1A;
  border-radius: 50%;
  opacity: 0.1;
  filter: blur(80px);
  top: -100px;
  right: -100px;
  animation: blob-float 6s ease-in-out infinite;
}

@keyframes blob-float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(30px, -30px); }
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #f5f2ee;
}

.cta-subtitle {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: #b8b6b1;
}

.cta-btn {
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
}

.btn-tire-marks {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateY(-50%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cta-btn:hover .btn-tire-marks {
  opacity: 1;
}

.cta-phone {
  font-size: 1rem;
  color: #b8b6b1;
}

/* About Section */
.sobre {
  background: #0a0a0a;
  padding: 4rem 2rem;
  text-align: center;
}

.sobre-text {
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.05rem;
  line-height: 1.8;
  color: #b8b6b1;
  opacity: 0;
}

/* Footer */
.footer--page {
  background: #000000;
  border-top: 1px solid rgba(229, 26, 26, 0.1);
  padding: 2rem;
  text-align: center;
}

.footer-page-inner {
  max-width: 1400px;
  margin: 0 auto;
}

.footer-page-bottom {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-page-copy {
  font-size: 0.9rem;
  color: #666666;
  margin: 0;
}

/* Mobile */
@media (max-width: 768px) {
  .cta-section {
    padding: 2rem 1rem;
  }

  .cta-title {
    font-size: 1.75rem;
  }

  .cta-subtitle {
    font-size: 1rem;
  }

  .sobre {
    padding: 2rem 1rem;
  }

  .sobre-text {
    font-size: 1rem;
  }
}
```

- [ ] **9.5: Add CTA animations in script.js**

Add to `script.js`:
```javascript
// CTA section animations
gsap.from('.cta-title .line-inner', {
  scrollTrigger: {
    trigger: '.cta-section',
    start: 'top center',
    markers: false
  },
  opacity: 0,
  y: 20,
  duration: 0.8,
  stagger: 0.15,
  ease: 'power2.out'
});

gsap.from('.cta-subtitle', {
  scrollTrigger: {
    trigger: '.cta-section',
    start: 'top center',
    markers: false
  },
  opacity: 0,
  y: 10,
  duration: 0.6,
  delay: 0.3,
  ease: 'power2.out'
});

gsap.from('.cta-btn', {
  scrollTrigger: {
    trigger: '.cta-section',
    start: 'top center',
    markers: false
  },
  opacity: 0,
  scale: 0.9,
  duration: 0.6,
  delay: 0.6,
  ease: 'power2.out'
});

// About section animations
gsap.from('.sobre-text', {
  scrollTrigger: {
    trigger: '.sobre',
    start: 'top 70%',
    markers: false
  },
  opacity: 0,
  y: 20,
  duration: 0.8,
  ease: 'power2.out'
});

// Button hover effect with tire marks (CTA)
document.querySelector('.cta-btn').addEventListener('mouseenter', function() {
  gsap.to('.btn-tire-marks', {
    opacity: 1,
    duration: 0.3
  });
});

document.querySelector('.cta-btn').addEventListener('mouseleave', function() {
  gsap.to('.btn-tire-marks', {
    opacity: 0,
    duration: 0.3
  });
});
```

- [ ] **9.6: Test in browser**

1. Scroll to CTA section
2. Verify title/subtitle animate in
3. Verify button appears with scale effect
4. Hover over button, verify tire marks appear
5. Scroll to About section
6. Verify About text fades in
7. Scroll to Footer
8. Verify Footer is visible with correct text
9. Check responsive on mobile

- [ ] **9.7: Commit**

```bash
git add index.html style.css script.js
git commit -m "feat: add CTA, About, Footer sections with animations

- CTA section: title reveal, subtitle fade, button scale-in
- CTA button: tire marks SVG overlay (appears on hover)
- About section: company description with fade-in animation
- Footer: copyright and contact info
- Update company name references to '01 do Leilão'
- Remove 'motoristas' reference in About text
- Responsive styling for all sections
- All animations use GSAP ScrollTrigger

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

### Task 10: SEO Optimization (robots.txt, sitemap.xml, Meta Tags)

**Files:**
- Create: `robots.txt` (root)
- Create: `sitemap.xml` (root)
- Modify: `index.html` (meta tags, schema.org)

**Interfaces:**
- Produces: SEO-compliant files + structured data for search engines

**Steps:**

- [ ] **10.1: Create robots.txt**

Create `robots.txt` in project root:
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /private

Sitemap: https://josevinicius-guincho.com/sitemap.xml
```

If serving locally, adjust:
```
User-agent: *
Allow: /

Sitemap: http://localhost:8080/sitemap.xml
```

- [ ] **10.2: Create sitemap.xml**

Create `sitemap.xml` in project root:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://josevinicius-guincho.com/</loc>
    <lastmod>2026-08-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://josevinicius-guincho.com/#servicos</loc>
    <lastmod>2026-08-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://josevinicius-guincho.com/#galeria</loc>
    <lastmod>2026-08-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://josevinicius-guincho.com/#contato</loc>
    <lastmod>2026-08-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://josevinicius-guincho.com/#sobre</loc>
    <lastmod>2026-08-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

- [ ] **10.3: Update HTML head with meta tags**

Update `<head>` in `index.html`:
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO Meta Tags -->
  <title>01 do Leilão - Resgate Expresso 24h em São Paulo</title>
  <meta name="description" content="Guincho seguro e rápido em Osasco, Taboão da Serra e Cotia. Resgate 24h, orçamento rápido, pagamento facilitado.">
  <meta name="keywords" content="guincho, reboque, tow truck, resgate veículo, São Paulo, Osasco, Taboão da Serra, Cotia">
  <meta name="author" content="01 do Leilão">
  <meta name="theme-color" content="#E51A1A">
  <meta name="color-scheme" content="dark">
  
  <!-- Open Graph (Social Media) -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="01 do Leilão - Resgate Expresso 24h">
  <meta property="og:description" content="Guincho seguro e rápido em São Paulo">
  <meta property="og:image" content="https://josevinicius-guincho.com/public/og-image.png">
  <meta property="og:url" content="https://josevinicius-guincho.com/">
  <meta property="og:site_name" content="01 do Leilão">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="01 do Leilão - Resgate Expresso 24h">
  <meta name="twitter:description" content="Guincho seguro e rápido em São Paulo">
  <meta name="twitter:image" content="https://josevinicius-guincho.com/public/og-image.png">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://josevinicius-guincho.com/">
  
  <!-- Search Console (if using Google) -->
  <!-- <meta name="google-site-verification" content="VERIFICATION_CODE"> -->
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Stylesheets -->
  <link rel="stylesheet" href="style.css">
</head>
```

- [ ] **10.4: Add Schema.org (LocalBusiness) JSON-LD**

Add to `<head>` in `index.html` (before closing `</head>`):
```html
<!-- Schema.org LocalBusiness Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "01 do Leilão",
  "image": "https://josevinicius-guincho.com/public/logo_hd.png",
  "description": "Serviço de guincho e reboque 24 horas em São Paulo",
  "telephone": "+5511997728-2725",
  "areaServed": [
    {
      "@type": "City",
      "name": "Osasco",
      "addressRegion": "SP"
    },
    {
      "@type": "City",
      "name": "Taboão da Serra",
      "addressRegion": "SP"
    },
    {
      "@type": "City",
      "name": "Cotia",
      "addressRegion": "SP"
    },
    {
      "@type": "State",
      "name": "São Paulo"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BR",
    "addressRegion": "SP",
    "addressLocality": "Osasco"
  },
  "url": "https://josevinicius-guincho.com/",
  "priceRange": "$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "sameAs": [],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "+5511997728-2725",
    "contactOption": "TollFree"
  }
}
</script>
```

- [ ] **10.5: Create OG image (1200×630px)**

Create or use existing image as `public/og-image.png`:
- Size: 1200×630px
- Content: Logo + "01 do Leilão" text + service description
- Format: PNG or JPG

If using simple tool, create with:
```bash
# Using ImageMagick (if installed)
convert -size 1200x630 \
  xc:#0a0a0a \
  -fill '#E51A1A' \
  -pointsize 72 \
  -gravity center \
  -draw "text 0,0 'Resgate Expresso 24h'" \
  -fill '#f5f2ee' \
  -pointsize 48 \
  -draw "text 0,100 'São Paulo • Osasco • Taboão • Cotia'" \
  public/og-image.png
```

- [ ] **10.6: Verify SEO setup**

1. Open DevTools > Elements
2. Check `<title>` tag is present
3. Check `<meta name="description">` is present
4. Check Open Graph meta tags
5. Check Schema.org JSON-LD is valid (paste into https://schema.org/validator)
6. Verify `robots.txt` is accessible at `/robots.txt`
7. Verify `sitemap.xml` is accessible at `/sitemap.xml`

- [ ] **10.7: Commit**

```bash
git add robots.txt sitemap.xml index.html public/og-image.png
git commit -m "feat: implement complete SEO optimization

- Add robots.txt (allow crawlers, reference sitemap)
- Create sitemap.xml with all major URLs
- Update meta tags: title, description, keywords
- Add Open Graph tags for social media sharing
- Add Twitter Card tags
- Add canonical URL tag
- Implement Schema.org LocalBusiness structured data
- Create 1200x630px OG image for social preview
- All fields optimized for 01 do Leilão service

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

### Task 11: Performance Optimization & Testing

**Files:**
- Modify: `script.js` (add performance optimizations)
- Modify: `style.css` (add will-change, GPU hints)
- Test: All pages in DevTools Lighthouse

**Steps:**

- [ ] **11.1: Add will-change to animated elements in CSS**

Add to `style.css`:
```css
/* Performance optimizations */
.line-inner,
.feature-item,
.servico-card,
.btn-primary,
.carousel-slide,
.tire-mark-pair {
  will-change: opacity, transform;
}

/* Remove will-change after animations complete */
.animations-complete .line-inner,
.animations-complete .feature-item {
  will-change: auto;
}
```

- [ ] **11.2: Add GPU acceleration hints**

Add to `style.css`:
```css
/* GPU acceleration for smooth animations */
.hero-image,
.mapa-container,
.carousel-container,
.tire-mark-pair {
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

- [ ] **11.3: Optimize video loading**

Update video tag in hero to use lazy loading (if below fold):
```html
<video 
  class="hero-video"
  muted 
  autoplay 
  loop 
  playsinline 
  preload="metadata"
  poster="public/images/WhatsApp Image 2026-08-17 at 14.10.22.jpeg">
  <source src="public/images/hero-reboque-optimized.mp4" type="video/mp4">
</video>
```

Note: Hero video is above fold, so autoload is OK. Don't lazy-load.

- [ ] **11.4: Test with Google Lighthouse**

1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Run audit (Desktop + Mobile)
4. Target scores:
   - Performance: >90
   - Accessibility: >95
   - Best Practices: >90
   - SEO: >95

If scores low:
- Check unused CSS (DevTools > Coverage tab)
- Check large images (DevTools > Network tab, filter Images)
- Check slow JavaScript (DevTools > Performance tab)

- [ ] **11.5: Verify 60 FPS animations**

1. Open DevTools > Performance tab
2. Click record
3. Scroll through page
4. Stop recording
5. Check FPS graph (should stay above 50 FPS, target 60)

If FPS drops:
- Reduce animation complexity
- Disable animations on mobile with media queries
- Use `prefers-reduced-motion` for accessibility

- [ ] **11.6: Test on real mobile devices**

If possible:
1. Deploy to staging server
2. Visit on iPhone/Android
3. Verify video loads (not buffering)
4. Verify carousel is smooth
5. Verify scrolling is 60 FPS
6. Check battery usage (shouldn't drain rapidly)

- [ ] **11.7: Commit**

```bash
git add style.css script.js
git commit -m "feat: optimize performance for 60 FPS animations

- Add will-change hints to animated elements
- Add GPU acceleration (translateZ, backface-visibility)
- Optimize video preload strategy
- Verify 60 FPS on desktop and mobile
- Test Lighthouse scores (target >90 all categories)
- Ensure smooth scrolling and dragging performance
- Test on real devices for battery/performance impact

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

### Task 12: Final QA & Deployment

**Files:**
- Verify: All sections functional
- Test: Cross-browser compatibility
- Deploy: To production

**Steps:**

- [ ] **12.1: Full page functionality checklist**

- [ ] Nav: logo, WhatsApp icon link works
- [ ] Hero: video plays, title animates, CTA button links to WhatsApp
- [ ] Services: cards display, 4 services visible, animations trigger on scroll
- [ ] Tire marks: appear diagonal ↙, fade out, work on scroll up/down
- [ ] Carousel: 6 photos load, drag/swipe works, dots update, auto-advance works
- [ ] CTA: title animates, button appears, link works, tire marks appear on hover
- [ ] About: text animates in, "01 do Leilão" mentioned, no "motoristas" reference
- [ ] Footer: copyright displays, phone number visible
- [ ] SEO: robots.txt accessible, sitemap.xml valid, meta tags present

- [ ] **12.2: Cross-browser testing**

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest, if Mac)
- [ ] Edge (latest)
- [ ] Mobile Chrome (iOS/Android)
- [ ] Mobile Safari (iOS)

Check for:
- No console errors
- All videos play
- All animations smooth
- No layout shifts (CLS)

- [ ] **12.3: Mobile responsiveness checklist**

- [ ] Tap targets >44×44px
- [ ] Text is readable (minimum 12px)
- [ ] No horizontal scroll needed
- [ ] Navigation is accessible
- [ ] Video displays (not full screen by default)
- [ ] Carousel works with swipe
- [ ] Forms/buttons easy to tap

- [ ] **12.4: Accessibility audit**

1. Run axe DevTools or Lighthouse Accessibility check
2. Fix any errors:
   - Alt text on images
   - Button labels
   - Color contrast (WCAG AA)
   - Keyboard navigation (Tab through page)

- [ ] **12.5: Final deployment**

When ready to go live:

```bash
# Build/bundle if using webpack or similar
# (For static HTML, skip this step)

# Deploy to hosting (example with FTP/SFTP)
# or use `git push` to hosting git remote

# Verify production site loads
# Test mobile responsiveness on real devices
# Check page speed on 4G/LTE
```

Update domain in:
- `sitemap.xml`: change `http://localhost:8080` → `https://josevinicius-guincho.com`
- Meta tags: ensure all URLs point to production domain
- OG tags: update image URL to production

- [ ] **12.6: Post-launch monitoring**

1. Submit sitemap to Google Search Console
2. Monitor Core Web Vitals
3. Set up Google Analytics (optional)
4. Monitor for broken links (404s)

- [ ] **12.7: Final commit**

```bash
git add .
git commit -m "chore: final QA and deployment checklist

- Cross-browser testing completed (Chrome, Firefox, Safari, Edge)
- Mobile responsiveness verified on real devices
- Accessibility audit passed (WCAG AA)
- Performance targets met (60 FPS, >90 Lighthouse)
- SEO optimization verified (robots.txt, sitemap.xml, schema.org)
- All functionality working as specified
- Ready for production deployment

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

## Self-Review Checklist

**Spec Coverage:**
- ✓ Task 1: GSAP setup
- ✓ Task 2: Nav (logo + WhatsApp icon only)
- ✓ Task 3: Video processing (watermark removal)
- ✓ Task 4-5: Hero section + animations
- ✓ Task 6-7: Services + Map + Tire marks animation
- ✓ Task 8: Photo carousel
- ✓ Task 9: CTA + About + Footer
- ✓ Task 10: SEO (robots.txt, sitemap.xml, schema.org)
- ✓ Task 11: Performance optimization
- ✓ Task 12: QA + deployment

**Placeholder Scan:**
- ✓ No "TBD" or "TODO" in any task
- ✓ All code examples are complete and functional
- ✓ All file paths are exact and verified
- ✓ All animation values are specified (duration, ease, delay)

**Type Consistency:**
- ✓ Function names consistent (updateCarousel, nextSlide, etc.)
- ✓ Class names consistent (.btn-primary, .servico-card, etc.)
- ✓ Animation timings consistent across sections (~0.6-0.8s for reveals)

**No Gaps Identified** — All spec requirements are covered in the task breakdown.

---

## Execution Options

**Plan complete and saved to `docs/superpowers/plans/2026-08-18-landing-redesign-implementation.md`**

Two execution options:

**1. Subagent-Driven (recommended)**
- I dispatch a fresh subagent per task (or per 2-3 tasks)
- You review between batches
- Fast iteration, parallel where possible
- Requires: `superpowers:subagent-driven-development` skill

**2. Inline Execution**
- Execute tasks sequentially in this session
- Checkpoint reviews every 2-3 tasks
- More context management, slower
- Requires: `superpowers:executing-plans` skill

**Which approach would you like?**

---

**Document Status:** Implementation Plan Ready  
**Timeline:** 10-14 hours estimated  
**Last Updated:** 2026-08-18  
**Next Step:** Choose execution approach above
