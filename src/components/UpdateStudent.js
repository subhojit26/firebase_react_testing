import React from 'react'
import { useState } from 'react'
import { getDatabase, ref, update } from 'firebase/database'
import { app } from '../Firebase'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import {getStorage, ref as storageRef,uploadBytes, getDownloadURL} from 'firebase/storage'

const UpdateStudent = () => {
  const navigate= useNavigate()
  const location=useLocation()
  const [studentName,setStudentName]=useState(location.state[1].studentName)
  const [phoneNumber,setPhoneNumber]=useState(location.state[1].phone)
  const [studentId,setStudentId]=useState(location.state[0])
  const [selectedFile,setFile]=useState(null)
  const handleFileChange=(e)=>{
    const newFile=e.target.files[0]
    setFile(newFile)
  }
  
  console.log(location)

  const submitHandler=async(e)=>{
    e.preventDefault()
    if(selectedFile){
        const db=getDatabase(app)
    const storage=getStorage(app)
    const myRef=storageRef(storage,`images/${studentId}`)
    await uploadBytes(myRef,selectedFile)
    const imageUrl=await getDownloadURL(myRef)
    const studentRef=ref(db,'student/'+studentId)
    update(studentRef,{
      studentName:studentName,
      phone:phoneNumber,
      imageUrl:imageUrl,
    })

    .then(res=>{
        navigate('/studentList')
        }
    )
    .catch((error)=>{
      console.log(error)
    })
    }
    else{
        const db=getDatabase(app)
    const studentRef=ref(db,'student/'+studentId)
    update(studentRef,{
      studentName:studentName,
      phone:phoneNumber,
    })

    .then(res=>{
        navigate('/studentList')
        }
    )
    .catch((error)=>{
      console.log(error)
    })
    }
   
  
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
      <input disabled value={studentId} onChange={(e)=>setStudentId(e.target.value)} type='text' placeholder='Student Id'/>
        <input value={studentName} onChange={(e)=>setStudentName(e.target.value)} type='text' placeholder='Student Name'/>
        <input value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} type='number' placeholder='Phone Number'/>
        <input onChange={handleFileChange} type='file' />

        <button type='submit'>Update</button>
      </form>
    </div>
  )
}

export default UpdateStudent
