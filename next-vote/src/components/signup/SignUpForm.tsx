"use client";
import { useState } from "react";
import { teamOptions } from "../../constants/teamOptions";
import { nameOptions } from "../../constants/nameOptions";

const SignUpForm = () => {
  const [selectedTeam, setSelectedTeam] = useState<'FRONT-END' | 'BACK-END' | null>(null);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const isValidEmail = (email: string) => {
    return /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  return (
    <form className="flex flex-col w-[292px]">
      {/* 팀 선택 버튼 */}
      <label className="text-body-2-semibold mb-2.5 flex">팀 선택</label>
      <div className="flex h-12 w-full mb-6 justify-between">
        <button
          type="button"
          className={`px-6 py-3 rounded-[14px] text-body-1-semibold cursor-pointer transition-all duration-150 ${selectedTeam === 'FRONT-END' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setSelectedTeam('FRONT-END')}
        >
          FRONT-END
        </button>
        <button
          type="button"
          className={`px-6 py-3 rounded-[14px] text-body-1-semibold cursor-pointer transition-all duration-150 ${selectedTeam === 'BACK-END' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setSelectedTeam('BACK-END')}
        >
          BACK-END
        </button>
      </div>
      {/* 팀명 */}
      <label className="text-body-2-semibold mb-1 flex">팀명</label>
      <div className="flex flex-col gap-2 mb-6">
        <select className="border border-gray-200 text-body-1-semibold bg-gray-300 rounded-[14px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700">
          <option value="">팀을 선택하세요</option>
          {teamOptions.map((team) => (
            <option key={team} value={team}>{team}</option>
          ))}
        </select>
      </div>
      {/* 이름 */}
      <label className="text-body-2-semibold mb-1 flex">이름</label>
      <div className="flex flex-col gap-2 mb-6">
        <select className="border border-gray-200 text-body-1-semibold bg-gray-300 rounded-[14px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700">
          <option value="">이름을 선택하세요</option>
          {nameOptions.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>
      {/* 아이디 */}
      <label className="text-body-2-semibold mb-1 flex">아이디</label>
      <div className="flex w-full gap-2 mb-6">
        <input
          type="text"
          placeholder="아이디를 입력하세요"
          className="w-2/3 border border-gray-200 text-body-1-semibold bg-gray-300 rounded-[14px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-black/50 placeholder:text-body-1-semibold"
          value={userId}
          onChange={e => setUserId(e.target.value)}
        />
        <button
          type="button"
          className={`w-1/3 px-4 py-3 h-full flex items-center justify-center rounded-[14px] transition-colors duration-150
            ${userId.length >= 6 ? "bg-blue-600 text-white cursor-pointer" : "bg-gray-500 text-gray-700 opacity-100 cursor-not-allowed"}`}
          disabled={userId.length < 6}
        >
          중복확인
        </button>
      </div>
      {/* 이메일 */}
      <label className="text-body-2-semibold mb-1 flex">이메일</label>
      <div className="flex w-full gap-2 mb-6">
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          className="w-2/3 border border-gray-200 text-body-1-semibold bg-gray-300 rounded-[14px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-black/50 placeholder:text-body-1-semibold"
          value={userEmail}
          onChange={e => setUserEmail(e.target.value)}
        />
        <button
          type="button"
          className={`w-1/3 px-4 py-3 h-full flex items-center justify-center rounded-[14px] transition-colors duration-150
            ${isValidEmail(userEmail) ? "bg-blue-600 text-white cursor-pointer" : "bg-gray-500 text-gray-700 opacity-100 cursor-not-allowed"}`}
          disabled={!isValidEmail(userEmail)}
        >
          중복확인
        </button>
      </div>
      {/* 비밀번호 */}
      <label className="text-body-2-semibold mb-1 flex">비밀번호</label>
      <input type="password" placeholder="비밀번호를 입력하세요" className="border border-gray-200 text-body-1-semibold bg-gray-300 rounded-[14px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-black/50 placeholder:text-body-1-semibold mb-6" />
      {/* 비밀번호 재확인 */}
      <label className="text-body-2-semibold mb-1 flex">비밀번호 재확인</label>
      <input type="password" placeholder="비밀번호를 다시 입력하세요" className="border border-gray-200 text-body-1-semibold bg-gray-300 rounded-[14px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-black/50 placeholder:text-body-1-semibold" />
      {/* 회원가입 버튼 */}
      <button type="submit" className="bg-blue-500 text-white text-body-1-medium py-3 rounded-[14px] font-bold mt-14 hover:bg-blue-600 transition cursor-pointer">회원가입하기</button>
    </form>
  );
};

export default SignUpForm;
