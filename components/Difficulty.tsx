"use client";

import { useState, useEffect } from "react";
import { useIsDesktop } from "@/hooks/useIsDesktop";

type Difficulty = "Easy" | "Medium" | "Hard";

export default function Difficulty() {
  const [difficulty, setDifficulty] = useState<Difficulty>("Hard");
  const [isOpen, setIsOpen] = useState(false);

  const isDesktop = useIsDesktop();

  useEffect(() => {
    setIsOpen(isDesktop);
  }, [isDesktop]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDifficulty(e.target.value as Difficulty);
    if (!isDesktop) {
      setIsOpen(false);
    }
  };

  return (
    <fieldset className="md:flex items-center w-full">
      <div>
        <legend>
          <span className="hidden md:block text-neutral-400 font-light">
            Difficulty:{" "}
          </span>
          {!isDesktop && (
            <button
              className="flex items-center gap-2 justify-center border rounded-md px-3 py-1 mb-2 cursor-pointer w-full"
              type="button"
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {difficulty}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="6"
                fill="none"
                viewBox="0 0 11 6"
                className={
                  isOpen
                    ? "rotate-180 transition-all duration-300"
                    : "transition-all duration-300"
                }
              >
                <path
                  fill="currentColor"
                  d="M4.742 5.836.117 1.242c-.156-.125-.156-.375 0-.531L.742.117a.36.36 0 0 1 .531 0l3.75 3.688L8.743.117c.155-.156.405-.156.53 0l.625.594c.157.156.157.406 0 .531L5.273 5.836a.36.36 0 0 1-.53 0"
                />
              </svg>
            </button>
          )}
        </legend>
      </div>
      {isOpen && (
        <div className="bg-neutral-800 md:bg-transparent rounded-md md:flex items-center">
          <div className="border-b md:border-0 border-neutral-500 p-2 px-4 md:px-2">
            <input
              type="radio"
              name="difficulty"
              id="difficulty-easy"
              value="Easy"
              checked={difficulty === "Easy"}
              onChange={handleDifficultyChange}
              className="peer md:sr-only"
            />
            <label
              htmlFor="difficulty-easy"
              className="md:border border-neutral-500 p-1 px-2 peer-checked:border-blue-500 peer-checked:md:text-blue-500 rounded-md cursor-pointer"
            >
              Easy
            </label>
          </div>
          <div className="border-b md:border-0 border-neutral-500 p-2 px-4 md:px-2">
            <input
              type="radio"
              name="difficulty"
              id="difficulty-medium"
              value="Medium"
              checked={difficulty === "Medium"}
              onChange={handleDifficultyChange}
              className="peer md:sr-only"
            />
            <label
              htmlFor="difficulty-medium"
              className="md:border border-neutral-500 p-1 px-2 peer-checked:border-blue-500 peer-checked:md:text-blue-500 rounded-md cursor-pointer"
            >
              Medium
            </label>
          </div>
          <div className="p-2 px-4 md:px-2">
            <input
              type="radio"
              name="difficulty"
              id="difficulty-hard"
              value="Hard"
              checked={difficulty === "Hard"}
              onChange={handleDifficultyChange}
              className="peer md:sr-only"
            />
            <label
              htmlFor="difficulty-hard"
              className="md:border border-neutral-500 p-1 px-2 peer-checked:border-blue-500 peer-checked:md:text-blue-500 rounded-md cursor-pointer"
            >
              Hard
            </label>
          </div>
        </div>
      )}
    </fieldset>
  );
}
