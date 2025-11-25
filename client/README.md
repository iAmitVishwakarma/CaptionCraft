# CaptionCraft Frontend 🎨

React-based frontend for CaptionCraft - An AI-powered caption generator for social media images.

---

## 🛠️ Tech Stack

- **React 19** - Latest React with modern features
- **Vite 7** - Next-generation frontend tooling
- **TailwindCSS v4** - Utility-first CSS framework
- **Axios** - Promise-based HTTP client
- **Lucide React** - Beautiful & consistent icons
- **React Helmet Async** - Document head management for SEO

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 📜 Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build optimized production bundle        |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Run ESLint for code quality checks       |

---

## 📁 Project Structure

```
client/
├── api/                    # API configuration
│   └── axios.js           # Axios instance with interceptors
├── public/                # Static assets
│   ├── robots.txt        # SEO robots file
│   └── vite.svg          # Favicon
├── src/
│   ├── components/       # React components
│   │   ├── AuthForm.jsx          # Reusable auth form component
│   │   ├── AuthLayout.jsx        # Auth pages layout wrapper
│   │   ├── CaptionDisplay.jsx    # Caption display component
│   │   ├── Dashboard.jsx         # Main dashboard component
│   │   ├── DragAndDropUploader.jsx # Image upload interface
│   │   ├── HistoryList.jsx       # Caption history sidebar
│   │   ├── LoadingSpinner.jsx    # Loading state component
│   │   ├── Login.jsx             # Login page
│   │   └── Register.jsx          # Registration page
│   ├── App.jsx           # Root component with routing logic
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles & Tailwind imports
├── index.html            # HTML entry point with SEO meta tags
├── vite.config.js        # Vite configuration
├── eslint.config.js      # ESLint configuration
└── package.json          # Dependencies & scripts
```

---

## 🎨 Key Features

### 1. **Code Splitting & Lazy Loading**

Components are lazy-loaded to improve initial load time:

```javascript
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Dashboard = lazy(() => import("./components/Dashboard"));
```

### 2. **Responsive Design**

- Mobile-first approach with TailwindCSS
- Adaptive layouts for different screen sizes
- Touch-optimized drag-and-drop interface

### 3. **SEO Optimization**

- Meta tags for social sharing (Open Graph, Twitter Cards)
- Semantic HTML structure
- React Helmet for dynamic meta tags
- Proper heading hierarchy

### 4. **Performance Features**

- Vite's lightning-fast HMR (Hot Module Replacement)
- Optimized production builds with code splitting
- Image preloading for better UX
- Efficient state management with React hooks

### 5. **User Experience**

- Drag-and-drop file upload
- Real-time loading states
- Error handling with user-friendly messages
- Caption history with easy access to past generations
- Smooth transitions and animations

---

## 🔧 Configuration

### Vite Configuration (`vite.config.js`)

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000", // Proxy API requests to backend
    },
  },
});
```

### API Configuration

The frontend uses Axios with interceptors configured in `api/axios.js` to:

- Add authentication tokens automatically
- Handle 401 unauthorized responses
- Include credentials for CORS

---

## 🌐 Environment Variables

Create a `.env` file in the client directory if needed:

```env
VITE_API_URL=http://localhost:3000/api
```

**Note**: Vite requires environment variables to be prefixed with `VITE_`

---

## 📦 Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

The production build will be generated in the `dist/` directory.

---

## 🎯 Component Overview

### Core Components

- **App.jsx**: Main application component handling routing and authentication state
- **Dashboard.jsx**: Primary user interface after login with image upload and caption display
- **DragAndDropUploader.jsx**: Drag-and-drop file upload interface with visual feedback
- **CaptionDisplay.jsx**: Displays generated captions with copy-to-clipboard functionality
- **HistoryList.jsx**: Sidebar showing previous caption generations

### Auth Components

- **AuthLayout.jsx**: Shared layout for login and registration pages
- **AuthForm.jsx**: Reusable form component for authentication
- **Login.jsx**: User login interface
- **Register.jsx**: User registration interface

### Utility Components

- **LoadingSpinner.jsx**: Loading state indicator

---

## 🔗 API Integration

The frontend communicates with the backend API at:

- **Development**: `http://localhost:3000/api`
- **Production**: Configured in deployment settings

### Main API Endpoints Used:

1. **Authentication**

   - `POST /api/auth/register` - User registration
   - `POST /api/auth/login` - User login
   - `GET /api/auth/check` - Verify authentication

2. **Caption Generation**
   - `POST /api/posts` - Upload image and generate caption
   - `GET /api/posts/history` - Fetch user's caption history

---

## 🚨 Development Notes

### React 19 Features

This project uses React 19, which includes:

- Improved Suspense support
- Better error boundaries
- Enhanced hooks performance

### TailwindCSS v4

Using the latest TailwindCSS with:

- Vite plugin integration (`@tailwindcss/vite`)
- No separate config file needed
- CSS imports in `index.css`

### Code Quality

- ESLint configured with React-specific rules
- React Hooks linting enabled
- React Refresh plugin for Fast Refresh

---

## 🐛 Common Issues & Solutions

### Port Already in Use

```bash
# Kill process on port 5173
npx kill-port 5173
```

### Build Errors

```bash
# Clear cache and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### CORS Issues

Ensure the backend allows the frontend origin in CORS configuration.

---

## 📖 Learn More

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Axios Documentation](https://axios-http.com/)

---

## 🤝 Contributing

See the main project README for contribution guidelines.

---

<div align="center">
  Part of CaptionCraft - Made with ❤️ by Amit Vishwakarma
</div>
