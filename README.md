# Doctor Appointment Scheduler

A modern, interactive appointment booking application built with **React**, **TypeScript**, and **Vite**. This application allows users to view doctor availability based on specific shifts, check daily schedules, and book 30-minute appointment slots.

## 🚀 Features

*   **Smart Doctor Availability**: Automatically filters and displays doctors who are working at the selected date and time.
    *   *Day Shift*: Mon-Fri, 9:00 AM - 5:00 PM.
    *   *Evening/Weekend Shift*: Mon-Fri 5:00 PM - 8:00 PM, Sat-Sun 9:00 AM - 5:00 PM.
*   **Interactive Schedule Modal**:
    *   Click on any doctor's name to open their detailed daily schedule.
    *   Visual indicators for **Available** (Green), **Booked** (Red), and **Off-Duty** (Gray) slots.
*   **Date Navigation**: Seamlessly switch between days using the `<` and `>` navigation buttons within the modal to book future appointments.
*   **Booking System**:
    *   One-click booking for 30-minute slots.
    *   Prevents double-booking of the same slot.
    *   Visual "Booked" badges for confirmed appointments.
*   **Time Enforcement**: Inputs automatically snap to the nearest 30-minute interval (e.g., `:00` or `:30`) to ensure consistent scheduling.

## 🛠️ Tech Stack

*   **React (v18)** - UI Component Library
*   **TypeScript** - Type Safety & Developer Experience
*   **Vite** - High-Performance Build Tool
*   **CSS3** - Custom Styling & Flexbox/Grid Layouts

## 📦 Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/YourUsername/appointment-scheduler-react.git
    cd appointment-scheduler-react
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Run the Development Server**:
    ```bash
    npm run dev
    ```

4.  **Open in Browser**:
    Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## 💡 Usage Guide

1.  **Select a Time**: Use the date picker on the home screen. The app will immediately show which doctors are on shift.
2.  **Quick Book**: Click "Confirm" next to a doctor's name to book the current slot immediately.
3.  **View Full Schedule**: Click on a Doctor's name (e.g., "Dr. Alice") to open the **Schedule View**.
4.  **Navigate & Book**: Use the arrow buttons to change dates. Click any green "Free" slot to book it.

## 📂 Project Structure

```
appointment-scheduler-react/
├── src/
│   ├── App.tsx       # Main application logic & state
│   ├── App.css       # Styles for Modal, Grid, and Cards
│   ├── utils.ts      # Doctor data & shift logic helpers
│   ├── types.ts      # TypeScript interfaces
│   └── main.tsx      # Entry point
├── index.html        # HTML template
└── package.json      # Dependencies
```

## 📄 License

This project is open-source and available for personal and educational use.
