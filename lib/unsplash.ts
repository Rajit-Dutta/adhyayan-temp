"use client";

import axios from "axios";
import { useRef } from "react";

const UNSPLASH_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

const subjectImageMap: Record<string, string> = {
  mathematics: "mathematics algebra geometry",
  chemistry: "science laboratory chemistry",
  physics: "science laboratory physics",
  biology: "science laboratory biology",
  english: "english-language books library study",
  technology: "programming coding computer",
  humanities: "history geography culture",
};

export const getSubjectImage = async (subject: string) => {
  const query = subjectImageMap[subject.toLowerCase()] ?? "education classroom";
  try {
    const res = await axios.get("https://api.unsplash.com/photos/random", {
      params: {
        query,
        orientation: "landscape",
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_KEY}`,
      },
    });

    return res.data.urls.regular;
  } catch (err) {
    console.error("Image fetch failed", err);
    return "/fallback.jpg";
  }
};

const imageCache = new Map<string, string>();

export const getCachedSubjectImage = async (subject: string) => {
  const key = subject.toLowerCase();

  if (imageCache.has(key)) {
    return imageCache.get(key)!;
  }

  const img = await getSubjectImage(subject);

  imageCache.set(key, img);

  return img;
};
