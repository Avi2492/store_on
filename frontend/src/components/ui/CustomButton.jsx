import React from "react";

const CustomButton = ({ icon, text }) => {
  return (
    <>
      <button className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-md flex items-center transition duration-300 ease-in-out">
        <icon size={18} />
        <span className="hidden sm:inline ml-2">{text}</span>
      </button>
    </>
  );
};

export default CustomButton;
