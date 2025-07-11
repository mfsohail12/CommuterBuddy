# CommuterBuddy

**A community-driven platform connecting university students and commuters who share similar routes for a more social and safer travel.**

## Project Overview

By turning idle time into meaningful social interaction, CommuterBuddy fosters personal connections, enhances mental well-being, and encourages a sense of community during your commutes. CommuterBuddy offers a simple solution: by inputting your regular travel routes and times, the app helps you find others who share similar commutes, giving you the chance to strike up conversations, make new friends, or simply pass the time together. Whether you're looking for a friendly face to chat with on your morning bus, someone to vent to about that never-ending group project, or even a potential study buddy who shares your academic interests, CommuterBuddy turns the everyday grind of commuting into an opportunity for connection and support.

![alt](/public/hp.gif)

[Live View](https://commuter-buddy-pi.vercel.app/)

## Features

- **Smart Matching**: Find commuters with similar routes
- **Route Management**: Add/update personal commute details
- **Real-time Chat**: Safe communication with matches
- **Interactive Maps**: Location sharing and navigation
- **University Integration**: Support for 26+ Canadian universities
- **Safety Features**: User verification and secure connections

## Technical Stack

**Frontend:** React.js, Tailwind CSS, React Router, Leaflet Maps, React Icons
**Backend:** Supabase (PostgreSQL, Auth, Real-time)
**Deployment:** Vercel

## Target Community

- University students using public transportation
- Daily commuters with regular routes
- Safety-conscious travelers seeking community connections

## Privacy & Security

- Secure user authentication
- Row Level Security (RLS) policies
- Encrypted data storage
- Controlled access to personal information

## Future Enhancements

- University Single Sign-On (SSO)
- Mobile app development
- Advanced ML-based matching
- Real-time transit integration
- Campus partnerships
- Gamification features

## Installation & Setup

```bash
# Clone repository
git clone https://github.com/mfsohail12/CommuterBuddy.git
cd CommuterBuddy

# Install dependencies
npm install

# Set up environment variables
touch .env
# Add your Supabase URL and API key

# Run development server
npm start

# Build for production
npm run build
```

_Built for Hack404 (July 4-6, 2025) - Connecting communities, one commute at a time_ 🚌✨
