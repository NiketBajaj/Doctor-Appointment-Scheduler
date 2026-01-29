import { AppointmentSlotProps } from '../../types';
import { isDoctorWorking } from '../../utils';
import './AppointmentSlot.css';

const AppointmentSlot: React.FC<AppointmentSlotProps> = ({
  slot,
  doctor,
  isBooked,
  onBook,
}) => {
  const isWorking = isDoctorWorking(doctor, slot.dateObj);

  const handleClick = () => {
    if (isWorking && !isBooked) {
      onBook(doctor.id, slot.dateStr);
    }
  };

  let slotClass = 'appointment-slot';
  let statusText = '';

  if (!isWorking) {
    slotClass += ' slot-off-duty';
    statusText = 'Off';
  } else if (isBooked) {
    slotClass += ' slot-booked';
    statusText = 'Booked';
  } else {
    slotClass += ' slot-available';
    statusText = 'Free';
  }

  return (
    <div className={slotClass} onClick={handleClick}>
      <div className="slot-time">
        {slot.dateObj.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
      <div className="slot-status">{statusText}</div>
    </div>
  );
};

export default AppointmentSlot;
