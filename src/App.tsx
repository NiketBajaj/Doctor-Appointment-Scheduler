import { useState, useMemo } from 'react';
import './App.css';
import { doctors, isDoctorWorking, Doctor } from './utils';

interface Booking {
  doctorId: number;
  dateTime: string;
}

function App() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [viewingDoctor, setViewingDoctor] = useState<Doctor | null>(null);

  // Helper to round time to nearest 30 minutes
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) {
      setSelectedDate('');
      return;
    }

    const date = new Date(val);
    const min = date.getMinutes();

    if (min < 15) {
      date.setMinutes(0, 0, 0);
    } else if (min < 45) {
      date.setMinutes(30, 0, 0);
    } else {
      date.setHours(date.getHours() + 1);
      date.setMinutes(0, 0, 0);
    }

    // Format back to YYYY-MM-DDTHH:mm
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    
    setSelectedDate(`${year}-${month}-${day}T${h}:${m}`);
  };

  const changeDate = (days: number) => {
    if (!selectedDate) return;
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + days);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    
    setSelectedDate(`${year}-${month}-${day}T${h}:${m}`);
  };

  const availableDoctors = useMemo(() => {
    if (!selectedDate) return [];
    const dateObj = new Date(selectedDate);
    return doctors.filter(doc => isDoctorWorking(doc, dateObj));
  }, [selectedDate]);

  const bookAppointment = (doctorId: number, dateStr?: string) => {
    const targetDate = dateStr || selectedDate;
    if (!targetDate) return;
    
    // Check if already booked
    if (bookings.some(b => b.doctorId === doctorId && b.dateTime === targetDate)) {
      alert('This slot is already booked!');
      return;
    }

    const newBooking: Booking = { doctorId, dateTime: targetDate };
    setBookings(prev => [...prev, newBooking]);
    alert('Appointment Confirmed for 30 mins!');
  };

  const isBooked = (doctorId: number, dateStr: string) => {
    return bookings.some(b => b.doctorId === doctorId && b.dateTime === dateStr);
  };

  // Generate slots for the modal (08:00 to 21:00)
  const generateSlots = () => {
    if (!selectedDate) return [];
    const baseDate = new Date(selectedDate);
    const slots = [];
    
    // Start at 8 AM, End at 9 PM
    for (let hour = 8; hour < 21; hour++) {
      for (let min of [0, 30]) {
        const slotDate = new Date(baseDate);
        slotDate.setHours(hour, min, 0, 0);
        
        const year = slotDate.getFullYear();
        const month = String(slotDate.getMonth() + 1).padStart(2, '0');
        const day = String(slotDate.getDate()).padStart(2, '0');
        const h = String(hour).padStart(2, '0');
        const m = String(min).padStart(2, '0');
        
        const slotString = `${year}-${month}-${day}T${h}:${m}`;
        slots.push({ dateObj: slotDate, dateStr: slotString });
      }
    }
    return slots;
  };

  return (
    <div className="container">
      <h1>Doctor Appointment Scheduler</h1>
      
      <div className="card">
        <label htmlFor="appointment-time">Select Date and Time (rounds to nearest 30m):</label>
        <br />
        <br />
        <input 
          type="datetime-local" 
          id="appointment-time"
          value={selectedDate}
          onChange={handleDateChange}
          step="1800" 
        />
      </div>

      <div className="card">
        <h2>Availability</h2>
        {selectedDate ? (
          <>
            <p>Checking for: {new Date(selectedDate).toLocaleString()}</p>
            {availableDoctors.length > 0 ? (
              <ul className="doctor-list">
                {availableDoctors.map(doc => (
                  <li key={doc.id} className="available-item">
                     <span 
                       className="doctor-name-link" 
                       onClick={() => setViewingDoctor(doc)}
                       title="Click to view full schedule"
                     >
                       ✓ {doc.name}
                     </span>
                     {isBooked(doc.id, selectedDate) ? (
                       <span className="booked-badge">Booked for 30 mins</span>
                     ) : (
                       <button 
                         className="confirm-btn"
                         onClick={() => bookAppointment(doc.id)}
                       >
                         Confirm
                       </button>
                     )}
                  </li>
                ))}
              </ul>
            ) : (
               <p className="unavailable">X No doctors available at this time.</p>
            )}
          </>
        ) : (
          <p>Please select a date and time to see availability.</p>
        )}
      </div>
      
      <div className="card" style={{textAlign: 'left', fontSize: '0.9em', color: '#555'}}>
        <h3>Schedules:</h3>
        <p><strong>3 Doctors:</strong> Mon-Fri 9am-5pm</p>
        <p><strong>2 Doctors:</strong> Mon-Fri 5pm-8pm & Sat-Sun 9am-5pm</p>
      </div>

      {/* Schedule Modal */}
      {viewingDoctor && selectedDate && (
        <div className="modal-overlay" onClick={() => setViewingDoctor(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Schedule for {viewingDoctor.name}</h3>
              <button className="close-btn" onClick={() => setViewingDoctor(null)}>×</button>
            </div>
            
            <div className="date-navigation">
              <button className="nav-btn" onClick={() => changeDate(-1)}>&lt;</button>
              <span className="current-date">{new Date(selectedDate).toLocaleDateString()}</span>
              <button className="nav-btn" onClick={() => changeDate(1)}>&gt;</button>
            </div>
            
            <div className="slots-grid">
              {generateSlots().map((slot, index) => {
                const working = isDoctorWorking(viewingDoctor, slot.dateObj);
                const booked = isBooked(viewingDoctor.id, slot.dateStr);
                
                let className = "slot";
                if (!working) className += " slot-gray";
                else if (booked) className += " slot-booked";
                else className += " slot-available";

                return (
                  <div 
                    key={index} 
                    className={className}
                    onClick={() => {
                      if (working && !booked) bookAppointment(viewingDoctor.id, slot.dateStr);
                    }}
                  >
                    {slot.dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    <div className="slot-status">
                      {!working ? 'Off' : booked ? 'Booked' : 'Free'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App;
