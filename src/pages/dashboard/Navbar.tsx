import { useClerk, useUser } from '@clerk/clerk-react';
import { CloudSunRain, LayoutDashboard } from 'lucide-react';
import { HiOutlineLogout } from 'react-icons/hi';
import { RxAvatar } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

import Sidebar, { SidebarItem } from '@/components/Sidebar';

const Navbar = () => {
  const navigate = useNavigate();

  const { user } = useUser();
  const { openUserProfile } = useClerk();
  const { signOut } = useClerk();

  return (
    <>
      <Sidebar
        username={user?.username ? user.username : 'username'}
        email={
          user?.primaryEmailAddress?.emailAddress
            ? user?.primaryEmailAddress?.emailAddress
            : 'email'
        }
      >
        <hr className="my-3"></hr>
        <button onClick={() => openUserProfile()}>
          <SidebarItem
            icon={<RxAvatar size={30} />}
            text="Edit Profile"
            active={false}
            alert={false}
          />
        </button>
        <hr className="my-2"></hr>
        <button>
          <SidebarItem
            icon={<LayoutDashboard size={30} />}
            text="Dashboard"
            active={true}
            alert={false}
          />
        </button>
        <hr className="my-2"></hr>
        <button>
          <SidebarItem
            icon={<CloudSunRain size={30} />}
            text="Weathers"
            active={false}
            alert={false}
          />
        </button>
        <hr className="my-2"></hr>
        <button onClick={() => signOut(() => navigate('/'))}>
          <SidebarItem
            icon={<HiOutlineLogout size={30} />}
            text="Logout"
            active={false}
            alert={false}
          />
        </button>
      </Sidebar>
    </>
  );
};

export default Navbar;
