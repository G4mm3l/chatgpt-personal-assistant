import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "@/env.mjs";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const { username, password } = req.body as {
    username?: string;
    password?: string;
  };

  if (
    username === env.ADMIN_USERNAME &&
    password === env.ADMIN_PASSWORD
  ) {
    res.setHeader(
      "Set-Cookie",
      "adminAuth=1; Path=/; HttpOnly; Max-Age=86400",
    );
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
}

