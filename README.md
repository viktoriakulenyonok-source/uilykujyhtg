# Task Management System

A modern, responsive task management web application built with React, featuring authentication, task browsing, progress tracking, and a rewards marketplace.

## 🚀 Features

### Core Functionality
- **User Authentication** - Secure login and registration system
- **Task Bank** - Browse and filter available tasks by category and difficulty
- **My Tasks** - Track active, completed, and overdue tasks with progress indicators
- **Task Details** - Comprehensive task information with acceptance workflow
- **Marketplace** - Redeem points for rewards and gifts
- **User Profile** - Manage account settings and view statistics

### Design Features
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI** - Clean, intuitive interface with smooth animations
- **Real-time Updates** - Dynamic content updates and state management
- **Accessibility** - Built with accessibility best practices

### Technical Features
- **React 18** - Latest React features with hooks and functional components
- **React Router** - Client-side routing with nested routes
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Vite** - Fast build tool and development server
- **Lucide Icons** - Beautiful, customizable icons
- **Context API** - Global state management for authentication

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Application header with search and user menu
│   ├── Layout.jsx      # Main layout wrapper with sidebar
│   └── Sidebar.jsx     # Navigation sidebar
├── contexts/           # React contexts for state management
│   └── AuthContext.jsx # Authentication context
├── pages/              # Page components
│   ├── Auth.jsx        # Login/Registration page
│   ├── TaskBank.jsx    # Task browsing page
│   ├── MyTasks.jsx     # User's task management
│   ├── Marketplace.jsx # Rewards marketplace
│   ├── Profile.jsx     # User profile and settings
│   └── TaskDetail.jsx  # Individual task details
├── App.jsx             # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## 🎨 Design System

The application uses a consistent design system based on the provided CSS specifications:

### Color Palette
- **Primary**: Blue shades (#0ea5e9, #0284c7, etc.)
- **Gray**: Neutral grays for text and backgrounds
- **Red**: Accent color for errors and important actions (#FF0000)

### Typography
- **Font Family**: SF Pro Text (fallback to system fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Frames**: White background cards with subtle shadows
- **Arrows**: Red border elements for visual flow
- **Buttons**: Primary and secondary button styles
- **Inputs**: Consistent form field styling

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

## 📱 Responsive Design

The application is fully responsive and includes:

- **Mobile-first approach** with progressive enhancement
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-friendly** interface elements
- **Optimized navigation** for mobile devices

## 🔐 Authentication

The authentication system includes:

- **Mock authentication** for demonstration purposes
- **Local storage** for session persistence
- **Protected routes** with automatic redirects
- **User context** for global state management

## 🎯 Task Management Features

### Task Bank
- Browse available tasks with filtering and search
- View task details, requirements, and attachments
- Accept tasks with confirmation modal
- Category-based organization

### My Tasks
- Track task progress with visual indicators
- Filter by status (active, completed, overdue)
- Update progress and manage deadlines
- View task history and statistics

### Task Details
- Comprehensive task information
- Requirements and deliverables
- File attachments and downloads
- Client contact information

## 🎁 Marketplace

The rewards marketplace features:

- **Point-based system** for task completion
- **Category filtering** for different reward types
- **Popular items** highlighting
- **Redemption workflow** with confirmation
- **Stock management** for availability

## 🚀 Deployment

To deploy the application:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service
   - Netlify, Vercel, or any static hosting service
   - Configure routing for SPA (Single Page Application)

## 🔮 Future Enhancements

Potential improvements and features:

- **Backend Integration** - Real API endpoints and database
- **Real-time Updates** - WebSocket integration for live updates
- **File Upload** - Task submission with file attachments
- **Notifications** - Email and push notifications
- **Advanced Search** - Full-text search with filters
- **Analytics** - User behavior and task analytics
- **Mobile App** - React Native or PWA implementation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon set
- **React Team** for the amazing framework
- **Vite** for the fast build tool

---

**Note**: This is a demonstration application with mock data. In a production environment, you would integrate with real backend services and implement proper security measures.