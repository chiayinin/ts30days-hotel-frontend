import { Link } from "react-router-dom";

import Logo from "@assets/images/logo_white.svg";

export const Header = () => {
  return(<>
  <header className="flex justify-between items-center px-3 py-4 md:px-20 md:py-6 bg-transparent">
    <Link to={'/'} className="w-[110px] md:w-[196px]"><img src={Logo} alt="享樂酒店" /></Link>
    <nav>
      <ul>
        <li><Link to={'/room'}>客房旅宿</Link></li>
        <li><Link to={'/room'}>會員登入</Link></li>
        <li><Link to={'/room'}>立即訂房</Link></li>
        <li><button type="submit" className="btn-text-disable" disabled>立即訂房</button></li>
        <li><button  className="btn-text" >立即訂房</button></li>
      </ul>
    </nav>
  </header>
  </>)
}
