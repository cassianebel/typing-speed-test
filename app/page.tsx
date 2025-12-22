import Difficulty from "@/components/Difficulty";

export default function Home() {
  return (
    <div className="lg:flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 text-center font-light mx-auto w-full mb-4">
        <p className="text-neutral-400 text-lg px-6 border-e ">
          WPM:{" "}
          <span className="font-extrabold text-neutral-000 text-2xl mx-2">
            0
          </span>
        </p>
        <p className="text-neutral-400 text-lg px-6 border-e ">
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
      <div className="flex items-center gap-4">
        <Difficulty />
      </div>
    </div>
  );
}
