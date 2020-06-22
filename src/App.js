import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Components/Home';
import Instructions from './Components/Quiz/instructions'
import PlayQuiz from './Components/Quiz/quiz';
import Summary from './Components/Quiz/summary';

function App() {
  return (
     <Router>
         <Route path="/" exact component={Home} />
         <Route path="/instructions" component={Instructions} />
         <Route path="/play" component={PlayQuiz} />
         <Route path="/summary" component={Summary} />
     </Router>
  );
}

export default App;
