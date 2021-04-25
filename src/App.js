import './App.css'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'
import Feed from './Components/Feed'
import Widgets from './Components/Widgets'
import Login from './Components/Login'
import { useStateValue } from './StateProvider'
import db from './Firebase'
import { useEffect } from 'react'
function App() {
  const [{ user }, dispatch] = useStateValue()

  useEffect(() => {
    if (user) {
      db.collection('Users').doc(user.uid).set(
        {
          email: user.email,
        },
        { merge: true }
      )
    }
  }, [user])

  return (
    <div className='app'>
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <div className='app_body'>
            <Sidebar />
            <Feed />
            <Widgets />
          </div>
        </>
      )}
    </div>
  )
}

export default App
