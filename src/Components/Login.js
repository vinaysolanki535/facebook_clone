import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import { auth, provider } from '../Firebase'
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../Reducer'
import db from '../Firebase'

function Login() {
  const [{ user }, dispatch] = useStateValue()

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      })
      .catch((error) => alert(error.message))
  }
  return (
    <div className='login'>
      <div className='login_logo'>
        <img
          src='https://www.flaticon.com/svg/vstatic/svg/179/179319.svg?token=exp=1618978945~hmac=8059666348b7e34dccbfabee8e4b1d97'
          alt=''
        ></img>
        <img
          src='https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-1-1.png'
          alt=''
        />
      </div>
      <Button type='submit' onClick={signIn}>
        Sign In
      </Button>
    </div>
  )
}

export default Login
