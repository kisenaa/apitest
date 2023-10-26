import { SignUp } from '@clerk/clerk-react';
import { ReactNode } from 'react';

const SignUps = ({ children }: { children?: ReactNode }) => {
  return (
    <div>
      <div
        className="flex h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('../src/assets/images/bg.jpg')",
        }}
      ></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <SignUp routing="path" path="/sign-up" />
        {children}
      </div>
    </div>
  );
};

export default SignUps;
