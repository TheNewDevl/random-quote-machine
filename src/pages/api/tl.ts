// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as deepl from "deepl-node";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const key = process.env.DEEPL_KEY;
      const translator = new deepl.Translator(key!!);

      if (!req.body) {
        throw new Error("No text provided");
      }
      const body = req.body;
      const result = await translator.translateText(req.body, "en", "fr");
      res.status(200).json({ text: result.text });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}
