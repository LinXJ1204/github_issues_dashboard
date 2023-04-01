import './style.css';
import { Task } from './task';
import { Home } from './home';
import { Login } from './login';
import { Newtask } from './newtask';
import { createBrowserRouter, RouterProvider, Link, Routes, Route, createRoutesFromElements } from 'react-router-dom'
import { getaccesstoken } from './github';
import { store } from './store';
import { useSelector } from "react-redux";

//66eee27c3dc589965d1ba93481703481af57199e


/* const query = `
query{
  user(login: "LinXJ1204") {
    id
    repositories(first: 10) {
      nodes {
        issues(first: 10) {
          nodes {
            title
          }
        }
        name
      }
    }
  }
}
`;

fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer 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',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query }),
})
  .then(response => response.json())
  .then(data => console.log(data)); */

function App() {
  /* console.log(testdata[0]['title'],testdata[0]['state'], testdata[0]['created_at'], testdata[0]['body']) */
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Home/>}>
        <Route path="" index element={<Login />} />
        <Route path="successful" loader={getaccesstoken} element={<Task/>} />
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
