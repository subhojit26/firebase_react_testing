import React from 'react'
import {getDatabase,ref,set} from "firebase/database";
import {app} from '../Firebase';

const AddData = () => {
    const addDemoData = (userId, name,phone) => {
        const db= getDatabase(app);
        set(ref(db,'student/'+userId),{
            studentName:name,
            phone:phone
        })
    }
  return (
    <div>
      <h1>Add data</h1>
      <button onClick={()=>{
            addDemoData('1', 'John Doe', '1234567890')
      }}>Add demo data</button>
    </div>
  )
}

export default AddData
