import { RouterProvider } from 'react-router-dom';
import { router } from './app-routing';
import { PrimeReactProvider } from 'primereact/api';

// style
import Tailwind from 'primereact/passthrough/tailwind';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const App = () => {
  return (
    <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
      <RouterProvider router={router}>
      </RouterProvider>
    </PrimeReactProvider>
  )
}

export default App
