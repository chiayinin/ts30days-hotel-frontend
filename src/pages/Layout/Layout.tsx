import { Outlet } from 'react-router-dom';
import { Header } from '@components';
import { Footer } from '@components';

const Layout = () => {
  return (<>
    {/* Header */}
    <Header></Header>
    {/* Main */}
    <main className='bg-primary-10'>
      <Outlet />
    </main>
    {/* Footer */}
    <Footer></Footer>
  </>)
}

export default Layout;
