import { Link, useLocation } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

import banner001 from '@assets/images/banner-001.jpg';
import banner002 from '@assets/images/banner-002.jpg';
import banner003 from '@assets/images/banner-003.jpg';
import banner004 from '@assets/images/banner-004.jpg';
import banner005 from '@assets/images/banner-005.jpg';
import banner006 from '@assets/images/banner-006.jpg';

const banners = [banner001, banner002, banner003, banner004, banner005, banner006];

export const Banner = () => {
  const { pathname } = useLocation();
  const homePath = '/'.includes(pathname);

  return(<Swiper
    autoplay={{ // 自動輪播 swiper
      delay: 999 * 1000, // 每兩秒切換下一張
    }}
    loop={true} // 輪播結束後回到第一張繼續輪播
    effect={'fade'}
    pagination={{
      clickable: true,
    }}
    modules={[Autoplay, EffectFade, Pagination]}
    className={`w-full -mt-[120px]
      ${ homePath ? `h-[740px]` : `h-[394px]`}
      md:h-[714px]`}
  >
    {banners.map((banner, index) => (
      <SwiperSlide key={index} className="bg-center bg-no-repeat bg-cover relative" style={{ backgroundImage: `url(${banner})` }}>
        <div className="absolute inset-0 bg-neutral-100/60"></div>
      </SwiperSlide> ))}
    <section className={`flex flex-col md:flex-row px-5 md:px-20 py-10 top-[72px] md:top-[120px] left-0 w-full absolute z-[1]
    ${ homePath ? `md:justify-between md:py-[116px]` : `md:justify-around md:py-[216px]`}`}>
      <div className="md:w-1/3 self-center text-primary-100 text-center md:text-left mb-10 md:mb-0">
        <div className="mb-5">
          <h4 className="h4 md:h5">享樂酒店</h4>
          <p className="text-title">Enjoyment Luxury Hotel</p>
        </div>
        <div className="w-[2px] md:w-full h-[83px] md:h-[2px] bg-gradient-to-b md:bg-gradient-to-r from-primary-100 to-neutral-0 mx-auto"></div>
      </div>
        {
          homePath ?
            <div className="w-[90%] md:w-1/2 py-[60px] relative ml-auto border-t border-r border-[#F5F7F9] rounded-[40px] bg-gradient-to-b from-neutral-0/0 to-neutral-0/30 backdrop-blur-[20px]">
              <div className="relative top-0 end-[10%]">
                <h1 className="h1 text-neutral-0 mb-5">高雄<br />豪華住宿之選</h1>
                <p className="text-title text-neutral-0 mb-6">我們致力於為您提供無與倫比的奢華體驗與優質服務</p>
                <Link to="/booking" className={`!flex justify-end items-center btn-tertiary hover:bg-primary-100 hover:text-neutral-0 group`}>立即訂房<span className={`inline-block border w-20 ml-4 border-neutral-100 bg-neutral-100 group-hover:border-neutral-0 group-hover:bg-neutral-0 transition-all ease-in-out duration-700`} ></span></Link>
              </div>
            </div> :
            <p className="h3 md:h1 text-neutral-0 text-center align-middle">客房旅宿</p>
        }
    </section>
  </Swiper>)
}
