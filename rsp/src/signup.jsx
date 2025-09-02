import React, {useState} from 'react'
import axios from 'axios'

export default function Signup() {
  const [usc, setUser] = useState([])
  const p1 = document.getElementById('p1').value
  const p2 = document.getElementById('p2').value
  const handleInput = async (e) =>{
    e.preventDefault()
    if(p1===p2){
      setUser([e.target[0].value, e.target[1].value])// set user in usc array now can be used to send to backend
      try{
        const res = await axios.post('http://localhost:5000/signup',{uname:usc[0], pass:usc[1]})
      } 
      catch(err){
        console.log(err)
      }
    }
    else{
      alert('password donot match')
      document.getElementById('p1').value = ''
      document.getElementById('p2').value = ''
    }

  }  
  return (
    <div>
        <form onSubmit={handleInput}>
        <label>Username</label>
        <input type='text'/>
        <label>New Password</label>
        <input type='password' id = 'p1'/>
        <label>Confirm Password</label>
        <input type='password' id='p2'/>
        <button id='b2'>Submit</button>
        </form>        
    </div>
  )
}
