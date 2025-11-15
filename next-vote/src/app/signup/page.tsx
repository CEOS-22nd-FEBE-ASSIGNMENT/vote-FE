'use client';

import SignUpForm from '../../components/signup/SignUpForm';
import { useGuestGuard } from '@/hooks/useAuthGuard';

const SignUpPage = () => {
  useGuestGuard();

  return (
    <div className="flex items-center justify-center gradient-radial pt-20">
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
