export type ShiftType = 'weekday_day' | 'evening_weekend';

export interface Doctor {
  id: number;
  name: string;
  shiftType: ShiftType;
}

export interface Booking {
  doctorId: number;
  dateTime: string;
}

export interface TimeSlot {
  dateObj: Date;
  dateStr: string;
}

export interface DateTimeInputProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export interface DoctorListProps {
  selectedDate: string;
  availableDoctors: Doctor[];
  bookings: Booking[];
  onBookAppointment: (doctorId: number) => void;
  onViewSchedule: (doctor: Doctor) => void;
}

export interface ScheduleModalProps {
  doctor: Doctor;
  selectedDate: string;
  bookings: Booking[];
  onClose: () => void;
  onDateChange: (days: number) => void;
  onBookAppointment: (doctorId: number, dateStr: string) => void;
}

export interface AppointmentSlotProps {
  slot: TimeSlot;
  doctor: Doctor;
  isBooked: boolean;
  onBook: (doctorId: number, dateStr: string) => void;
}
