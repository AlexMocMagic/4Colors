// importing game
import Game from "./pages/Game";

// importing router dom
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <a href="/game" className="text-white">Hello world!</a>,
    },
    {
      path: "/game",
      element: <Game/>,
    },
  ]);

  return (
    <div className="w-full h-dvh overflow-hidden bg-[#121212] p-5">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
