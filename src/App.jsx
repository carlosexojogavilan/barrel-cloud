import { useEffect, useState } from "react";

import CreateBookingModal from "./components/CreateBookingModal";
import DeleteBookingModal from "./components/DeleteBookingModal";
import EditBookingModal from "./components/EditBookingModal";

import BookingsTable from "./components/BookingsTable";

import barrelLogo from "./assets/images/barrelLogo.png";

function App() {
  const [bookings, setBookings] = useState([]);
  const [creatingBooking, setCreatingBooking] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [deletingBooking, setDeletingBooking] = useState(null);

  const getBookings = async () => {
    //api mocha is a service for mocking apis responses.
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
      { id: bookings.length + 1, ...newBooking },
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

  const deleteBooking = () => {
    //if the expected behaviour is to delete the row from the table uncomment lines 46-48 and comment 49-53
    // const newBookings = bookings.filter(
    //   (booking) => booking.id !== deletingBooking
    // );
    const newBookings = bookings.map((booking) => {
      if (booking.id === deletingBooking) {
        booking.status = "deleted";
        booking.deletedAt = new Date().toDateString();
      }
      return booking;
    });
    setBookings(newBookings);
    setDeletingBooking(null);
  };

  useEffect(() => {
    //Api mocha offers 500 calls per day so, if nothing shows on the screen, you have reached that limit
    getBookings();
  }, []);

  return (
    <>
      {creatingBooking && (
        <CreateBookingModal
          closeModal={() => setCreatingBooking(false)}
          addBooking={(newBooking) => addBooking(newBooking)}
        />
      )}
      {deletingBooking && (
        <DeleteBookingModal
          closeModal={() => setDeletingBooking(null)}
          id={deletingBooking}
          deleteBooking={deleteBooking}
        />
      )}
      {editingBooking && (
        <EditBookingModal
          booking={editingBooking}
          closeModal={() => setEditingBooking(null)}
          editBooking={editBooking}
        />
      )}
      <div className="min-h-screen app-bg p-6 sm:p-10 overflow-x-auto relative">
        <header className="flex justify-center sm:justify-start mb-10">
          <div className="max-w-[130px] sm:max-w-[200px]">
            <img
              src={barrelLogo}
              alt="Barrel cloud logo"
              className="object-contain w-full h-full"
            ></img>
          </div>
        </header>
        <div className="flex justify-between gap-4 items-center mb-4">
          <h1 className="text-white text-2xl font-semibold tracking-tighter">
            Bookings Table
          </h1>
          <button
            onClick={() => setCreatingBooking(true)}
            className="bg-[#99f5f2] border-2 border-[#14CFC9] px-4 py-2 rounded-md text-md font-semibold tracking-tight text-[#262626] hover:bg-[#31EBE4] hover:border-[#14CFC9]"
          >
            New Booking
          </button>
        </div>
        <BookingsTable
          bookings={bookings}
          setEditingBooking={setEditingBooking}
          setDeletingBooking={setDeletingBooking}
        />
      </div>
    </>
  );
}

export default App;
