"use client";

import { useState, useEffect } from "react";
import Difficulty from "@/components/Difficulty";
import Mode from "@/components/Mode";

export type Difficulty = "Easy" | "Medium" | "Hard";
export type Mode = "Timed (60s)" | "Passage";

export default function Home() {
  const [difficulty, setDifficulty] = useState<Difficulty>("Hard");
  const [mode, setMode] = useState<Mode>("Timed (60s)");
  const [data, setData] = useState("");
  const [currentPassage, setCurrentPassage] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((jsonData) => {
        setData(jsonData);
        console.log(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (data) {
      getRandomPassage();
    }
  }, [data, difficulty]);

  function getRandomPassage() {
    const currentIndex = currentId
      ? parseInt(currentId.split("-")[1], 10) - 1
      : -1;
    const passages = data[difficulty.toLowerCase()];
    let randomIndex = Math.floor(Math.random() * passages.length);
    while (randomIndex === currentIndex) {
      randomIndex = Math.floor(Math.random() * passages.length);
    }
    setCurrentPassage(passages[randomIndex].text);
    setCurrentId(`${difficulty}-${randomIndex + 1}`);
  }

  function startTest() {
    setTesting(true);
  }

  function restartTest() {
    setTesting(false);
    getRandomPassage();
    setTesting(true);
  }

  return (
    <>
      <div className="xl:flex items-center justify-between gap-4 w-full border-b border-neutral-800">
        <div className="flex items-center gap-4 text-center font-light mx-auto mb-4">
          <p className="text-neutral-400 text-lg pe-6 border-e border-neutral-800">
            WPM:{" "}
            <span className="font-extrabold text-neutral-000 text-2xl mx-2">
              0
            </span>
          </p>
          <p className="text-neutral-400 text-lg px-6 border-e border-neutral-800">
            Accuracy:{" "}
            <span className="font-extrabold text-neutral-000 text-2xl mx-2">
              100%
            </span>
          </p>
          <p className="text-neutral-400 text-lg px-6 ">
            Time:{" "}
            <span className="font-extrabold text-neutral-000 text-2xl mx-2">
              0:60
            </span>
          </p>
        </div>
        <div className="flex items-top xl:justify-end gap-4 grow mb-4 mt-1">
          <Difficulty difficulty={difficulty} setDifficulty={setDifficulty} />
          <Mode mode={mode} setMode={setMode} />
        </div>
      </div>
      <div
        id="passage"
        className="relative pt-8 pb-10 border-b border-neutral-800"
      >
        <p
          className={
            testing
              ? "text-2xl md:text-4xl leading-relaxed text-neutral-400"
              : "blur-md text-2xl md:text-4xl leading-relaxed text-neutral-400"
          }
        >
          {currentPassage}
        </p>
        {!testing && (
          <div className="absolute top-0 left-0 w-full h-full flex flex-col itemc-center justify-center">
            <div className="text-center">
              <button
                type="button"
                onClick={() => startTest()}
                className="bg-blue-500 px-4 py-2 rounded-md m-4 hover:bg-blue-400 transition-colors duration-200 cursor-pointer"
              >
                Start Typing Test
              </button>
              <p>Or click the text and start typing</p>
            </div>
          </div>
        )}
      </div>
      <div className="text-center flex items-center justify-center">
        <div>
          <button
            type="button"
            onClick={() => restartTest()}
            className="bg-neutral-800 px-4 py-2 rounded-md m-4 hover:bg-neutral-700 transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Restart Test </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                fill="#fff"
                d="M1.563 1.281h.949c.246 0 .422.211.422.457l-.07 3.446a8.6 8.6 0 0 1 7.277-3.868c4.816 0 8.718 3.938 8.718 8.72-.035 4.816-3.937 8.683-8.718 8.683a8.86 8.86 0 0 1-5.871-2.215.446.446 0 0 1 0-.633l.703-.703c.14-.14.386-.14.562 0 1.23 1.09 2.813 1.723 4.606 1.723A6.88 6.88 0 0 0 17.03 10c0-3.797-3.093-6.89-6.89-6.89-2.813 0-5.203 1.687-6.293 4.078l4.43-.106c.245 0 .456.176.456.422v.95c0 .245-.21.421-.421.421h-6.75a.406.406 0 0 1-.422-.422v-6.75c0-.21.175-.422.422-.422"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
