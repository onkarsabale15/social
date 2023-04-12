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
      setData(result)
    })
  }, [])
  const likePost = (id) => {
    return fetch('/like', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + localStorage.getItem("token")
      },
      body: JSON.stringify({
        postId: id,
      })
    }).then(res => res.json())
  };

  const unLikePost = (id) => {
    return fetch('/unLike', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + localStorage.getItem("token")
      },
      body: JSON.stringify({
        postId: id,
      })
    }).then(res => res.json())
  };

  const likeOrUnlike = (likes, id) => {
    if (likes.includes(state._id)) {
      unLikePost(id).then(data => {
        setData(prevData => {
          const updatedData = [...prevData];
          const postIndex = updatedData.findIndex(post => post._id === id);
          updatedData[postIndex].likes = data.likes;
          return updatedData;
        });
      });
    } else {
      likePost(id).then(data => {
        setData(prevData => {
          const updatedData = [...prevData];
          const postIndex = updatedData.findIndex(post => post._id === id);
          updatedData[postIndex].likes = data.likes;
          return updatedData;
        });
      });
    }
  };

  const makeComment = (text, postId) => {
    console.log(text,postId)
    fetch("/comment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + localStorage.getItem("token")
      },
      body: JSON.stringify({
        text :text,
        name:(JSON.parse(localStorage.getItem("user"))).name,
        postId: postId
      })
    }).then(res => res.json())
    .then(result=>{
      console.log(result)
      const newData = data.map(item=>{
        if(item._id ==result._id){
          return result
        }else{
          return item
        }
      })
      setData(newData)
    }).catch(err=>{
      console.log(err)
    })
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
              <i onClick={() => likeOrUnlike(item.likes, item._id)} className="material-icons" style={{ color: "red", cursor: "pointer" }}>{(item.likes).includes(state._id) ? "favorite" : "favorite_border"}</i>
              <span style={{ textAlign: "center" }}> <b>{item.likes.length} Likes</b></span>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {
                item.comments.map(record=>{
                  return(
                      <h6><span style={{fontWeight:"bold"}}>{record.name}:</span><span>{record.text}</span></h6>
                  )
                })
              }
              <form onSubmit={(e) => {
                e.preventDefault()
                makeComment(e.target[0].value, item._id)
              }}>
                <input type="text" placeholder='Enter Comment' />
              </form>
              
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default Home