"use client";

export default function ResultsPage() {
  const lastResult = JSON.parse(sessionStorage.getItem("lastResult") || "{}");

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Results</h1>
      <p>WPM: {lastResult.wpm ?? "N/A"}</p>
      <p>Accuracy: {lastResult.accuracy ?? "N/A"}%</p>
      <p>
        Chacarcters: {lastResult.correctChars}/{lastResult.wrongChars}
      </p>
    </div>
  );
}
