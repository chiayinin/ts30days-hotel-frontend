// import { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";

// import { GlobalContext } from "@core";

import { News } from '@types';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade,  Pagination } from 'swiper/modules';

import banner001 from '@assets/images/banner-001.jpg';
import banner002 from '@assets/images/banner-002.jpg';
import banner003 from '@assets/images/banner-003.jpg';
import banner004 from '@assets/images/banner-004.jpg';
import banner005 from '@assets/images/banner-005.jpg';
import banner006 from '@assets/images/banner-006.jpg';
import dot from '@assets/images/home-dot.png';

const banners = [banner001, banner002, banner003, banner004, banner005, banner006];

const Home = () => {
  // const{ user } = useContext(GlobalContext);
  const [newsData]  = useLoaderData() as [News[]] ;

  return(<>
  {/* banner */}
  <Swiper
    autoplay={{ // 自動輪播 swiper
      delay: 4 * 1000, // 每兩秒切換下一張
    }}
    loop={true} // 輪播結束後回到第一張繼續輪播
    effect={'fade'}
    pagination={{
      clickable: true,
    }}
    modules={[Autoplay, EffectFade, Pagination]}
    className="w-full h-[740px] md:h-[714px]"
  >
    {banners.map((banner, index) => (
      <SwiperSlide key={index} className="bg-center bg-no-repeat bg-cover relative" style={{ backgroundImage: `url(${banner})` }}>
        <div className="absolute inset-0 bg-neutral-100/60"></div>
      </SwiperSlide> ))}
    <section className="flex flex-col md:flex-row md:justify-between px-5 md:px-20 py-10 md:py-[116px] top-[72px] md:top-[120px] left-0 w-full absolute z-[1]">
      <div className="md:w-1/3 self-center text-primary-100 text-center md:text-left mb-10 md:mb-0">
        <div className="mb-5">
          <h4 className="h4">享樂酒店</h4>
          <p className="text-title">Enjoyment Luxury Hotel</p>
        </div>
        <div className="w-[2px] md:w-full h-[83px] md:h-[2px] bg-gradient-to-b md:bg-gradient-to-r from-primary-100 to-neutral-0 mx-auto"></div>
      </div>
      <div className="w-[90%] md:w-1/2 py-[60px] relative ml-auto border-t border-r border-[#F5F7F9] rounded-[40px] bg-gradient-to-b from-neutral-0/0 to-neutral-0/30 backdrop-blur-[20px]">
        <div className="relative top-0 end-[10%]">
          <h1 className="h1 text-neutral-0 mb-5">高雄<br />豪華住宿之選</h1>
          <p className="text-title text-neutral-0 mb-6">我們致力於為您提供無與倫比的奢華體驗與優質服務</p>
          <Link to="/booking" className={`!flex justify-end items-center btn-tertiary hover:bg-primary-100 hover:text-neutral-0 group`}>立即訂房<span className={`inline-block border w-20 ml-4 border-neutral-100 bg-neutral-100 group-hover:border-neutral-0 group-hover:bg-neutral-0 transition-all ease-in-out duration-700`} ></span></Link>
        </div>
      </div>
    </section>
  </Swiper>
  {/* news */}
  <section className="bg-primary-10 container py-20 relative">
    <img className="absolute bg-cover w-[100px] h-[100px] top-10 right-6" src={dot}></img>
    <img className="absolute bg-cover w-[100px] h-[100px] -bottom-10 left-6" src={dot}></img>
    <p className="h3 md:h1 text-primary-100 block relative pb-6 md:pb-10 after:block after:w-[140px] after:h-[2px] after:rounded-full after:bg-gradient-to-r after:from-[#BE9C7C] after:to-white after:absolute after:-bottom-0 after:md:-bottom-0">最新<br />消息</p>
    <ul className="mt-10 space-y-10">
      { newsData.length > 0 ? newsData.map((news, index) => (
        <li key={`${news._id}-${index}`}>
          <figure className="w-[351px] h-[294px] bg-cover mb-6">
            <img className="w-full h-full bg-cover rounded-lg" src={news.image} alt={news.title} />
          </figure>
          <div>
            <h3 className="h4 mb-2">{ news.title }</h3>
            <p className="text-body2">{ news.description }</p>
          </div>
        </li>
      )) : <p>not data</p> }
    </ul>
  </section>
  </>);
};


export default Home;
