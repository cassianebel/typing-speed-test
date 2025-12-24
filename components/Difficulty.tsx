"use client";

import { useState, useEffect } from "react";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import RadioItem from "./RadioItem";
import type { Difficulty } from "../app/page";

type Props = {
  difficulty: Difficulty;
  setDifficulty: React.Dispatch<React.SetStateAction<Difficulty>>;
};

export default function Difficulty({ difficulty, setDifficulty }: Props) {
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
    <fieldset className="md:flex items-center w-full md:w-auto md:border-e border-neutral-800 pe-4">
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
          <div className="border-b md:border-0 border-neutral-500 p-2 px-4 md:px-2 md:py-0 flex">
            <RadioItem
              label="Easy"
              name="difficulty"
              id="difficulty-easy"
              state={difficulty}
              changeHandler={handleDifficultyChange}
            />
          </div>
          <div className="border-b md:border-0 border-neutral-500 p-2 px-4 md:px-2 md:py-0 flex">
            <RadioItem
              label="Medium"
              name="difficulty"
              id="difficulty-medium"
              state={difficulty}
              changeHandler={handleDifficultyChange}
            />
          </div>
          <div className="p-2 px-4 md:px-2 md:py-0 flex">
            <RadioItem
              label="Hard"
              name="difficulty"
              id="difficulty-hard"
              state={difficulty}
              changeHandler={handleDifficultyChange}
            />
          </div>
        </div>
      )}
    </fieldset>
  );
}
