import React from "react";

interface AiIconProps {
  className?: string;
}

export default function AiIcon({ className }: AiIconProps) {
  return (
    <svg
      className={`${className}`}
      width="126"
      height="126"
      viewBox="0 0 126 126"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37.1933 58.1933L44.8944 35.0898H54.8556L62.5568 58.1933L85.6602 65.8944V75.8556L62.5567 83.5567L54.8556 106.66H44.8944L37.1933 83.5567L14.0898 75.8556V65.8944L37.1933 58.1933ZM49.875 53.3519L46.3243 64.0039L43.004 67.3243L32.352 70.875L43.004 74.4257L46.3243 77.746L49.875 88.398L53.4257 77.746L56.7461 74.4257L67.3981 70.875L56.7461 67.3243L53.4257 64.0039L49.875 53.3519Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M84.791 27.0409L88.8867 14.7539H94.8634L98.9591 27.0409L111.246 31.1366V37.1133L98.9591 41.209L94.8634 53.4961H88.8867L84.791 41.209L72.5039 37.1133V31.1366L84.791 27.0409Z"
        fill="currentColor"
      />
    </svg>
  );
}
