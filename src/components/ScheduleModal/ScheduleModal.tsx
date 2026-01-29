import { ScheduleModalProps } from '../../types';
import { generateTimeSlots } from '../../utils';
import AppointmentSlot from '../AppointmentSlot/AppointmentSlot';
import './ScheduleModal.css';

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  doctor,
  selectedDate,
  bookings,
  onClose,
  onDateChange,
  onBookAppointment,
}) => {
  const slots = generateTimeSlots(new Date(selectedDate));

  const isBooked = (dateStr: string): boolean => {
    return bookings.some(
      (b) => b.doctorId === doctor.id && b.dateTime === dateStr
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Schedule for {doctor.name}</h3>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>

        <div className="date-navigation">
          <button
            className="nav-btn"
            onClick={() => onDateChange(-1)}
            aria-label="Previous day"
          >
            &lt;
          </button>
          <span className="current-date">
            {new Date(selectedDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <button
            className="nav-btn"
            onClick={() => onDateChange(1)}
            aria-label="Next day"
          >
            &gt;
          </button>
        </div>

        <div className="schedule-info">
          <div className="legend">
            <div className="legend-item">
              <span className="legend-dot available"></span>
              <span>Available</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot booked"></span>
              <span>Booked</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot off-duty"></span>
              <span>Off-Duty</span>
            </div>
          </div>
        </div>

        <div className="slots-grid">
          {slots.map((slot, index) => (
            <AppointmentSlot
              key={index}
              slot={slot}
              doctor={doctor}
              isBooked={isBooked(slot.dateStr)}
              onBook={onBookAppointment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
