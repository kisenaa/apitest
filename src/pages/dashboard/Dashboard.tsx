import { useState } from 'react';

import SideBar from './SideBar';
import Todolist from './Todolist';
import Weather from './Weather';

const Dashboard = () => {
  const [currentPage, setCurrent ] = useState('Dashboard')

  return (
    <div className="h-screen overflow-auto">
      <div className="flex">
        <div className="max-w-[14vw]">
          <SideBar currentPage={currentPage} setCurrentPage={setCurrent} />
        </div>

        {currentPage === 'Dashboard' ? <Todolist /> : null}
        {currentPage === 'Weather' ? <Weather/> : null}
      </div>
    </div>
  );
};

export default Dashboard;
