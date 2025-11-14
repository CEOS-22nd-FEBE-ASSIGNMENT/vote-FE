import { useState, useEffect } from "react";
import { teamOptions } from "../../constants/teamOptions";
import { nameOptions } from "../../constants/nameOptions";

const SignUpForm = () => {
  const [selectedTeam, setSelectedTeam] = useState<'FRONT-END' | 'BACK-END' | null>(null);
  const [selectedTeamName, setSelectedTeamName] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleResize = () => setIsDesktop(mediaQuery.matches);
    handleResize();
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const isValidEmail = (email: string) => {
    return /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  return (
    <form
      className={`flex flex-col w-full mx-auto my-8 rounded-2xl bg-white ${isDesktop ? 'max-w-2xl px-8 py-6' : 'max-w-[360px] px-8 py-6'}`}
      style={{ boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.10), 0 4px 6px -4px rgba(0, 0, 0, 0.10)" }}
    >
      <h1 className={`text-head-2-bold ${isDesktop ? 'mb-4' : 'mb-2'} text-center`}>회원가입</h1>
      <p className={`text-center text-gray-700 ${isDesktop ? 'mb-6' : 'mb-8'} text-body-2-semibold`}>투표 시스템에 가입하고 투표에 참여하세요</p>
      {/* 팀 선택 버튼 */}
      <label className="text-body-2-semibold mb-2.5 flex">팀 선택</label>
      <div className="flex h-12 w-full mb-6 justify-between">
        <button
          type="button"
          className={`${isDesktop ? 'w-[290px] py-3 px-0' : 'w-[138px] px-0 py-3'} rounded-[14px] text-body-1-semibold cursor-pointer transition-all duration-150 ${selectedTeam === 'FRONT-END' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setSelectedTeam('FRONT-END')}
        >
          FRONT-END
        </button>
        <button
          type="button"
          className={`${isDesktop ? 'w-[290px] py-3 px-0' : 'w-[138px] px-0 py-3'} rounded-[14px] text-body-1-semibold cursor-pointer transition-all duration-150 ${selectedTeam === 'BACK-END' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setSelectedTeam('BACK-END')}
        >
          BACK-END
        </button>
      </div>
      {/* 팀명 */}
      <label className="text-body-2-semibold mb-1 flex">팀명</label>
      <div className="flex flex-col gap-2 mb-6">
        <select
          className={`${isDesktop ? 'px-6 py-3' : 'px-4 py-3'} border border-gray-200 bg-gray-300 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 text-body-1-semibold`}
          value={selectedTeamName}
          onChange={e => setSelectedTeamName(e.target.value)}
        >
          <option value="">팀명을 선택하세요</option>
          {teamOptions.map((team) => (
            <option key={team} value={team}>{team}</option>
          ))}
        </select>
      </div>
      {/* 이름 */}
      <label className="text-body-2-semibold mb-1 flex">이름</label>
      <div className="flex flex-col gap-2 mb-6">
        <select
          className={`${isDesktop ? 'px-6 py-3' : 'px-4 py-3'} border border-gray-200 bg-gray-300 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 text-body-1-semibold`}
          value={selectedName}
          onChange={e => setSelectedName(e.target.value)}
        >
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
          className={`${isDesktop ? 'px-6 py-3' : 'px-4 py-3'} w-2/3 border border-gray-200 bg-gray-300 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-black/50 text-body-1-semibold placeholder:text-body-1-semibold`}
          value={userId}
          onChange={e => setUserId(e.target.value)}
        />
        <button
          type="button"
          className={`w-1/3 ${isDesktop ? 'px-6 py-3' : 'px-4 py-3'} h-full flex items-center justify-center text-body-1-semibold rounded-[14px] transition-colors duration-150
            ${userId.length >= 6 ? "bg-blue-600 text-white cursor-pointer hover:bg-blue-500" : "bg-gray-500 text-gray-700 opacity-100 cursor-not-allowed"}`}
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
          className={`${isDesktop ? 'px-6 py-3' : 'px-4 py-3'} w-2/3 border border-gray-200 bg-gray-300 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-black/50 text-body-1-semibold placeholder:text-body-1-semibold`}
          value={userEmail}
          onChange={e => setUserEmail(e.target.value)}
        />
        <button
          type="button"
          className={`w-1/3 ${isDesktop ? 'px-6 py-3' : 'px-4 py-3'} h-full flex items-center justify-center text-body-1-semibold rounded-[14px] transition-colors duration-150
            ${isValidEmail(userEmail) ? "bg-blue-600 text-white cursor-pointer hover:bg-blue-500" : "bg-gray-500 text-gray-700 opacity-100 cursor-not-allowed"}`}
          disabled={!isValidEmail(userEmail)}
        >
          중복확인
        </button>
      </div>
      {/* 비밀번호 */}
      <label className="text-body-2-semibold mb-1 flex">비밀번호</label>
      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        className={`${isDesktop ? 'px-6 py-3' : 'px-4 py-3'} border border-gray-200 bg-gray-300 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-black/50 text-body-1-semibold placeholder:text-body-1-semibold mb-6`}
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {/* 비밀번호 재확인 */}
      <label className="text-body-2-semibold mb-1 flex">비밀번호 재확인</label>
      <input
        type="password"
        placeholder="비밀번호를 다시 입력하세요"
        className={`${isDesktop ? 'px-6 py-3' : 'px-4 py-3'} border border-gray-200 bg-gray-300 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-black/50 text-body-1-semibold placeholder:text-body-1-semibold`}
        value={passwordCheck}
        onChange={e => setPasswordCheck(e.target.value)}
      />
      {/* 회원가입 버튼 */}
      <button
        type="submit"
        disabled={
          !selectedTeam ||
          !selectedTeamName ||
          !selectedName ||
          !userId ||
          !userEmail ||
          !isValidEmail(userEmail) ||
          !password ||
          !passwordCheck
        }
        className={`text-body-1-medium py-3 rounded-[14px] font-bold mt-14 transition cursor-pointer
          ${selectedTeam && selectedTeamName && selectedName && userId && userEmail && isValidEmail(userEmail) && password && passwordCheck
            ? "bg-blue-600 text-white hover:bg-blue-500"
            : "bg-gray-500 text-white opacity-100 cursor-not-allowed"}
        `}
      >
        회원가입하기
      </button>
      <p className="text-center text-body-2-semibold text-gray-700 mt-4">
        이미 계정이 있으신가요?{' '}
        <a href="/login" className="cursor-pointer hover:underline">로그인하러 가기</a>
      </p>
    </form>
  );
};

export default SignUpForm;
