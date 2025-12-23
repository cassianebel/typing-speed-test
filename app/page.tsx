import Difficulty from "@/components/Difficulty";
import Mode from "@/components/Mode";

export default function Home() {
  return (
    <div className="xl:flex items-center justify-between gap-4 w-full">
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
        <Difficulty />
        <Mode />
      </div>
    </div>
  );
}
