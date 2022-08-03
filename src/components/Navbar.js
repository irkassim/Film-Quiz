import React from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';
//import { Link, NavLink } from 'react-router-dom';
//styles
import './navbar.css';

export default function Navbar() {
  return (
    <div className="navbar">
      <BrowserRouter>
        <nav>
          <h1>Test Your FIlm Knowledge </h1>
          <NavLink exact to="/addquestion ">
            Add Question
          </NavLink>

          <NavLink exact to="/questions ">
            Start
          </NavLink>
        </nav>
      </BrowserRouter>
    </div>
  );
}
