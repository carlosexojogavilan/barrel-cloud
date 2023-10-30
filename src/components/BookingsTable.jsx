import EditIcon from "../assets/icons/edit.svg";
import DeleteIcon from "../assets/icons/delete.svg";

import PropTypes from "prop-types";

function BookingsTable({ bookings, setEditingBooking, setDeletingBooking }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-900 text-green-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded";
      case "pending":
        return "bg-yellow-900 text-yellow-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded";
      case "cancelled":
        return "bg-red-900 text-red-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded";
      default:
        return "bg-gray-700 text-gray-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded";
    }
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-400 border border-gray-700">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Created At
            </th>
            <th scope="col" className="px-6 py-3">
              Deleted At
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr
              key={booking.id}
              // scope="row"
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th className="px-6 py-3">{booking.id}</th>
              <td className="px-6">
                <span
                  className={`${getStatusColor(booking.status)} capitalize`}
                >
                  {booking.status}
                </span>
              </td>
              <td className="px-6 py-3">{booking.createdAt}</td>
              <td className="px-6 py-3">
                {booking.deletedAt ? booking.deletedAt : "-"}
              </td>
              <td className="px-6 py-3">{booking.description}</td>
              <td className="flex items-center gap-4 px-6 py-3">
                <button
                  onClick={() => setEditingBooking(booking)}
                  disabled={booking.deletedAt}
                  className="hover:disabled:cursor-not-allowed"
                >
                  <img src={EditIcon}></img>
                </button>
                <button
                  onClick={() => setDeletingBooking(booking.id)}
                  disabled={booking.deletedAt}
                  className="hover:disabled:cursor-not-allowed"
                >
                  <img src={DeleteIcon}></img>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

BookingsTable.propTypes = {
  bookings: PropTypes.array.isRequired,
  setEditingBooking: PropTypes.func.isRequired,
  setDeletingBooking: PropTypes.func.isRequired,
};

export default BookingsTable;
