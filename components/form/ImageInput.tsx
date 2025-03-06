'use client';

import { Input } from '../ui/input';
import { Label } from '../ui/label';

type ImageInputProps = {
  name?: string;
  label?: string;
  multiple?: boolean;
  maxFiles?: number; // New property for maximum number of files
};

function ImageInput({
  name = 'image',
  label = 'Image',
  multiple = false,
  maxFiles,
}: ImageInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && maxFiles && files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} images.`);
      event.target.value = ''; // Clear the input
    }
  };

  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label} {maxFiles ? `(Max ${maxFiles} images)` : ''}
      </Label>
      <Input
        id={name}
        name={name}
        type="file"
        required
        accept="image/*"
        className="max-w-xs"
        multiple={multiple}
        onChange={handleChange}
      />
    </div>
  );
}

export default ImageInput;
