import React from 'react';
import DragNDrop from './components/DragNDrop';

import {
  HashRouter as Router,
  Routes,
  Route
  } from 'react-router-dom';

import Home from './components/Home';
import Navigation from './components/Navigation';

const data = [
  {title: "Group 1", items: ["1", "2", "3"]},
  {title: "Group 2", items: ["4", "5"]}
]



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DragNDrop data={data} />
      </header>

      



            {/* <Router>
        <>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home/>}/>
        </Routes>
        </>
        
      </Router> */}
    </div>
  );
}

export default App;
