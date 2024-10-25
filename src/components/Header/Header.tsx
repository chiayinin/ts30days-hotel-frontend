import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';

import Logo from "@assets/images/logo_white.svg";

import { GlobalContext, KEY_TOKEN } from "@core";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

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
  const showLinks = ['login', 'registration'].includes(pathname);
  // // 前往「我的帳戶」頁面
  // const goToMyAccount = () => {
  //   navigate('/my-account');
  // };
  // // 登出
  // const logout = () => {

  // }

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
  <header className={`flex justify-between items-center px-3 py-4 md:px-20 md:py-6 h-[72px] md:h-[120px] ${ beTransparent ? 'bg-transparent' : 'bg-neutral-bg' }`}>
    <Link to={'/'} className="w-[110px] md:w-[196px]"><img src={Logo} alt="享樂酒店" /></Link>
    <nav>
      { showLinks && (
      <ul className={`bg-neutral-bg flex flex-col justify-center items-center fixed w-full bg-gray-900 text-center h-screen  top-0 left-0 px-5 gap-4 transition-transform duration-300 ease-in-out md:flex-row md:static md:bg-transparent md:translate-x-0 md:justify-between md:h-auto  ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <li className={isOpen ? 'w-full' : ''}><Link to={'/room'} onClick={closeMenu} className="btn-ghost">客房旅宿</Link></li>
        <li className={isOpen ? 'w-full' : ''}><Link to={'/login'} onClick={closeMenu} className="btn-ghost">會員登入</Link></li>
        <li className={isOpen ? 'w-full' : ''}><Link to={'/booking'} onClick={closeMenu} className="btn-primary">立即訂房</Link></li>
      </ul>
      ) }
    </nav>
    {/* hamburger */}
    {/* hidden */}
    <div onClick={toggleMenu} className="bg-neutral-bg cursor-pointer space-y-1 block p-1 md:hidden">
      <span className={`bg-neutral-0 rounded-full block w-6 h-1 mx-1 transition-transform ${isOpen ? 'transform translate-y-2 rotate-45' : ''}`}></span>
      <span className={`bg-neutral-0 rounded-full block w-6 h-1 mx-1 transition-opacity ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
      <span className={`bg-neutral-0 rounded-full block w-6 h-1 mx-1 transition-transform ${isOpen ? 'transform -translate-y-2 -rotate-45' : ''}`}></span>
    </div>
  </header>
  </>)
}
