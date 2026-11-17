import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { API } from '../api'

function Layout() {
  const [busca, setBusca] = useState('')
  const [motos, setMotos] = useState([])
  const [on, setOn] = useState(null)

    useEffect(() => {
    fetch(`${API}/eu`, { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((dados) => setOn(dados?.usuario ?? null))
      .catch(() => setOn(null))
      .finally
  }, [])

  return <Outlet context={{ busca, setBusca, motos, setMotos, on, setOn}} />
}

export default Layout