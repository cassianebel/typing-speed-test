"use client";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-2 mb-10">
      <div className="flex items-center gap-2">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 32 32"
          >
            <path
              fill="url(#a)"
              fillRule="evenodd"
              d="M22.827 15.626a1.155 1.155 0 1 1 .001-2.308 1.155 1.155 0 0 1-.001 2.308m-2.279 3.84a1.156 1.156 0 0 1 0-2.31 1.156 1.156 0 0 1 0 2.31m-.784 4.746h-7.526a1 1 0 0 1 0-2h7.526a1 1 0 0 1 0 2m-9.48-5.902a1.156 1.156 0 1 1 1.155 1.156 1.156 1.156 0 0 1-1.155-1.156M9.16 15.626a1.155 1.155 0 1 1 0-2.308 1.155 1.155 0 0 1 0 2.308m4.557-2.31a1.155 1.155 0 1 1 0 2.311 1.155 1.155 0 0 1 0-2.31m2.276 3.84a1.156 1.156 0 0 1 0 2.31 1.156 1.156 0 0 1 0-2.31m2.277-3.84a1.155 1.155 0 1 1-.001 2.311 1.155 1.155 0 0 1 0-2.31m3.369-4.77h-4.447v-.185a3.596 3.596 0 0 0-3.578-3.538H12.27a.67.67 0 0 1-.668-.66 1 1 0 0 0-2 .019 2.67 2.67 0 0 0 2.657 2.641h1.335c.809-.02 1.586.696 1.598 1.552v.171h-4.83c-4.4 0-7.028 2.579-7.028 6.898v6.497c-.007 2.084.618 3.817 1.808 5.01 1.224 1.229 3.024 1.877 5.208 1.877h11.289c4.4 0 7.028-2.574 7.028-6.884v-6.4c0-4.382-2.628-6.998-7.028-6.998"
              clipRule="evenodd"
            />
            <defs>
              <linearGradient
                id="a"
                x1="5.5"
                x2="32.5"
                y1="7"
                y2="38.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4ca6ff" />
                <stop offset="1" stopColor="#f4dc73" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="hidden sm:block">
          <h1 className="text-2xl font-bold">Typing Speed Test</h1>
          <p className="text-xs font-extralight text-neutral-400">
            Type as fast as you can in 60 seconds
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="18"
            fill="none"
            viewBox="0 0 21 18"
          >
            <path
              fill="#f4dc73"
              d="M19.406 2.25c.457 0 .844.387.844.844v1.969c0 1.265-.809 2.566-2.18 3.55-1.125.809-2.46 1.301-3.867 1.477-1.125 1.828-2.39 2.566-2.39 2.566v2.531H13.5c1.23 0 2.25.739 2.25 1.97v.421c0 .246-.21.422-.422.422H4.922a.406.406 0 0 1-.422-.422v-.422c0-1.23.984-1.968 2.25-1.968h1.688v-2.532s-1.301-.738-2.426-2.566c-1.407-.176-2.742-.668-3.867-1.477C.773 7.63 0 6.328 0 5.063v-1.97c0-.456.352-.843.844-.843H4.5V.844C4.5.387 4.852 0 5.344 0h9.562c.457 0 .844.387.844.844V2.25zM3.48 6.785c.422.317.915.563 1.477.774A12.7 12.7 0 0 1 4.5 4.5H2.25v.563c0 .421.352 1.125 1.23 1.722M18 5.062V4.5h-2.285a12.7 12.7 0 0 1-.457 3.059c.562-.211 1.055-.457 1.476-.774C17.367 6.363 18 5.66 18 5.062"
            />
          </svg>
        </div>
        <p className="text-neutral-400 font-light text-lg">
          <span className="hidden sm:inline">Personal </span>Best:{" "}
          <span className="text-neutral-000">0 WPM</span>
        </p>
      </div>
    </header>
  );
}
