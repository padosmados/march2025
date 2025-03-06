'use client';

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export type TextAreaInputProps = {
  name: string;
  labelText?: string;
  defaultValue?: string;
  className?: string;
};

const TextAreaInput = ({
  name,
  labelText,
  defaultValue = '',
  className = '',
}: TextAreaInputProps) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className={`mb-2 ${className}`}>
      <Label htmlFor={name} className="capitalize">
        {labelText || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={3}
        required
        className={`leading-loose ${className}`}
      />
    </div>
  );
};

export default TextAreaInput;
