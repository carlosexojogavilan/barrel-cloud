//This code is not used atm, have to review it

import { useState } from "react";

const useBookingManagement = ({
  setCreatingBooking,
  setEditingBooking,
  setDeletingBooking,
}) => {
  //Due to API Mocha has 500 requests per day limit, this inizialization of bookings is just the mock of the mock bruh
  const [bookings, setBookings] = useState([
    {
      id: 1,
      status: "confirmed",
      createdAt: "2023-10-28T10:00:00Z",
      deletedAt: null,
      description: "Ejemplo de descripción",
    },
    {
      id: 2,
      status: "cancelled",
      createdAt: "2023-10- 28T10:00:00Z",
      deletedAt: null,
      description: "Ejemplo de descripción",
    },
    {
      id: 3,
      status: "pending",
      createdAt: "2023-10-28T10:00:00Z",
      deletedAt: null,
      description: "Ejemplo de descripción",
    },
  ]);

  const getBookings = async () => {
    try {
      const response = await fetch("https://apimocha.com/barrelcloud/bookings");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addBooking = (newBooking) => {
    setBookings((bookings) => [
      ...bookings,
      { ...newBooking, id: bookings.length + 1 },
    ]);
    setCreatingBooking(false);
  };

  const editBooking = (editedBooking) => {
    setBookings((bookings) =>
      bookings.map((booking) =>
        booking.id === editedBooking.id ? editedBooking : booking
      )
    );
    setEditingBooking(null);
  };

  const deleteBooking = (id) => {
    const newBookings = bookings.filter((booking) => booking.id !== id);
    setBookings(newBookings);
    setDeletingBooking(null);
  };

  return { bookings, getBookings, addBooking, editBooking, deleteBooking };
};

export default useBookingManagement;
