import { NextApiRequest, NextApiResponse } from "next";
import { getPropertiesByHost } from "@/utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const properties = await getPropertiesByHost(userId as string);

  return res.json({ properties });
}
