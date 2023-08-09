import './App.css';
import { ReactElement } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
  },
]);

function App(): ReactElement {
  return <RouterProvider router={router} />;
}

export default App;
