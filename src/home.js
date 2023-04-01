import { Link, Outlet } from "react-router-dom"
import { Task } from "./task"

export function Home(){
    return (
        <div>
            <section id="sidebar">
          <ul className="side-menu top">
            <li>
              <a href="#" className="logout">
                <i className='bx bxs-log-out-circle' ></i>
                <span className="text">Logout</span>
              </a>
            </li>
          </ul>
        </section>
        <section id="content">
          <nav>
            <i className='bx bx-menu' ></i>
            
            <form action="#">
              <div className="form-input">
                <input type="search" placeholder="Search..."/>
                <button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
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