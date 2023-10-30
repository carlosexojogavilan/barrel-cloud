import PropTypes from "prop-types";

const DeleteBookingModal = ({ id, closeModal, deleteBooking }) => {
  return (
    <div className="absolute z-10 w-full min-h-screen flex justify-center items-center bg-black bg-opacity-40">
      <div className="max-w-md flex flex-col gap-4 bg-white py-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold tracking-tighter px-6 pb-2 ">
          {`Are you sure you want to delete the booking with id: ${id}`}
        </h2>
        <div className="flex justify-end gap-4 px-6">
          <button
            onClick={closeModal}
            className="px-4 py-1 border border-gray-400 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={deleteBooking}
            className="text-white tracking-tight px-4 py-1 border border-[#262626] rounded-md bg-red-600"
          >
            Delete Booking
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteBookingModal.propTypes = {
  id: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
  deleteBooking: PropTypes.func.isRequired,
};

export default DeleteBookingModal;
