import { RouterProvider } from 'react-router-dom';
import { router } from './app-routing';
import { PrimeReactProvider } from 'primereact/api';

// style
import Tailwind from 'primereact/passthrough/tailwind';

const App = () => {
  return (
    <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
      <RouterProvider router={router}>
      </RouterProvider>
    </PrimeReactProvider>
  )
}

export default App
