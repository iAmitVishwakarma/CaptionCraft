# CaptionCraft Backend 🚀

Node.js backend server for CaptionCraft - Powering AI-driven caption generation with secure authentication and cloud storage.

---

## 🛠️ Tech Stack

- **Node.js** with **Express 5** - Web server framework
- **MongoDB** with **Mongoose 8** - NoSQL database and ODM
- **Google Gemini AI** - Advanced AI for image analysis and caption generation
- **ImageKit** - Cloud image storage, optimization, and CDN
- **JWT** - JSON Web Tokens for secure authentication
- **bcryptjs** - Password hashing and security
- **Multer 2** - Multipart/form-data file upload handling
- **Compression** - Gzip response compression
- **CORS** - Cross-Origin Resource Sharing support
- **Cookie Parser** - Parse HTTP cookies

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- MongoDB (local or MongoDB Atlas)
- API Keys:
  - Google Gemini AI API key
  - ImageKit credentials (public key, private key, URL endpoint)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The server will run on `http://localhost:3000`

---

## 📜 Available Scripts

| Command       | Description                                          |
| ------------- | ---------------------------------------------------- |
| `npm run dev` | Start development server with nodemon (auto-restart) |

---

## 🔐 Environment Variables

Create a `.env` file in the server root directory:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/captioncraft
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/captioncraft

# JWT Secret (use a long, random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Google Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# ImageKit Configuration
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id

# Server Configuration
PORT=3000
NODE_ENV=development
```

### Getting API Keys

1. **Google Gemini AI**: Get your API key from [Google AI Studio](https://ai.google.dev/)
2. **ImageKit**: Sign up at [ImageKit.io](https://imagekit.io/) and get your credentials from the dashboard
3. **MongoDB Atlas**: Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 📁 Project Structure

```
server/
├── src/
│   ├── controller/              # Request handlers
│   │   ├── auth.controller.js  # Authentication logic
│   │   └── post.controller.js  # Caption generation logic
│   ├── models/                  # MongoDB schemas
│   │   ├── user.model.js       # User schema
│   │   └── post.model.js       # Post/Caption schema
│   ├── routes/                  # API route definitions
│   │   ├── auth.routes.js      # Auth endpoints
│   │   └── post.routes.js      # Post endpoints
│   ├── service/                 # Business logic services
│   │   ├── ai.service.js       # Google Gemini AI integration
│   │   └── storage.service.js  # ImageKit storage integration
│   ├── middleware/              # Custom middleware
│   │   └── auth.middleware.js  # JWT authentication middleware
│   ├── db/                      # Database configuration
│   │   └── db.js               # MongoDB connection
│   └── app.js                   # Express app setup
├── server.js                    # Server entry point
├── .env                         # Environment variables (not in git)
├── .gitignore                   # Git ignore rules
└── package.json                 # Dependencies and scripts
```

---

## 🌐 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint             | Description                  | Auth Required |
| ------ | -------------------- | ---------------------------- | ------------- |
| POST   | `/api/auth/register` | Register a new user          | ❌            |
| POST   | `/api/auth/login`    | Login user and get JWT token | ❌            |
| GET    | `/api/auth/check`    | Verify authentication status | ✅            |

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response**: Sets an HTTP-only cookie with JWT token

---

### Post/Caption Routes (`/api/posts`)

| Method | Endpoint             | Description                       | Auth Required |
| ------ | -------------------- | --------------------------------- | ------------- |
| POST   | `/api/posts`         | Upload image and generate caption | ✅            |
| GET    | `/api/posts/history` | Get user's caption history        | ✅            |

#### Generate Caption

```http
POST /api/posts
Content-Type: multipart/form-data
Cookie: token=<jwt_token>

Form Data:
  image: <image_file>
