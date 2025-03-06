import { IconType } from 'react-icons';
import { MdOutlineLocalHotel } from "react-icons/md";
import { RiHotelBedFill } from "react-icons/ri";
import { FaHotel } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import { FaCampground } from "react-icons/fa";

type Category = {
  label: CategoryLabel;
  icon: IconType;
};

export type CategoryLabel =
  | 'Albergue'
  | 'Pensiones'
  | 'Private Room'
  | 'Hotel'
  | 'Apartment'
  | 'Camping'

  

export const categories: Category[] = [
  {
    label: 'Albergue',
    icon: MdOutlineLocalHotel,
  },
  
  {
    label: 'Pensiones',
    icon: RiHotelBedFill,
  },
  
  {
    label: 'Private Room',
    icon: FaHouseUser,
  },
    
  {
    label: 'Hotel',
    icon: FaHotel,
  },
  
  {
    label: 'Apartment',
    icon: MdApartment,
  },
  {
    label: 'Camping',
    icon: FaCampground,
  },
  ];