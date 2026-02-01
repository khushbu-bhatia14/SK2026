# SadaKappda Shopify Theme - Project PRD

## Original Problem Statement
Build a complete, production-ready Shopify OS 2.0 theme for SadaKappda - an Indian D2C apparel brand (hoodies, sweatshirts, upcoming T-shirts) with:
- Fully dynamic sections editable from Shopify Theme Editor
- Switchable color modes (Light/Dark/Mixed)
- Indian D2C trust signals (COD, Easy Returns, Fast Shipping, Secure Payments)
- Bewakoof-style dynamic sliding blocks
- Premium "Quietly Premium" design philosophy

## User Personas
- **Primary**: Indian millennials/Gen-Z looking for premium yet affordable hoodies & sweatshirts
- **Secondary**: Gift buyers seeking quality apparel brands

## Brand Philosophy (from About Us document)
- "Quietly Premium" - refinement without exaggeration
- Premium in feel, Thoughtful in design, Honest in price
- Focus on fabric integrity, thoughtful construction, timeless design

## Core Requirements
- [x] Shopify OS 2.0 theme structure (Liquid + JSON templates)
- [x] Switchable color modes from Theme Editor
- [x] All sections editable via Theme Customizer
- [x] Mobile-first responsive design
- [x] Indian D2C trust signals
- [x] Product cards with swatches, hover image, badges
- [x] Slide-out cart drawer
- [x] Collection filters (size, color, price)
- [x] Complete PDP with size guide, trust badges, accordion

## What's Been Implemented (Jan 2026)

### Theme Structure (51 files)
```
/app/shopify-theme/sadakappda/
├── assets/ (4 files)
│   ├── base.css - Core styles with CSS variables
│   ├── component-product-card.css - Product card styles
│   ├── customer.css - Account pages styles
│   └── theme.js - All JavaScript functionality
├── config/ (2 files)
│   ├── settings_schema.json - Theme settings schema
│   └── settings_data.json - Default settings
├── layout/ (2 files)
│   ├── theme.liquid - Main layout
│   └── password.liquid - Password page layout
├── locales/ (1 file)
│   └── en.default.json - English translations
├── sections/ (21 files)
│   ├── announcement-bar.liquid
│   ├── header.liquid (with mobile menu & search)
│   ├── footer.liquid (with newsletter)
│   ├── hero-slider.liquid (Bewakoof-style)
│   ├── featured-collection.liquid
│   ├── category-blocks.liquid
│   ├── trust-badges.liquid
│   ├── brand-story.liquid
│   ├── testimonials.liquid
│   ├── newsletter.liquid
│   ├── rich-text.liquid
│   ├── image-banner.liquid
│   ├── collection-header.liquid
│   ├── collection-products.liquid
│   ├── product-main.liquid (full PDP)
│   ├── product-recommendations.liquid
│   ├── cart-main.liquid
│   ├── page-header.liquid
│   ├── page-content.liquid
│   └── header-group.json, footer-group.json
├── snippets/ (4 files)
│   ├── product-card.liquid
│   ├── cart-drawer.liquid
│   ├── icon.liquid (SVG icons)
│   └── meta-tags.liquid
└── templates/ (17 files)
    ├── index.json (homepage with 8 sections pre-configured)
    ├── collection.liquid
    ├── product.liquid
    ├── cart.liquid
    ├── page.liquid
    ├── page.about-us.liquid
    ├── page.contact.liquid
    ├── page.size-guide.liquid
    ├── page.faq.liquid
    ├── search.liquid
    ├── 404.liquid
    ├── gift_card.liquid
    └── customers/ (login, register, account, order, addresses)
```

### Homepage Sections (Pre-configured in index.json)
1. Hero Slider - 2 slides with your brand messaging
2. Trust Badges - COD, Easy Returns, Fast Shipping, Secure Payments
3. Category Blocks - Shop Men / Shop Women
4. Best Sellers - Featured collection grid
5. Brand Story - "Why SadaKappda?" with 4 feature blocks
6. New Arrivals - Featured collection grid
7. Testimonials - 3 customer reviews
8. Newsletter - Email subscription with gradient background

### Theme Features
- **Color Modes**: Light / Dark / Mixed (configurable)
- **Typography**: Josefin Sans (headings) + Assistant (body)
- **Buttons**: Rounded / Pill / Sharp options with gradient primary
- **Product Cards**: Swatches, hover image, badges, quick add
- **Cart**: Slide-out drawer with free shipping bar
- **Mobile**: Sticky add-to-cart, hamburger menu, touch sliders

### Deliverables Created
1. **Theme ZIP**: `/app/sadakappda-theme.zip` (87KB) - Ready to upload to Shopify
2. **Brand Assets**: `/app/shopify-theme/brand-assets/`
   - SadaKappda-Logo.png
   - CozyBear-Hoodie.jpg
   - SugarStrength-Hoodie.jpg
   - Model-Shot-1.jpg
3. **Setup Guide**: `/app/shopify-theme/README.md`
4. **HTML Preview**: `/app/frontend/public/index.html` - Visual preview at localhost:3000

## Prioritized Backlog

### P0 - Done ✅
- Complete theme structure
- All homepage sections
- Product, collection, cart templates
- Customer account templates
- Theme settings with color modes

### P1 - For Shopify Setup
- Upload theme to Shopify store
- Configure logo in Theme Settings
- Set up navigation menus
- Create collections (Men, Women, Hoodies, Sweatshirts, Best Sellers, New Arrivals)
- Create pages (About Us, Contact, Size Guide, FAQ)
- Add products with images

### P2 - Future Enhancements
- WhatsApp button (add number when ready)
- Lookbook/Style Guide page template
- Track Order page with integration
- Reviews app integration (Judge.me/Loox)
- Coming Soon countdown for T-shirt launch
- Instagram feed section
- Size recommendation quiz

## Technical Notes
- Theme uses Shopify OS 2.0 JSON templates
- All sections have full schema for Theme Editor customization
- CSS uses CSS variables for easy color mode switching
- JavaScript is vanilla (no framework dependencies)
- Images lazy-loaded below the fold

## Next Session Tasks
1. Test theme upload to Shopify
2. Configure with actual brand assets
3. Set up collections and products
4. Create required pages
5. Test checkout flow
6. Mobile responsiveness testing on Shopify

---
Last Updated: January 2026
