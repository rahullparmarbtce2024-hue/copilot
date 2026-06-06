# AI College Copilot

A comprehensive SaaS web application designed to help students with academic tasks using AI-powered features.

## Features

### 1. **User Authentication**
- Secure signup and login
- Email verification
- Password reset functionality
- Session management

### 2. **Dashboard**
- Personal student dashboard
- Quick stats on assignments, notes, and questions
- Recent activity timeline
- Dark/Light mode toggle

### 3. **Assignment Generator**
- Input topic, subject, word count, education level, and format
- AI generates plagiarism-free assignments
- Includes proper headings, introduction, conclusion, and references
- Export to PDF and DOCX formats
- Assignment history and drafts

### 4. **Notes Generator**
- Generate concise study notes from topics
- Organized by subjects
- Key points extraction
- Multiple difficulty levels

### 5. **Question Answer Generator**
- Generate 2-mark, 5-mark, and 10-mark answers
- Multiple question types
- Detailed explanations
- Difficulty levels

### 6. **Previous Paper Analyzer**
- Upload question papers (PDF/DOCX)
- AI analyzes important topics
- Topic frequency analysis
- Preparation suggestions

### 7. **Admin Panel**
- User management
- Activity logs
- API usage tracking
- System statistics

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL with Prisma ORM
- **AI**: OpenAI API (GPT-3.5-turbo)
- **Authentication**: NextAuth.js
- **File Export**: docx, pdfkit
- **UI Components**: Lucide React Icons
- **State Management**: Zustand
- **Notifications**: React Hot Toast
- **Theme**: Next Themes

## Installation Guide

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL 13+
- OpenAI API Key
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/rahullparmarbtce2024-hue/copilot.git
cd copilot
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Setup Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local` and add:
- Database URL
- OpenAI API Key
- JWT Secret
- NextAuth Secret

### Step 4: Setup Database
```bash
# Generate Prisma Client
npm run prisma:generate

# Create database tables
npm run prisma:push

# Or run migrations
npm run prisma:migrate
```

### Step 5: Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### User
- id, email, password, fullName, avatar, educationLevel, institution, phone, bio
- isAdmin, isActive, emailVerified, timestamps

### Assignment
- id, userId, title, topic, subject, wordCount, educationLevel, format
- content, introduction, conclusion, references, plagiarismScore
- status, exportFormats, timestamps

### Note
- id, userId, topic, subject, content, keyPoints, difficulty, timestamps

### Question
- id, userId, topic, subject, marks (2/5/10), question, answer
- explanation, difficulty, type, timestamps

### PaperUpload
- id, userId, fileName, filePath, subject, year, board
- importantTopics, analysis, fileSize, timestamps

### Session
- id, sessionToken, userId, expires, timestamps

### AdminLog
- id, action, userId, details, ipAddress, createdAt

### ApiUsage
- id, userId, endpoint, method, tokens, cost, responseTime, createdAt

## Folder Structure

```
copilot/
├── pages/
│   ├── api/
│   │   ├── auth/
│   │   ├── assignments/
│   │   ├── notes/
│   │   ├── questions/
│   │   ├── papers/
│   │   └── admin/
│   ├── auth/
│   ├── dashboard/
│   ├── assignments/
│   ├── notes/
│   ├── questions/
│   ├── papers/
│   ├── admin/
│   └── index.tsx
├── components/
│   ├── common/
│   ├── auth/
│   ├── dashboard/
│   ├── assignments/
│   ├── notes/
│   ├── questions/
│   ├── papers/
│   └── admin/
├── lib/
│   ├── prisma.ts
│   ├── openai.ts
│   ├── auth.ts
│   ├── jwt.ts
│   └── validators.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useAssignments.ts
│   └── ...
├── types/
│   ├── index.ts
│   └── api.ts
├── utils/
│   ├── api.ts
│   ├── export.ts
│   └── helpers.ts
├── styles/
│   └── globals.css
├── public/
│   └── assets/
├── prisma/
│   └── schema.prisma
├── .env.example
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

## Deployment

### Using Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import repository
4. Add environment variables
5. Deploy

### Using Docker

```bash
docker build -t ai-college-copilot .
docker run -p 3000:3000 ai-college-copilot
```

### Using Traditional Hosting

1. Build the project: `npm run build`
2. Start server: `npm start`
3. Use PM2 for process management
4. Setup Nginx reverse proxy

## API Documentation

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Assignments
- `GET /api/assignments` - List assignments
- `POST /api/assignments` - Create assignment
- `GET /api/assignments/[id]` - Get assignment
- `PUT /api/assignments/[id]` - Update assignment
- `DELETE /api/assignments/[id]` - Delete assignment
- `POST /api/assignments/[id]/export` - Export assignment

### Notes
- `GET /api/notes` - List notes
- `POST /api/notes` - Create notes
- `GET /api/notes/[id]` - Get notes
- `PUT /api/notes/[id]` - Update notes
- `DELETE /api/notes/[id]` - Delete notes

### Questions
- `GET /api/questions` - List questions
- `POST /api/questions` - Create question
- `GET /api/questions/[id]` - Get question
- `PUT /api/questions/[id]` - Update question
- `DELETE /api/questions/[id]` - Delete question

### Paper Upload
- `POST /api/papers/upload` - Upload paper
- `GET /api/papers` - List uploaded papers
- `GET /api/papers/[id]` - Get paper analysis
- `DELETE /api/papers/[id]` - Delete paper

### Admin
- `GET /api/admin/users` - List all users
- `GET /api/admin/stats` - System statistics
- `GET /api/admin/logs` - Activity logs
- `POST /api/admin/users/[id]/ban` - Ban user

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://...

# OpenAI
OPENAI_API_KEY=sk_...

# Authentication
NEXT_PUBLIC_JWT_SECRET=your_secret
JWT_EXPIRY=7d
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=AI College Copilot

# File Upload
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=pdf,doc,docx

# AI Configuration
AI_MODEL=gpt-3.5-turbo
AI_MAX_TOKENS=2000
AI_TEMPERATURE=0.7
```

## Performance Optimization

- ✅ Code splitting and lazy loading
- ✅ Image optimization
- ✅ Database query optimization with Prisma
- ✅ API response caching
- ✅ Client-side state management with Zustand
- ✅ Server-side rendering for SEO
- ✅ Compressed bundle with SWC
- ✅ Progressive Web App capabilities

## Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT-based authentication
- ✅ CSRF protection
- ✅ SQL injection prevention (Prisma)
- ✅ XSS protection
- ✅ Rate limiting on API endpoints
- ✅ Input validation
- ✅ Admin role-based access control

## Development Tips

### Useful Commands
```bash
# Development
npm run dev

# Build
npm run build

# Start production server
npm start

# Prisma Studio (Visual Database Browser)
npm run prisma:studio

# Linting
npm run lint
```

### Database Management
```bash
# Create migration
npm run prisma:migrate

# Generate Prisma Client
npm run prisma:generate

# Open Prisma Studio
npm run prisma:studio

# Push schema to database
npm run prisma:push
```

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env.local
- Verify database user permissions

### OpenAI API Errors
- Verify API key is correct
- Check API key has credits
- Monitor API rate limits

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node version compatibility

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - see LICENSE file for details

## Support

For support, email: rahullparmar.btce2024@iar.ac.in

## Author

**Rahul Parmar**
- GitHub: [@rahullparmarbtce2024-hue](https://github.com/rahullparmarbtce2024-hue)
- Email: rahullparmar.btce2024@iar.ac.in
