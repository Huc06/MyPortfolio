# 🚀 Hulk Phuc Ha - Web3 Developer Portfolio

A modern, responsive portfolio website showcasing blockchain development expertise, Web3 projects, and technical skills.

![Portfolio Preview](assets/img/hero-bg.jpg)

## 🌟 Features

- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Dynamic Portfolio** - Filterable project showcase with masonry/stack layouts
- **Skills Animation** - Interactive logo carousel with 21+ technology icons
- **Fast Loading** - Optimized performance with lazy loading and CDN assets
- **SEO Optimized** - Meta tags and semantic HTML structure

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5 - Responsive grid system
- AOS - Animate On Scroll library
- Isotope.js - Dynamic layouts & filtering
- Swiper - Touch-enabled slider

### Design & Animation
- Custom CSS animations
- Logo Loop component (3-row infinite scroll)
- Masonry & Stack card layouts
- GLightbox - Lightbox gallery

### Deployment
- Static hosting ready
- Compatible with GitHub Pages, Netlify, Vercel
- No build process required

## 📂 Project Structure

```
MyResume-1.0.0/
├── assets/
│   ├── css/
│   │   ├── main.css          # Main styles
│   │   └── logoloop.css      # Logo carousel styles
│   ├── js/
│   │   ├── main.js           # Core functionality
│   │   └── logoloop.js       # Logo carousel component
│   ├── img/                  # Images & portfolio screenshots
│   └── vendor/               # Third-party libraries
├── index.html                # Main page
├── portfolio-details.html    # Portfolio detail page template
└── README.md                 # This file
```

## 🚀 Quick Start

### Local Development

1. **Clone or download** this repository
2. **Open `index.html`** in your browser
3. **No build step required!** - It's a static site

### Deployment

#### GitHub Pages
```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main

# Enable GitHub Pages in repository settings
# Select main branch, root folder
```

#### Netlify
1. Drag and drop the project folder to [Netlify](https://app.netlify.com/)
2. Site is live instantly!

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🎨 Customization Guide

### Update Personal Information

**`index.html`** - Lines 80-110:
```html
<h1>Your Name</h1>
<p>Job Title & Description</p>
```

### Add/Remove Projects

**Portfolio Section** - Lines 700-1200:
```html
<div class="portfolio-item filter-sui filter-tools">
  <img src="assets/img/your-project.jpg" alt="Project">
  <div class="portfolio-info">
    <h4>Project Name</h4>
    <p>Description</p>
    <a href="project-url">View Details</a>
  </div>
</div>
```

### Modify Skills Logos

**Logo Loop** - Lines 1644-1841:
```javascript
logos: [
  {
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yourtech/yourtech-original.svg',
    alt: 'Tech Name',
    title: 'Tech Name',
    width: 40,
    height: 40
  }
]
```

Find more icons at: [Devicon](https://devicon.dev/)

### Change Colors

**`assets/css/main.css`** - Lines 10-30:
```css
:root {
  --accent-color: #149ddd;      /* Primary color */
  --background-color: #040b14;  /* Dark background */
  --heading-color: #ffffff;     /* Text color */
}
```

## 📱 Features Breakdown

### 1. Portfolio Filtering
- **All** - Stack cards effect with sticky positioning
- **Sui Projects** - Sui blockchain projects
- **Dev Tools** - Development tools & utilities
- **Ethereum** - Ethereum/Solidity projects
- **Cardano** - Cardano blockchain projects

### 2. Logo Carousel
- **Row 1** - Frontend: React, Next.js, JS, TS, HTML5, CSS3, Tailwind
- **Row 2** - Backend: Node.js, Express, Rust, Solidity, Python, MongoDB, PostgreSQL
- **Row 3** - DevOps: Git, GitHub, Docker, VS Code, Figma, NPM, Linux

### 3. Sections
- Hero - Introduction with typed effect
- About - Personal summary
- Resume - Education & experience
- Portfolio - Project showcase
- Services - Offerings
- Contact - Contact form & info

## 🔧 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This project is open source and available for personal and commercial use.

Template base inspired by modern portfolio designs, heavily customized with:
- Custom logo carousel component
- Portfolio stack cards layout
- Unique filtering system
- Web3-focused content

## 🤝 Contact

- **GitHub**: [@Huc06](https://github.com/Huc06)
- **LinkedIn**: [Hulk Phuc Ha](https://www.linkedin.com/in/hulk-phuc-ha-84a685301/)
- **Twitter/X**: [@hulkphuc](https://twitter.com/hulkphuc)

---

⭐ **Star this repo** if you find it useful!

Built with ❤️ by Hulk Phuc Ha - Web3 Developer & DevRel

