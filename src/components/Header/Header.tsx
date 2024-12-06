import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from 'react';

import Logo from "@assets/images/logo_white.svg";
import IconProfile from "@assets/icons/icon-profile.svg?react";

import { GlobalContext } from "@core";
import { logout } from "@apis";
import { MyToast, MyToastProps } from "@components";

/**
 * 導覽列的元件
 */
export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, dispatch } = useContext(GlobalContext);
  const toastRef = useRef<{ show: (props: MyToastProps) => void } | null>(null);

  // 漢堡選單切換
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  // 首頁、房間頁背景透明
  const beTransparent = ['/', '/room'].includes(pathname);
  // 是否顯示 nav 連結(登入、註冊頁不顯示)
  const showLinks = !['/login', '/registration'].includes(pathname);

  // 登出
  const handleLogout = () => {
    logout();
    toastRef.current?.show({ severity: 'success', summary:'登出', detail: '已成功登出。' });
    dispatch({ type: 'SET_USER', payload: null });
    navigate('/');
  };

  useEffect(() => {
    // 每次路徑改變時關閉選單
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    // 768px是切換到桌機的斷點，切換回桌機時，isOpen設置為false
    const handleResize = () => {
      if(window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    // 監聽視窗變化事件
    window.addEventListener('resize', handleResize);
    // 在組件卸載時移除監聽器
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return(<>
  <header className={`flex justify-between items-center px-3 py-4 md:px-20 md:py-6 h-[72px] md:h-[120px] fixed top-0 left-0 z-20 w-full ${ beTransparent ? 'bg-transparent' : 'bg-neutral-bg' }`}>
    <Link to={'/'} className="w-[110px] md:w-[196px]"><img src={Logo} alt="享樂酒店" /></Link>
    <nav>
      { showLinks && (
      <ul className={`bg-neutral-bg flex flex-col justify-center items-center fixed w-full text-center h-screen top-0 left-0  gap-4 transition-transform duration-300 ease-in-out md:flex-row md:static md:bg-transparent md:translate-x-0 md:justify-between md:h-auto  ${isOpen ? 'translate-x-0 px-5' : '-translate-x-full'}`}>
        <li className={isOpen ? 'w-full' : ''}><Link to={'/room'} className="btn-ghost">客房旅宿</Link></li>
        { user
        ? (<>
          <li className={`${isOpen ? 'w-full' : ''}`}>
            <Link to={'/my-account'} className="btn-ghost"><IconProfile className="fill-transparent stroke-neutral-0 mr-2 inline"/>{user?.name}</Link>
          </li>
          <li className={`btn-ghost cursor-pointer ${isOpen ? 'w-full' : ''}`} onClick={handleLogout}>登出</li>
        </>)
        : <li className={isOpen ? 'w-full' : ''}><Link to={'/login'} className="btn-ghost">會員登入</Link></li>
        }
        <li className={isOpen ? 'w-full' : ''}><Link to={'/booking'} className="btn-primary">立即訂房</Link></li>
      </ul>
      ) }
    </nav>
    {/* hamburger */}
    {/* hidden */}
    <div onClick={toggleMenu} className="cursor-pointer space-y-1 block p-1 md:hidden">
      <span className={`bg-neutral-0 rounded-full block w-6 h-1 mx-1 transition-transform ${isOpen ? 'transform translate-y-2 rotate-45' : ''}`}></span>
      <span className={`bg-neutral-0 rounded-full block w-6 h-1 mx-1 transition-opacity ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
      <span className={`bg-neutral-0 rounded-full block w-6 h-1 mx-1 transition-transform ${isOpen ? 'transform -translate-y-2 -rotate-45' : ''}`}></span>
    </div>
    {/* Toast */}
    <MyToast ref={toastRef} />
  </header>
  </>)
}
