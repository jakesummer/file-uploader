# File Uploader

A full-stack, cloud-based file hosting and storage application (similar to Google Drive or Dropbox). Users can create folders, upload files of any format, navigate a nested file system, and securely download or delete their files.

**Live Site**: https://file-uploader-uazg.onrender.com

![Main dashboard](https://i.imgur.com/3llU9Cj.png)

---

## Features

- Secure user sign-up, sign-in, and sign-out
  - Uses Passport.js for session-based authentication persisted in the database
- Create folders and subfolders
  - Breadcrumb-style navigation bar dynamically tracks nested paths
- Upload files of any format to Supabase Storage
- Download files directly from the cloud
- Delete folders and files
  - Deleting a folder recursively deletes all subfolders, database records, and their corresponding cloud objects from the storage bucket
- Displays metadata such as file size, upload date, and a dynamic file icon which matches the file type (PDF, image, video, zip, etc.)
- Fully polished and animated UI
- Fully responsive UI which works on all screen sizes
- Custom error pages to handle all errors

---

## Tech Stack

- **Runtime Environment:** Node.js
- **Backend Framework:** Express
- **Asset Compiler / Dev Server:** Vite
- **Database:** PostgreSQL (hosted on Supabase)
- **ORM:** Prisma
- **Templating Engine:** EJS (Embedded JavaScript)
- **Authentication:** Passport.js & express-session
- **File Upload Middleware:** Multer & multer-s3
- **Cloud Storage:** Supabase Storage (via AWS S3 SDK)
- **Programming Language:** JavaScript
- **UI Library:** Web Awesome
- **Styling:** CSS

---

## Getting Started

To run the site locally, follow these steps:

### Prerequisites

- Node.js and npm installed
- A Supabase account (for database and storage bucket)

### Installation and Setup

1. Clone this repository:

```
git clone https://github.com/jakesummer/file-uploader.git
cd file-uploader
```

2. Run `npm install` to install dependencies
3. Configure environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL="postgresql://postgres.[your-project-id]:[PASSWORD]@aws-0-[region].pooler.supabase.com:5432/postgres"
   SESSION_SECRET="session-secret-for-authentication"
   SUPABASE_STORAGE_REGION="your-bucket-region"
   SUPABASE_STORAGE_ENDPOINT="https://[your-project-id].storage.supabase.co/storage/v1/s3"
   SUPABASE_STORAGE_ACCESS_KEY="your-s3-access-key"
   SUPABASE_STORAGE_SECRET_ACCESS_KEY="your-s3-secret-key"
   ```
4. Run `npx prisma migrate dev` to deploy your database schema
5. Start the application with `npm run dev`
6. Navigate to http://localhost:3000
