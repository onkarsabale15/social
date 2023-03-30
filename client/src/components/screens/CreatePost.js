import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import M from 'materialize-css'
function CreatePost() {

  const navi = useNavigate()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const uploadImage = () => {
    if (!title || !body || !image) {
      M.toast({ html: "All Fields Are Mandatory" })
    } else {
      var formdata = new FormData();
      formdata.append("file", image);
      formdata.append("upload_preset", "social");
      formdata.append("cloud_name", "onkarsabale");
      var requestOptions = {
        method: 'POST',
        body: formdata
      };
      fetch("https://api.cloudinary.com/v1_1/onkarsabale/image/upload", requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.url) {
            fetch("/createPost", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer"+localStorage.getItem("token")
              },
              body: JSON.stringify({
                title,
                body,
                photo: result.url
              })
            }).then(res => res.json()).then(data => {
              if (data.error) {
                M.toast({ html: data.error })
              } else {
                M.toast({ html: data.message })
                navi('/')
              }
            })
          } else {
            var toastHTML = `<span>${result.error.message}</span><button class="btn-flat toast-action">Dismiss</button>`;
            M.toast({ html: toastHTML })
          }
        })
        .catch(error => console.log('error', error));
    }
  }
  return (
    <div className='card input-filed' style={{
      margin: "10px auto",
      maxWidth: "500px",
      padding: "20px",
      textAlign: "center"
    }}>
      <input type="text" value={title} onChange={(t) => {
        setTitle(t.target.value)
      }} placeholder='title' />
      <input type="text" value={body} onChange={(d) => {
        setBody(d.target.value)
      }} placeholder='description' />
      <div className='file-field input-field'>
        <div className="btn">
          <span>Add Image</span>
          <input onChange={(f) => {
            setImage(f.target.files[0])
          }} type="file" />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button onClick={() => uploadImage()} className='btn waves-effect waves-light'>Upload Post</button>
    </div>
  )
}
export default CreatePost
