import { Link } from "react-router-dom";

import iconLine from "@assets/icons/icon-line.svg";
import iconIg from "@assets/icons/icon-ig.svg";
import Logo from "@assets/images/logo_white.svg";

export const Footer = () => {
  return(<>
  <footer className="bg-neutral-bg">
    {/* Logo */}
    <div>
      <Link to={'/'} ><img src={ Logo } alt="享樂酒店" /></Link>
      <ul>
        <li>
          <Link to={'#'} ><img src={ iconLine } alt="享樂酒店 Line 官方帳號" /></Link>
        </li>
        <li>
          <Link to={'#'}><img src={ iconIg } alt="享樂酒店 Instagram 官方帳號" /></Link>
        </li>
      </ul>
    </div>
    {/* 聯絡資訊 */}
    <div>
      <ul>
        <li>
          <p>TEL</p>
          <p>+886-7-1234567</p>
        </li>
        <li>
          <p>FAX</p>
          <p>+886-7-1234567</p>
        </li>
        <li>
          <p>MAIL</p>
          <p>elh@hexschool.com</p>
        </li>
        <li>
          <p>WEB</p>
          <p>www.elhhexschool.com.tw</p>
        </li>
      </ul>
    </div>
    {/* 其他資訊 */}
    <div>
      <address>806023 台灣高雄市新興區六角路123號</address>
      <p>&copy; 享樂酒店 2023 All Rights Reserved.</p>
    </div>
  </footer>
  </>)
}
