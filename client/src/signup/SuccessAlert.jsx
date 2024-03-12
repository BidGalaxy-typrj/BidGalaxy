import React, { useEffect, useState } from 'react';
import { IoMdCheckmarkCircle } from "react-icons/io";


function SuccessAlert() {
  const [showAlert, setShowAlert] = useState(true);

  const handleDismiss = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 5000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    showAlert && (
        <div
        id="success-alert"
        class="flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
        role="alert"
      >
        <IoMdCheckmarkCircle className="h-7 w-7" />
        <div class="ms-3 text-xl font-semibold font-cantora">
          Your account verified Successfully!
        </div>
        <button
          type="button"
          id="dissmiss-button"
          class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
          data-dismiss-target="#success-alert"
          aria-label="Close"
          onClick={handleDismiss}
        >
          <span class="sr-only">Dismiss</span>
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    )
  );
}

export default SuccessAlert;
