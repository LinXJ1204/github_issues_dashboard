import './style.css';
import { Task } from './task';
import { Home } from './home';
import { Login } from './login';
import { Newtask } from './newtask';
import { Taskinfo } from './taskinfo';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import { getaccesstoken } from './github';
import { search_issue } from './github';


function App() {
  /* console.log(testdata[0]['title'],testdata[0]['state'], testdata[0]['created_at'], testdata[0]['body']) */
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Home/>}>
        <Route path="" index element={<Login />} />
        <Route path="searchtask" loader={()=>{return search_issue()}} element={<Task/>} />
        <Route path="task" loader={getaccesstoken} element={<Task/>} />
        <Route path='task/:taskid' element={<Taskinfo />} />
        <Route path="newtask" element={<Newtask/>}></Route>
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
