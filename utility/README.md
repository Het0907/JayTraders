# Jay Traders - Standalone Product Management Utility

A dedicated, standalone React web application for adding and managing products using the **Category → Product → Brand** hierarchy.

## Features

- **Category → Product → Brand Workflow**:
  1. Select or create Category / Subcategory
  2. Define Product Title, Description, and Image
  3. Set Brand Name (e.g., Mangalam, Superon, Taparia) and Size/Price Variants
- **Live Store Card Preview**: Shows real-time preview of how the brand/product card will render on the store.
- **Catalog Explorer**: Search, filter, and manage existing products in the MongoDB database.
- **Configurable API Endpoint**: Easily switch between `http://localhost:5000` and production `https://jaytraders-5.onrender.com`.
- **Standalone Deployment**: Can be built and deployed independently to Vercel, Netlify, or Render.

## Getting Started

### 1. Install Dependencies
```bash
cd utility
npm install
```

### 2. Run Locally
```bash
npm start
```
App will open at `http://localhost:3000`.

### 3. Deploy Separately
To create a static production bundle for independent hosting:
```bash
npm run build
```
The output `build/` folder can be uploaded directly to Vercel, Netlify, Render Static Site, or GitHub Pages.
