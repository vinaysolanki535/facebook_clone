import React, { useEffect, useState } from 'react'
import Story from './Story'
import './StoryReel.css'
import db from '../Firebase'

function StoryReel() {
  const [story, setStory] = useState([])
  useEffect(() => {
    db.collection('story')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setStory(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      })
  }, [])
  console.log(story)
  return (
    <div className='storyReel'>
      {story.map((story) => (
        <Story
          key={story.id}
          profileSrc={story.data.profileSrc}
          username={story.data.username}
          image={story.data.image}
        />
      ))}
    </div>
  )
}

export default StoryReel
