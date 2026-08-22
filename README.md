# ⚡ Peter Electrical Website

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
- robots.txt
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
````

When a customer submits a quote request:

1. The website sends the request to an Azure Function.
2. The request is stored in Azure Cosmos DB.
3. Cosmos DB Change Feed detects the new document.
4. The notification Azure Function processes the new quote.
5. Resend sends an email notification to Peter Electrical.
6. The quote document is updated with a notification status.

Notification status is tracked using values such as:

* `SENT`
* `FAILED`

The notification function also checks whether a quote has already been successfully notified to help prevent duplicate emails.

---

## Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* Lucide Icons
* Google Fonts (Poppins)

### Backend

* Node.js
* Azure Functions
* Azure Cosmos DB
* Cosmos DB Change Feed
* Resend Email API

---

## Hosting & Infrastructure

The project is hosted on **Azure Static Web Apps** with a custom domain.

### Infrastructure

* Azure Static Web Apps
* Azure Functions
* Azure Cosmos DB
* Azure-managed SSL certificate
* Custom Domain (`peterelectrical.co.za`)
* Automatic HTTPS
* HTTP → HTTPS redirect
* `www` → non-www redirect
* GitHub Actions continuous deployment

---

## SEO

Implemented SEO best practices including:

* Semantic HTML
* Meta description
* Open Graph tags
* Twitter Card metadata
* Canonical URL
* Structured Data (Electrician Schema)
* `robots.txt`
* XML Sitemap
* Google Search Console verification

---

## Deployment

The website is automatically deployed from GitHub to Azure Static Web Apps using GitHub Actions.

Deployment includes:

* Continuous Deployment
* Automatic SSL
* Custom Domain
* Production hosting
* Azure Functions deployment
* API dependency installation

The application source code and deployment configuration are maintained in GitHub.

---

## Project Structure

```text
.
├── api/
│   ├── src/
│   │   └── functions/
│   │       ├── quote.js
│   │       └── quoteNotification.js
│   ├── package.json
│   └── host.json
│
├── css/
│   └── styles.css
│
├── images/
│
├── js/
│
├── favicon/
│
├── index.html
├── robots.txt
├── sitemap.xml
└── README.md
```

---

## Lessons Learned

During this project I gained hands-on experience with:

* Azure Static Web Apps
* Azure Functions
* Azure Cosmos DB
* Cosmos DB Change Feed
* Event-driven architecture
* REST/API integration
* Email API integration
* Custom DNS configuration
* Domain management
* SSL certificates
* GitHub Actions
* Continuous deployment
* Google Search Console
* Sitemap generation
* `robots.txt` configuration
* Technical SEO
* Canonical URLs
* Structured Data
* Cloud deployment troubleshooting

---

## Future Improvements

Potential future improvements include:

* Gallery / recent work section
* Multi-page architecture
* Blog / electrical advice section
* Analytics dashboard
* Application monitoring
* Performance monitoring
* Improved quote management
* Customer confirmation emails

---

## Author

**Sipesande Mnyaka**

Senior Integration & Production Engineer | Site Reliability Engineer | Azure Certified

* GitHub: [https://github.com/sipemnyaka/PeterElectrical](https://github.com/sipemnyaka/PeterElectrical)
* LinkedIn: [https://www.linkedin.com/in/sipesande-mnyaka-49a592b4/](https://www.linkedin.com/in/sipesande-mnyaka-49a592b4/)

---

## Live Website

[https://peterelectrical.co.za](https://peterelectrical.co.za)

```
```
