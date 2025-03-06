"use client";

import { useEffect, useState } from "react";
import { LuUserPlus } from "react-icons/lu";
import { fetchProfileImage } from "@/utils/actions";

function UserIcon() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfileImage() {
      const image = await fetchProfileImage();
      setProfileImage(image ?? null); // ✅ Ensure undefined is converted to null
    }
    loadProfileImage();
  }, []);

  if (profileImage) {
    return (
      <img
        src={profileImage}
        className="w-6 h-6 rounded-full object-cover"
        alt="Profile"
      />
    );
  }

  return <LuUserPlus className="w-6 h-6 bg-primary rounded-full text-white" />;
}

export default UserIcon;
