import React from 'react';

//styles
import './pagination.css';

export default function Pagination({
  questionsPerPage,
  totalQuestions,
  paginate,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalQuestions / questionsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
