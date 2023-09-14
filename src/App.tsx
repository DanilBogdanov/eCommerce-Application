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
import User from './components/pages/user/User';
import { api } from './api/api';
import './App.css';
import { ProductPage } from './components/pages/product/ProductPage';
import { CartPage } from './components/pages/cart/CartPage';

const redirectToMain = () => {
  if (!api.user.isAnonymous()) {
    return redirect('/');
  }
  return null;
};

const redirectFromProfile = () => {
  if (api.user.isAnonymous()) {
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
      { path: '/profile', element: <User />, loader: redirectFromProfile },
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
      {
        path: '/catalog/:category/:item',
        element: <ProductPage />,
      },
      { path: '/cart', element: <CartPage /> },
      { path: '/about', element: <AboutUs /> },
      { path: '/*', element: <NotFound /> },
    ],
  },
]);

function App(): ReactElement {
  return <RouterProvider router={router} />;
}

export default App;
