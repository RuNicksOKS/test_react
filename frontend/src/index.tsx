import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import EnitecHome from './pages/home/EnitecHome';
import Copyright from './pages/copyright/Copyright';
import News from './pages/news/News';
import Company from './pages/company/Company';
import Business from './pages/business/Business';
import Recruitment from './pages/recruitment/Recruitment';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <EnitecHome />
      },
      {
        path: "copyright",
        element: <Copyright />
      },
      {
        path: "news", 
        element: <News />
      },
      {
        path: "company",
        element: <Company />
      },
      {
        path: "business",
        element: <Business />
      },
      {
        path: "recruitment",
        element: <Recruitment />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider 
      router={router} 
      future={{
        v7_startTransition: true
      }}
    />
  </React.StrictMode>
);
