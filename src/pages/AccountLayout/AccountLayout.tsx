import { Outlet } from 'react-router-dom';
import { Header } from '@components';
import { Footer } from '@components';

import headshot005 from '@assets/headshots/headshot005.png';
import accountBg from '@assets/images/account-bg.jpg';
import line2IMG from '@assets/images/home-line2.png';

const AccountLayout = () => {
  return (<>
    {/* Header */}
    <Header></Header>
    {/* banner */}
    <div className="bg-center bg-no-repeat bg-cover text-neutral-0 w-full h-52 md:h-96 relative" style={{ backgroundImage: `url(${accountBg})`}} >
      <div className="absolute inset-0 bg-neutral-100/40"></div>
      <div className='container w-full h-full flex flex-col justify-center items-start gap-4 md:gap-6 md:flex-row md:justify-start md:items-center absolute z-[1] inset-0'>
        <figure className=' rounded-full w-[72px] h-[72px] md:w-[114px] md:h-[114px] overflow-hidden'>
          <img src={headshot005} alt="會員大頭貼" className='w-full h-full' />
        </figure>
        <p className='h3 md:h1'>Hello，Jessica</p>
      </div>
    </div>
    {/* Main */}
    <main className="bg-neutral-bg text-neutral-0">
      <Outlet />
      <img className="bottom-0 left-0 min-h-[84px]" src={line2IMG} alt="" />
    </main>
    {/* Footer */}
    <Footer></Footer>
  </>)
}

export default AccountLayout;
