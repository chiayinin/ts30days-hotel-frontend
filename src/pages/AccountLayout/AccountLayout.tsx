import { Outlet } from 'react-router-dom';
import { Header } from '@components';
import { Footer } from '@components';

const AccountLayout = () => {
  return (<>
    {/* Header */}
    <Header></Header>
    {/* banner */}
    <div>
      <div>
        <figure>
          <img src="" alt="" />
        </figure>
        <h1>Hello，Jessica</h1>
      </div>
    </div>
    {/* Main */}
    <main className='bg-primary-10'>
      <Outlet />
    </main>
    {/* Footer */}
    <Footer></Footer>
  </>)
}

export default AccountLayout;
