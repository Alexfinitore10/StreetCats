import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './Pages/LoginPage.jsx'
import MainPage from './Pages/MainPage.jsx';
import RegisterPage from './Pages/RegisterPage.jsx'
import CreazioneGiornalista from './Pages/CreazioneGiornalista.jsx'
import './index.css'
import CreaArticolo from './Pages/CreaArticolo.jsx';
import ArticlePage from './Pages/ArticlePage.jsx';
import { AuthProvider } from './components/AuthContext.jsx';




const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,  
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <MainPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/creazione-utenza",
    element : <CreazioneGiornalista />
  },
  {
    path: "/pubblica-articolo",
    element: <CreaArticolo />
  },
  {
    path: "/articolo/:articleId",
    element: <ArticlePage />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
