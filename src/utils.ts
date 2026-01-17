import { Doctor } from './types';

export const isDoctorWorking = (doctor: Doctor, date: Date): boolean => {
  const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ... 6 = Saturday
  const hour = date.getHours();

  // Convert JS getDay() (0=Sun, 1=Mon...) to Python logic used previously if needed,
  // or just adapt logic.
  // JS: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const isWeekday = !isWeekend;

  if (doctor.shiftType === 'weekday_day') {
    // Work: Mon-Fri, 9am - 5pm (17:00)
    // Note: Python range 9 <= hour < 17 implies working UNTIL 17:00.
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
