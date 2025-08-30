# CLAUDE.md - Development Guide for CentUp

## Project Overview
CentUp is a mobile-first investment application built with Next.js, featuring an iPhone simulation layout for desktop users while maintaining native mobile responsiveness. The application provides investment fund management, performance tracking, and transaction capabilities.

## Key Architecture Insights

### Mobile Layout System
The project implements a sophisticated dual-layout approach:

1. **iPhone Layout Component** (`components/layouts/iphone-layout.tsx:10-95`):
   - Desktop: Renders an iPhone 14 Pro frame (400x800px) with authentic notch and home indicator
   - Mobile: Full-screen native experience without frame
   - Breakpoint: 768px using Tailwind's `md:` prefix

2. **Responsive Strategy**:
   - Mobile-first design philosophy
   - Uses `useIsMobile()` hook (`hooks/use-mobile.tsx:5-19`) for dynamic behavior
   - Custom scrollbar hiding with `.scrollbar-hide` utility

### Component Architecture
- **Page Routing**: Single-page application with tab-based navigation using state management
- **Layout Hierarchy**: RootLayout → IPhoneLayout → MainAppLayout → PageComponents
- **State Management**: Local React state with custom theme context

### Technology Stack
- Next.js 15.2.4 with App Router
- React 19 + TypeScript 5
- Tailwind CSS 3.4.17 with custom CentUp design system
- Radix UI components for accessibility
- Recharts for data visualization

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## File Structure Guide

### Core Components
- `components/layouts/iphone-layout.tsx` - iPhone simulation wrapper
- `components/layouts/main-app-layout.tsx` - App content structure with navigation
- `components/ui/nav-bar.tsx` - Bottom tab navigation (5 tabs)
- `components/pages/` - Individual page components (home, performance, deposit, etc.)

### Styling System
- `app/globals.css` - CSS variables and custom utilities
- `tailwind.config.ts` - Custom CentUp color palette and animations
- Brand colors: `centup-green-dark: #4C9282`, `centup-green-light: #78BEAF`

### Data & Types
- `data/mockData.ts` - Static mock data for funds, transactions, achievements
- `types/index.ts` - TypeScript interfaces for Fund, Transaction, Achievement
- `utils/helpers.tsx` - Utility functions for formatting and icons

## Development Guidelines

### Mobile-First Approach
- Design for mobile experience first
- Use `md:` prefix for desktop-specific styles
- Test on both iPhone frame and native mobile devices
- Ensure touch targets are minimum 44px

### Component Patterns
```typescript
// Typical page component structure
interface PageProps {
  setActiveTab: (tab: string) => void
  // other navigation props
}

export function PageComponent({ setActiveTab }: PageProps) {
  // Component implementation
}
```

### Responsive Design Rules
- Use `hidden md:flex` for desktop-only elements
- Use `md:hidden` for mobile-only elements
- iPhone frame: 400x800px with 60px border-radius
- Content padding: `px-4 pt-8 pb-24` inside MainAppLayout

### Navigation System
- Tab-based routing with 5 main sections:
  - Home (`home-page.tsx`) - Dashboard and fund overview
  - Performance (`performance-page.tsx`) - Charts and analytics
  - Deposit (`deposit-page.tsx`) - Deposit/withdrawal interface
  - Activity (`activity-page.tsx`) - Transaction history
  - Profile (`profile-page.tsx`) - User settings and achievements

### Theme System
- Dark/light mode toggle available
- Theme context provider in `contexts/theme-context.tsx`
- CSS variables defined in `app/globals.css`

## Testing Considerations
- Test iPhone layout on desktop browsers (Chrome, Safari, Firefox)
- Verify mobile responsiveness on actual devices
- Check navigation flow between all pages
- Validate chart rendering and data visualization

## Common Development Tasks

### Adding New Pages
1. Create component in `components/pages/`
2. Add route case in `app/page.tsx` renderCurrentPage function
3. Add navigation item in `components/ui/nav-bar.tsx` if needed
4. Update type definitions if new data structures required

### Modifying iPhone Frame
- Adjust dimensions in `components/layouts/iphone-layout.tsx:77`
- Update notch positioning at line 80
- Modify home indicator at line 90

### Adding New UI Components
- Follow Radix UI patterns in `components/ui/`
- Use Tailwind classes with CentUp color palette
- Ensure mobile touch-friendly sizing

## Performance Considerations
- Next.js automatic code splitting enabled
- Image optimization built-in
- Custom scrollbar hiding for smooth mobile experience
- Minimal JavaScript bundle with efficient React patterns

## Known Limitations
- Mock data only (no real API integration)
- Authentication is UI mockup only
- Single-page application (no URL routing)
- Desktop experience requires 768px+ viewport

## Project Context
- **Client**: CentUp investment platform mockup
- **Purpose**: Interactive prototype for mobile investment application
- **Target**: iPhone user experience with desktop preview capability
- **Created by**: Hanay Joud in collaboration with Benjamin Bruneau (JEECE supervision)

This is a prototype application demonstrating modern mobile-first development practices with iPhone layout simulation for desktop users.