import { Formik } from "formik";
import PropTypes from "prop-types";

const EditBookingModal = ({ booking, closeModal, editBooking }) => {
  const handleFormValidation = ({ description }) => {
    const errors = {};

    if (!description) {
      errors.description = "Description is required";
    }

    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    editBooking(values);
    setSubmitting(false);
  };

  return (
    <div className="absolute z-10 w-full min-h-screen p-6 flex justify-center items-center bg-black bg-opacity-40">
      <div className="w-full sm:w-2/3 lg:w-1/2 flex flex-col gap-4 bg-white py-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold tracking-tighter border-b px-6 pb-2 border-b-gray-200">{`Edit booking with id: ${booking.id}`}</h2>
        <Formik
          enableReinitialize
          initialValues={booking}
          validate={handleFormValidation}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="px-6">
              <div>
                <label
                  htmlFor="status-select"
                  className="text-lg tracking-tight"
                >
                  Status
                </label>
                <select
                  name="status"
                  id="status-select"
                  onChange={handleChange}
                  value={values.status}
                  className="block w-full px-2 py-1 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#99f5f2] focus:border-[#99f5f2]"
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="mt-4 flex flex-col">
                <label className="text-lg tracking-tight">Description</label>
                <textarea
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-md"
                />
              </div>
              {errors.description && touched.description && (
                <div className="text-sm text-red-500">{errors.description}</div>
              )}
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-1 border border-gray-400 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-[#262626] tracking-tight px-4 py-1 border border-[#262626] rounded-md bg-[#99f5f2]"
                >
                  Edit Booking
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

EditBookingModal.propTypes = {
  booking: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  editBooking: PropTypes.func.isRequired,
};

export default EditBookingModal;
