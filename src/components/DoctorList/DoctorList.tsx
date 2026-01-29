import { DoctorListProps } from '../../types';
import './DoctorList.css';

const DoctorList: React.FC<DoctorListProps> = ({
  selectedDate,
  availableDoctors,
  bookings,
  onBookAppointment,
  onViewSchedule,
}) => {
  const isBooked = (doctorId: number): boolean => {
    return bookings.some(
      (b) => b.doctorId === doctorId && b.dateTime === selectedDate
    );
  };

  if (!selectedDate) {
    return (
      <div className="doctor-list-empty">
        <p>Please select a date and time to see availability.</p>
      </div>
    );
  }

  return (
    <div className="doctor-list-container">
      <h2>Availability</h2>
      <p className="selected-time">
        Checking for: {new Date(selectedDate).toLocaleString()}
      </p>

      {availableDoctors.length > 0 ? (
        <ul className="doctor-list">
          {availableDoctors.map((doctor) => (
            <li key={doctor.id} className="doctor-item">
              <span
                className="doctor-name"
                onClick={() => onViewSchedule(doctor)}
                title="Click to view full schedule"
              >
                <span className="check-icon">✓</span> {doctor.name}
              </span>
              {isBooked(doctor.id) ? (
                <span className="booked-badge">Booked for 30 mins</span>
              ) : (
                <button
                  className="confirm-btn"
                  onClick={() => onBookAppointment(doctor.id)}
                >
                  Confirm
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="unavailable">
          <span className="x-icon">✕</span> No doctors available at this time.
        </p>
      )}
    </div>
  );
};

export default DoctorList;
