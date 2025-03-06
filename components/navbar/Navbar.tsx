import Image from "next/image";
import NavSearch from "./NavSearch";
import LinksDropdown from "./LinksDropdown";
import Logo from "./Logo";

function Navbar() {
  return (
    <nav className="border-b">
      <div className="container flex flex-col sm:flex-row items-center justify-between py-4">
        {/* Left group: Logo immediately followed by Android image */}
        <div className="flex items-center">
          <Logo />
          <div className="relative w-32 h-32">
            <Image
              src="/navbar/android.png"
              alt="Android"
              fill
              className="object-contain"
            />
          </div>
        </div>
        {/* Center: NavSearch takes available space */}
        <div className="flex-grow">
          <NavSearch />
        </div>
        {/* Right group: Apple image immediately followed by LinksDropdown */}
        <div className="flex items-center">
          <div className="relative w-32 h-32">
            <Image
              src="/navbar/apple.png"
              alt="Apple"
              fill
              className="object-contain"
            />
          </div>
          <LinksDropdown />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
