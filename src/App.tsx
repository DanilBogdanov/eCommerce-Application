import { ReactElement } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom';
import Layout from './components/layout/Layout';
import Main from './components/pages/main/Main';
import Registration from './components/pages/registration/Registration';
import Login from './components/pages/login/Login';
import NotFound from './components/pages/notFound/NotFound';
import AboutUs from './components/pages/about/About';
import Catalog from './components/pages/catalog/Catalog';
import { api } from './api/api';
import './App.css';

const redirectToMain = () => {
  if (!api.user.isAnonymous()) {
    return redirect('/');
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Main /> },
      {
        path: '/registration',
        element: <Registration />,
        loader: redirectToMain,
      },
      {
        path: '/login',
        element: <Login />,
        loader: redirectToMain,
      },
      {
        path: '/catalog',
        element: <Catalog />,
        children: [
          {
            path: '/catalog/:category',
            element: <Catalog />,
          },
        ],
      },
      { path: '/about', element: <AboutUs /> },
      { path: '/*', element: <NotFound /> },
    ],
  },
]);

function App(): ReactElement {
  return <RouterProvider router={router} />;
}

export default App;
