import { Link, Outlet } from "react-router-dom"
import { Task } from "./task"
import { search_issue } from "./github"

export function Home(){
    function logout(){
      sessionStorage.removeItem("token");
      window.location = ('/')
    }
    return (
        <div>
            <section id="sidebar">
          <ul className="side-menu top">
            <li>
              <span className="tasklistbtn"><Link to="/task">Tasklist</Link></span>
            </li>
            <li>
              <a href="#" className="logout">
                <i className='bx bxs-log-out-circle' ></i>
                <span className="text" onClick={logout}>Logout</span>
              </a>
            </li>
          </ul>
        </section>
        <section id="content">
          <nav>
            <i className='bx bx-menu' ></i>
            
            <form action="#">
              <div className="form-input">
                <input id="search_keyword" type="search" placeholder="Search..."/>
                <Link to='/searchtask'>Search</Link>
              </div>
            </form>
          </nav>

          <main>
            <div className="head-title">
              <div className="left">
                <h1>Dashboard</h1>
              </div>
              <div className="btn-newtask">
                  <span className="text"><Link to='/newtask'>New Task</Link></span>
              </div>
            </div>
            <Outlet />
          </main>
        </section>
        </div>
    )
}