import { useState } from "react";
import { signup } from '@/lib/apis/signup';
import type { SignupRequest } from '@/types/auth/dto';
import MessageBlock from "./fields/MessageBlock";
import { signUpSchema } from '@/schemas/signUpSchema';
import { ZodError } from 'zod';
import { useCheckIdDuplicateQuery, useCheckEmailDuplicateQuery } from '@/hooks/auth/useSignUp';
import { teamOptions } from "../../constants/teamOptions";
import { frontendNames, backendNames } from "../../constants/nameOptions";
import Label from "./fields/Label";
import Input from "./fields/Input";
import Select from "./fields/Select";
import CheckButton from "./fields/CheckButton";

const SignUpForm = () => {
  const [showIdCheckError, setShowIdCheckError] = useState(false);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [form, setForm] = useState({
    selectedTeam: null as 'FRONT-END' | 'BACK-END' | null,
    selectedTeamName: "",
    selectedName: "",
    userId: "",
    userEmail: "",
    password: "",
    passwordCheck: "",
  });

  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [idCheckRequested, setIdCheckRequested] = useState(false);
  const [emailCheckRequested, setEmailCheckRequested] = useState(false);

  const { data: idCheckData, refetch: refetchIdCheck, isFetching: isIdChecking } = useCheckIdDuplicateQuery(form.userId, { enabled: false });
  const { data: emailCheckData, refetch: refetchEmailCheck, isFetching: isEmailChecking } = useCheckEmailDuplicateQuery(form.userEmail, { enabled: false });

  const handleUserIdCheck = async () => {
    setShowIdCheckError(false);
    setIdCheckRequested(true);
    const result = await refetchIdCheck();
    if (result.data && result.data.result.available) {
      setIsIdChecked(true);
    } else {
      setIsIdChecked(false);
    }
  };
  const handleEmailCheck = async () => {
    setEmailCheckRequested(true);
    const result = await refetchEmailCheck();
    setIsEmailChecked(!!(result.data && result.data.result.available));
  };

  // 입력값 변경 시마다 zod로 실시간 유효성 검사
  const validateForm = (nextForm: typeof form) => {
    try {
      signUpSchema.parse({
        userEmail: nextForm.userEmail,
        password: nextForm.password,
        passwordCheck: nextForm.passwordCheck,
      });
      setValidationErrors({});
    } catch (err) {
    if (err instanceof ZodError) {
          const errors: { [key: string]: string } = {};
    err.issues.forEach((e) => {
            if (e.path && e.path.length > 0) {
              errors[String(e.path[0])] = e.message;
            }
          });
          setValidationErrors(errors);
        }
      }
    };

  // 각 입력값 변경 핸들러에서 유효성 검사 호출
  const handleChange = (field: keyof typeof form, value: string) => {
    const nextForm = { ...form, [field]: value };
    setForm(nextForm);
    validateForm(nextForm);
    // 아이디/이메일 입력 시 중복확인 상태 초기화
    if (field === 'userId') {
      setIdCheckRequested(false);
      setIsIdChecked(false);
      setShowIdCheckError(false);
    }
    if (field === 'userEmail') {
      setEmailCheckRequested(false);
      setIsEmailChecked(false);
    }
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
      {/* 팀명 */}
      </div>
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
          options={form.selectedTeam === 'FRONT-END' ? frontendNames : form.selectedTeam === 'BACK-END' ? backendNames : []}
          placeholder="이름을 선택하세요"
          value={form.selectedName}
          onChange={val => setForm({ ...form, selectedName: val })}
        />
      </div>
      {/* 아이디 */}
      <Label>아이디</Label>
      <div className="flex w-full gap-2 flex-nowrap">
        <Input
          type="text"
          placeholder="아이디를 입력하세요"
          className="px-4 py-3 md:px-6 flex-1 min-w-0"
          value={form.userId}
          onChange={e => {
            const value = e.target.value;
            if (/^[a-zA-Z0-9]*$/.test(value)) {
              handleChange('userId', value);
            }
          }}
        />
        <CheckButton
          disabled={form.userId.length < 6}
          onClick={handleUserIdCheck}
          className="px-4 py-3"
        >
          중복확인
        </CheckButton>
      </div>
      <MessageBlock
        error={undefined}
        checkError={showIdCheckError}
        checkRequested={idCheckRequested}
        checkData={idCheckData}
        isChecking={isIdChecking}
        availableMsg="사용 가능한 아이디입니다."
        unavailableMsg="이미 사용 중인 아이디입니다."
        needCheckMsg="아이디 중복 확인이 필요합니다."
        minHeight="20px"
        className={((idCheckRequested && !isIdChecking && idCheckData) || showIdCheckError) ? 'mb-2' : 'mb-2'}
      />
      {/* 이메일 */}
      <Label>이메일</Label>
      <div className="flex flex-col w-full">
        <div className="flex w-full gap-2 flex-nowrap">
          <Input
            type="email"
            placeholder="이메일을 입력하세요"
            className="px-4 py-3 md:px-6 flex-1 min-w-0"
            value={form.userEmail}
            onChange={e => {
              handleChange('userEmail', e.target.value);
            }}
          />
          <CheckButton
            disabled={!!validationErrors.userEmail || !form.userEmail}
            onClick={handleEmailCheck}
            className="px-4 py-3"
          >
            중복확인
          </CheckButton>
        </div>
          <MessageBlock
            error={validationErrors.userEmail && form.userEmail ? validationErrors.userEmail : undefined}
            // 이메일 중복확인 필요 메시지는 회원가입 버튼 클릭 후 중복확인 안했을 때만 표시
            checkError={emailCheckRequested && !isEmailChecked && (!emailCheckData || (emailCheckData && emailCheckData.result.available)) && !isEmailChecking}
            checkRequested={emailCheckRequested}
            // 이메일 중복 결과에 따라 메시지 표시
            checkData={emailCheckData}
            isChecking={isEmailChecking}
            availableMsg="사용 가능한 이메일입니다."
            unavailableMsg="이미 사용 중인 이메일입니다."
            needCheckMsg="이메일 중복 확인이 필요합니다."
            minHeight="20px"
            className="mb-2"
            showWhenInput={true}
            inputValue={form.userEmail}
          />
      </div>
      {/* 비밀번호 */}
      <Label>비밀번호</Label>
      <Input
        type="password"
        placeholder="비밀번호를 입력하세요"
        className="px-4 py-3 md:px-6 mb-6"
        value={form.password}
        onChange={e => handleChange('password', e.target.value)}
      />
      {validationErrors.password && (
        <p className="text-red-500 text-body-2-semibold mb-5">{validationErrors.password}</p>
      )}
      {/* 비밀번호 재확인 */}
      <Label>비밀번호 재확인</Label>
      <Input
        type="password"
        placeholder="비밀번호를 다시 입력하세요"
        className="px-4 py-3 md:px-6"
        value={form.passwordCheck}
        onChange={e => handleChange('passwordCheck', e.target.value)}
      />
      <div style={{ minHeight: '24px' }} className={validationErrors.passwordCheck ? 'mb-1' : 'mb-1'}>
        {validationErrors.passwordCheck && form.passwordCheck && (
          <p className="text-red-500 text-body-2-semibold">{validationErrors.passwordCheck}</p>
        )}
      </div>
      {/* 회원가입 버튼 */}
      <button
        type="button"
        disabled={
          !form.selectedTeam ||
          !form.selectedTeamName ||
          !form.selectedName ||
          !form.userId ||
          !form.userEmail ||
          !!validationErrors.userEmail ||
          !form.password ||
          !form.passwordCheck ||
          Object.keys(validationErrors).length > 0
        }
        onClick={async () => {
          if (!isIdChecked) {
            setShowIdCheckError(true);
            return;
          }
          if (!isEmailChecked) {
            setEmailCheckRequested(true); // 회원가입 버튼 클릭 시 중복확인 필요 메시지 표시
            return;
          }
          const payload: SignupRequest = {
            loginId: form.userId,
            password: form.password,
            email: form.userEmail,
            part: form.selectedTeam === 'FRONT-END' ? 'FRONTEND' : 'BACKEND',
            name: form.selectedName,
            team: form.selectedTeamName as SignupRequest['team'],
          };
          try {
            const res = await signup(payload);
            if (res.isSuccess) {
              alert('회원가입이 완료되었습니다!');
              window.location.href = '/login';
            } else {
              alert(res.message || '회원가입에 실패했습니다.');
            }
          } catch (err) {
            alert('회원가입 중 오류가 발생했습니다.');
          }
        }}
        className={`text-body-1-medium py-3 rounded-[14px] font-bold mt-14 transition
          ${form.selectedTeam && form.selectedTeamName && form.selectedName && form.userId && form.userEmail && !validationErrors.userEmail && form.password && form.passwordCheck && Object.keys(validationErrors).length === 0
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
