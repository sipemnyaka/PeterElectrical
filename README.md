# Peter Electrical Website

A responsive business website built for **Peter Electrical**, an electrical services company based in Mthatha, South Africa.

🌐 **Live Site:** https://peterelectrical.co.za

---

## Project Overview

This project was built to establish a professional online presence for a local electrical contractor while applying modern web development, cloud infrastructure, event-driven architecture, deployment, and SEO best practices.

The website allows potential customers to learn about Peter Electrical's services, contact the business, and submit quote requests directly through the website.

Quote requests are stored in Azure Cosmos DB and trigger an event-driven notification workflow that sends the request to the business by email.

---

## Features

- Responsive mobile-first design
- Modern hero section with call-to-action buttons
- Services section
- About section
- Customer testimonials
- Contact section
- Quote request form
- Optional customer email address
- WhatsApp integration
- Google Maps integration
- Custom favicon
- SEO metadata
- Open Graph & Twitter Card support
- Structured Data (JSON-LD)
- `robots.txt`
- XML Sitemap
- HTTPS with custom domain
- Event-driven quote notifications
- Quote notification status tracking
- Duplicate notification protection

---

## Quote Request Workflow

The quote request system uses an event-driven architecture.

```text
Customer
   │
   ▼
Website Quote Form
   │
   ▼
Azure Function
   │
   ▼
Azure Cosmos DB
   │
   │ Change Feed
   ▼
Quote Notification Function
   │
   ▼
Resend Email API
   │
   ▼
Peter Electrical
