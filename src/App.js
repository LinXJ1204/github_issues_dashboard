import './style.css';
import { Task } from './task';
import { Home } from './home';
import { Login } from './login';
import { Newtask } from './newtask';
import { Taskinfo } from './taskinfo';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import { getaccesstoken, search_issue, whether_login } from './github';



function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/"  element={<Home/>}>
        <Route path="" index element={<Login />} />
        <Route path="searchtask" loader={()=>{return search_issue()}} element={<Task/>} />
        <Route path="task" loader={getaccesstoken} element={<Task />} />
        <Route path='task/:taskid' element={<Taskinfo />} />
        <Route path="newtask" loader={whether_login} element={<Newtask/>}></Route>
      </Route>
    )
  )
  
  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
