# RetroWave

A modern, retro-inspired React application built with Vite, Tailwind CSS, and interactive audio features using Howler.js. This project showcases a sleek, nostalgic user interface with draggable windows and audio integration.

## 🎨 Features

- **Modern Build Setup**: Powered by Vite for lightning-fast development and optimized production builds
- **Tailwind CSS v4**: Utility-first CSS framework for responsive and customizable styling
- **Howler.js Integration**: Web audio library for sound effects and audio management
- **Draggable Windows**: Interactive components that can be moved around the interface
- **JSX Components**: Modular, reusable React components using `.jsx` file extensions
- **Sound Effects**: Integrated audio system for interactive feedback
- **Retro Aesthetic**: Designed with a nostalgic, retro-wave visual style

## 📁 Project Structure

```
react-app/
├── src/
│   ├── App.jsx                 # Main application component
│   ├── index.css              # Global Tailwind CSS styles
│   ├── main.jsx               # Application entry point
│   └── components/
│       ├── RetroWaveApp.jsx    # Retro-wave themed main component
│       ├── Wave.jsx            # Wave animation component
│       ├── Icon.jsx            # Icon component
│       └── DraggableWindow.jsx  # Draggable window wrapper component
├── public/
│   └── sounds/                # Audio files directory
│       ├── click.mp3
│       └── hover.mp3
├── index.html                 # HTML entry point with Howler.js CDN
├── package.json               # Dependencies and scripts
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
└── README.md                  # This file
```

## 🚀 Quick Start


1. **Clone the repository**
   ```bash
   git clone https://github.com/mrigyareineu/RetroWave.git
   cd react-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 📦 Available Scripts

### Development
```bash
npm run dev
```
Starts the Vite development server with Hot Module Replacement (HMR) for instant code updates.

### Build for Production
```bash
npm run build
```
Creates an optimized production build in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```
Locally preview the production build before deploying.

### Lint Code
```bash
npm run lint
```
Run ESLint to check code quality and style.

## 🛠️ Technologies & Dependencies

### Core
- **React 18**: JavaScript library for building user interfaces
- **React DOM 18**: React package for DOM rendering
- **Vite**: Next-generation frontend build tool

### Styling
- **Tailwind CSS v4**: Utility-first CSS framework
- **PostCSS**: CSS processor for modern transformations
- **Autoprefixer**: Automatically adds vendor prefixes to CSS

### Audio
- **Howler.js v2.2.3**: Audio library for web (via CDN)

### Development
- **ESLint**: JavaScript linter for code quality

## 🎨 Component Overview

### App.jsx
The root component that serves as the main application container.

### RetroWaveApp.jsx
Main retro-wave themed component showcasing the application's primary interface and features.

### Wave.jsx
A component for displaying wave animations or visualizations, adding visual interest to the interface.

### Icon.jsx
Reusable icon component for consistent iconography throughout the application.

### DraggableWindow.jsx
A wrapper component that makes content draggable, enabling interactive window-like interfaces.

## 🔊 Audio Integration

This project uses **Howler.js** for audio management. The library is loaded via CDN and provides:

- Sound effect playback
- Volume control
- Fade in/out effects
- Sprite management for multiple audio files

**Audio files** are stored in the `public/sounds/` directory and can be referenced directly in components:

```jsx
const sound = new Howl({
  src: ['/sounds/click.mp3']
});
sound.play();
```

## 🎯 Tailwind CSS Configuration

The project includes a fully configured Tailwind CSS setup:

- **Content paths** configured in `tailwind.config.js` to scan all component files
- **Responsive design** utilities for mobile-first development
- **Custom utilities** can be added to `tailwind.config.js`
- **Global styles** defined in `src/index.css` with Tailwind directives

## 🌐 Browser Support

This application works on all modern browsers that support:
- ES6+ JavaScript
- CSS Grid and Flexbox
- Web Audio API (for Howler.js)

## 📱 Responsive Design

The application is built with a mobile-first approach using Tailwind CSS. Responsive breakpoints are available for:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🚢 Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload the dist/ folder to Netlify
```

### Deploy to GitHub Pages
1. Update `vite.config.js` with your repository name
2. Run `npm run build`
3. Push the `dist/` folder to GitHub Pages

## 📝 Environment Variables

Create a `.env` file in the root directory for environment-specific variables:

```env
VITE_API_URL=https://your-api.com
VITE_APP_NAME=RetroWave
```

Access them in your code:
```jsx
const apiUrl = import.meta.env.VITE_API_URL;
```

## 🐛 Troubleshooting

### Port already in use
If port 5173 is already in use, Vite will automatically use the next available port.

### Tailwind CSS not applying
Ensure `src/index.css` is imported in `src/main.jsx` and contains the Tailwind directives.

### Howler.js not working
Verify the CDN script is loaded in `index.html` and check browser console for any errors.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**mrigyareineu**
- GitHub: [@mrigyareineu](https://github.com/mrigyareineu)
- Repository: [RetroWave](https://github.com/mrigyareineu/RetroWave)

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Howler.js Documentation](https://howlerjs.com)
- [Vite ESLint Setup](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)
