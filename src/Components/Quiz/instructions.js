import React, { Fragment} from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Instructions = () => (
   <Fragment>
       <Helmet>
           <title>Quiz Instructions - Quiz App</title>
       </Helmet>
       <div className="instructions container">
           <h1>How to play</h1>
           <p>Read the instructions before starting the quiz:</p>
           <ul className="browser-default" id="main-list">
              <li>The quiz has a duration of 10 minutes.</li>
              <li>The timer starts when the quiz starts and the quiz ends as the timer reaches 00:00.</li>
              <li>The quiz consists of 10 questions.</li>
              <li>Every question has 4 options to choose from.</li>
              <li>Select the option which you think is correct by clicking that option</li>
              <li>There are 5 hints available denoted by <span className="mdi mdi-lightbulb-on mdi-24px lifeline-icon"></span>, each of which can remove 1 wrong option.</li>
              <li>The quiz can be quit at any time.</li>
           </ul>
           <h5>Goodluck!</h5>
           <div>
               <span className="left"><Link to="/" >BACK</Link></span>
               <span className="right"><Link to="/play" >START QUIZ</Link></span>
           </div>
       </div>
   </Fragment>
);

export default Instructions;
