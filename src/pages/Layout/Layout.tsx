import { Outlet } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';

const Layout = () => {
  return (<>
    {/* Header */}
<p>Layout page</p>
    {/* Main */}
    <main>
      <Outlet />
    </main>

    {/* Footer */}
    <Footer></Footer>
  </>)
}

export default Layout;
