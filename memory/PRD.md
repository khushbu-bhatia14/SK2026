# SadaKappda - Shopify OS 2.0 Theme PRD

## Original Problem Statement
Build a complete, professional, and fully dynamic Shopify OS 2.0 theme from scratch for the apparel brand "SadaKappda".

## Core Requirements
- **Technology**: Shopify OS 2.0 (Liquid, Sections, JSON templates)
- **Homepage Structure**: `templates/index.json` with default sections
- **Dynamic Control**: All content editable through Shopify Theme Editor
- **Critical Feature**: Bewakoof-Style Dynamic Sliding Blocks
- **UX/UI**: Premium design inspired by "The Souled Store"
- **Trust Signals**: COD, Easy returns, Delivery timelines, WhatsApp support

## Target Audience
- Indian apparel shoppers looking for premium casual wear
- Mobile-first users
- Value-conscious customers who appreciate quality

## Theme Architecture
```
/app/shopify-theme/sadakappda/
├── assets/         # CSS, JS, images
├── config/         # settings_schema.json, settings_data.json
├── layout/         # theme.liquid
├── locales/        # Translation files
├── sections/       # Liquid section files
├── snippets/       # Reusable code blocks
└── templates/      # JSON and Liquid templates
```

## Deliverables
- `/app/sadakappda-theme.zip` - Production-ready theme ZIP

---

## Implementation Status

### ✅ Completed (Feb 2026)
- [x] Complete theme scaffolding and directory structure
- [x] Configuration files (settings_schema.json, settings_data.json)
- [x] Layout files (theme.liquid)
- [x] All section files (header, footer, hero, product cards, etc.)
- [x] Template files (index.json, product.liquid, collection.liquid, etc.)
- [x] Asset files (base.css, theme.js)
- [x] Brand assets integration (logo, product mockups)
- [x] Theme ZIP packaging
- [x] Static HTML preview for visual verification
- [x] README.md with setup instructions

### 🔄 In Progress
- [ ] User needs to upload theme to Shopify store for real testing

### 📋 Upcoming Tasks (P1)
- [ ] Debug any Liquid/JSON errors after Shopify upload
- [ ] Verify Bewakoof-Style Dynamic Sliding Blocks functionality
- [ ] Test all templates and sections in Theme Editor

### 🗂️ Future/Backlog (P2)
- [ ] "Coming Soon" countdown section for T-shirt launch
- [ ] Size chart popup feature for product pages
- [ ] Theme refinements based on user feedback

---

## Key Files Reference
| File | Purpose |
|------|---------|
| `/app/sadakappda-theme.zip` | Main deliverable |
| `/app/shopify-theme/sadakappda/` | Theme source directory |
| `/app/frontend/public/index.html` | Static preview (temporary) |
| `/app/shopify-theme/README.md` | Setup instructions |

---

## Testing Notes
- Static HTML preview verified ✅
- Real Shopify testing pending (requires user's store)
- No 3rd party integrations required

## User Preferences
- Theme Style: Balanced (premium but approachable)
- Color Palette: Admin-switchable modes
- Initial Categories: Men, Women apparel
