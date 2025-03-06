import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type DatePickerProps = {
  selected: Date | null;
  onChange: (date: Date | null, event?: React.SyntheticEvent<any>) => void;
  placeholderText?: string;
  className?: string;
};

export const DatePicker: React.FC<DatePickerProps> = ({
  selected,
  onChange,
  placeholderText = 'Select Date',
  className = 'outline-none text-sm font-semibold px-3 py-2 border rounded',
}) => {
  return (
    <ReactDatePicker
      selected={selected}
      onChange={onChange}
      placeholderText={placeholderText}
      className={className}
      dateFormat="MMMM d, yyyy"
    />
  );
};
