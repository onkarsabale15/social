import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'



function Home() {
  const { state } = useContext(UserContext)
  const [data, setData] = useState([])
  useEffect(() => {
    fetch("/allposts", {
      headers: {
        "Authorization": "Bearer" + localStorage.getItem("token")
      }
    }).then(res => res.json()).then(result => {
      console.log(result)
      setData(result)
    })
  }, [])
  const likePost = (id) => {
    fetch('/like', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + localStorage.getItem("token")
      },
      body: JSON.stringify({
        postId: id,
      })
    }).then(res => res.json()).then(data => { return data.likes })
  }

  const unLikePost = (id) => {
    fetch('/unLike', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + localStorage.getItem("token")
      },
      body: JSON.stringify({
        postId: id,
      })
    }).then(res => res.json()).then(data => { return data.likes })
  }

  const likeOrUnlike = (ur,id) => {
    if (ur.includes(state._id)) {
      return unLikePost(id);
    } else {
      return likePost(id);
    }

  }

  function checkUserLike(ur) {
    if (ur.includes(state._id)) {
      return "favorite";
    } else {
      return "favorite_border";
    }
  }
  return (
    <div className='home'>
      {data.map(item => {
        return (
          <div className='card home-card' key={item._id}>
            <h5>{item.postedBy.name}</h5>
            <div className='card-image'>
              <img src={item.photo} alt='Cant Load The Post' />
            </div>
            <div className='card-content'>
              <i onClick={() => {
                item.likes = likeOrUnlike(item.likes,item._id)
              }} className="material-icons" style={{ color: "red", cursor: "pointer" }}>{checkUserLike(item.likes)}</i>
              <span style={{ textAlign: "center" }}> <b>{item.likes.length} Likes</b></span>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              <input type="text" placeholder='Enter Comment' />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home