import { useState, useCallback } from 'react';
import { roundToNearest30Minutes, formatDateTimeLocal, addDaysToDateString } from '../utils';

/**
 * Custom hook for managing date/time selection with automatic rounding to 30-minute intervals
 */
export const useDateTime = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  /**
   * Handle date change with automatic rounding to nearest 30 minutes
   */
  const handleDateChange = useCallback((value: string) => {
    if (!value) {
      setSelectedDate('');
      return;
    }

    const date = new Date(value);
    const rounded = roundToNearest30Minutes(date);
    setSelectedDate(formatDateTimeLocal(rounded));
  }, []);

  /**
   * Change the selected date by adding/subtracting days
   */
  const changeDate = useCallback(
    (days: number) => {
      if (!selectedDate) return;
      const newDate = addDaysToDateString(selectedDate, days);
      setSelectedDate(newDate);
    },
    [selectedDate]
  );

  /**
   * Set a specific date/time
   */
  const setDateTime = useCallback((dateStr: string) => {
    setSelectedDate(dateStr);
  }, []);

  /**
   * Clear the selected date
   */
  const clearDate = useCallback(() => {
    setSelectedDate('');
  }, []);

  return {
    selectedDate,
    handleDateChange,
    changeDate,
    setDateTime,
    clearDate,
  };
};
