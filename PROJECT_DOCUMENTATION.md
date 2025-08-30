# CentUp - Mobile Investment Application

## Project Overview

CentUp is a modern mobile-first investment application built with Next.js, React, and TypeScript. The application simulates an iPhone experience on desktop while providing native mobile responsiveness. It's designed as a prototype for a financial investment platform that allows users to manage multiple investment funds, track performance, and make deposits/withdrawals.

## Key Features

### Core Functionality
- **Multi-Fund Investment Management**: Users can invest in different funds (Growth, Balanced, Prudent)
- **Real-time Performance Tracking**: Interactive charts showing fund performance over various timeframes
- **Deposit & Withdrawal System**: Support for manual deposits, automatic round-ups, and recurring investments
- **Activity Tracking**: Complete transaction history with categorized entries
- **Achievement System**: Gamified experience with rewards for investment milestones
- **User Profile Management**: Personal settings and investment preferences

### Mobile-First Design Philosophy

#### iPhone Layout Implementation (`components/layouts/iphone-layout.tsx`)
The application uses a sophisticated dual-layout system:

1. **Mobile View (< 768px)**: 
   - Full-screen native mobile experience
   - Direct content rendering without iPhone frame
   - Touch-optimized interactions

2. **Desktop View (≥ 768px)**:
   - iPhone 14 Pro simulation with physical device frame
   - 400x800px viewport with rounded corners (60px border-radius)
   - Authentic iPhone notch implementation
   - Shadow effects and home indicator
   - Information panel showing project details and credits

#### Responsive Breakpoints
- Mobile breakpoint: 768px (defined in `hooks/use-mobile.tsx`)
- Uses `useIsMobile()` hook for dynamic responsive behavior
- Tailwind CSS classes with `md:` prefix for desktop-specific styles

## Technical Architecture

### Technology Stack
- **Framework**: Next.js 15.2.4 with App Router
- **UI Framework**: React 19 with TypeScript 5
- **Styling**: Tailwind CSS 3.4.17 with custom design system
- **Component Library**: Radix UI primitives
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **Animations**: Tailwind CSS Animate
- **Fonts**: Geist Sans & Mono

### Project Structure

```
/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with iPhone wrapper
│   ├── page.tsx                 # Main app with routing logic
│   └── globals.css              # Global styles and CSS variables
├── components/
│   ├── layouts/                 # Layout components
│   │   ├── iphone-layout.tsx    # iPhone simulation wrapper
│   │   └── main-app-layout.tsx  # App content layout
│   ├── pages/                   # Page components (SPA routing)
│   │   ├── home-page.tsx        # Dashboard with fund overview
│   │   ├── performance-page.tsx # Detailed performance analytics
│   │   ├── deposit-page.tsx     # Deposit/withdrawal interface
│   │   ├── activity-page.tsx    # Transaction history
│   │   ├── profile-page.tsx     # User settings
│   │   ├── missions-page.tsx    # Achievement system
│   │   ├── login-page.tsx       # Authentication (mockup)
│   │   └── signup-page.tsx      # Registration (mockup)
│   └── ui/                      # Reusable UI components
│       ├── nav-bar.tsx          # Bottom navigation
│       ├── chat-bot.tsx         # AI assistant interface
│       └── [various].tsx        # Shadcn/ui components
├── contexts/
│   └── theme-context.tsx        # Dark/light theme management
├── data/
│   └── mockData.ts              # Static data for funds, transactions
├── hooks/
│   └── use-mobile.tsx           # Mobile detection hook
├── types/
│   └── index.ts                 # TypeScript type definitions
└── utils/
    └── helpers.tsx              # Utility functions
```

### State Management
- **Local State**: React `useState` for component-level state
- **Theme Management**: Custom context provider for dark/light mode
- **Navigation**: Single-page application with tab-based routing
- **Data**: Static mock data simulating API responses

### Design System

#### Color Palette
```css
/* CentUp Brand Colors */
centup-green-dark: #4C9282    /* Primary brand color */
centup-green-light: #78BEAF   /* Secondary brand color */
centup-white: #ffffff         /* Background light */
centup-black: #0e0f0f         /* Text dark */
```

#### Typography
- **Primary Font**: Geist Sans (modern, clean typeface)
- **Monospace Font**: Geist Mono (for numerical data)
- **Font Sizes**: Responsive scale from text-xs to text-2xl

