import './App.css';
import { ReactElement } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Main from './components/pages/main/Main';
import Registration from './components/pages/registration/Registration';
import Login from './components/pages/login/Login';
import Api from './api/api';
import AboutUs from './components/pages/about/About';
import Catalog from './components/pages/catalog/Catalog';

const api = new Api();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout api={api} />,
    children: [
      { index: true, element: <Main /> },
      { path: '/registration', element: <Registration /> },
      { path: '/login', element: <Login api={api} /> },
      { path: '/catalog', element: <Catalog /> },
      { path: '/about', element: <AboutUs /> },
    ],
  },
]);

function App(): ReactElement {
  return <RouterProvider router={router} />;
}

export default App;
