# CaptionCraft 🎨✨

**CaptionCraft** is an AI-powered caption generator that helps you create engaging captions for your social media images instantly. Perfect for Instagram, LinkedIn, Twitter, and more!

![CaptionCraft Banner](https://captioncraft.ai/og-image.jpg)

---

## 🌟 Features

- **AI-Powered Captions**: Generate creative and contextual captions using Google's Gemini AI
- **Image Upload**: Drag-and-drop or click to upload images
- **Caption History**: View and access all your previously generated captions
- **User Authentication**: Secure login and registration system with JWT
- **Responsive Design**: Beautiful UI that works seamlessly across all devices
- **Fast & Optimized**: Code splitting, lazy loading, and Gzip compression for optimal performance
- **Cloud Storage**: Images stored securely using ImageKit

---

## 🏗️ Architecture

CaptionCraft is a full-stack application built with a modern tech stack:

### **Frontend** (`/client`)

- **React 19** - Latest version with modern hooks and features
- **Vite** - Lightning-fast build tool and dev server
- **TailwindCSS v4** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icon library
- **React Helmet Async** - SEO optimization

### **Backend** (`/server`)

- **Node.js** with **Express 5** - Web server framework
- **MongoDB** with **Mongoose** - NoSQL database and ODM
- **Google Gemini AI** - AI image analysis and caption generation
- **ImageKit** - Cloud image storage and CDN
- **JWT** - Secure authentication tokens
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Compression** - Gzip response compression

---

## 📁 Project Structure

```
CaptionCraft/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── AuthForm.jsx
│   │   │   ├── AuthLayout.jsx
│   │   │   ├── CaptionDisplay.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DragAndDropUploader.jsx
│   │   │   ├── HistoryList.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── api/               # API configuration
│   ├── public/            # Static assets
│   ├── index.html         # HTML template
│   ├── vite.config.js     # Vite configuration
│   └── package.json
│
└── server/                # Backend Node.js application
    ├── src/
    │   ├── controller/    # Request handlers
    │   │   ├── auth.controller.js
    │   │   └── post.controller.js
    │   ├── models/        # MongoDB schemas
    │   │   ├── user.model.js
    │   │   └── post.model.js
    │   ├── routes/        # API routes
    │   │   ├── auth.routes.js
    │   │   └── post.routes.js
    │   ├── service/       # Business logic
    │   │   ├── ai.service.js
    │   │   └── storage.service.js
    │   ├── middleware/    # Custom middleware
    │   │   └── auth.middleware.js
    │   ├── db/           # Database configuration
    │   │   └── db.js
    │   └── app.js        # Express app setup
    ├── server.js         # Server entry point
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **MongoDB** (local or cloud instance)
- API keys for:
  - Google Gemini AI
  - ImageKit

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/iAmitVishwakarma/CaptionCraft.git
   cd CaptionCraft
   ```

2. **Install client dependencies**

   ```bash
   cd client
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd ../server
   npm install
   ```

### Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

# Server Configuration
PORT=3000
NODE_ENV=development
```

### Running the Application

#### Development Mode

1. **Start the backend server**

   ```bash
   cd server
   npm run dev
   # Server runs on http://localhost:3000
   ```

2. **Start the frontend (in a new terminal)**

   ```bash
   cd client
   npm run dev
   # Client runs on http://localhost:5173
   ```

3. **Access the application**
   - Open your browser and navigate to `http://localhost:5173`

#### Production Mode

1. **Build the client**

   ```bash
   cd client
   npm run build
   ```

2. **Start the server**
   ```bash
   cd server
   node server.js
   ```

---

## 🔑 API Endpoints

### Authentication

| Method | Endpoint             | Description                 | Auth Required |
| ------ | -------------------- | --------------------------- | ------------- |
| POST   | `/api/auth/register` | Register new user           | No            |
| POST   | `/api/auth/login`    | Login user                  | No            |
| GET    | `/api/auth/check`    | Check authentication status | Yes           |

### Posts/Captions

| Method | Endpoint             | Description                         | Auth Required |
| ------ | -------------------- | ----------------------------------- | ------------- |
| POST   | `/api/posts`         | Generate caption for uploaded image | Yes           |
| GET    | `/api/posts/history` | Get user's caption history          | Yes           |

---

## 🛠️ Available Scripts

### Client Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Server Scripts

```bash
npm run dev      # Start development server with nodemon
```

---

## 🎨 Key Features Explained

### 1. **AI Caption Generation**

The application uses Google's Gemini AI to analyze uploaded images and generate contextually relevant captions. The AI service is integrated in `server/src/service/ai.service.js`.

### 2. **User Authentication**

- Secure JWT-based authentication
- Password hashing with bcryptjs
- HTTP-only cookies for token storage
- Protected routes with authentication middleware

### 3. **Image Upload & Storage**

- Client-side image validation
- Drag-and-drop interface
- Cloud storage with ImageKit CDN
- Automatic image optimization

### 4. **Performance Optimization**

- **Code Splitting**: Lazy loading of components
- **Compression**: Gzip compression for API responses
- **Image Optimization**: ImageKit CDN with automatic optimization
- **Fast Refresh**: Vite's HMR for instant development updates

### 5. **SEO Optimization**

- Meta tags for social sharing (Open Graph, Twitter Cards)
- Semantic HTML structure
- Proper heading hierarchy
- Descriptive titles and descriptions

---

## 🧪 Testing

The application includes:

- ESLint configuration for code quality
- React Fast Refresh for development
- Lighthouse performance optimization (90+ score)

---

## 🌐 Deployment

### Deploying to Production

The application is configured for deployment on platforms like:

- **Frontend**: Vercel, Netlify, Render
- **Backend**: Render, Railway, Heroku
- **Database**: MongoDB Atlas

**Current Production URL**: [https://captioncraft-ai.onrender.com](https://captioncraft-ai.onrender.com)

### CORS Configuration

Update the CORS origin in `server/src/app.js` to match your frontend URL:

```javascript
const corsOptions = {
  origin: "https://your-frontend-url.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Amit Vishwakarma**

- GitHub: [@iAmitVishwakarma](https://github.com/iAmitVishwakarma)

---

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for powerful image analysis
- [ImageKit](https://imagekit.io/) for cloud storage and CDN
- [Lucide](https://lucide.dev/) for beautiful icons
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for blazing fast builds

---

## 📧 Support

If you have any questions or need help, please open an issue or contact the author.

---

<div align="center">
  Made with ❤️ by Amit Vishwakarma
</div>
