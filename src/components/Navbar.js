import React from 'react';
import { BrowserRouter, NavLink, Link } from 'react-router-dom';
//import { Link, NavLink } from 'react-router-dom';
//styles
//import './Navbar.css';

export default function Navbar() {
  return (
    <div className="navbar">
      <nav>
        <h1>Test Your FIlm Knowledge 😁🎞️ </h1>
        <Link to="/startquiz">Start Quiz</Link>
        <Link to="/addquestion">Add Question</Link>
        <NavLink exact to="/questions ">
          Questions
        </NavLink>
      </nav>
    </div>
  );
}
