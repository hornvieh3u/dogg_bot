import App from './App.jsx'
import Stats from './Page/Stats.jsx';
import Landing from './Page/Onboarding.jsx';
import Homeboy from './Page/Homeboy.jsx';
import Invite from './Page/Invite.jsx';
import ErrorPage from './Page/ErrorPage.jsx';

import { createBrowserRouter } from "react-router-dom";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Homeboy />
      },
      {
        path: "/stats",
        element: <Stats />
      },
      {
        path: "/invite",
        element: <Invite />
      },
      
    ]
  },
  {
    path: "/landing",
    element: <Landing/>,
    errorElement: <div>Error!</div>,
  },
  {
    path: "/homeboy",
    element: <Homeboy/>,
    errorElement: <div>Error!</div>,
  },
  {
    path: "/invite",
    element: <Invite/>,
    errorElement: <div>Error!</div>,
  },
  {
    path: "/stats",
    element: <Stats/>,
    errorElement: <div>Error!</div>,
  },
]);