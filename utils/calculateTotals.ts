import { calculateDaysBetween } from '@/utils/calendar';

type BookingDetails = {
  checkIn: Date;
  checkOut: Date;
  price: number;
};

export const calculateTotals = ({
  checkIn,
  checkOut,
  price,
}: BookingDetails) => {
  const totalNights = calculateDaysBetween({ checkIn, checkOut });
  const subTotal = totalNights * price;
  const cleaning = 0;
  const service = 0;
  const tax = subTotal * 0;
  const orderTotal = subTotal + cleaning + service + tax;
  return { totalNights, subTotal, cleaning, service, tax, orderTotal };
};