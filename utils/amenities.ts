import { IconType } from 'react-icons';
export type Amenity = {
  name: string;
  icon: IconType;
  selected: boolean;
};

import { FaBath, FaSwimmingPool, FaTv, FaWifi }

from "react-icons/fa";

import { FaPersonSwimming } from "react-icons/fa6";

import { TbToolsKitchen } from "react-icons/tb";

import { PiTowel } from "react-icons/pi";

import { BiBlanket } from "react-icons/bi";

import { TbAirConditioning } from "react-icons/tb";

import { MdOutlineFreeBreakfast } from "react-icons/md";

import { LuWashingMachine } from "react-icons/lu";

import { BiSolidDryer } from "react-icons/bi";

import { GiClothesline } from "react-icons/gi";

import { RiDrinks2Fill } from "react-icons/ri";

import { IoIosRestaurant } from "react-icons/io";

export const amenities: Amenity[] = [
  { name: 'WiFi', icon: FaWifi, selected: false },
  { name: 'Swimming Pool', icon: FaPersonSwimming, selected: false },
  { name: 'Kitchen', icon: TbToolsKitchen, selected: false },
  { name: 'Private Bathroom', icon: FaBath, selected: false },
  { name: 'Bath Towels', icon: PiTowel, selected: false },
  { name: 'Bed Linens / Blankets', icon: BiBlanket, selected: false },
  { name: 'Air Conditioning', icon: TbAirConditioning, selected: false },
  { name: 'Breakfast Available', icon: MdOutlineFreeBreakfast, selected: false },
  { name: 'Washing Machine', icon: LuWashingMachine, selected: false },
  { name: 'Clothes Dryer', icon: BiSolidDryer, selected: false },
  { name: 'TV', icon: FaTv, selected: false },
  { name: 'Clothes Line', icon: GiClothesline, selected: false },
  { name: 'Bar / Restaurant ', icon: IoIosRestaurant, selected: false },
];