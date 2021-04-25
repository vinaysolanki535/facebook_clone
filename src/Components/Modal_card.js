import React from 'react'
import './Modal_card.css'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { makeStyles } from '@material-ui/core/styles'
import { useEffect, useRef, useState } from 'react'
import { db, storageRef } from '../Firebase'
import firebase from 'firebase'
import { useStateValue } from '../StateProvider'
import ImageIcon from '@material-ui/icons/Image'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

function Modal_card({ close }) {
  const [{ user }, dispatch] = useStateValue()
  const imageRef = useRef()
  const [img, setImg] = useState(null)

  const openImageSelector = (e) => {
    imageRef.current.click()
  }

  const [state, setState] = useState({
    checkedA: false,
    checkedB: false,
  })

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  const [message, setMessage] = useState('')

  const uploadImages = async (e) => {
    if (user) {
      const currentDate = Date.now()
      let uploadTask = storageRef
        .child(user.uid)
        .child('images')
        .child(Date.now().toString())
      await uploadTask.put(img).then((snapshot) => {
        uploadTask.getDownloadURL().then((url) => {
          if (state.checkedA) {
            db.collection('posts').doc().set({
              message: message,
              image: url,
              profilePic: user.photoURL,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              uid: user.uid,
              username: user.displayName,
            })
          }

          if (state.checkedB) {
            db.collection('story').doc().set({
              image: url,
              profileSrc: user.photoURL,
              username: user.displayName,
              uid: user.uid,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
          }
        })
      })
    }
    close()
    console.log('images uploaded')
  }
  const getImage = (event) => {
    if (event.target.files) {
      setImg(event.target.files[0])
    } //getting images from device
  }
  return (
    <div className='modal_card'>
      <div className='postOrStory'>
        <FormControlLabel
          control={
            <Switch
              checked={state.checkedA}
              onChange={handleChange}
              name='checkedA'
              color='primary'
            />
          }
          label='Post'
        />

        <FormControlLabel
          control={
            <Switch
              checked={state.checkedB}
              onChange={handleChange}
              name='checkedB'
              color='primary'
            />
          }
          label='Story'
        />
      </div>
      <input
        onChange={(e) => setMessage(e.target.value)}
        type='text'
        placeholder={`what's on your mind ${user.displayName}`}
      ></input>

      <Button
        style={{ marginTop: '20px' }}
        variant='outlined'
        color='primary'
        component='span'
        onClick={openImageSelector}
      >
        <input
          accept='image/*'
          hidden
          ref={imageRef}
          id='fileUpload'
          multiple
          type='file'
          onChange={getImage}
        />
        <ImageIcon />
        Upload Image
      </Button>

      {img && <img src={URL.createObjectURL(img)} />}
      <Button onClick={uploadImages} variant='outlined'>
        Post it!
      </Button>
    </div>
  )
}

export default Modal_card
