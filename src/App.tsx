import './App.css';
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
import Api from './api/api';
import AboutUs from './components/pages/about/About';
import Catalog from './components/pages/catalog/Catalog';

const api = new Api();

const redirectToMain = () => {
  if (!api.user.isAnonymous()) {
    return redirect('/');
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout api={api} />,
    children: [
      { index: true, element: <Main /> },
      {
        path: '/registration',
        element: <Registration />,
        loader: redirectToMain,
      },
      {
        path: '/login',
        element: <Login api={api} />,
        loader: redirectToMain,
      },
      { path: '/catalog', element: <Catalog /> },
      { path: '/about', element: <AboutUs /> },
      { path: '/*', element: <NotFound /> },
    ],
  },
]);

function App(): ReactElement {
  return <RouterProvider router={router} />;
}

export default App;
