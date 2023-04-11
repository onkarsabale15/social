import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
function Profile() {
  const { state } = useContext(UserContext)
  const [myPosts, setMyPosts] = useState([])
  useEffect(() => {
    fetch("/myPosts", {
      headers: {
        "Authorization": "Bearer" + localStorage.getItem("token")
      }
    }).then(res => res.json()).then(result => {
      setMyPosts(result);
    })
  }, [])
  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-around",
        margin: "18px 0px",
        borderBottom: "1px solid grey",
        borderRadius: "1vh",
        paddingBottom: "2vh",
        height: "30vh",
        marginTop: "5vh",
        WebkitBoxShadow: "0 4px 6px -6px #222"
      }}>
        <div>
          <img src="https://cdn.onlinewebfonts.com/svg/img_529971.png" style={{ width: "20vh", height: "20vh", borderRadius: "10vh" }} alt="Cant Load Profile Pic" />
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <h4>
            {state ? state.name : "Loading.."}
          </h4>
          <div style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}>
            <h6 style={{ margin: "2vh", cursor: "pointer" }}>NA Posts</h6>
            <h6 style={{ margin: "2vh", cursor: "pointer" }}>NA Followers</h6>
            <h6 style={{ margin: "2vh", cursor: "pointer" }}>NA Following</h6>
          </div>
        </div>
      </div>
      <div className='gallery'>
        {myPosts.message ? (
          <h1>{myPosts.message}</h1>
        ) : (
          myPosts.map(post => (
            <img key={post._id} className='galleryItem' src={post.photo} alt='cant load post' />
          ))
        )}
      </div>
    </div>
  )
}
export default Profile