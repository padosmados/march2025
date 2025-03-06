import { Label } from '@/components/ui/label';
import { Input } from '../ui/input';

type PriceInputProps = {
  name?: string;
  label?: string;
  defaultValue?: number;
  max?: number; // New optional max prop
};

function PriceInput({
  name = 'price',
  label = 'Price (€)',
  defaultValue,
  max,
}: PriceInputProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label}
      </Label>
      <Input
        id={name}
        type="number"
        name={name}
        min={0}
        defaultValue={defaultValue || 100}
        max={max} // Now accepts max prop
        required
      />
    </div>
  );
}

export default PriceInput;
