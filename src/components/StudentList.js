import React, { useEffect } from 'react'
import {getDatabase, onValue, ref, remove} from "firebase/database";
import {app} from '../Firebase';
import { useState } from 'react'
import { getStorage, ref as storageRef, deleteObject } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'

const StudentList = () => {
  const [studentData,setStudentData]=useState(null)
  const navigate=useNavigate()
  useEffect(()=>{
    const db=getDatabase(app)
    const studentRef=ref(db,'student')
    onValue(studentRef,(snapshot)=>{
      const data=snapshot.val()
      console.log(data)
      setStudentData(data)
    })
  },[])

  const deleteStudent=(studentId)=>{
    const db=getDatabase(app)
    const storage=getStorage(app)
    const studentRef=ref(db,'student/'+studentId)
    const myRef=storageRef(storage,`images/${studentId}`)
    deleteObject(myRef)
    .then(()=>{
      remove(studentRef)
    })
    .catch((error)=>{
      console.log(error)
    })

    
  }

  return (
    <div>
      <h1>StudentList</h1>
      {studentData && (
        <div>
          {Object.entries(studentData).map(([key,value])=>{
            return(
            <div key={key}>
              <img style={{width:'44px', height:'44px', padding:'28px'}} src={value.imageUrl} alt='pic'/>
              <p style={{padding:'4px'}}>{value.studentName} {value.phone}</p>
              <button onClick={()=>{deleteStudent(key)}}>Delete</button>
              <button onClick={()=>{
                navigate('/updateStudent',{state:[key,value]})
              }} >Update</button>
            </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default StudentList
