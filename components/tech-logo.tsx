import React from "react"

interface TechLogoProps {
  slug?: string
  className?: string
  size?: number
}

export function TechLogo({ slug = "", className = "h-6 w-6", size }: TechLogoProps) {
  const normalized = (slug || "").toLowerCase().trim()
  const inlineStyle = size ? { width: size, height: size } : undefined

  // C Language
  if (normalized === "c" || normalized === "c-lang") {
    return (
      <svg
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={inlineStyle}
        aria-label="C Language"
      >
        <path fill="url(#c-grad)" d="M64 8l50 28.8v57.6L64 123.2 14 94.4V36.8L64 8z" />
        <path
          fill="#FFFFFF"
          d="M64 28c-19.9 0-36 16.1-36 36s16.1 36 36 36c13.5 0 25.2-7.4 31.3-18.3l-13.1-7.6c-3.6 6.5-10.6 10.9-18.2 10.9-11.6 0-21-9.4-21-21s9.4-21 21-21c7.6 0 14.6 4.4 18.2 10.9l13.1-7.6C89.2 35.4 77.5 28 64 28z"
        />
        <defs>
          <linearGradient id="c-grad" x1="14" y1="8" x2="114" y2="123" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00599C" />
            <stop offset="1" stopColor="#003366" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  // C++ Language
  if (normalized === "cpp" || normalized === "c++" || normalized === "cplusplus") {
    return (
      <svg
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={inlineStyle}
        aria-label="C++ Language"
      >
        <path fill="url(#cpp-grad)" d="M64 8l50 28.8v57.6L64 123.2 14 94.4V36.8L64 8z" />
        <path
          fill="#FFFFFF"
          d="M50 28c-19.9 0-36 16.1-36 36s16.1 36 36 36c13.5 0 25.2-7.4 31.3-18.3l-13.1-7.6c-3.6 6.5-10.6 10.9-18.2 10.9-11.6 0-21-9.4-21-21s9.4-21 21-21c7.6 0 14.6 4.4 18.2 10.9l13.1-7.6C75.2 35.4 63.5 28 50 28z"
        />
        <path
          fill="#00D2FF"
          d="M85 54h6v7h7v6h-7v7h-6v-7h-7v-6h7v-7zm20 0h6v7h7v6h-7v7h-6v-7h-7v-6h7v-7z"
        />
        <defs>
          <linearGradient id="cpp-grad" x1="14" y1="8" x2="114" y2="123" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00599C" />
            <stop offset="1" stopColor="#004482" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  // HTML5
  if (normalized === "html" || normalized === "html5") {
    return (
      <svg
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={inlineStyle}
        aria-label="HTML5"
      >
        <path fill="#E44D26" d="M71 460L30 0h452l-41 460-185 52z" />
        <path fill="#F16529" d="M256 472l152-42 35-390H256z" />
        <path fill="#EBEBEB" d="M256 208H181l-5-58h80V94H114l14 170h128zm0 178l-1 1-63-17-4-48h-56l7 87 117 32z" />
        <path fill="#FFFFFF" d="M256 208v56h71l-7 79-64 18v56l117-32 16-177zm0-114v56h143l5-56z" />
      </svg>
    )
  }

  // CSS3
  if (normalized === "css" || normalized === "css3") {
    return (
      <svg
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={inlineStyle}
        aria-label="CSS3"
      >
        <path fill="#1572B6" d="M71 460L30 0h452l-41 460-185 52z" />
        <path fill="#33A9DC" d="M256 472l152-42 35-390H256z" />
        <path fill="#EBEBEB" d="M256 208H181l-5-58h80V94H114l14 170h128zm0 178l-1 1-63-17-4-48h-56l7 87 117 32z" />
        <path fill="#FFFFFF" d="M256 208v56h71l-7 79-64 18v56l117-32 16-177zm0-114v56h143l5-56z" />
      </svg>
    )
  }

  // JavaScript
  if (normalized === "javascript" || normalized === "js" || normalized === "es6") {
    return (
      <svg
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={inlineStyle}
        aria-label="JavaScript"
      >
        <rect width="512" height="512" rx="90" fill="#F7DF1E" />
        <path
          fill="#000000"
          d="M140 370c8 13 19 23 37 23 18 0 30-9 30-35V210h44v149c0 47-28 69-71 69-38 0-60-20-71-44l31-14zm168-5c10 16 24 27 48 27 21 0 34-10 34-25 0-17-14-24-38-34-34-14-56-30-56-65 0-32 25-56 64-56 27 0 47 10 61 34l-32 20c-7-12-16-18-29-18-14 0-22 8-22 19 0 14 9 19 30 28 39 17 64 31 64 70 0 40-32 62-75 62-43 0-68-21-79-48l30-16z"
        />
      </svg>
    )
  }

  // Python
  if (normalized === "python" || normalized === "py" || normalized.includes("python")) {
    return (
      <svg
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={inlineStyle}
        aria-label="Python"
      >
        <path
          fill="url(#py-blue)"
          d="M63.5 14C39 14 40.5 24.5 40.5 24.5l.05 11h23.45v3.3H26.3S14 37.3 14 62c0 24.5 10.7 23.5 10.7 23.5h6.4V75.3s-.35-12.2 12-12.2h23.5s11.6.2 11.6-11.4V25.4S79.7 14 63.5 14zm-12.8 7.3a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2z"
        />
        <path
          fill="url(#py-yellow)"
          d="M64.5 114c24.5 0 23-10.5 23-10.5l-.05-11H64v-3.3h37.7S114 90.7 114 66c0-24.5-10.7-23.5-10.7-23.5h-6.4v10.2s.35 12.2-12 12.2H61.4s-11.6-.2-11.6 11.4v26.3s-1.5 11.4 14.7 11.4zm12.8-7.3a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z"
        />
        <defs>
          <linearGradient id="py-blue" x1="14" y1="14" x2="79" y2="79" gradientUnits="userSpaceOnUse">
            <stop stopColor="#387EB8" />
            <stop offset="1" stopColor="#366994" />
          </linearGradient>
          <linearGradient id="py-yellow" x1="50" y1="50" x2="114" y2="114" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFE873" />
            <stop offset="1" stopColor="#FFD43B" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  // Java
  if (normalized === "java" || normalized.includes("java")) {
    return (
      <svg
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={inlineStyle}
        aria-label="Java"
      >
        <path
          fill="#E76F00"
          d="M50.2 12c-7 8.5-3.5 15.6 4.3 22.8 6.5 6 10.5 12.3 5.4 19.2-2.8 3.8-7.8 6.4-11.4 9.6 10.4-3.7 18.5-10.4 18.2-20.4-.4-12.8-13.8-19.7-16.5-31.2z"
        />
        <path
          fill="#EA2D2E"
          d="M41 28.5c-4.8 6.2-2 11.2 3.4 16.3 5.2 4.9 7.7 9.8 4 15.1-2.2 3.1-6.1 5.2-9 7.7 8.2-2.9 14.4-8.2 14-15.9-.4-10-10.3-15.3-12.4-23.2z"
        />
        <path
          fill="#5382A1"
          d="M22 84.5c0 0 8.5 4.8 24.5 4.8s38-4 44-12.5c0 0-4 3.5-13 5.5-12.5 2.8-38 2.2-55.5-3.8v6zm67.5-15.8c12.5-1.2 17.5-6.5 17.5-12 0-9.8-14.8-12.5-22-12.8v5.5c4.5.3 15 2 15 7.3 0 4.5-8.5 6.8-17 6.5l6.5 5.5z"
        />
        <path
          fill="#5382A1"
          d="M28 66c0 0 10.5 4.5 31.5 4.5s38-4.5 38-4.5-7.5 4-22 5.5C59 73 38 72 28 66zm-5 29c14 3.8 36.5 5 57 2 17-2.5 25-7 25-7s-6.5 5-21.5 7.5c-20 3.3-43.5 2-60.5-2.5z"
        />
        <path
          fill="#5382A1"
          d="M19 111c21.5 5.5 54 5.5 78 0 14-3.2 20-7.5 20-7.5s-7.5 5-21 7.5c-24 4.5-54 4.5-77 0z"
        />
      </svg>
    )
  }

  // Web Development / Full Stack
  if (normalized === "webdev" || normalized === "web" || normalized.includes("web")) {
    return (
      <svg
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={inlineStyle}
        aria-label="Web Development"
      >
        <rect width="128" height="128" rx="26" fill="#1C1917" stroke="#EA580C" strokeWidth="3" />
        <rect x="14" y="16" width="100" height="20" rx="6" fill="#292524" />
        <circle cx="26" cy="26" r="3.5" fill="#EF4444" />
        <circle cx="36" cy="26" r="3.5" fill="#F59E0B" />
        <circle cx="46" cy="26" r="3.5" fill="#10B981" />
        <path
          d="M44 60L28 76l16 16M84 60l16 16-16 16M70 52l-14 50"
          stroke="#EA580C"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  // Docker
  if (normalized.includes("docker") || normalized.includes("kubernetes")) {
    return (
      <svg
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={inlineStyle}
        aria-label="Docker"
      >
        <rect width="128" height="128" rx="26" fill="#0db7ed" />
        <path
          fill="#FFFFFF"
          d="M40 50h12v12H40zm16 0h12v12H56zm16 0h12v12H72zm-32 16h12v12H24zm16 0h12v12H40zm16 0h12v12H56zm16 0h12v12H72zm16 0h12v12H88zM24 82c2 14 16 26 40 26s46-12 52-32H16c0 2 0 4 8 6z"
        />
      </svg>
    )
  }

  // Git / DevOps
  if (normalized.includes("git")) {
    return (
      <svg
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={inlineStyle}
        aria-label="Git"
      >
        <rect width="128" height="128" rx="26" fill="#F05032" />
        <path
          fill="#FFFFFF"
          d="M89 57l-18-18c-3-3-8-3-11 0l-7 7 14 14c3-1 7 0 9 2s3 6 2 9l14 14c3-1 7 0 9 2 4 4 4 10 0 14s-10 4-14 0c-3-3-4-7-2-10L72 72v21c1 1 2 3 2 5 0 6-5 10-10 10s-10-4-10-10c0-4 3-8 7-9V56c-4-1-7-5-7-9 0-6 5-10 10-10 4 0 7 2 9 5l7-7-18-18c-3-3-8-3-11 0L24 45c-3 3-3 8 0 11l45 45c3 3 8 3 11 0l9-9c3-3 3-8 0-11z"
        />
      </svg>
    )
  }

  // TypeScript
  if (normalized === "typescript" || normalized === "ts") {
    return (
      <svg
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={inlineStyle}
        aria-label="TypeScript"
      >
        <rect width="128" height="128" rx="26" fill="#3178C6" />
        <path
          fill="#FFFFFF"
          d="M74.8 62h12.5v3.4h-4.3v27h-3.9v-27h-4.3V62zm24.1 19.3c1.7 1.4 3.7 2.2 5.9 2.2 2.6 0 4.1-1.3 4.1-3.2 0-2.1-1.8-2.9-4.8-4.2-3.8-1.5-6.8-3.4-6.8-7.5 0-4.3 3.5-7.5 8.9-7.5 3.3 0 6.1 1 8.2 2.7l-2.2 3.1c-1.8-1.3-3.8-2-6-2-3 0-4.8 1.4-4.8 3.4 0 2 1.6 2.8 4.7 4.1 4.2 1.7 6.9 3.6 6.9 7.7 0 4.7-3.7 7.7-9.3 7.7-3.8 0-7.3-1.3-9.5-3.3l2.7-3.2z"
          transform="matrix(1.4 0 0 1.4 -62 -42)"
        />
      </svg>
    )
  }

  // React
  if (normalized === "react" || normalized === "reactjs") {
    return (
      <svg
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={inlineStyle}
        aria-label="React"
      >
        <rect width="128" height="128" rx="26" fill="#20232A" />
        <circle cx="64" cy="64" r="9" fill="#61DAFB" />
        <ellipse cx="64" cy="64" rx="42" ry="16" stroke="#61DAFB" strokeWidth="4" fill="none" />
        <ellipse cx="64" cy="64" rx="42" ry="16" stroke="#61DAFB" strokeWidth="4" fill="none" transform="rotate(60 64 64)" />
        <ellipse cx="64" cy="64" rx="42" ry="16" stroke="#61DAFB" strokeWidth="4" fill="none" transform="rotate(120 64 64)" />
      </svg>
    )
  }

  // SQL & Databases
  if (normalized === "sql" || normalized.includes("database") || normalized.includes("postgres") || normalized.includes("mysql")) {
    return (
      <svg
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={inlineStyle}
        aria-label="SQL Database"
      >
        <rect width="128" height="128" rx="26" fill="#1E293B" stroke="#38BDF8" strokeWidth="3" />
        <ellipse cx="64" cy="38" rx="36" ry="12" fill="#0284C7" stroke="#38BDF8" strokeWidth="3" />
        <path d="M28 38v24c0 6.6 16.1 12 36 12s36-5.4 36-12V38" stroke="#38BDF8" strokeWidth="3" fill="none" />
        <path d="M28 62v24c0 6.6 16.1 12 36 12s36-5.4 36-12V62" stroke="#38BDF8" strokeWidth="3" fill="none" />
        <path d="M28 86v20c0 6.6 16.1 12 36 12s36-5.4 36-12V86" stroke="#38BDF8" strokeWidth="3" fill="none" />
      </svg>
    )
  }

  // Next.js
  if (normalized.includes("next")) {
    return (
      <svg
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={inlineStyle}
        aria-label="Next.js"
      >
        <rect width="128" height="128" rx="26" fill="#000000" stroke="#333333" strokeWidth="2" />
        <path
          fill="url(#next-grad)"
          d="M89.5 94.5L46.8 39H38v50h7.5V50.8l38.8 50.4c1.8-1.8 3.5-3.8 5.2-6.7z"
        />
        <path fill="#FFFFFF" d="M82.5 39H90v30h-7.5z" />
        <defs>
          <linearGradient id="next-grad" x1="68" y1="67" x2="89.5" y2="94.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  // AI & ML
  if (normalized.includes("ai") || normalized.includes("deep-learning") || normalized.includes("llama")) {
    return (
      <svg
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={inlineStyle}
        aria-label="Artificial Intelligence"
      >
        <rect width="128" height="128" rx="26" fill="#1C1917" stroke="#D97706" strokeWidth="3" />
        <circle cx="64" cy="64" r="20" fill="#D97706" fillOpacity="0.2" stroke="#D97706" strokeWidth="4" />
        <circle cx="64" cy="64" r="8" fill="#FDFBF7" />
        <path
          d="M64 24v16M64 88v16M24 64h16M88 64h16M36 36l12 12M80 80l12 12M36 92l12-12M80 48l12-12"
          stroke="#D97706"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    )
  }


  // Default Code Badge
  return (
    <svg
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={inlineStyle}
      aria-label="Code"
    >
      <rect width="128" height="128" rx="26" fill="#292524" stroke="#78716C" strokeWidth="2" />
      <path
        d="M48 48L32 64l16 16M80 48l16 16-16 16M68 40l-8 48"
        stroke="#EA580C"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
