import { Formik } from "formik";

import PropTypes from "prop-types";

const CreateBookingModal = ({ closeModal, addBooking }) => {
  const handleFormValidation = ({ description }) => {
    const errors = {};

    if (!description) {
      errors.description = "Description is required";
    }

    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    addBooking(values);
    setSubmitting(false);
  };

  return (
    <div className="absolute z-10 w-full min-h-screen p-6 flex justify-center items-center bg-black bg-opacity-40">
      <div className="w-full sm:w-2/3 lg:w-1/2 flex flex-col gap-4 bg-white py-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold tracking-tighter border-b px-6 pb-2 border-b-gray-200">
          Create a new booking
        </h2>
        <Formik
          initialValues={{
            status: "confirmed",
            createdAt: new Date().toDateString(),
            deletedAt: null,
            description: "",
          }}
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
              <div className="flex flex-col">
                <label className="text-lg tracking-tight">Description</label>
                <textarea
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  className="px-4 py-2 rounded-md border border-gray-400"
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
                  Create Booking
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

CreateBookingModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  addBooking: PropTypes.func.isRequired,
};

export default CreateBookingModal;