#### Spacing & Layout
- **Container**: Centered with responsive padding
- **Mobile Padding**: 16px horizontal (px-4)
- **Content Spacing**: 16px vertical gaps (space-y-4)
- **iPhone Frame**: 400x800px with 60px border-radius

## Component Architecture

### Layout Hierarchy
1. **Root Layout** (`app/layout.tsx`): Wraps entire app in iPhone layout
2. **iPhone Layout** (`components/layouts/iphone-layout.tsx`): Device simulation
3. **Main App Layout** (`components/layouts/main-app-layout.tsx`): App structure
4. **Page Components**: Individual screens with specific functionality

### Navigation System
- **Bottom Tab Navigation**: 5 primary sections (Home, Performance, Deposit, Activity, Profile)
- **Client-Side Routing**: State-based page switching without URL changes
- **Conditional Navigation**: Hidden on auth pages (login/signup)

### Mobile Optimizations

#### Touch Interactions
- **Button Sizing**: Minimum 44px touch targets
- **Spacing**: Generous padding for finger navigation
- **Hover States**: Disabled on mobile devices

#### Scrolling
- **Custom Scrollbars**: Hidden with `.scrollbar-hide` utility
- **Overscroll Behavior**: Controlled to prevent iOS bounce
- **Safe Areas**: iPhone notch and home indicator consideration

#### Performance
- **Image Optimization**: Next.js automatic optimization
- **Code Splitting**: Automatic with Next.js App Router
- **CSS-in-JS**: Minimal runtime with Tailwind

## Data Structure

### Fund Model
```typescript
interface Fund {
  id: string
  name: string
  amount: number
  performance: number
  color: string
  description: string
  keyData: {
    risk: string
    minInvestment: string
    fees: string
    category: string
  }
}
```

### Transaction Model
```typescript
interface Transaction {
  id: string
  type: 'deposit' | 'withdrawal' | 'auto-round' | 'recurring'
  amount: number
  fund: string
  date: string
  description: string
}
```

### Achievement Model
```typescript
interface Achievement {
  id: string
  title: string
  description: string
  reward: number
  completed: boolean
  progress: number
  maxProgress: number
}
```

## Mobile Layout Implementation Details

### iPhone Frame Specifications
- **Outer Container**: 400x800px with black border (2px padding)
- **Inner Screen**: Full height with 50px border-radius
- **Notch**: 128px width, 24px height, centered at top
- **Home Indicator**: 128px width, 4px height, centered at bottom
- **Colors**: Black frame with white indicator

### Responsive Behavior
```css
/* Mobile-first approach */
.mobile-hidden {
  @apply md:hidden;    /* Hide on desktop */
}

.desktop-hidden {
  @apply hidden md:flex;    /* Show only on desktop */
}
```

### Viewport Considerations
- **Mobile Viewport**: Uses full device width/height
- **Desktop Viewport**: Constrained to iPhone dimensions
- **Content Overflow**: Scrollable within frame boundaries

## Development Guidelines

### Code Style
- **TypeScript**: Strict mode enabled
- **Component Structure**: Functional components with hooks
- **Props Interface**: Explicit typing for all component props
- **CSS Classes**: Tailwind utility-first approach

### File Naming
- **Components**: PascalCase (e.g., `HomePage.tsx`)
- **Utilities**: camelCase (e.g., `helpers.tsx`)
- **Types**: Descriptive interfaces (e.g., `Fund`, `Transaction`)

### Best Practices
- **Mobile-First**: Design for mobile, enhance for desktop
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance**: Lazy loading and code splitting
- **Type Safety**: Comprehensive TypeScript coverage

## Testing Strategy
- **Component Testing**: Individual component functionality
- **Integration Testing**: Page-level user flows
- **Responsive Testing**: Cross-device compatibility
- **Performance Testing**: Mobile network conditions

## Deployment Considerations
- **Build Optimization**: Next.js automatic optimizations
- **Asset Optimization**: Image and font optimization
- **Caching Strategy**: Static generation where possible
- **Mobile Performance**: First contentful paint optimization

## Future Enhancements
- **Real API Integration**: Replace mock data with live endpoints
- **Authentication**: Implement proper user authentication
- **Push Notifications**: Mobile app notifications
- **Offline Support**: Progressive Web App capabilities
- **Advanced Analytics**: Real-time market data integration

---

**Project Information:**
- **Client**: CentUp
- **Created by**: Hanay Joud
- **In collaboration with**: Benjamin Bruneau
- **Supervised by**: JEECE
- **Project Type**: Mobile Application Mockup (Figma + Interactive Version)