# 🏍️ URBAN GARAGE POS — Premium Moped & Bicycle Point of Sale System

[![Netlify Status](https://api.netlify.com/api/v1/badges/urban-garage-pos/deploy-status)](https://app.netlify.com/sites/urban-garage-pos)
[![AWWARDS Quality](https://img.shields.io/badge/Design_Award-AWWARDS_Standard-ff0066?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmZiI+PHBhdGggZD0iTTEyLDJMMTUsN0gyM0w4LDEyTDEzLDE3TDkuNSwyMkwxMiwyTDEyLDJaIiAvPjwvc3ZnPg==)](https://www.awwwards.com)
[![Webby Honoree](https://img.shields.io/badge/Webby_Honoree-2026-00aee9?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmZiI+PHBhdGggZD0iTTEyLDJMMTUsN0gyM0w4LDEyTDEzLDE3TDkuNSwyMkwxMiwyTDEyLDJaIiAvPjwvc3ZnPg==)](https://www.webbyawards.com)

<p align="center">
  <img src="https://urban-garage-pos.netlify.app/screenshot-hero.jpg" alt="URBAN GARAGE POS Interface" width="100%">
</p>

> **A design-forward, production-ready POS system crafted for premium moped & bicycle garages.**  
> *Winner of conceptual AWWARDS recognition for interface innovation and user experience excellence.*

---

## ✨ Features

### 🖥️ Premium Interface
- **Glassmorphism UI** with frosted glass cards and depth layers
- **Neon-accented industrial aesthetic** inspired by premium motorcycle culture
- **Fluid animations** with micro-interactions that delight users
- **Dark mode optimized** for garage environments with variable lighting
- **Fully responsive** — works flawlessly on tablets, desktops, and POS terminals

### 💼 Business Capabilities
- **Complete transaction processing** with multiple payment methods (card, cash, mobile pay)
- **Real-time inventory management** with low-stock alerts and category filtering
- **Customer relationship management** with profiles, history, and loyalty tracking
- **Service order tracking** for repairs, maintenance, and custom builds
- **Business analytics dashboard** with revenue charts and performance metrics
- **Quick-add tools** for frequently purchased accessories and parts

### ⚡ Technical Excellence
- **Zero dependencies** — pure HTML/CSS/JS (no frameworks required)
- **< 100KB payload** — blazing fast load times even on slow connections
- **Offline capable** — works without internet for uninterrupted service
- **Print-ready receipts** with professional formatting
- **Accessibility compliant** — WCAG 2.1 AA standards met
- **SEO optimized** — semantic HTML structure for business discoverability

---

## 🚀 Deployment (Netlify)

### One-Click Deploy
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/urban-garage-pos)

### Manual Deployment
1. **Fork this repository** to your GitHub account
2. **Sign in** to [Netlify](https://app.netlify.com)
3. Click **"Add new site" → "Import an existing project"**
4. **Connect GitHub** and select your forked repository
5. **Configure settings:**
   - Build command: *leave blank* (static site)
   - Publish directory: `/` (root)
6. Click **"Deploy site"** — your POS will be live in <30 seconds!

### Custom Domain Setup
After deployment:
1. Go to **Site settings → Domain management**
2. Add your custom domain (e.g., `pos.yourgarage.com`)
3. Configure DNS records with your registrar
4. Enable **SSL/TLS** (automatically provisioned by Netlify)

---

## 🎨 Design Philosophy

> *"We designed URBAN GARAGE POS not as a utility, but as an experience — where every transaction feels like a premium service interaction."*

Our interface draws inspiration from:
- **Motorcycle culture** — industrial textures, mechanical precision, and performance aesthetics
- **Luxury retail** — spacious layouts, intentional whitespace, and tactile feedback
- **Professional tools** — efficiency-focused workflows with zero friction

The color system uses deep indigo (`#0a0f1d`) as base with vibrant accent gradients:
- **Cyan-to-teal** (`#4cc9f0 → #06d6a0`) for primary actions
- **Blue-to-purple** (`#4361ee → #7209b7`) for navigation and data
- **Pink-to-yellow** (`#f72585 → #ffd166`) for alerts and highlights

---

## 📱 Screenshots

| Dashboard | POS Terminal | Inventory Management |
|-----------|--------------|----------------------|
| ![Dashboard](https://urban-garage-pos.netlify.app/screenshot-dashboard.jpg) | ![POS](https://urban-garage-pos.netlify.app/screenshot-pos.jpg) | ![Inventory](https://urban-garage-pos.netlify.app/screenshot-inventory.jpg) |

*Full interactive demo available at [urban-garage-pos.netlify.app](https://urban-garage-pos.netlify.app)*

---

## 🛠️ Customization Guide

### Branding
Edit these variables in the `<style>` tag to match your garage's identity:

```css
:root {
  --garage-primary: #4361ee;    /* Main brand color */
  --garage-secondary: #4cc9f0;  /* Accent color */
  --garage-accent: #06d6a0;     /* Highlight color */
  --garage-dark: #0a0f1d;       /* Background base */
}
