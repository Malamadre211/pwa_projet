import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Start from './routes/Start';
import Game from './routes/Game';
import End from './routes/End';


function App () {
const router = createBrowserRouter([
  {
    path: '/',
    element: <Start />
  },
  {
    path: '/game',
    element: <Game />
  },
  {
    path: '/end/:time',
    element: <End />
  }
])

  return <RouterProvider router={router} />
}

export default App