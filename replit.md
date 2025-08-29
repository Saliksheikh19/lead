# CK97Leaderboards

## Overview

CK97Leaderboards is a competitive gaming platform that aggregates leaderboards from multiple gaming partners. The application displays various gaming platforms with their respective prize pools, winner counts, and active user statistics. Users can browse different partner leaderboards and view detailed competition information. The platform features a modern, responsive design with animated components and supports multiple currency types (USD, GEMS, COINS).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript and Vite for fast development and building
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design
- **State Management**: TanStack React Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with custom styling for accessibility and consistency

### Backend Architecture
- **Framework**: Express.js with TypeScript for the REST API server
- **Database Layer**: Drizzle ORM configured for PostgreSQL with Neon Database serverless connection
- **Data Storage**: In-memory storage implementation with seeded partner data for development
- **API Design**: RESTful endpoints for partner data retrieval with proper error handling

### Database Schema
- **Partners Table**: Stores gaming platform information including name, slug, description, logo URL, prize details, user metrics, and styling configuration
- **Schema Validation**: Zod schemas for runtime type checking and validation
- **Migration System**: Drizzle Kit for database schema management and migrations

### Authentication and Authorization
- Currently no authentication system implemented - the application serves public leaderboard data

### Styling and Design System
- **Theme System**: CSS custom properties for consistent theming with dark mode support
- **Component Library**: shadcn/ui components built on Radix UI primitives
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints
- **Animations**: Custom CSS animations for enhanced user experience

### Development Environment
- **Replit Integration**: Specialized plugins for Replit development environment
- **Build System**: Vite for development server and production builds
- **Type Safety**: Comprehensive TypeScript configuration with strict mode enabled

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL database for production data storage
- **Drizzle ORM**: Type-safe database operations and schema management

### UI and Styling Libraries
- **Radix UI**: Accessible component primitives for complex UI elements
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Icon library for consistent iconography
- **Font Awesome**: Additional icon set for social media and branding icons

### State Management and Data Fetching
- **TanStack React Query**: Server state management, caching, and synchronization
- **React Hook Form**: Form state management with validation

### Development and Build Tools
- **Vite**: Fast build tool and development server
- **ESBuild**: Fast JavaScript bundler for production builds
- **TypeScript**: Static type checking and enhanced development experience

### Utility Libraries
- **class-variance-authority**: Type-safe variant management for components
- **clsx & tailwind-merge**: Conditional CSS class merging utilities
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation

### Third-Party Integrations
- **Unsplash**: Image hosting service for partner logos and placeholder images
- **Google Fonts**: Web font delivery for custom typography