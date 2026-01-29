import { DateTimeInputProps } from '../../types';
import './DateTimeInput.css';

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  selectedDate,
  onDateChange,
}) => {
  return (
    <div className="datetime-input-container">
      <label htmlFor="appointment-time">
        Select Date and Time (rounds to nearest 30 minutes):
      </label>
      <input
        type="datetime-local"
        id="appointment-time"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        step="1800"
        className="datetime-input"
      />
    </div>
  );
};

export default DateTimeInput;
