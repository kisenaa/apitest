import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import SignIns from '@/components/SignIn';
import SignUps from '@/components/SignUp';

import Dashboard from '@/pages/dashboard/Dashboard';
import HomePage from '@/pages/HomePage';

const clerkPubKey = `${import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY}`;

const AllRoutes = () => {
  const navigate = useNavigate();

  return (
        <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in/*" element={<SignIns />} />
        <Route path="/sign-up/*" element={<SignUps />} />
        <Route path="/home/*" element={<HomePage />} />
        <Route path='/.netlify/*'/>
        <Route path='/api/*'/>
        <Route path='/sync/'/>
        <Route
          path="/dashboard/*"
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn redirectUrl="/dashboard/" />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </ClerkProvider>
  );
};

export default AllRoutes;
