import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'
function Login() {
  const navi = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const signin = () => {
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      M.toast({ html: "Invalid Email" })
    } else {
      fetch("/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      }).then(res => res.json()).then((data) => {
        if (data.error) {
          M.toast({ html: data.error })
        } else {
          localStorage.setItem("token",data.token)
          localStorage.setItem("user",JSON.stringify(data.user))
          M.toast({ html: data.message })
          navi('/')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
  return (
    <div className="card auth-card blue-grey darken-1">
      <div className="card-content carddd white-text">
        <h3>Login</h3>
        <h5>Social</h5>
        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter Your Email' />
        <input type="password" value={password} onChange={(p) => {
          setPassword(p.target.value)
        }} placeholder='Enter Password' />
        <button onClick={() => {
          signin()
        }} className="btn waves-effect waves-light" type="submit" name="action">Login
          <i className="material-icons right">send</i>
        </button>
        <h6><ul><Link to="/signup">Dont Have An Account?</Link></ul></h6>
      </div>
    </div>

  )
}
export default Login
