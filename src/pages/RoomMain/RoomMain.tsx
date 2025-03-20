import { Link, useLoaderData } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

import { Room } from '@types';
import iconBed from "@assets/icons/icon-bed.svg";
import iconProfile from "@assets/icons/icon-profile.svg";
import iconSize from "@assets/icons/icon-size.svg";

import banner001 from '@assets/images/banner-001.jpg';
import banner002 from '@assets/images/banner-002.jpg';
import banner003 from '@assets/images/banner-003.jpg';
import banner004 from '@assets/images/banner-004.jpg';
import banner005 from '@assets/images/banner-005.jpg';
import banner006 from '@assets/images/banner-006.jpg';

const banners = [banner001, banner002, banner003, banner004, banner005, banner006];

const RoomMain = () => {
  const roomData = useLoaderData() as Room[];

  if(roomData.length === 0) {
    return(
      <div className='container py-10 lg:py-[120px] lg:px-10 text-neutral-80'>
        <h2 className="text-subtitle lg:h6">查無資料</h2>
      </div>
    )
  }

  return(<>
  <section className="container py-10 lg:py-[120px] lg:px-10 text-neutral-80 space-y-10 lg:space-y-20">
    {/* title */}
    <div className="space-y-2 lg:space-y-4">
      <h2 className="text-subtitle lg:h6">房型選擇</h2>
      <p className="h3 lg:h1 text-primary-100">各種房型，任您挑選</p>
    </div>
    {/* room list */}
    <ul className="space-y-6 lg:space-y-12">
      {roomData.map((room) => (
        <li className="rounded-3xl overflow-hidden lg:flex lg:justify-center lg:items-center h-[541px] lg:h-[457px] lg:max-w-[1296px]">
          {/* carousel */}
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
            className="w-full h-[200px] lg:w-auto lg:h-full"
          >
            {room.imageUrlList.map((image, index) => (
              <SwiperSlide key={index} className="w-full h-full">
                <figure key={`${room._id}-${index}`} className="w-full h-full" >
                  <img className="w-full h-full object-cover" src={image} alt="" />
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* content */}
          <div className="p-4 lg:p-10 space-y-6 lg:space-y-10 bg-neutral-0 w-full h-auto lg:w-[523px] lg:h-full">
            <div className="space-y-2">
              <h3 className="h4 lg:h2 text-neutral-100">{room.name}</h3>
              <p className="text-body2 lg:text-body">{room.description}</p>
            </div>
            <ul className="flex justify-start items-center gap-4">
              <li className="border border-primary-40 rounded-lg px-4 py-5 space-y-2 w-24 h-24">
                <img src={iconSize} alt="房間坪數" />
                <span className="text-subtitle lg:text-title block">{room.areaInfo}</span>
              </li>
              <li className="border border-primary-40 rounded-lg p-4 py-5 space-y-2 w-24 h-24">
                <img src={iconBed} alt="房間床型" />
                <span className="text-subtitle lg:text-title block">{room.bedInfo}</span>
              </li>
              <li className="border border-primary-40 rounded-lg p-4 py-5 space-y-2 w-24 h-24">
                <img src={iconProfile} alt="房間人數" />
                <span className="text-subtitle lg:text-title block">{room.maxPeople} 人</span>
              </li>
            </ul>
            <div className="divider rounded-full w-full h-[2px] bg-gradient-to-r from-primary-100 to-neutral-0"></div>
            <div className="py-4 flex justify-between items-center">
              <span className="block text-title lg:h5 text-primary-100">NT$ {room.price}</span>
              <Link to={room._id ?? ''}><span className="block text-primary-100 material-symbols-outlined">
                arrow_forward
              </span></Link>
            </div>
          </div>
        </li>

      ))}







      <li className="rounded-3xl overflow-hidden lg:flex lg:justify-center lg:items-center h-[541px] lg:h-[457px] lg:max-w-[1296px]">
        {/* carousel */}
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
          className="w-full h-[200px] lg:w-auto lg:h-full"
        >
          {banners.map((image, index) => (
            <SwiperSlide key={index} className="w-full h-full">
              <figure key={`${image}-${index}`} className="w-full h-full" >
                <img className="w-full h-full object-cover" src={image} alt="" />
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* content */}
        <div className="p-4 lg:p-10 space-y-6 lg:space-y-10 bg-neutral-0 w-full h-auto lg:w-[523px] lg:h-full">
          <div className="space-y-2">
            <h3 className="h4 lg:h2 text-neutral-100">尊爵雙人房</h3>
            <p className="text-body2 lg:text-body">享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。</p>
          </div>
          <ul className="flex justify-start items-center gap-4">
            <li className="border border-primary-40 rounded-lg px-4 py-5 space-y-2 w-24 h-24">
              <img src={iconSize} alt="房間坪數" />
              <span className="text-subtitle lg:text-title block">24 坪</span>
            </li>
            <li className="border border-primary-40 rounded-lg p-4 py-5 space-y-2 w-24 h-24">
              <img src={iconBed} alt="房間床型" />
              <span className="text-subtitle lg:text-title block">1 張大床</span>
            </li>
            <li className="border border-primary-40 rounded-lg p-4 py-5 space-y-2 w-24 h-24">
              <img src={iconProfile} alt="房間人數" />
              <span className="text-subtitle lg:text-title block">2-4 人</span>
            </li>
          </ul>
          <div className="divider rounded-full w-full h-[2px] bg-gradient-to-r from-primary-100 to-neutral-0"></div>
          <div className="py-4 flex justify-between items-center">
            <span className="block text-title lg:h5 text-primary-100">NT$ 10,000</span>
            <span className="block text-primary-100 material-symbols-outlined">
              arrow_forward
            </span>
          </div>
        </div>
      </li>
    </ul>
  </section>
  </>);
};

export default RoomMain;
