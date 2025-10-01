import React from "react";
import { Loader2 } from "lucide-react";

const SubmitButton = ({
  children,
  isLoading = false,
  onClick,
  type = "submit",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`btn-transport w-full py-3 text-lg font-semibold rounded-md flex items-center justify-center transition-colors duration-300 cursor-pointer ${
        disabled || isLoading
          ? "opacity-70 cursor-not-allowed"
          : "hover:bg-primary/90"
      }`}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default SubmitButton;
