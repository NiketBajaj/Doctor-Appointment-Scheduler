import { useState, useMemo } from 'react';
import './App.css';
import DateTimeInput from './components/DateTimeInput/DateTimeInput';
import DoctorList from './components/DoctorList/DoctorList';
import ScheduleModal from './components/ScheduleModal/ScheduleModal';
import { useBookings } from './hooks/useBookings';
import { useDateTime } from './hooks/useDateTime';
import { getAvailableDoctors } from './utils';
import type { Doctor } from './types';

function App() {
  const [viewingDoctor, setViewingDoctor] = useState<Doctor | null>(null);

  // Custom hooks for state management
  const { selectedDate, handleDateChange, changeDate } = useDateTime();
  const { bookings, isBooked, bookAppointment } = useBookings();

  // Get available doctors based on selected date/time
  const availableDoctors = useMemo(
    () => getAvailableDoctors(selectedDate),
    [selectedDate]
  );

  /**
   * Handle booking an appointment from the main list
   */
  const handleQuickBook = (doctorId: number) => {
    if (!selectedDate) return;

    const success = bookAppointment(doctorId, selectedDate);

    if (success) {
      alert('Appointment Confirmed for 30 mins!');
    } else {
      alert('This slot is already booked!');
    }
  };

  /**
   * Handle booking from the schedule modal
   */
  const handleModalBook = (doctorId: number, dateStr: string) => {
    const success = bookAppointment(doctorId, dateStr);

    if (success) {
      alert('Appointment Confirmed for 30 mins!');
    } else {
      alert('This slot is already booked!');
    }
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1>Doctor Appointment Scheduler</h1>
        <p className="app-subtitle">Book your appointment with ease</p>
      </header>

      <div className="card">
        <DateTimeInput
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
      </div>

      <div className="card">
        <DoctorList
          selectedDate={selectedDate}
          availableDoctors={availableDoctors}
          bookings={bookings}
          onBookAppointment={handleQuickBook}
          onViewSchedule={setViewingDoctor}
        />
      </div>

      <div className="card info-card">
        <h3>Doctor Schedules</h3>
        <div className="schedule-info-grid">
          <div className="schedule-info-item">
            <div className="info-badge day-shift">Day Shift</div>
            <p><strong>3 Doctors</strong></p>
            <p>Mon-Fri: 9:00 AM - 5:00 PM</p>
          </div>
          <div className="schedule-info-item">
            <div className="info-badge evening-shift">Evening/Weekend</div>
            <p><strong>2 Doctors</strong></p>
            <p>Mon-Fri: 5:00 PM - 8:00 PM</p>
            <p>Sat-Sun: 9:00 AM - 5:00 PM</p>
          </div>
        </div>
      </div>

      {viewingDoctor && selectedDate && (
        <ScheduleModal
          doctor={viewingDoctor}
          selectedDate={selectedDate}
          bookings={bookings}
          onClose={() => setViewingDoctor(null)}
          onDateChange={changeDate}
          onBookAppointment={handleModalBook}
        />
      )}
    </div>
  );
}

export default App;
