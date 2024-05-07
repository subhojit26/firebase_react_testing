import React from 'react'
import { useState } from 'react'
import { getDatabase, ref, set } from 'firebase/database'
import { app } from '../Firebase'
import {getStorage,ref as storageRef,uploadBytes, getDownloadURL} from 'firebase/storage'
import { useNavigate } from 'react-router-dom'

const AddStudent = () => {
  const [studentName,setStudentName]=useState('')
  const [phoneNumber,setPhoneNumber]=useState(null)
  const [studentId,setStudentId]=useState('')
  const [selectedFile,setFile]=useState(null)
  const navigate= useNavigate()

  const handleFileChange=(e)=>{
    const newFile=e.target.files[0]
    setFile(newFile)
  }

  const submitHandler=async(e)=>{
    e.preventDefault()
    const db=getDatabase(app)
    const storage=getStorage(app)
    const myRef=storageRef(storage,`images/${studentId}`)
    await uploadBytes(myRef,selectedFile)

    const imageUrl=await getDownloadURL(myRef)

    set(ref(db,'student/'+studentId),{
      studentName:studentName,
      phone:phoneNumber,
      imageUrl:imageUrl
    })
    .then(()=>{
      navigate('/studentList')
    })
    .catch((error)=>{
      console.log(error)
    })
    
    console.log(studentName,phoneNumber,studentId)
  
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
      <input onChange={(e)=>setStudentId(e.target.value)} type='text' placeholder='Student Id'/>
        <input onChange={(e)=>setStudentName(e.target.value)} type='text' placeholder='Student Name'/>
        <input onChange={(e)=>setPhoneNumber(e.target.value)} type='number' placeholder='Phone Number'/>
        <input onChange={handleFileChange} type='file' />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default AddStudent
