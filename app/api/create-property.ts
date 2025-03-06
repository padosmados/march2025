import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { userId, name, location, price, tagline, category, image, country } = req.body;

  if (!userId || !name || !location || !price || !tagline || !category || !image || !country) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // ✅ Check if user is an admin
  const user = await prisma.profile.findUnique({
    where: { clerkId: userId },
    select: { role: true },
  });

  if (!user || user.role !== "ADMIN") {
    return res.status(403).json({ error: "Unauthorized: Only Admins can create properties" });
  }

  try {
    console.log("📌 Creating property with location:", location);

    const newProperty = await prisma.property.create({
        data: {
          name,
          price: Number(price),
          tagline,
          category,
          images: [image],
          country,
          ownerId: "",
          description: "", // ✅ Default empty string for required field
          address: "", // ✅ Default empty string for required field
          host: "", // ✅ Default empty string for required field
          hostlandlinephone: "", // ✅ Default empty string for required field
          hostmobilephone: "", // ✅ Default empty string for required field
          hostemail: "", // ✅ Default empty string for required field
          beds: 0, // ✅ Default to 0 if not provided
          privateroom: 0, // ✅ Default to 0 if not provided
          breakfast: 0, // ✅ Default to 0 if not provided
          amenities: [], // ✅ Ensure amenities is always an array
        },
      });

    return res.status(201).json({ message: "Property created", property: newProperty });
  } catch (error) {
    console.error("🔥 Error creating property:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
