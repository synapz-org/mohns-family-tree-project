# Family Tree Management System

A comprehensive web-based family tree management system designed to coordinate large family reunion projects and facilitate multi-generational family engagement.

## 🎯 Project Overview

This system provides:
- **Branch Representative Management**: Tools for managing family segments and coordinating representatives
- **Intergenerational Story Collection**: Platform for recording and preserving family stories
- **Family Update Management**: Streamlined process for tracking births, deaths, marriages, and relocations
- **Personalized Book Generation**: Custom family history books with print-on-demand integration
- **Privacy-Preserving Medical/DNA Platform**: Secure handling of sensitive health information

## 🏗️ Architecture

```
family-tree-manager/
├── frontend/          # React.js + TypeScript + Next.js
├── backend/           # Node.js + Express.js + PostgreSQL
├── database/          # Database migrations and seeds
├── blockchain/        # Smart contracts and Web3 integration
└── docs/             # Documentation and API guides
```

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL >= 14.0
- Redis (for caching and sessions)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd family-tree-manager
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up the database**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. **Start development servers**
   ```bash
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## 📋 Development Phases

### Phase 1 (Months 1-3) - Foundation ✅
- [x] User authentication and role management
- [x] Basic family tree visualization
- [x] Representative assignment system
- [x] Simple update submission forms

### Phase 2 (Months 4-8) - Core Features 🚧
- [ ] Story collection platform with recording capabilities
- [ ] Mac Family Tree import/export functionality
- [ ] Notification and approval systems
- [ ] Mobile-responsive design

### Phase 3 (Months 9-12) - Advanced Features 📅
- [ ] Book generation and ordering system
- [ ] Privacy-preserving medical data platform
- [ ] Advanced analytics and reporting
- [ ] Reunion coordination tools

### Phase 4 (Future) - Enhancements 📅
- [ ] Mobile app development
- [ ] AI-powered story suggestions
- [ ] Advanced blockchain integration
- [ ] Multi-language support

## 🛠️ Tech Stack

### Frontend
- **React.js** with TypeScript
- **Next.js** for SSR and API routes
- **Tailwind CSS** for styling
- **React Query** for data fetching
- **Framer Motion** for animations

### Backend
- **Node.js** with Express.js
- **PostgreSQL** for relational data
- **Redis** for caching
- **JWT** for authentication
- **Multer** for file uploads

### Privacy & Security
- **Web3.js** for blockchain integration
- **AES-256** encryption
- **Zero-knowledge proofs** for medical data
- **HIPAA compliance** measures

### Integrations
- **Mac Family Tree** import/export
- **StoryCorps API** for story sharing
- **Stripe** for payments
- **Twilio** for SMS
- **SendGrid** for email

## 🔐 Security Features

- Comprehensive data encryption
- Role-based access control
- Two-factor authentication
- GDPR compliance
- HIPAA compliance for medical data
- Secure file upload with virus scanning

## 📊 Success Metrics

- Number of active branch representatives
- Story collection completion rate
- Family data accuracy improvements
- Book orders and satisfaction
- User engagement with privacy features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the [documentation](docs/) for detailed guides

## 🔄 Deployment

### Development
- Local development with Docker
- Hot reloading for both frontend and backend

### Staging
- AWS/GCP staging environment
- Automated testing and deployment

### Production
- Scalable cloud deployment with CDN
- Application performance monitoring
- Error tracking and logging 