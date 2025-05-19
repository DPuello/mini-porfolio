# Mini Portfolio – Vue.js Portfolio Showcase

This is a mini portfolio project. It's my first experience using Vue. I faced several challenges learning Vue and refreshing my knowledge of GSAP to apply it to Vue. The color palette is somewhat inspired by RAB2B but with my personal touch.
I hope you enjoy viewing this project as much as I enjoyed creating it 😁

![Portfolio preview](/screenshots/welcome.png)

## 🚀 Features

- Light/dark mode with persistent state
- Responsive design for desktop, tablet, and mobile
- Hover and focus animations
- Scroll-based animations for interesting visual effects
- Semantic and accessible HTML with BEM structure for classes
- Keyboard-accessible navigation
- Smooth transitions and animations

## 🛠️ Technology Stack

- Vue 3 + Vite
- SCSS for custom styling
- GSAP for animations

## 📦 Project Structure

```
mini-portfolio/
├── public/
│   └── images/         # Project images
├── src/
│   ├── assets/         # Global styles and resources
│   │   ├── scss/       # Modular SCSS files
│   │   └── icons/      # Project icons
│   ├── components/     # Vue components
│   │   ├── layout/     # Structural components
│   │   └── sections/   # Main sections
│   ├── composables/    # Reusable functions
│   ├── views/          # Page views
│   ├── stores/         # Theme storage
│   ├── data/           # Mock data
│   ├── App.vue         # Root component
│   └── main.js         # Entry point
├── index.html
└── package.json
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## 🎨 Design Decisions

- Used line images from the RAB2B website and a partial color palette
- Implemented SCSS with modules to keep styles organized and reusable
- Created dark mode using CSS classes and Pinia for state management
- Added smooth animations using GSAP and CSS transitions
- Structured HTML semantically to improve SEO and accessibility

## ♿ Accessibility

- Semantic HTML structure with appropriate tags (section, article, figure, etc.)
- ARIA attributes and roles to improve screen reader interpretation
- Images with alternative text

## 📝 Development Process

This portfolio was created as an exercise to showcase capabilities and as a personal challenge to try Vue 3 and SCSS. The development followed these steps:

1. Design of the basic structure and main components
2. Implementation of light/dark theme system
3. Development of animations and transitions
4. Implementation of interactive project cards
5. Mobile device optimization
6. Accessibility and user experience improvements
7. Performance testing

## 🔍 Fun Facts

- The background image deformation in the welcome section is achieved through 3D matrices dynamically calculated based on scroll
- The project uses custom SCSS mixins to maintain DRY code and facilitate global changes

![Project card example](/screenshots/projects.png)

## 📋 Technical Debt

- Implement TypeScript as a bonus
- Continue improving accessibility to ensure text and navigation are always clear for screen readers
