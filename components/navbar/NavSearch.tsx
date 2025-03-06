"use client";

import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";
import { SlArrowDownCircle } from "react-icons/sl";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiCalculator1 } from "react-icons/ci";
import { FaHistory, FaRunning } from "react-icons/fa";
import { GrContact } from "react-icons/gr";
import { IoMdHelpCircle } from "react-icons/io";
import { MdOutlineChurch } from "react-icons/md";
import { FaRegistered } from "react-icons/fa";
import { GiBackpack } from "react-icons/gi";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { IoHomeSharp } from "react-icons/io5";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

type NavSearchProps = {
  onDateSelect?: (date: Date | null) => void;
};

const NavSearch: React.FC<NavSearchProps> = ({ onDateSelect }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // Initialize query from URL search params (for tagline search)
  const [query, setQuery] = useState(
    searchParams.get("search")?.toString() || ""
  );
  const [showInput, setShowInput] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [numBeds, setNumBeds] = useState<number>(0);

  // Debounced function to update URL search param
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`/?${params.toString()}`);
  }, 500);

  // Update query when input changes and update URL
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  };

  const handleToggle = () => {
    setShowInput(true);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  const handleNumBedsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNumBeds(parseInt(e.target.value, 10));
  };

  // Reset query state if URL search param is removed externally
  useEffect(() => {
    if (!searchParams.get("search")) {
      setQuery("");
    }
  }, [searchParams.get("search")]);

  return (
    <div className="border border-yellow-400 sm:rounded-full rounded-lg p-4 bg-white">
      <div className="border-[1px] w-full md:w-auto py-2 sm:rounded-full rounded-lg shadow-sm hover:shadow-md transition cursor-pointer bg-white">
        <div className="flex flex-row items-center justify-between text-yellow-400">
          <div className="flex-1 px-6">
            {showInput ? (
              <input
                type="text"
                value={query}
                onChange={handleQueryChange}
                placeholder="Search by Town..."
                className="w-full outline-none text-sm font-semibold bg-transparent text-yellow-400"
              />
            ) : (
              <div
                className="text-sm font-semibold cursor-pointer text-blue-500"
                onClick={handleToggle}
              >
                Camino Towns / Cities
              </div>
            )}
          </div>
          <div className="hidden sm:block flex-1 px-6 border-x-[1px] text-center">
            <ReactDatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              placeholderText="Select Date"
              className="outline-none text-sm font-semibold px-3 py-2 border rounded bg-transparent text-blue-500"
              dateFormat="MMMM d, yyyy"
              minDate={new Date()}
            />
          </div>
          <div className="text-sm pl-6 pr-2 flex flex-row items-center gap-3">
            <div className="hidden sm:block text-blue-500">Beds:</div>
            <select
              value={numBeds}
              onChange={handleNumBedsChange}
              className="p-2 border rounded text-sm bg-transparent text-blue-500"
            >
              {Array.from({ length: 26 }, (_, i) => (
                <option key={i} value={i} className="text-black">
                  {i}
                </option>
              ))}
            </select>
            <div className="p-2 bg-blue-500 rounded-full text-yellow-400">
              <BiSearch size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Rounded Buttons Below NavSearch */}
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        <NavButton href="/" label="Home" icon={<IoHomeSharp />} />
        <NavButton href="/about-us" label="About Us" icon={<SlArrowDownCircle />} />
        <NavButton href="/our-mission" label="Our Mission" icon={<MdOutlineChurch />} />
        <NavButton href="/advise" label="Advise" icon={<IoMdHelpCircle />} />
        <NavButton href="/what-to-take" label="What to bring" icon={<BsFillRocketTakeoffFill />} />
        <NavButton href="/history" label="History" icon={<FaHistory />} />
        <NavButton href="/stages" label="Stages" icon={<FaRunning />} />
        <NavButton href="/book-bag-collection" label="Book Bag Collection" icon={<GiBackpack />} />
        <NavButton href="/contact-us" label="Contact Us" icon={<GrContact />} />
        <NavButton href="/register-your-property" label="Register your Property" icon={<FaRegistered />} />
        <NavButton href="/calculator" label="Distance Calculator" icon={<IoIosInformationCircleOutline />} />
      </div>
    </div>
  );
};

// Rounded Button Component
const NavButton = ({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) => (
  <Link
    href={href}
    className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-yellow-400 rounded-full hover:bg-gray-700 transition"
  >
    {icon} <span className="text-sm">{label}</span>
  </Link>
);

export default NavSearch;
