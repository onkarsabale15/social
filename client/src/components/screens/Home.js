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
  },[])
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
              <i className="material-icons" style={{ color: "red" }}>favorite</i>
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