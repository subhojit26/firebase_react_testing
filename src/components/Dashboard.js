import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div style={{display:'flex',flexDirection:'row'}}>
      <div style={{width:'20%', backgroundColor:'purple',height:'100vh'}}>
        <Link to='/addStudent' style={{color:'white', display:'block'}}>Add Student</Link>
        <Link to='/studentList' style={{color:'white', display:'block'}}>Student List</Link>
      </div>
      <div style={{width:'80%',height:'100vh'}}>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
