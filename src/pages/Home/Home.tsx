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
import aboutIMG from '@assets/images/home-about.png';

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
  <section className="bg-primary-10 container py-20 relative md:flex md:py-[120px]">
    <img className="absolute bg-cover w-[100px] h-[100px] top-10 right-6 md:w-[200px] md:h-[200px] 2xl:top-[100px] 2xl:-right-[132px] " src={dot}></img>
    <img className="absolute bg-cover w-[100px] h-[100px] -bottom-10 left-6 md:w-[200px] md:h-[200px] md:-bottom-20 md:-left-[112px]" src={dot}></img>
    <p className="h3 md:h1 text-primary-100 relative mb-20 after:block after:w-[140px] after:h-[2px] after:rounded-full after:bg-gradient-to-r after:from-[#BE9C7C] after:to-white after:absolute after:top-[104px] after:md:top-40 md:basis-2/12 md:mb-0">最新<br />消息</p>
    <ul className="space-y-10 md:basis-10/12">
      { newsData.map((news, index) => (
        <li key={`${news._id}-${index}`} className="md:flex md:justify-start md:items-center">
          <figure className="min-w-[351px] h-[294px] bg-cover mb-6 md:min-w-[474px] md:mr-6 md:mb-0">
            <img className="w-full h-full bg-cover rounded-lg" src={news.image} alt={news.title} />
          </figure>
          <div>
            <h3 className="h4 mb-2 md:h3 md:mb-6">{ news.title }</h3>
            <p className="text-body2 md:text-body">{ news.description }</p>
          </div>
        </li>
      )) }
    </ul>
  </section>
  {/* about us */}
  <section className="bg-neutral-bg pt-20 pb-[120px] w-full">
    <div className="w-full bg-cover bg-top bg-no-repeat relative" style={{ backgroundImage: `url(${aboutIMG})` }} >
      <div className="relative inset-y-10 left-[10%] xl:left-[20%] 2xl:left-[30%] md:inset-y-20 w-10/12 xl:w-9/12 2xl:w-7/12 md:max-w-[1044px] text-neutral-0 p-6 xl:p-20 bg-gradient-to-b from-[#140F0ACC] to-[#BE9C7C] border-b border-l border-neutral-0 rounded-t-[40px] backdrop-blur-[20px] rounded-l-[40px]">
        <p className="h3 mb-10 xl:mb-20 relative after:block after:w-[161px] after:h-[2px] after:rounded-full after:bg-neutral-0 after:absolute after:top-1/2 after:left-[106px]">關於<br />我們</p>
        <div className="space-y-4 xl:space-y-10">
          <p className="text-body2 md:text-body">
            享樂酒店，位於美麗島高雄的心臟地帶，是這座城市的璀璨瑰寶與傲人地標。<br />我們的存在，不僅僅是為了提供奢華的住宿體驗，更是為了將高雄的美麗與活力，獻給每一位蒞臨的旅客。
          </p>
          <p className="text-body2 md:text-body">
            我們的酒店，擁有時尚典雅的裝潢，每一個細節都充滿著藝術與設計的精緻。<br />我們的員工，都以熱情的服務與專業的態度，讓每一位客人都能感受到賓至如歸的溫暖。
          </p>
          <p className="text-body2 md:text-body">
            在這裡，您可以遙望窗外，欣賞高雄的城市景色，感受這座城市的繁華與活力；您也可以舒適地坐在我們的餐廳，品嚐精緻的佳餚，體驗無與倫比的味覺盛宴。
          </p>
          <p className="text-body2 md:text-body">
            享樂酒店，不僅是您在高雄的住宿之選，更是您感受高雄魅力的最佳舞台。我們期待著您的蒞臨，讓我們共同編織一段難忘的高雄故事。
          </p>
        </div>
      </div>
    </div>
  </section>
  </>);
};


export default Home;
