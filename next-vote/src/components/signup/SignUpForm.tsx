import { useState } from "react";
import { teamOptions } from "../../constants/teamOptions";
import { nameOptions } from "../../constants/nameOptions";
import Label from "./fields/Label";
import Input from "./fields/Input";
import Select from "./fields/Select";
import CheckButton from "./fields/CheckButton";

const SignUpForm = () => {
  // 중복확인 버튼 핸들러
  const handleUserIdCheck = () => {
    // 아이디 중복확인 API 호출
  };
  const handleEmailCheck = () => {
    // 이메일 중복확인 API 호출
  };

  const [form, setForm] = useState({
    selectedTeam: null as 'FRONT-END' | 'BACK-END' | null,
    selectedTeamName: "",
    selectedName: "",
    userId: "",
    userEmail: "",
    password: "",
    passwordCheck: "",
  });

  const isValidEmail = (email: string) => {
    return /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  return (
    <form
      className="flex flex-col w-full mx-auto my-8 rounded-2xl bg-white max-w-[360px] px-8 py-6 md:max-w-2xl md:px-8 md:py-6"
      style={{ boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.10), 0 4px 6px -4px rgba(0, 0, 0, 0.10)" }}
    >
  <h1 className="text-head-2-bold mb-2 md:mb-4 text-center">회원가입</h1>
  <p className="text-center text-gray-700 mb-8 md:mb-6 text-body-2-semibold">투표 시스템에 가입하고 투표에 참여하세요</p>
      {/* 팀 선택 버튼 */}
      <Label className="mb-2.5">팀 선택</Label>
      <div className="flex h-12 w-full mb-6 justify-between">
        <button
          type="button"
          className={`w-[138px] px-0 py-3 md:w-[290px] md:py-3 rounded-[14px] text-body-1-semibold cursor-pointer transition-all duration-150 ${form.selectedTeam === 'FRONT-END' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setForm({ ...form, selectedTeam: 'FRONT-END' })}
        >
          FRONT-END
        </button>
        <button
          type="button"
          className={`w-[138px] px-0 py-3 md:w-[290px] md:py-3 rounded-[14px] text-body-1-semibold cursor-pointer transition-all duration-150 ${form.selectedTeam === 'BACK-END' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setForm({ ...form, selectedTeam: 'BACK-END' })}
        >
          BACK-END
        </button>
      </div>
      {/* 팀명 */}
      <Label>팀명</Label>
      <div className="flex flex-col w-full mb-6">
        <Select
          options={teamOptions}
          placeholder="팀명을 선택하세요"
          value={form.selectedTeamName}
          onChange={val => setForm({ ...form, selectedTeamName: val })}
        />
      </div>
      {/* 이름 */}
      <Label>이름</Label>
      <div className="flex flex-col w-full mb-6">
        <Select
          options={nameOptions}
          placeholder="이름을 선택하세요"
          value={form.selectedName}
          onChange={val => setForm({ ...form, selectedName: val })}
        />
      </div>
      {/* 아이디 */}
      <Label>아이디</Label>
      <div className="flex w-full gap-2 mb-6 flex-nowrap">
        <Input
          type="text"
          placeholder="아이디를 입력하세요"
          className="px-4 py-3 md:px-6 flex-1 min-w-0"
          value={form.userId}
          onChange={e => setForm({ ...form, userId: e.target.value })}
        />
        <CheckButton
          disabled={form.userId.length < 6}
          onClick={handleUserIdCheck}
          className="px-4 py-3"
        >
          중복확인
        </CheckButton>
      </div>
      {/* 이메일 */}
      <Label>이메일</Label>
      <div className="flex w-full gap-2 mb-6 flex-nowrap">
        <Input
          type="email"
          placeholder="이메일을 입력하세요"
          className="px-4 py-3 md:px-6 flex-1 min-w-0"
          value={form.userEmail}
          onChange={e => setForm({ ...form, userEmail: e.target.value })}
        />
        <CheckButton
          disabled={!isValidEmail(form.userEmail)}
          onClick={handleEmailCheck}
          className="px-4 py-3"
        >
          중복확인
        </CheckButton>
      </div>
      {/* 비밀번호 */}
      <Label>비밀번호</Label>
      <Input
        type="password"
        placeholder="비밀번호를 입력하세요"
        className="px-4 py-3 md:px-6 mb-6"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      {/* 비밀번호 재확인 */}
      <Label>비밀번호 재확인</Label>
      <Input
        type="password"
        placeholder="비밀번호를 다시 입력하세요"
        className="px-4 py-3 md:px-6"
        value={form.passwordCheck}
        onChange={e => setForm({ ...form, passwordCheck: e.target.value })}
      />
      {/* 회원가입 버튼 */}
      <button
        type="submit"
        disabled={
          !form.selectedTeam ||
          !form.selectedTeamName ||
          !form.selectedName ||
          !form.userId ||
          !form.userEmail ||
          !isValidEmail(form.userEmail) ||
          !form.password ||
          !form.passwordCheck
        }
        className={`text-body-1-medium py-3 rounded-[14px] font-bold mt-14 transition
          ${form.selectedTeam && form.selectedTeamName && form.selectedName && form.userId && form.userEmail && isValidEmail(form.userEmail) && form.password && form.passwordCheck
            ? "bg-blue-600 text-white hover:bg-blue-500 cursor-pointer"
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
