"use client";

import { useState, useEffect, useRef, useMemo } from "react";
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
  const [hasStarted, setHasStarted] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [finishTime, setFinishTime] = useState("");
  const [typedCharacters, setTypedCharacters] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(60);
  const [finalWpm, setFinalWpm] = useState<number | null>(null);
  const [finalAccuracy, setFinalAccuracy] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  function getRandomPassage() {
    const currentPassageIndex = currentId
      ? parseInt(currentId.split("-")[1], 10) - 1
      : -1;
    const passages = data[difficulty.toLowerCase()];
    let randomIndex = Math.floor(Math.random() * passages.length);
    while (randomIndex === currentPassageIndex) {
      randomIndex = Math.floor(Math.random() * passages.length);
    }
    setCurrentPassage(passages[randomIndex].text);
    setCurrentId(`${difficulty}-${randomIndex + 1}`);
  }

  useEffect(() => {
    if (data) {
      getRandomPassage();
      setTesting(false);
      setTypedCharacters([]);
      setCurrentIndex(0);
    }
  }, [data, difficulty]);

  function restartTest() {
    setTesting(false);
    setTypedCharacters([]);
    setCurrentIndex(0);
    getRandomPassage();
    setFinalWpm(null);
    setFinalAccuracy(null);
    if (mode === "Passage") {
      setTimer(0);
    } else {
      setTimer(60);
    }
    setTesting(true);
    inputRef.current?.focus();
  }

  useEffect(() => {
    if (mode === "Passage") {
      setTimer(0);
    } else {
      setTimer(60);
    }
    if (testing) {
      restartTest();
    }
  }, [mode]);

  function finishTest() {
    setTesting(false);
    setHasStarted(false);
    setFinishTime(Date.now());

    const elapsedMinutes = (finishTime - startTime) / 60000;

    const correctChars = typedCharacters.filter(
      (char, i) => char === currentPassage[i]
    ).length;

    const accuracy =
      typedCharacters.length === 0
        ? 100
        : Math.round((correctChars / typedCharacters.length) * 100);

    const wordsTyped = typedCharacters.length / 5;
    const wpm =
      elapsedMinutes > 0 ? Math.round(wordsTyped / elapsedMinutes) : 0;

    setFinalAccuracy(accuracy);
    setFinalWpm(wpm);
  }

  useEffect(() => {
    if (!hasStarted || !testing) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (mode === "Timed (60s)" && prev <= 1) {
          clearInterval(interval);
          finishTest();
          return 0;
        }

        return mode === "Timed (60s)" ? prev - 1 : prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [hasStarted, testing, mode]);

  useEffect(() => {
    if (testing && typedCharacters.length === currentPassage.length) {
      finishTest();
    }
  }, [typedCharacters, currentPassage, testing]);

  const liveWpm = useMemo(() => {
    if (!hasStarted || finalWpm !== null) return 0;

    const elapsedMinutes = (Date.now() - startTime) / 60000;

    if (elapsedMinutes <= 0) return 0;

    const wordsTyped = typedCharacters.length / 5;

    return Math.round(wordsTyped / elapsedMinutes);
  }, [typedCharacters.length, startTime, hasStarted, finalWpm]);

  function countCorrectCharacters(passage: string, typed: string[]) {
    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === passage[i]) {
        correct++;
      }
    }
    return correct;
  }

  const accuracy = useMemo(() => {
    if (typedCharacters.length === 0) return 100;
    const correct = countCorrectCharacters(currentPassage, typedCharacters);
    return Math.round((correct / typedCharacters.length) * 100);
  }, [typedCharacters, currentPassage]);

  function startTest() {
    if (mode === "Passage") {
      setTimer(0);
    } else {
      setTimer(60);
    }
    setTesting(true);
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    e.preventDefault();

    if (!testing) return;

    if (!hasStarted && e.key.length === 1) {
      setHasStarted(true);
      setStartTime(Date.now());
    }

    if (e.key.length === 1) {
      setTypedCharacters((prev) => [...prev, e.key]);
      setCurrentIndex((i) => i + 1);
    }

    if (e.key === "Backspace") {
      setTypedCharacters((prev) => prev.slice(0, -1));
      setCurrentIndex((i) => Math.max(i - 1, 0));
    }
  }

  function formatTime(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <>
      <div className="xl:flex items-center justify-between gap-4 w-full border-b border-neutral-800">
        <div className="flex items-center gap-4 text-center font-light mx-auto mb-4">
          <p className="text-neutral-400 text-lg pe-6 border-e border-neutral-800">
            WPM:{" "}
            <span className="font-extrabold text-neutral-000 text-2xl mx-2">
              {liveWpm}
            </span>
          </p>
          <p className="text-neutral-400 text-lg px-6 border-e border-neutral-800">
            Accuracy:{" "}
            <span className="font-extrabold text-neutral-000 text-2xl mx-2">
              {accuracy}%
            </span>
          </p>
          <p className="text-neutral-400 text-lg px-6 ">
            Time:{" "}
            <span className="font-extrabold text-neutral-000 text-2xl mx-2">
              {formatTime(timer)}
            </span>
          </p>
        </div>
        <div className="flex items-top xl:justify-end gap-4 grow mb-4 mt-1">
          <Difficulty difficulty={difficulty} setDifficulty={setDifficulty} />
          <Mode mode={mode} setMode={setMode} />
        </div>
      </div>
      <div
        onClick={() => startTest()}
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
          {currentPassage.split("").map((char, index) => {
            let className = "text-neutral-400";
            const typedChar = typedCharacters[index];

            if (typedChar) {
              className =
                typedChar === char
                  ? "text-green-500"
                  : "text-red-500 underline underline-offset-8";
            }

            if (currentIndex === index) {
              className = "bg-neutral-800";
            }

            return (
              <span key={index} className={className}>
                {char}
              </span>
            );
          })}
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
      <input
        type="text"
        className="absolute opacity-0 pointer-events-none"
        autoFocus
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      <div className="text-center flex items-center justify-center">
        {testing && (
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
        )}
      </div>
    </>
  );
}
