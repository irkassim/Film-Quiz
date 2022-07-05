import React from 'react';
//import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

//page components
import Navbar from './components/Navbar';
import Questions from './pages/questions/Questions';
import Startquiz from './pages/startquiz/Startquiz';
import Addquestion from './pages/addquestion/Addquestion';
//import Resultsmodal from './pages/resultsmodal/Resultsmodal';
import useFetch from './hooks/useFetch';

function App() {
  //const [showresultsmodal, setshowresultsmodal] = useState(false);
  //const [url, setUrl] = useState('http://localhost:3000/data');

  return (
    <div className="App">
      <Routes>
        <Route exact path="/startquiz">
          <Startquiz />
        </Route>
        <Route exact path="/addquestion" element={Addquestion} />

        <Route
          exact
          path="/questions"
          element={() => <Questions questions />}
        />
      </Routes>
    </div>
  );
}

export default App;
