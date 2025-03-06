'use client';

import React, { useState } from 'react';

export type FormInputProps = {
  name: string;
  type: string;
  label: string;
  defaultValue?: string;
  className?: string;
};

const FormInput = ({
  name,
  type,
  label,
  defaultValue = '',
  className = '',
}: FormInputProps) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className={`mb-2 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
      />
    </div>
  );
};

export default FormInput;
