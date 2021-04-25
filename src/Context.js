import React, { useState, useContext, useEffect } from 'react'
import { db } from './Firebase'
import { useStateValue } from './StateProvider'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [userName, setUserName] = useState(null)
  const [uId, setUId] = useState(null)
  const [{ user }, dispatch] = useStateValue()

  useEffect(() => {
    if (user != null) {
      db.collection('Users')
        .doc(user.uid)
        .get()
        .then((val) => {
          if (val.exists) {
            setUserName(val.data().name)
            setUId(user.uid)
            console.log('user accepted')
          }
        })
    } else {
    }
  }, [user])

  return (
    <AppContext.Provider
      value={{
        setUserName,
        setUId,
        userName,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// custom hook

export const useGlobalContext = () => {
  return useContext(AppContext)
}
export { AppContext, AppProvider }
