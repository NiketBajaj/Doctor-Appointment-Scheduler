# Doctor Appointment Scheduler

A modern, fully refactored appointment booking application built with **React**, **TypeScript**, and **Vite**. Features component-based architecture, custom hooks, localStorage persistence, and a beautiful UI with smooth animations.

## Features

### Core Functionality
- **Smart Doctor Availability**: Automatically filters and displays doctors based on their shift schedules
  - **Day Shift**: Mon-Fri, 9:00 AM - 5:00 PM (3 doctors)
  - **Evening/Weekend Shift**: Mon-Fri 5:00 PM - 8:00 PM, Sat-Sun 9:00 AM - 5:00 PM (2 doctors)
- **Interactive Schedule Modal**: Click on any doctor to view their complete daily schedule
- **30-Minute Time Slots**: Appointments automatically snap to :00 or :30 minute intervals
- **Date Navigation**: Seamlessly browse past and future dates
- **Persistent Bookings**: All appointments saved to localStorage and survive page refreshes
- **Booking System**:
  - Quick booking directly from availability list
  - Detailed booking from schedule modal
  - Prevents double-booking
  - Visual confirmation for booked slots

### UI/UX Enhancements
- **Modern Design**: Beautiful gradient backgrounds and card-based layout
- **Smooth Animations**: Fade-in effects, hover states, and transitions
- **Color-Coded Slots**:
  - Green: Available appointments
  - Red: Booked appointments
  - Gray: Off-duty hours
- **Visual Legend**: Clear indication of slot statuses in modal
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Accessibility**: ARIA labels for screen readers

### Architecture Improvements
- **Component-Based**: Fully modular architecture
- **Custom Hooks**: Reusable logic for bookings and date/time management
- **Type Safety**: Comprehensive TypeScript interfaces
- **Separation of Concerns**: Clear division between UI, logic, and data
- **Clean Code**: Well-documented, maintainable codebase

## Tech Stack

- **React 18.2.0** - UI Library
- **TypeScript 5.0.2** - Type Safety
- **Vite 4.4.5** - Build Tool & Dev Server
- **CSS3** - Custom Styling with Gradients & Animations

## Project Structure

```
Doctor-Appointment-Scheduler/
├── src/
│   ├── components/
│   │   ├── AppointmentSlot/
│   │   │   ├── AppointmentSlot.tsx      # Individual time slot component
│   │   │   └── AppointmentSlot.css      # Slot styling with color states
│   │   ├── DateTimeInput/
│   │   │   ├── DateTimeInput.tsx        # Date/time picker component
│   │   │   └── DateTimeInput.css        # Input styling
│   │   ├── DoctorList/
│   │   │   ├── DoctorList.tsx           # Available doctors list
│   │   │   └── DoctorList.css           # List styling with animations
│   │   └── ScheduleModal/
│   │       ├── ScheduleModal.tsx        # Full schedule view modal
│   │       └── ScheduleModal.css        # Modal styling & layout
│   ├── hooks/
│   │   ├── useBookings.ts               # Booking management with localStorage
│   │   └── useDateTime.ts               # Date/time state management
│   ├── types.ts                         # TypeScript interfaces & types
│   ├── utils.ts                         # Utility functions & doctor data
│   ├── App.tsx                          # Main application component
│   ├── App.css                          # Global app styling
│   └── main.tsx                         # Application entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Architecture Overview

### Component Hierarchy

```
App
├── DateTimeInput
├── DoctorList
└── ScheduleModal
    └── AppointmentSlot (multiple instances)
