"use client";

import { useState, useEffect } from "react";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import type { Mode } from "../app/page";

type Props = {
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
};

export default function Mode({ mode, setMode }: Props) {
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

  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMode(e.target.value as Mode);
    if (!isDesktop) {
      setIsOpen(false);
    }
  };

  return (
    <fieldset className="md:flex items-center w-full md:w-auto md:shrink-0">
      <div>
        <legend>
          <span className="hidden md:block text-neutral-400 font-light">
            Mode:{" "}
          </span>
          {!isDesktop && (
            <button
              className="flex items-center gap-2 justify-center border rounded-md px-3 py-1 mb-2 cursor-pointer w-full"
              type="button"
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {mode}
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
            <input
              type="radio"
              name="mode"
              id="mode-timed"
              value="Timed (60s)"
              checked={mode === "Timed (60s)"}
              onChange={handleModeChange}
              className="peer md:sr-only"
            />
            <label
              htmlFor="mode-timed"
              className="md:border border-neutral-500 md:hover:border-blue-500 md:hover:text-blue-500 transition-colors duration-200 md:peer-focus:outline-2 outline-offset-2 p-1 px-2 peer-checked:border-blue-500 peer-checked:md:text-blue-500 rounded-md cursor-pointer grow shrink-0"
            >
              Timed (60s)
            </label>
          </div>
          <div className="p-2 px-4 md:px-2 md:py-0 flex">
            <input
              type="radio"
              name="mode"
              id="mode-passage"
              value="Passage"
              checked={mode === "Passage"}
              onChange={handleModeChange}
              className="peer md:sr-only"
            />
            <label
              htmlFor="mode-passage"
              className="md:border border-neutral-500 md:hover:border-blue-500 md:hover:text-blue-500 transition-colors duration-200 md:peer-focus:outline-2 outline-offset-2 p-1 px-2 peer-checked:border-blue-500 peer-checked:md:text-blue-500 rounded-md cursor-pointer grow"
            >
              Passage
            </label>
          </div>
        </div>
      )}
    </fieldset>
  );
}
