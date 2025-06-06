import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';

import Logo from "@assets/images/logo_white.svg";
import IconProfile from "@assets/icons/icon-profile.svg?react";

import { GlobalContext } from "@core";
import { logout } from "@apis";

/**
 * 導覽列的元件
 */
export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, dispatch } = useContext(GlobalContext);

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
    dispatch({ type: 'SET_USER', payload: null });
    dispatch({
      type: 'SET_TOAST',
      payload: {
        severity: 'success',
        summary: '登出',
        detail: '已成功登出。',
        display: true,
      },
    });
    navigate('/');
    closeMenu();
  };

  useEffect(() => {
    // 768px是切換到桌機的斷點，切換回桌機時，isOpen設置為false
    const handleResize = () => {
      if(window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    // 監聽視窗變化事件
    window.addEventListener('resize', handleResize);

    // 頁面滾動
    let handleScroll: (() => void | undefined);
    if(beTransparent) {
      handleScroll = () => {
        const offset = window.scrollY;

        if(offset > 72) setIsScrolled(true);
        else setIsScrolled(false);
      };
      window.addEventListener('scroll', handleScroll);
    };

    // 每次路徑改變時關閉選單
    closeMenu();

    // 在組件卸載時移除監聽器
    return () => {
      if(beTransparent) window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [pathname, beTransparent]);

  return(<>
    <header className={`flex justify-between items-center px-3 py-4 md:px-20 md:py-6 h-[72px] md:h-[120px] sticky top-0 left-0 z-20 w-full ease-in-out duration-300 ${ !beTransparent ? 'bg-neutral-bg' : isScrolled ? 'bg-black' : 'bg-transparent' } `}>
    <Link to={'/'} className="w-[110px] md:w-[196px]"><img src={Logo} alt="享樂酒店" /></Link>
    { showLinks && (<>
    <nav>
      <ul className={`bg-neutral-bg flex flex-col justify-center items-center fixed w-full text-center h-screen top-0 left-0  gap-4 transition-transform duration-300 ease-in-out md:flex-row md:static md:bg-transparent md:translate-x-0 md:justify-between md:h-auto  ${isOpen ? 'translate-x-0 px-5' : '-translate-x-full'}`}>
        <li className={isOpen ? 'w-full' : ''}><Link to={'/room'} className="btn-ghost">客房旅宿</Link></li>
        { user
        ? (<>
          <li className={`${isOpen ? 'w-full' : ''}`}>
            <Link to={'/account'} className="btn-ghost"><IconProfile className="fill-transparent stroke-neutral-0 mr-2 inline"/>{user?.name}</Link>
          </li>
          <li className={`btn-ghost cursor-pointer ${isOpen ? 'w-full' : ''}`} onClick={handleLogout}>登出</li>
        </>)
        : <li className={isOpen ? 'w-full' : ''}><Link to={'/login'} className="btn-ghost">會員登入</Link></li>
        }
        <li className={isOpen ? 'w-full' : ''}><Link to={'/booking'} className="btn-primary">立即訂房</Link></li>
      </ul>
    </nav>
    {/* hamburger */}
    {/* hidden */}
    <div onClick={toggleMenu} className="cursor-pointer space-y-1 block p-1 md:hidden">
      <span className={`bg-neutral-0 rounded-full block w-6 h-1 mx-1 transition-transform ${isOpen ? 'transform translate-y-2 rotate-45' : ''}`}></span>
      <span className={`bg-neutral-0 rounded-full block w-6 h-1 mx-1 transition-opacity ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
      <span className={`bg-neutral-0 rounded-full block w-6 h-1 mx-1 transition-transform ${isOpen ? 'transform -translate-y-2 -rotate-45' : ''}`}></span>
    </div>
    </>) }
  </header>
  </>)
}