```

### Custom Hooks

#### `useBookings`
Manages all booking-related state and operations with localStorage persistence:
- `bookings`: Array of all booked appointments
- `isBooked(doctorId, dateTime)`: Check if slot is booked
- `bookAppointment(doctorId, dateTime)`: Book a new appointment
- `cancelAppointment(doctorId, dateTime)`: Cancel appointment
- `clearAllBookings()`: Remove all bookings
- `getDoctorBookings(doctorId)`: Get bookings for specific doctor

#### `useDateTime`
Manages date/time selection with automatic 30-minute rounding:
- `selectedDate`: Currently selected date/time string
- `handleDateChange(value)`: Update selected date with rounding
- `changeDate(days)`: Navigate forward/backward by days
- `setDateTime(dateStr)`: Set specific date/time
- `clearDate()`: Clear selection

### Utility Functions

#### Date/Time Utilities
- `formatDateTimeLocal(date)`: Format Date to YYYY-MM-DDTHH:mm
- `roundToNearest30Minutes(date)`: Round time to :00 or :30
- `generateTimeSlots(date)`: Generate all 30-min slots (8 AM - 9 PM)
- `addDaysToDateString(dateStr, days)`: Add/subtract days from date string

#### Doctor Availability
- `isDoctorWorking(doctor, date)`: Check if doctor works at given time
- `getAvailableDoctors(dateStr)`: Get all available doctors for time
- `doctors`: Array of 5 doctors with shift assignments

### Type Definitions

```typescript
type ShiftType = 'weekday_day' | 'evening_weekend';

interface Doctor {
  id: number;
  name: string;
  shiftType: ShiftType;
}

interface Booking {
  doctorId: number;
  dateTime: string;
}

interface TimeSlot {
  dateObj: Date;
  dateStr: string;
}
```

## Installation & Setup

### Prerequisites
- **Node.js 14+**
- **npm** or **yarn**

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Doctor-Appointment-Scheduler
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Visit [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage Guide

### Quick Booking

1. Select a date and time using the date/time picker
2. View available doctors for that time slot
3. Click "Confirm" to book immediately

### Viewing Full Schedule

1. Click on any doctor's name in the availability list
2. A modal opens showing all time slots for the day
3. Use `<` and `>` buttons to navigate between dates
4. Click any green "Free" slot to book
5. Booked slots show in red, off-duty hours in gray

### Managing Bookings

- All bookings are automatically saved to browser localStorage
- Bookings persist across page refreshes
- Cannot double-book the same slot
- Each booking is for 30 minutes

## Key Improvements from Original

### Code Quality ✨
| Feature | Before | After |
|---------|--------|-------|
| **Architecture** | Single 219-line file | 15+ modular files |
| **Components** | All in App.tsx | 4 separate components |
| **State Management** | Local useState only | Custom hooks + localStorage |
| **Code Reusability** | Minimal | Highly reusable |
| **Type Safety** | Basic types | Comprehensive interfaces |
| **Maintainability** | Hard to modify | Easy to extend |

### New Features 🚀
- ✅ **localStorage Persistence**: Bookings survive page refreshes
- ✅ **Custom Hooks**: Reusable state management logic
- ✅ **Enhanced UI**: Modern design with gradients and animations
- ✅ **Better UX**: Improved visual feedback and transitions
- ✅ **Responsive**: Mobile-friendly design
- ✅ **Accessibility**: ARIA labels for screen readers
- ✅ **Visual Legend**: Clear slot status indicators
- ✅ **Better Validation**: Prevents invalid bookings
- ✅ **Improved Error Handling**: User-friendly error messages

### Performance ⚡
- Optimized re-renders with `useMemo` and `useCallback`
- Efficient component structure
- Fast development with Vite HMR
- Small bundle size with tree-shaking

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### File Organization

```
components/          # Reusable UI components
  ComponentName/
    ComponentName.tsx   # Component logic
    ComponentName.css   # Component styles

hooks/              # Custom React hooks
utils.ts            # Utility functions
types.ts            # TypeScript definitions
```

### Adding New Features

1. Create new component in `src/components/`
2. Add types to `src/types.ts`
3. Add utilities to `src/utils.ts` if needed
4. Create custom hook in `src/hooks/` if needed
5. Import and use in `App.tsx`

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open-source and available for personal and educational use.

## Author

Niket Bajaj

## Acknowledgments

- Original codebase refactored with modern React best practices
- Inspired by real-world appointment booking systems
- Built with focus on maintainability and scalability
