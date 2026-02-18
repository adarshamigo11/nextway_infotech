# Nextway Infotech - Setup Guide

## Project Overview

Nextway Infotech is a premium financial services website built with:
- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS 4
- **Backend**: Node.js API Routes, MongoDB with GridFS
- **Authentication**: JWT-based admin authentication
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui

## Prerequisites

- Node.js 18+ and pnpm
- MongoDB account (MongoDB Atlas or local instance)
- Modern web browser

## Installation & Setup

### 1. Clone & Install Dependencies

```bash
# Install dependencies
pnpm install
```

### 2. Environment Configuration

Create a `.env.local` file in the project root:

```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your values
```

Required environment variables:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Secret key for admin authentication (keep secure)

### 3. Database Setup

The application uses MongoDB with GridFS for file storage. No manual migrations needed - collections are created automatically on first use.

To seed the admin user, visit:
```
http://localhost:3000/api/admin/seed
```

This creates:
- **Username**: admin
- **Password**: admin@2026

### 4. Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
app/
├── page.tsx                 # Homepage
├── about/                   # About page
├── contact/                 # Contact form
├── kyc/                     # KYC verification
├── blogs/                   # Blog listing
├── careers/                 # Careers page
├── services/                # Services listing
├── admin/                   # Admin dashboard
│   ├── page.tsx            # Login page
│   └── dashboard/          # Dashboard with tabs
└── api/                     # Backend API routes

components/
├── navbar.tsx              # Navigation with service dropdown
├── footer.tsx              # Footer
├── contact-form.tsx        # Contact form component
├── kyc-form.tsx            # KYC form with file uploads
├── careers-content.tsx     # Careers section with job listings
├── blogs-list.tsx          # Blog list with SWR
├── admin/                  # Admin panel components
│   ├── contacts-table.tsx  # Contact submissions table
│   ├── kyc-table.tsx       # KYC submissions table
│   ├── applicants-table.tsx# Job applicants table
│   ├── blogs-manager.tsx   # Blog CRUD interface
│   └── careers-manager.tsx # Career posting CRUD

lib/
├── mongodb.ts              # MongoDB connection
├── gridfs.ts               # File upload/download utilities
├── auth.ts                 # JWT authentication
└── services-data.ts        # Service descriptions
```

## Features

### Public Features
- **Homepage**: Hero, services overview, testimonials, mission & vision
- **About**: Company info, team stats, values, location map
- **Services**: Service directory with 6 offerings (Algo Trading, Software Dev, HRM, School Management, Tour & Travel, Law Firm)
- **Contact**: Contact form with MongoDB persistence
- **KYC**: Document upload (PAN, Aadhaar, KYC Form, Signature) with GridFS storage
- **Blogs**: Blog listing with read more functionality
- **Careers**: Job listings with apply functionality

### Admin Dashboard (/admin)
- **Authentication**: JWT-based login (username: admin, password: admin@2026)
- **Contact Tab**: View all contact form submissions
- **KYC Tab**: View and download uploaded KYC documents
- **Careers Tab**: Create, edit, delete job postings
- **Applicants Tab**: View job applications with resume download
- **Blogs Tab**: Create, edit, publish blog posts

## API Routes

### Public APIs
- `GET /api/blogs` - Get all blog posts
- `GET /api/careers` - Get active job listings
- `POST /api/contact` - Submit contact form
- `POST /api/kyc` - Upload KYC documents
- `POST /api/careers/apply` - Apply for a job

### Admin APIs (Authenticated)
- `GET /api/admin/contacts` - Get contact submissions
- `GET /api/admin/kyc` - Get KYC submissions
- `POST /api/admin/kyc` - Get KYC details
- `GET /api/admin/kyc/[id]/file` - Download KYC file
- `GET /api/admin/careers` - Get all job postings
- `POST /api/admin/careers` - Create job posting
- `PUT /api/admin/careers/[id]` - Update job posting
- `DELETE /api/admin/careers/[id]` - Delete job posting
- `GET /api/admin/blogs` - Get all blog posts
- `POST /api/admin/blogs` - Create blog post
- `PUT /api/admin/blogs/[id]` - Update blog post
- `DELETE /api/admin/blogs/[id]` - Delete blog post
- `GET /api/admin/applicants` - Get job applicants
- `DELETE /api/admin/applicants/[id]` - Remove applicant
- `POST /api/admin/login` - Admin login
- `POST /api/admin/seed` - Seed admin user

## Design System

### Colors
- **Primary**: Navy Blue (#0A1F44)
- **Accent**: Emerald Green (#2ECC71)
- **Background**: White/Light Gray (#F4F6F8)

### Typography
- **Headings**: Poppins (400, 500, 600, 700 weights)
- **Body**: Inter

### Components
- Glassmorphism cards with subtle animations
- Smooth Framer Motion transitions
- Responsive mobile-first design

## MongoDB Collections

The application creates these collections automatically:

- **admins**: Admin user accounts
- **contacts**: Contact form submissions
- **kyc**: KYC document submissions (file IDs stored)
- **careers**: Job postings
- **applicants**: Job applications (resume file IDs stored)
- **blogs**: Blog posts
- **fs.files** & **fs.chunks**: GridFS file storage (auto-created)

## Deployment

### To Vercel:
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Environment Variables (Vercel):
- `MONGODB_URI`
- `JWT_SECRET`

## Common Tasks

### Add a New Service
Edit `lib/services-data.ts` and add a new service object with slug and description.

### Create a Blog Post
1. Login to admin dashboard (/admin)
2. Go to Blogs tab
3. Click "+ New Post"
4. Fill in title, content, author, and optional cover image

### Create a Job Posting
1. Login to admin dashboard
2. Go to Careers tab
3. Click "+ New Posting"
4. Fill in job details, requirements, and set as active

### Download Uploaded Files
Navigate to admin dashboard, select KYC or Applicants tab, and click on file links to download.

## Troubleshooting

### MongoDB Connection Issues
- Verify `MONGODB_URI` in `.env.local`
- Check MongoDB Atlas network access whitelist
- Ensure database name in URI matches

### Admin Login Issues
- Run `/api/admin/seed` to create admin user
- Clear cookies: `document.cookie = "admin_token=; path=/; max-age=0"`
- Check JWT_SECRET matches between login/verification

### File Upload Issues
- Max file size: 5MB
- Ensure GridFS is enabled in MongoDB
- Check MongoDB disk space

## Support

For issues or questions:
- Check console logs for detailed error messages
- Verify all environment variables are set
- Ensure MongoDB connection is active

---

**Version**: 1.0.0  
**Last Updated**: 2026
