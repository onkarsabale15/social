import React from 'react'

function Profile() {
  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-around",
        margin: "18px 0px",
        borderBottom: "1px solid grey",
        borderRadius:"1vh",
        paddingBottom:"2vh",
        height:"30vh",
        marginTop:"5vh",
        WebkitBoxShadow:"0 4px 6px -6px #222"
      }}>
        <div>
          <img src="https://cdn.onlinewebfonts.com/svg/img_529971.png" style={{ width: "20vh", height: "20vh", borderRadius: "10vh" }} alt="Cant Load Profile Pic"/>
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems:"center"
        }}>
          <h4>
            User Profile
          </h4>
          <div style={{
              display: "flex",
              justifyContent: "space-evenly",
            }}>
            <h6 style={{ margin: "2vh", cursor:"pointer"}}>NA Posts</h6>
            <h6 style={{ margin: "2vh", cursor:"pointer"}}>NA Followers</h6>
            <h6 style={{ margin: "2vh", cursor:"pointer"}}>NA Following</h6>
          </div>
        </div>
      </div>
      <div className='gallery'>
        <img className='galleryItem' src='http://cdn.onlinewebfonts.com/svg/img_295464.png' alt='cant load post'/>
        <img className='galleryItem' src='http://cdn.onlinewebfonts.com/svg/img_295464.png' alt='cant load post'/>
        <img className='galleryItem' src='http://cdn.onlinewebfonts.com/svg/img_295464.png' alt='cant load post'/>
        <img className='galleryItem' src='http://cdn.onlinewebfonts.com/svg/img_295464.png' alt='cant load post'/>
        <img className='galleryItem' src='http://cdn.onlinewebfonts.com/svg/img_295464.png' alt='cant load post'/>
        <img className='galleryItem' src='http://cdn.onlinewebfonts.com/svg/img_295464.png' alt='cant load post'/>
        <img className='galleryItem' src='http://cdn.onlinewebfonts.com/svg/img_295464.png' alt='cant load post'/>
        
      </div>
    </div>
  )
}
export default Profile