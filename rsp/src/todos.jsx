import React, {useState, useEffect} from 'react'

export default function Todos(props) {
  const[todo, setTodo] = useState([])
  
  var c = 0
  useEffect(()=>{    
       setTodo(props.input1)
  },[props.input1])

  const handleSelect = (e) =>{
    const {value, checked} = e.target
    console.log(value)
    //console.log(checked)
    if(checked){
      const newSelected = [...props.selected, value]
      props.setSelected(newSelected)             
    }
    else if(!checked){
      const newSelected = props.selected.filter((item)=>{return item !== value})   
      props.setSelected(newSelected)   
    }
  }
  

  return (
    <div>
        <table border={1} cellPadding={10} cellSpacing={0} width='100%'>
            <thead>
            <tr>
                <th>Select</th>
                <th>Srno.</th>   
                <th>Task</th>
                <th>Start Date</th>
                <th>End Date</th>             
            </tr>
            </thead>          
            <tbody id='li'>
              {
              todo.map((item, key)=>{  //The map function will also run from the start every time the state changes, this is because the component is re-rendered every time the state changes, and the map function is called again.
                  c = c+1                                                 
                  return(                    
                    <tr key={key}>
                      <td><input type="checkbox" onChange={handleSelect} value={item._id}/></td>
                      <td>{c}</td>
                      <td>{item.tname}</td>
                      <td>{item.start}</td>
                      <td>{item.end}</td>
                    </tr>
                  )                  
                })
              }
            </tbody>                      
        </table>                
    </div>
  )
}
