import { useState } from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  const [busca, setBusca] = useState('')
  const [motos, setMotos] = useState([])

  return <Outlet context={{ busca, setBusca, motos, setMotos }} />
}

export default Layout