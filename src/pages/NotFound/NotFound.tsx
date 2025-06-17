import { Link } from "react-router-dom";

import { Header } from '@components';


const NotFound = () => {
  return (<>
  <Header></Header>
  <div className="bg-primary-10 h-[calc(100vh_-_72px)] md:h-[calc(100vh_-_120px)]">
    {/* Main */}
    <main className="container h-full flex flex-col justify-center items-center">
      <h2 className="h1 mb-4">NotFound 404!</h2>
      <Link to={'/'} className="btn-primary">回首頁</Link>
    </main>
  </div>
  </>)
}

export default NotFound;
