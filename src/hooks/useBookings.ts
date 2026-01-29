import { useState, useEffect, useCallback } from 'react';
import { Booking } from '../types';

const STORAGE_KEY = 'doctor-appointment-bookings';

/**
 * Custom hook for managing appointment bookings with localStorage persistence
 */
export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    // Load bookings from localStorage on initial render
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load bookings from localStorage:', error);
      return [];
    }
  });

  // Persist bookings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    } catch (error) {
      console.error('Failed to save bookings to localStorage:', error);
    }
  }, [bookings]);

  /**
   * Check if a specific slot is already booked
   */
  const isBooked = useCallback(
    (doctorId: number, dateTime: string): boolean => {
      return bookings.some(
        (b) => b.doctorId === doctorId && b.dateTime === dateTime
      );
    },
    [bookings]
  );

  /**
   * Book an appointment
   */
  const bookAppointment = useCallback(
    (doctorId: number, dateTime: string): boolean => {
      if (isBooked(doctorId, dateTime)) {
        return false; // Already booked
      }

      setBookings((prev) => [...prev, { doctorId, dateTime }]);
      return true; // Successfully booked
    },
    [isBooked]
  );

  /**
   * Cancel an appointment
   */
  const cancelAppointment = useCallback(
    (doctorId: number, dateTime: string): void => {
      setBookings((prev) =>
        prev.filter(
          (b) => !(b.doctorId === doctorId && b.dateTime === dateTime)
        )
      );
    },
    []
  );

  /**
   * Clear all bookings
   */
  const clearAllBookings = useCallback((): void => {
    setBookings([]);
  }, []);

  /**
   * Get all bookings for a specific doctor
   */
  const getDoctorBookings = useCallback(
    (doctorId: number): Booking[] => {
      return bookings.filter((b) => b.doctorId === doctorId);
    },
    [bookings]
  );

  return {
    bookings,
    isBooked,
    bookAppointment,
    cancelAppointment,
    clearAllBookings,
    getDoctorBookings,
  };
};
