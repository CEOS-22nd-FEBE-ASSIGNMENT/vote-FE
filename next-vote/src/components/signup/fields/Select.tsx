import React, { useState, useRef, useEffect } from "react";

interface SelectProps {
  options: string[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const Select = ({
  options,
  placeholder = "",
  value,
  onChange,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 키보드 접근성 (ESC 닫기)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSelect = (opt: string) => {
    if (onChange) onChange(opt);
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative w-full`}>
      <button
        type="button"
        className={`flex items-center justify-between w-full px-4 py-3 md:px-6 md:py-3 border border-gray-200 bg-gray-300 rounded-[14px] text-body-1-semibold text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition cursor-pointer ${open ? "ring-2 ring-blue-400" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{ minHeight: "48px" }}
      >
        <span className={value ? "text-black" : "text-gray-700"}>
          {value ? options.find(opt => opt === value) : placeholder || "선택하세요"}
        </span>
        <svg
          className={`ml-2 w-4 h-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <ul
          className="absolute z-10 mt-2 w-full border border-gray-200 bg-white rounded-[14px] shadow-lg max-h-60 overflow-auto animate-fade-in px-0"
          role="listbox"
        >
          {placeholder && (
            <li
              className="px-4 py-3 md:px-6 md:py-3 text-gray-500 cursor-default select-none w-full text-body-1-semibold"
              style={{ minHeight: "48px" }}
            >
              {placeholder}
            </li>
          )}
          {options.map(opt => (
            <li
              key={opt}
              className={`px-4 py-3 md:px-6 md:py-3 w-full cursor-pointer text-body-1-semibold transition-colors rounded-[14px] ${value === opt ? "bg-blue-100 text-blue-600" : "text-black hover:bg-gray-100"}`}
              style={{ minHeight: "48px" }}
              onClick={() => handleSelect(opt)}
              role="option"
              aria-selected={value === opt}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
