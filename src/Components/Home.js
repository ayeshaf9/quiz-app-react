import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Home = () => (
  <Fragment>
  <Helmet><title>Quiz App - Home</title></Helmet>
   <div id="home">
     <section>
       <div style={{textAlign: 'center', marginTop: '30%'}}>
           <span className="mdi mdi-react react"></span>
       </div>
       <h1>Quiz App</h1>
       <div className="play-button-container">
         <ul>
           <li><Link className="play-button" to="/instructions">Play</Link></li>
         </ul>
       </div>
     </section>
  </div> 
  </Fragment>
);
 
export default Home;
