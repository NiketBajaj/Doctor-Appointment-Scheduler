export type ShiftType = 'weekday_day' | 'evening_weekend';

export interface Doctor {
  id: number;
  name: string;
  shiftType: ShiftType;
}
