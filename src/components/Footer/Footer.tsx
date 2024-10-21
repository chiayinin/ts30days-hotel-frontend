import { Link } from "react-router-dom";

import iconLine from "@assets/icons/icon-line.svg";
import iconIg from "@assets/icons/icon-ig.svg";
import Logo from "@assets/images/logo_white.svg";

export const Footer = () => {
  return(<>
  <footer className="bg-neutral-bg text-neutral-40 px-3 py-20 md:pt-20 md:pb-[120px] md:px-4">
    <div className="container max-w-[1296px]">
      <div className="flex justify-between items-start flex-col gap-10 mb-20  md:mb-24 md:flex-row">
        {/* Logo */}
        <div>
          <Link to={'/'}  className="block mb-10 w-[196px]"><img src={ Logo } alt="享樂酒店" /></Link>
          <ul className="flex justify-start items-center gap-4">
            <li>
              <Link to={'#'} ><img src={ iconLine } alt="享樂酒店 Line 官方帳號" /></Link>
            </li>
            <li>
              <Link to={'#'}><img src={ iconIg } alt="享樂酒店 Instagram 官方帳號" /></Link>
            </li>
          </ul>
        </div>
        {/* 聯絡資訊 */}
        <div className="flex flex-col gap-4 md:flex-row md:justify-end md:gap-x-20">
          <ul className="flex flex-col gap-4 md:gap-y-10">
            <li title="享樂酒店 TEL">
              <p className="text-title mb-2">TEL</p>
              <a className="text-body" href="tel:+886-7-1234567">+886-7-1234567</a>
            </li>
            <li title="享樂酒店 FAX">
              <p className="text-title mb-2">FAX</p>
              <a className="text-body" href="tel:+886-7-1234567">+886-7-1234567</a>
            </li>
          </ul>
          <ul className="flex flex-col gap-4 md:gap-y-10">
            <li title="享樂酒店 MAIL">
              <p className="text-title mb-2">MAIL</p>
              <a className="text-body" href="mailto:elh@hexschool.com">elh@hexschool.com</a>
            </li>
            <li title="享樂酒店 WEB">
              <p className="text-title mb-2">WEB</p>
              <Link className="text-body" to={'/'} >www.elhhexschool.com.tw</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* 其他資訊 */}
      <div className="flex justify-between text-body flex-col gap-4 md:flex-row md:items-center">
        <address title="806023 台灣高雄市新興區六角路123號">806023 台灣高雄市新興區六角路123號</address>
        <p>&copy; 享樂酒店 2023 All Rights Reserved.</p>
      </div>
    </div>
  </footer>
  </>)
}
