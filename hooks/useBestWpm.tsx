"use client";

import { useEffect, useState } from "react";

const BEST_WPM_KEY = "bestWpm";

export function useBestWpm() {
  const [bestWpm, setBestWpm] = useState<number>(() => {
    const raw = localStorage.getItem(BEST_WPM_KEY);
    const stored = raw === null ? 0 : Number(raw);
    return Number.isNaN(stored) ? 0 : stored;
  });

  useEffect(() => {
    const onUpdated = (e: Event) => {
      const detail = (e as CustomEvent<number>).detail;
      if (typeof detail === "number") setBestWpm(detail);
    };

    window.addEventListener("bestWpmUpdated", onUpdated as EventListener);
    return () => {
      window.removeEventListener("bestWpmUpdated", onUpdated as EventListener);
    };
  }, []);

  function updateBestWpm(newWpm: number) {
    const raw = localStorage.getItem(BEST_WPM_KEY);
    const stored = raw === null ? 0 : Number(raw);

    if (Number.isNaN(stored) || newWpm > stored) {
      localStorage.setItem(BEST_WPM_KEY, newWpm.toString());
      setBestWpm(newWpm);
      // notify other listeners in this window
      window.dispatchEvent(
        new CustomEvent("bestWpmUpdated", { detail: newWpm })
      );
    }
  }

  return { bestWpm, updateBestWpm };
}
