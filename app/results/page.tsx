"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { TestResult } from "@/types/typing";

export default function ResultsPage() {
  const [lastResult, setLastResult] = useState<TestResult | null>(() => {
    const raw = sessionStorage.getItem("lastResult");
    if (!raw) return null;
    try {
      return JSON.parse(raw) as TestResult;
    } catch {
      return null;
    }
  });

  const router = useRouter();

  const [bestBefore] = useState<number | null>(() => {
    const s = localStorage.getItem("bestWpm");
    return s === null ? null : Number(s);
  });

  const [isFirstTest] = useState(
    () => localStorage.getItem("bestWpm") === null
  );

  useEffect(() => {
    if (!lastResult) return;

    if (bestBefore === null) {
      localStorage.setItem("bestWpm", String(lastResult.wpm));
      return;
    }

    if (lastResult.wpm > bestBefore) {
      localStorage.setItem("bestWpm", String(lastResult.wpm));
    }
  }, [lastResult, bestBefore]);

  if (!lastResult) {
    return (
      <div className="p-8">
        <h1>No recent test result</h1>
        <p>Run a typing test and you will see the result here.</p>
      </div>
    );
  }

  const isNewBest = bestBefore !== null && lastResult.wpm > bestBefore;

  return (
    <div className="p-8 flex flex-col items-center gap-8">
      {isNewBest ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          fill="none"
          viewBox="0 0 80 80"
        >
          <path
            stroke="#f4dc73"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="5"
            d="M29.579 58.003c2.938 2.744 11.607-1.77 19.365-10.08 7.755-8.309 11.663-17.267 8.725-20.01s-11.611 1.77-19.366 10.08c-7.758 8.309-11.663 17.267-8.724 20.01"
            clip-rule="evenodd"
          />
          <path
            stroke="#f4dc73"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="5"
            d="M10.696 22.917h.078m8.927 34.19h.078M58.176 28.568l11.712 36.778c.545 1.719-1.019 3.367-2.767 2.91l-36.444-9.591"
          />
          <path
            stroke="#f4dc73"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="5"
            d="M51.21 64.064c2.414-1.739 4.924-3.99 7.337-6.561 2.54-2.738 4.664-5.537 6.273-8.141M21.49 46.937S15.32 46.46 10 52.207"
          />
          <path
            stroke="#f4dc73"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="5"
            d="M31.908 19.9a3.952 3.952 0 1 1-7.904.004 3.952 3.952 0 0 1 7.904-.003"
            clip-rule="evenodd"
          />
          <path
            stroke="#f4dc73"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="5"
            d="M42.438 42.269s-10.82-11.163-27.392-6.444M46.17 11.667s-6.266 8.578.674 18.892"
          />
        </svg>
      ) : (
        <div className="border-14 border-green-500/15 w-fit h-auto rounded-full">
          <div className="border-14 border-green-500/30 w-fit h-auto rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              fill="none"
              viewBox="0 0 64 64"
            >
              <g clip-path="url(#a)">
                <path
                  fill="#121212"
                  d="M0 32C0 14.327 14.327 0 32 0s32 14.327 32 32-14.327 32-32 32S0 49.673 0 32"
                />
                <path
                  fill="#4dd67b"
                  fill-rule="evenodd"
                  d="M45.45 26.01 29.895 41.567a2.51 2.51 0 0 1-1.785.741c-.65 0-1.294-.245-1.79-.74l-7.777-7.778a2.527 2.527 0 0 1 3.57-3.574l5.997 5.992 13.766-13.77a2.527 2.527 0 1 1 3.574 3.574M32 0C14.356 0 0 14.356 0 32c0 17.647 14.356 32 32 32s32-14.353 32-32C64 14.356 49.644 0 32 0"
                  clip-rule="evenodd"
                />
              </g>
              <defs>
                <clipPath id="a">
                  <path
                    fill="#fff"
                    d="M0 32C0 14.327 14.327 0 32 0s32 14.327 32 32-14.327 32-32 32S0 49.673 0 32"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      )}

      {isFirstTest ? (
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Baseline Established!</h1>
          <p className="text-neutral-400 text-xl font-light">
            You've set the bar. Now the real challenge begins—time to beat it.
          </p>
        </div>
      ) : isNewBest ? (
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">High Score Smashed!</h1>
          <p className="text-neutral-400 text-xl font-light">
            You're getting faster. That was incredible typing.
          </p>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Test Complete!</h1>
          <p className="text-neutral-400 text-xl font-light">
            Solid run. Keep pushing to beat your high score.
          </p>
        </div>
      )}

      <div>
        <p>WPM: {lastResult.wpm ?? "N/A"}</p>
        <p>Accuracy: {lastResult.accuracy ?? "N/A"}%</p>
        <p>
          Characters: {lastResult.correctChars}/{lastResult.wrongChars}
        </p>
      </div>

      <button
        type="button"
        onClick={() => router.push("/")}
        className="bg-neutral-000 text-neutral-800 px-4 py-2 rounded-md m-4 hover:bg-neutral-200 transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
      >
        <span>Go Again </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            fill="currentColor"
            d="M1.563 1.281h.949c.246 0 .422.211.422.457l-.07 3.446a8.6 8.6 0 0 1 7.277-3.868c4.816 0 8.718 3.938 8.718 8.72-.035 4.816-3.937 8.683-8.718 8.683a8.86 8.86 0 0 1-5.871-2.215.446.446 0 0 1 0-.633l.703-.703c.14-.14.386-.14.562 0 1.23 1.09 2.813 1.723 4.606 1.723A6.88 6.88 0 0 0 17.03 10c0-3.797-3.093-6.89-6.89-6.89-2.813 0-5.203 1.687-6.293 4.078l4.43-.106c.245 0 .456.176.456.422v.95c0 .245-.21.421-.421.421h-6.75a.406.406 0 0 1-.422-.422v-6.75c0-.21.175-.422.422-.422"
          />
        </svg>
      </button>
    </div>
  );
}
