import './App.css';
// import AddData from './components/AddData';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddStudent from './components/AddStudent';
import StudentList from './components/StudentList';
import UpdateStudent from './components/UpdateStudent';


const myRouter=createBrowserRouter([
  {path:'', Component:Dashboard,children:[
    {path:'addStudent', Component:AddStudent},
    {path:'', Component:StudentList},
    {path:'studentList', Component:StudentList},
    {path:'updateStudent', Component:UpdateStudent}
  ]},
]);

function App() {
  return (
    <>
      <RouterProvider router={myRouter} />
    </>
  );
}

export default App;
