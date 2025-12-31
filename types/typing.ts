export type Difficulty = "Easy" | "Medium" | "Hard";

export type Mode = "Timed (60s)" | "Passage";

export type Passage = {
  id: string;
  text: string;
};

export type TestResult = {
  wpm: number;
  accuracy: number;
  correctChars: number;
  wrongChars: number;
  mode: Mode;
  difficulty: Difficulty;
  durationSeconds: number;
  timestamp: number;
};
