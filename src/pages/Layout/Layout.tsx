import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

const Layout = () => {
  return (<>
    {/* Header */}
    <Header></Header>
    {/* Main */}
    <main>
      <Outlet />
    </main>

    {/* Footer */}
    {/* <Footer></Footer> */}
  </>)
}

export default Layout;
