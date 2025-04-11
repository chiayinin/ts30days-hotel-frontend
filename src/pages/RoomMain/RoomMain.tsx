import { Link, useLoaderData } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

import { Room } from '@types';
import { Banner } from '@components';
import { RoomBasicInfo } from "@components";

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
  <Banner></Banner>
  <section className="container py-10 lg:py-[120px] lg:px-10 text-neutral-80 space-y-10 lg:space-y-20">
    {/* title */}
    <div className="space-y-2 lg:space-y-4">
      <h2 className="text-subtitle lg:h6">房型選擇</h2>
      <p className="h3 lg:h1 text-primary-100">各種房型，任您挑選</p>
    </div>
    {/* room list */}
    <ul className="space-y-6 lg:space-y-12">
      {roomData.map((room, roomIndex) => (
        <li className="rounded-3xl overflow-hidden lg:flex lg:justify-center lg:items-center h-[541px] lg:h-[457px] lg:max-w-[1296px]" key={roomIndex}>
          {/* carousel */}
          <Swiper
            autoplay={{ // 自動輪播 swiper
              delay: 4 *1000, // 每兩秒切換下一張
            }}
            loop={room.imageUrlList.length > 4} // 輪播結束後回到第一張繼續輪播
            effect={'fade'}
            pagination={{
              clickable: true,
            }}
            slidesPerView={4}
            modules={[Autoplay, EffectFade, Pagination]}
            className="w-full h-[200px] lg:w-auto lg:h-full"
          >
            {room.imageUrlList.map((image, imageIndex) => (
              <SwiperSlide key={imageIndex} className="w-full h-full">
                <figure key={`${room._id}-${imageIndex}`} className="w-full h-full" >
                  <img className="w-full h-full object-cover" src={image} alt=""/>
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
            <RoomBasicInfo
              area={room.areaInfo}
              bed={room.bedInfo}
              people={room.maxPeople} />
            <div className="divider rounded-full w-full h-[2px] bg-gradient-to-r from-primary-100 to-neutral-0"></div>
            <div className="py-4 flex justify-between items-center">
              <span className="block text-title lg:h5 text-primary-100">NT$ {room.price}</span>
              <Link to={room._id ?? ''}><span className="block text-primary-100 material-symbols-outlined hover:text-primary-120">
                arrow_forward
              </span></Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </section>
  </>);
};

export default RoomMain;
