import React, { useEffect, useState } from 'react'

function Home() {
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
        postId:id,
      })
    }).then(res=>res.json()).then(data=>console.log(data))
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
              <i onClick={()=>{
                likePost(item._id)
              }} className="material-icons" style={{ color: "red", cursor: "pointer" }}>favorite_border</i>
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