import { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

import { New, Room, Food } from '@types';
import { Banner } from "@components";
import dot from '@assets/images/home-dot.png';
import bgIMG from '@assets/images/home-bg.png';
import line1IMG from '@assets/images/home-line.png';
import line2IMG from '@assets/images/home-line2.png';
import line3IMG from '@assets/images/home-line3.png';
import aboutIMG from '@assets/images/home-about.png';
import mapDeskIMG from '@assets/images/homt-map-desk.png';
import mapMobileIMG from '@assets/images/homt-map-mobile.png';
import CarIcon from '@assets/icons/icon-car.svg?react'
import TrainIcon from '@assets/icons/icon-train.svg?react'
import LuxurycarIcon from '@assets/icons/icon-luxurycar.svg?react'

const Home = () => {
  const [ newsData, roomsData, foodsData ]  = useLoaderData() as [New[], Room[], Food[]] ;
  const [ currentRoomIndex, setCurrentRoomIndex ] = useState(0);
  const [ currentRoom, setCurrentRoom ] = useState(roomsData[currentRoomIndex]);

  useEffect(() => {
    setCurrentRoom(roomsData[currentRoomIndex]);
  }, [currentRoomIndex]);

  const handlePrevRoom = () => {
    let index = currentRoomIndex - 1;

    if(index < 0) index = roomsData.length - 1;
    setCurrentRoomIndex(index);
  };

  const handleNextRoom = () => {
    let index = currentRoomIndex + 1;

    if(index >= roomsData.length) index = 0;
    setCurrentRoomIndex(index);
  };

  return(<>
  {/* banner */}
  <Banner></Banner>
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
  {/* room */}
  <section className="bg-neutral-bg text-neutral-0 py-20 xl:py-[120px] relative overflow-x-clip">
    <img className="absolute -top-5 -right-20 xl:top-[15%] md:-right-1/3 xl:w-11/12 min-h-[84px] xl:max-h-[188px] z-[1]" src={line3IMG} alt="" />
    <div className="container md:flex md:justify-center 2xl:justify-end md:items-end md:gap-x-10 xl:gap-x-20 2xl:h-[900px] 2xl:relative">
      <Swiper
        autoplay={{ // 自動輪播 swiper
          delay: 4 *1000, // 每兩秒切換下一張
        }}
        loop={true} // 輪播結束後回到第一張繼續輪播
        effect={'fade'}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, EffectFade, Pagination]}
        className="w-[351px] h-[300px] xl:w-[630px] xl:h-[600px] 2xl:w-[900px] 2xl:h-[900px] mb-6 md:m-0 2xl:absolute 2xl:top-0 2xl:-left-80 z-0"
      >
        {currentRoom.imageUrlList.map((image, index) => (
          <SwiperSlide key={index} className="w-full h-full">
            <figure className="w-full h-full" key={`${currentRoom._id}-${index}`}>
              <img className="w-full h-full bg-cover rounded-t-lg backdrop-blur-[20px] bg-gradient-to-b from-neutral-0/30 to-neutral-0" src={image} alt={currentRoom.name} />
            </figure>
          </SwiperSlide> ))}
      </Swiper>
      <div className="space-y-6 relative 2xl:w-[628px]">
        <img className="absolute top-0 right-0"  src={bgIMG} alt="" />
        <div className="space-y-2">
          <p className="h4 xl:h2">{ currentRoom.name }</p>
          <p className="text-body2 xl:text-body">{ currentRoom.description }</p>
        </div>
        <p className="h5 xl:h3">NT$ {currentRoom.price}</p>
        <Link to={`/room/${currentRoom._id}`} className={`!flex justify-end items-center btn-tertiary hover:bg-primary-100 hover:text-neutral-0 group`}>查看更多<span className={`inline-block border w-20 ml-4 border-neutral-100 bg-neutral-100 group-hover:border-neutral-0 group-hover:bg-neutral-0 transition-all ease-in-out duration-700`} ></span></Link>
        <div className="flex justify-end items-center">
          <div className="text-primary-100 m-4 w-auto h-auto cursor-pointer" onClick={handlePrevRoom}>
            <span className="material-symbols-outlined">arrow_back</span>
          </div>
          <div className="text-primary-100 m-4 w-auto h-auto cursor-pointer" onClick={handleNextRoom}>
            <span className="material-symbols-outlined">arrow_forward</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* food */}
  <section className="relative">
    <img className="absolute top-[5%] left-[5%] w-[188px] h-[1068px] hidden 2xl:block" src={line1IMG} alt="" />
    <img className="absolute -top-[5%] right-[10%] w-[200px] h-[200px] hidden xl:block" src={dot} alt="" />
    <div className="py-40 xl:py-[120px] container">
      <p className="h3 md:h1 text-primary-100 relative mb-10 md:mb-20 after:block after:w-[200px] after:h-[2px] after:rounded-full after:bg-gradient-to-r after:from-[#BE9C7C] after:to-white after:absolute after:top-1/2 after:left-[106px]">佳餚<br />美饌</p>
      <Swiper
        speed={1000}
        autoplay={{ // 自動輪播 swiper
          delay: 1 * 1000, // 每兩秒切換下一張
          disableOnInteraction: false,
        }}
        loop={true} // 輪播結束後回到第一張繼續輪播
        slidesPerView={'auto'}
        spaceBetween={24}
        modules={[Autoplay]}
      >
        {foodsData.map((food, index) => (
          <SwiperSlide key={index} className="w-[300px] h-[480px] xl:w-[416px] xl:h-[600px]">
            <div className="w-full h-full rounded-lg flex items-end overflow-hidden bg-center" style={{ backgroundImage: `url(${food.image})` }}>
              <div className="text-neutral-0 p-4 xl:p-6 backdrop-blur-[20px] bg-gradient-to-b from-transparent/0 to-[#140F0A]/[77.6%] h-[182px] xl:h-[192px]">
                <p className="h5 mb-4 xl:mb-6 flex justify-between items-center">{food.title}<span className="inline-block text-subtitle md:text-title">{food.diningTime}</span></p>
                <p className="text-body2 xl:text-body">{food.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
  {/* map */}
  <section className="bg-neutral-bg text-neutral-0 pt-20 py-[124px] xl:pt-[120px] xl:pb-[268px] relative">
    <img className="absolute bottom-0 left-0 min-h-[84px] " src={line2IMG} alt="" />
    <div className="container">
      <p className="h3 md:h1 text-primary-100 relative mb-10 md:mb-20 after:block after:w-[200px] after:h-[2px] after:rounded-full after:bg-gradient-to-r after:from-[#BE9C7C] after:to-white after:absolute after:top-1/2 after:left-[106px]">交通<br />方式</p>
      <figure className="w-full min-h-[400px] md:h-[360px] rounded-lg space-y-4 mb-6 md:mb-10">
        <figcaption className="mb-4 text-title">台灣高雄市新興區六角路123號</figcaption>
        <img className="bg-cover bg-center block md:hidden" src={mapMobileIMG} alt="交通方式" />
        <img className="bg-cover bg-center hidden md:block " src={mapDeskIMG} alt="交通方式" />
      </figure>
      <ul className="flex flex-col md:flex-row justify-between items-start gap-6">
        <li className="space-y-2 md:space-y-4">
          <div className="text-primary-100">
            <CarIcon  className="w-12 h-12 md:w-20 md:h-20" color="inherit"></CarIcon>
          </div>
          <p className="text-title md:h5">自行開車</p>
          <p className="text-body2 md:text-body">如果您選擇自行開車，可以透過國道一號下高雄交流道，往市區方向行駛，並依路標指示即可抵達「享樂酒店」。飯店內設有停車場，讓您停車方便。</p>
        </li>
        <li className="space-y-2">
          <div className="text-primary-100">
            <TrainIcon  className="w-12 h-12 md:w-20 md:h-20" color="inherit"></TrainIcon>
          </div>
          <p className="text-title md:h5">高鐵/火車</p>
          <p className="text-body2 md:text-body">如果您是搭乘高鐵或火車，可於左營站下車，外頭有計程車站，搭乘計程車約20分鐘即可抵達。或者您也可以轉乘捷運紅線至中央公園站下車，步行約10分鐘便可抵達。</p>
        </li>
        <li className="space-y-2">
          <div className="text-primary-100">
            <LuxurycarIcon  className="w-12 h-12 md:w-20 md:h-20" color="inherit"></LuxurycarIcon>
          </div>
          <p className="text-title md:h5">禮賓車服務</p>
          <p className="text-body2 md:text-body">承億酒店提供禮賓專車接送服務，但因目的地遠近會有不同的收費，請撥打電話將由專人為您服務洽詢專線：(07)123-4567</p>
        </li>
      </ul>
    </div>
  </section>
  </>);
};


export default Home;
