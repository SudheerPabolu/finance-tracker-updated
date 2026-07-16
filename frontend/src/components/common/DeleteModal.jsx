const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
    "
    >
      <div
        className="
        bg-white
        dark:bg-slate-900
        text-black
        dark:text-white
        p-6
        rounded-2xl
        w-full
        max-w-md
        border
        border-gray-300
        dark:border-slate-700
      "
      >
        <h2
          className="
          text-2xl
          font-bold
          mb-4
        "
        >
          Confirm Delete
        </h2>

        <p
          className="
          text-gray-600
          dark:text-slate-400
          mb-6
        "
        >
          Are you sure you want
          to delete this
          transaction?
        </p>

        <div
          className="
          flex
          justify-end
          gap-3
        "
        >
          <button
            onClick={onClose}
            className="
            px-4
            py-2
            rounded-xl
            bg-gray-300
            dark:bg-slate-700
          "
          >
            Cancel
          </button>

          <button
            onClick={
              onConfirm
            }
            className="
            px-4
            py-2
            rounded-xl
            bg-red-500
            hover:bg-red-600
            text-white
          "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;