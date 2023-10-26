import { FaAngleRight } from 'react-icons/fa';
import { MdLogin } from 'react-icons/md';

import express from '../assets/images/express.svg';
import nodejslogo from '../assets/images/nodejs.svg';
import postqres from '../assets/images/postqres.svg';
import reactlogo from '../assets/images/react.svg';
import tailwind from '../assets/images/tailwind.svg';
import tslogo from '../assets/images/tslogo.svg';

const HomePage = () => {
  return (
    <div className="h-screen overflow-y-auto bg-[#161616]">
      <header className="fixed left-0 top-0 mt-1 flex w-screen items-center justify-between px-[7%] py-5">
        <div
          className="bg-transparent bg-clip-text text-4xl font-semibold "
          style={{
            backgroundImage: `-webkit-linear-gradient(0deg, #0ef 40%, #1f5a6e 100% )`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Midterm Exam
        </div>
        <a className="blue-button rounded-md bg-[--primary-8] text-white hover:brightness-90">
          Join Waitlist
        </a>
      </header>

      <div className="flex flex-col items-center pt-[12%]">
        <span className="text-[60px] font-bold text-white">Open Source</span>

        <span className="landing-gradient-text ml-3 text-[60px] font-bold leading-none">
          CRUD Application
        </span>

        <div className="mt-14 text-xl font-medium text-[rgba(255,255,255,.7)]">
          Buld fast. Maintain control. Lightweight
        </div>

        <div className="mt-[5%] flex w-full justify-between sm:px-[30%] xl:px-[40%]">
          <a
            className="blue-button gap-2 rounded-3xl bg-[--primary-8] text-white"
            href="sign-in"
          >
            <span className=" relative text-xl">
              <MdLogin />
            </span>
            Login now
          </a>
          <a
            className="blue-button gap-2 rounded-3xl bg-[--primary-8] text-white"
            href="sign-up"
          >
            Register
            <FaAngleRight />
          </a>
        </div>

        <div className=" pt-[13%] font-medium text-[#999]">Build by using</div>

        <div className="mt-5 flex flex-row gap-4">
          <img src={reactlogo} />
          <img src={nodejslogo} />
          <img src={tslogo} />
          <img src={express} />
          <img src={postqres} />
          <img src={tailwind} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
