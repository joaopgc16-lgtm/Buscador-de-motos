import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import DetalhesMoto from './componentes/DetalhesMoto.jsx'
import Layout from './componentes/Layout.jsx'

const router = createBrowserRouter([
  {element: <Layout/>,
    children:[
      {path: "/", element: <App/>,},
      {path:`/moto/`, element: <DetalhesMoto/>,}
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
