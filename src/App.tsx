import './App.css';
import { ReactElement } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Main from './components/pages/main/Main';
import Registration from './components/pages/registration/Registration';
import Login from './components/pages/login/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Main /> },
      { path: '/registration', element: <Registration /> },
      { path: '/login', element: <Login /> },
    ],
  },
]);

function App(): ReactElement {
  return <RouterProvider router={router} />;
}

export default App;
