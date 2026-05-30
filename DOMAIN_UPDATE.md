# Domain Configuration Update - mohns.ca

## 🌐 Domain Configuration Changes

**New Domain:** `mohns.ca`  
**Date:** July 26, 2025

---

## 📝 Updated Files

### Frontend Configuration
- **`frontend/next.config.js`**
  - Updated image domains to include `mohns.ca` and `api.mohns.ca`
  - Removed old `family-tree-manager.com` references

- **`frontend/app/layout.tsx`**
  - Updated metadata base URL to `https://mohns.ca`
  - Updated OpenGraph URLs and site name
  - Updated Twitter card metadata
  - Updated canonical URL
  - Updated page titles and templates

### Backend Configuration
- **`backend/src/server.js`**
  - Updated CORS origin to default to `https://mohns.ca`
  - Maintains localhost support for development

### Environment Configuration
- **`env.example`**
  - Updated `FRONTEND_URL` to `https://mohns.ca`
  - Updated email configuration to use `noreply@mohns.ca`

### Package Configuration
- **`package.json`**
  - Updated description to include "Mohns Family Tree"
- **`frontend/package.json`**
  - Updated name to `mohns-family-tree-frontend`
- **`backend/package.json`**
  - Updated name to `mohns-family-tree-backend`
  - Updated description

---

## 🔧 Production URLs

### Primary URLs
- **Main Application:** https://mohns.ca
- **API Endpoints:** https://api.mohns.ca
- **Email:** noreply@mohns.ca

### Development URLs (unchanged)
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:8000
- **API Docs:** http://localhost:8000/api-docs

---

## 🚀 Deployment Considerations

### DNS Configuration
- **A Record:** `mohns.ca` → Production server IP
- **CNAME Record:** `api.mohns.ca` → `mohns.ca` (or separate API server)
- **MX Record:** For email functionality

### SSL Certificates
- **Primary:** `mohns.ca`
- **API:** `api.mohns.ca`
- **Wildcard:** `*.mohns.ca` (optional)

### Environment Variables
```bash
# Production
FRONTEND_URL=https://mohns.ca
API_URL=https://api.mohns.ca
SENDGRID_FROM_EMAIL=noreply@mohns.ca

# Development
FRONTEND_URL=http://localhost:3000
API_URL=http://localhost:8000
```

---

## 📱 SEO & Social Media

### Updated Metadata
- **Page Title:** "Mohns Family Tree - Family History & Stories"
- **Site Name:** "Mohns Family Tree"
- **Canonical URL:** https://mohns.ca
- **OpenGraph:** Updated for social media sharing
- **Twitter Cards:** Optimized for Twitter sharing

### Search Engine Optimization
- Updated meta descriptions
- Updated keywords for family tree and genealogy
- Proper canonical URLs
- Structured data ready for implementation

---

## 🔄 Next Steps

1. **DNS Setup:** Configure domain DNS records
2. **SSL Certificates:** Obtain and install SSL certificates
3. **Email Configuration:** Set up email sending with SendGrid
4. **Production Deployment:** Deploy to production servers
5. **Monitoring:** Set up uptime monitoring for mohns.ca

---

**Note:** All development functionality remains unchanged. The domain updates only affect production configuration and metadata. 