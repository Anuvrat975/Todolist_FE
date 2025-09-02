import React, { useState, useRef } from 'react'

export default function Login() {
  const [l1,setUser] = useState([])
  const handleInput = (e) =>{
    e.preventDefault()       
    setUser([e.target[0].value, e.target[1].value])  
  }
  return (
    <div>
      <form onSubmit={handleInput}>
       <label>Login</label>
       <input type='text'/>
       <label>Password</label>
       <input type='password' id='pf1'></input>       
       <button id='b1'>Submit</button>
       <p>hi,{l1[0]}</p>
       <p>again,{l1[1]}</p>
      </form>
    </div>
  )
}






//doesnt work beacuse i1 and i2 are given the values but the re-rendering of component does not happen(only the values get stored)