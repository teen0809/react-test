import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import CustomizedDialogs from './ModalMui'

function DataTable() {
  
  const [postData, setPostData] = useState([])
  const [selected, setSelected] = useState("")
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onGetPostData = () => {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => setPostData(json))
    }
    onGetPostData()
  }, [])

  const onVisibleModal = (id) =>{
    setSelected(id)
    setVisible(true)
  }
  return (
    <div className="App">
      <Table striped bordered hover variant="dark" style={{ width: '80%' }}>
        <thead>
          <tr>
            <th>UserID</th> 
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {postData.map((item, key) => {
            return (
              <tr
                key={key+1}
                onClick={()=>onVisibleModal(item.id)}
              >
                <td>{item.userId}</td>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.body}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <CustomizedDialogs visible = {visible} selected = {selected} onModal = {setVisible}/>
    </div>
  )
}

export default DataTable
