# CommuterBuddy 🚌

**A community-driven platform connecting university students and commuters who share similar routes for safer, more social, and sustainable travel.**

## Project Overview

CommuterBuddy helps university students find travel companions with matching routes and schedules, enabling safer commutes, reduced costs, and environmental benefits through shared transportation.

![alt](/public/hp.png)

[Live View](https://commuterbuddy.netlify.app/)

## Page Functionality

### HomePage
- **Find a Buddy**: Navigate to university selection
- **Add/Update Your Route**: Manage personal commute details
- **Sign In/Up**: User authentication

### UniversitySelectPage
- Select from 26+ Canadian universities
- **Next Button**: Proceed to transit selection

### TransitSelectPage
- Browse available commute options
- **Select Options**: Choose travel companions
- **Next Button**: Connect with selected buddy

### BusPage
- **Add/Update Route Form**: Enter commute details (name, university, address, transit, time)
- **Save/Update Route**: Store commute information

### ConnectPage
- **Confirm Connection**: Finalize travel buddy match
- View connection details

### MapPage
- **Interactive Map**: View meeting points and destinations
- **Real-time Chat**: Communicate with travel companion
- **Google Maps Integration**: External navigation

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
**Deployment:** Netlify

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
git clone -b Dev https://github.com/shihabhasan0161/CommuterBuddy.git
cd CommuterBuddy

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Supabase URL and API key

# Run development server
npm start

# Build for production
npm run build
```

## Last but not least - Team 💻:

- I, **[Shihab](https://github.com/shihabhasan0161) – The Map Magician**  
  I led project scaffolding and frontend work, including creating our Leaflet-based map UI, squashing bugs across the app, and implementing Supabase for authentication and database.

- **[Sam](https://github.com/FadedBronze) – The Linux Guy**  
  Engineered our real-time chat and kept the backend shipshape: wrote core socket logic, reviewed—and vanquished—bugs throughout the codebase.

- **[Muhammad](https://github.com/mfsohail12) – The UX Wizard**  
  Crafted the map-page experience and key UI tweaks: iterated on layouts, sprinkled design magic, and collaborated closely with the whole squad.

- **[Sakshi](https://github.com/sakshixgoel) – The Logo Maestro**  
  Forged the product vision and branding: dreamed up the concept, built the request form, and composed our project logo and style guide.

---

*Built for Hack404 (July 4-6, 2025) - Connecting communities, one commute at a time* 🚌✨
