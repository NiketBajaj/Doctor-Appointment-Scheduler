import { Doctor, TimeSlot } from './types';

export const isDoctorWorking = (doctor: Doctor, date: Date): boolean => {
  const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ... 6 = Saturday
  const hour = date.getHours();

  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const isWeekday = !isWeekend;

  if (doctor.shiftType === 'weekday_day') {
    // Work: Mon-Fri, 9am - 5pm (17:00)
    if (isWeekday) {
      return hour >= 9 && hour < 17;
    }
    return false;
  }
  else if (doctor.shiftType === 'evening_weekend') {
    // Work: Mon-Fri 5pm-8pm (17:00 - 20:00)
    if (isWeekday) {
      return hour >= 17 && hour < 20;
    }
    // Work: Sat-Sun 9am-5pm (09:00 - 17:00)
    if (isWeekend) {
      return hour >= 9 && hour < 17;
    }
    return false;
  }

  return false;
};

export const doctors: Doctor[] = [
  { id: 1, name: "Dr. Alice (Day Shift)", shiftType: "weekday_day" },
  { id: 2, name: "Dr. Bob (Day Shift)", shiftType: "weekday_day" },
  { id: 3, name: "Dr. Charlie (Day Shift)", shiftType: "weekday_day" },
  { id: 4, name: "Dr. Diana (Evening/Weekend)", shiftType: "evening_weekend" },
  { id: 5, name: "Dr. Evan (Evening/Weekend)", shiftType: "evening_weekend" }
];

/**
 * Format a date object to YYYY-MM-DDTHH:mm string
 */
export const formatDateTimeLocal = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${h}:${m}`;
};

/**
 * Round time to nearest 30 minutes
 */
export const roundToNearest30Minutes = (date: Date): Date => {
  const newDate = new Date(date);
  const min = newDate.getMinutes();

  if (min < 15) {
    newDate.setMinutes(0, 0, 0);
  } else if (min < 45) {
    newDate.setMinutes(30, 0, 0);
  } else {
    newDate.setHours(newDate.getHours() + 1);
    newDate.setMinutes(0, 0, 0);
  }

  return newDate;
};

/**
 * Generate 30-minute appointment slots from 8 AM to 9 PM for a given date
 */
export const generateTimeSlots = (baseDate: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];

  // Start at 8 AM, End at 9 PM
  for (let hour = 8; hour < 21; hour++) {
    for (let min of [0, 30]) {
      const slotDate = new Date(baseDate);
      slotDate.setHours(hour, min, 0, 0);

      const dateStr = formatDateTimeLocal(slotDate);
      slots.push({ dateObj: slotDate, dateStr });
    }
  }

  return slots;
};

/**
 * Add days to a date string
 */
export const addDaysToDateString = (dateStr: string, days: number): string => {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return formatDateTimeLocal(date);
};

/**
 * Get available doctors for a specific date/time
 */
export const getAvailableDoctors = (dateStr: string): Doctor[] => {
  if (!dateStr) return [];
  const dateObj = new Date(dateStr);
  return doctors.filter(doc => isDoctorWorking(doc, dateObj));
};