```

**Response**:

```json
{
  "success": true,
  "data": {
    "_id": "post_id",
    "captions": "AI-generated caption text",
    "imageUrl": "https://ik.imagekit.io/...",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Get Caption History

```http
GET /api/posts/history
Cookie: token=<jwt_token>
```

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "_id": "post_id",
      "captions": "Caption text",
      "imageUrl": "https://ik.imagekit.io/...",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

## 🔧 Core Components

### 1. **Database Models**

#### User Model (`models/user.model.js`)

```javascript
{
  email: String (unique, required),
  password: String (hashed, required),
  createdAt: Date,
  updatedAt: Date
}
```

#### Post Model (`models/post.model.js`)

```javascript
{
  userId: ObjectId (ref: User),
  imageUrl: String (ImageKit URL),
  captions: String (AI-generated),
  createdAt: Date,
  updatedAt: Date
}
```

### 2. **Services**

#### AI Service (`service/ai.service.js`)

- Integrates with Google Gemini AI
- Analyzes uploaded images
- Generates contextual captions
- Handles AI API errors gracefully

#### Storage Service (`service/storage.service.js`)

- Uploads images to ImageKit
- Generates unique file names (UUID)
- Handles upload errors
- Returns CDN URLs for stored images

### 3. **Authentication Middleware**

The `auth.middleware.js` verifies JWT tokens from cookies and protects routes:

```javascript
// Verifies token
// Attaches user info to req.user
// Returns 401 if unauthorized
```

---

## 🔒 Security Features

1. **Password Hashing**: bcryptjs with salt rounds for secure password storage
2. **JWT Authentication**: HTTP-only cookies to prevent XSS attacks
3. **CORS Configuration**: Restricted to specific frontend origins
4. **Environment Variables**: Sensitive data stored in .env file
5. **Request Validation**: Input validation on all endpoints
6. **Error Handling**: Sanitized error messages (no stack traces in production)

---

## 🚀 Performance Optimizations

1. **Gzip Compression**: All responses compressed with `compression` middleware
2. **Database Indexing**: Indexes on frequently queried fields
3. **Connection Pooling**: MongoDB connection pool management
4. **CDN Delivery**: Images served via ImageKit CDN
5. **Async/Await**: Non-blocking asynchronous operations throughout

---

## 🐛 Error Handling

The API uses consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error info (dev only)"
}
```

Common HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (authentication required)
- `404` - Not Found
- `500` - Internal Server Error

---

## 🧪 Testing the API

### Using cURL

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  -c cookies.txt

# Generate Caption
curl -X POST http://localhost:3000/api/posts \
  -F "image=@/path/to/image.jpg" \
  -b cookies.txt
```

### Using Postman

1. Import the API endpoints
2. Set base URL to `http://localhost:3000`
3. For authenticated routes, the cookie is automatically handled after login

---

## 🌍 CORS Configuration

Update CORS settings in `src/app.js` based on your deployment:

```javascript
const corsOptions = {
  origin: "https://your-frontend-domain.com", // Change this
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Important for cookies
};
```

For local development, use:

```javascript
origin: "http://localhost:5173";
```

---

## 📊 Database Schema

### Collections

1. **users**

   - Stores user accounts
   - Indexed on email for fast lookups

2. **posts**
   - Stores generated captions and image references
   - Indexed on userId for efficient history queries
   - Sorted by createdAt (descending)

---

## 🚢 Deployment

### Deploying to Render / Railway / Heroku

1. **Set environment variables** in your deployment platform
2. **Update CORS origin** to match your frontend URL
3. **Use MongoDB Atlas** for production database
4. **Set `NODE_ENV=production`**

### Environment Variables for Production

Ensure all environment variables from `.env` are set in your deployment platform's dashboard.

---

## 📝 Development Notes

### Adding New Routes

1. Create controller in `controller/`
2. Define routes in `routes/`
3. Add middleware if needed
4. Register routes in `app.js`

### Database Connection

The database connection is established in `db/db.js` and called from `server.js` before starting the server.

---

## 🐛 Common Issues

### MongoDB Connection Failed

- Check if MongoDB is running locally
- Verify MONGODB_URI in .env
- For Atlas, check network access whitelist

### JWT Verification Failed

- Ensure JWT_SECRET is set and consistent
- Check cookie settings (httpOnly, sameSite)
- Verify token expiration

### Image Upload Failed

- Verify ImageKit credentials
- Check file size limits (default: 10MB)
- Ensure proper multipart/form-data headers

---

## 📖 Learn More

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Google Gemini AI Docs](https://ai.google.dev/docs)
- [ImageKit Documentation](https://docs.imagekit.io/)
- [JWT.io](https://jwt.io/)

---

## 🤝 Contributing

See the main project README for contribution guidelines.

---

<div align="center">
  Part of CaptionCraft - Made with ❤️ by Amit Vishwakarma
</div>
