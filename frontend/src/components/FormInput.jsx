import React from "react";
import { cn } from "../lib/utils";

const FormInput = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  icon,
}) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full rounded-md border bg-input/50 border-border/50 px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
            "transition-all duration-300",
            icon && "pl-10"
          )}
          required={required}
        />
      </div>
    </div>
  );
};

export default FormInput;
