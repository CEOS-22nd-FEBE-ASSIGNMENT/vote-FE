"use client";

import SignUpForm from "../../components/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="my-8 px-8 py-6 rounded-2xl shadow-xl bg-white">
        <h1 className="text-head-2-bold mb-4 text-center">회원가입</h1>
        <p className="text-center text-gray-700 mb-6 text-body-2-semibold">투표 시스템에 가입하고 투표에 참여하세요</p>
        <SignUpForm />
        <p className="text-center text-body-2-semibold text-gray-700 mt-4">이미 계정이 있으신가요? <span className="cursor-pointer">로그인하러 가기</span></p>
      </div>
    </div>
  );
};

export default SignUpPage;
