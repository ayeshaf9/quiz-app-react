import React, { Component, Fragment} from 'react';
import { Helmet } from 'react-helmet';
import { Link} from 'react-router-dom';

class Summary extends Component {
  
    constructor(props){
        super(props);
        this.state ={
           score:0,
           numberOfQuestions: 0,
           numberOfAnsweredQuestions: 0,
           correctAnswers: 0,
           wrongAnswers: 0,
           hintsUsed: 0
        };
    }
    componentDidMount(){
        const {state} = this.props.location;
        this.setState({
           score: (state.score /state.numberOfQuestions) * 100,
           numberOfQuestions: state.numberOfQuestions,
           numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
           correctAnswers: state.correctAnswers,
           wrongAnswers: state.wrongAnswers,
           hintsUsed: state.hintsUsed
        });
    }

    render() {
     const { state, score} = this.props.location;
     let stats, remark;
     const userScore = this.state.score;

     if(userScore <=50 ){
        remark = 'Better luck next time!';
     }else if (userScore<=70 && userScore>50){
        remark = 'You can do better!';
     }else if (userScore >=71 && userScore<=84){
        remark = 'Good job!';
     }else if (userScore>84){
        remark = 'Excellent!';
     }

     if (state !== undefined){ 
       stats=(
           <Fragment>
        <div className="container">
         <div>
             <span className="mdi mdi-check-circle-outline success"></span>
         </div>
         <h1>Quiz has ended!</h1>
          <h4>{remark}</h4>
          <h2>Your score: {this.state.score.toFixed(0)}&#37;</h2>
          <span className="stat left">Total number of questions:</span>
          <span className="right">{this.state.numberOfQuestions}</span><br />

          <span className="stat left">Total number of questions answered:</span>
          <span className="right">{this.state.numberOfAnsweredQuestions}</span><br />

          <span className="stat left">Total number of Correct Answers:</span>
          <span className="right">{this.state.correctAnswers}</span><br />

          <span className="stat left">Total number of Wrong Answers:</span>
          <span className="right">{this.state.wrongAnswers}</span><br />

          <span className="stat left">Total number of hints used:</span>
          <span className="right">{this.state.hintsUsed}</span><br />
         </div>
         <section>
         <ul>
             <li className="left">
                 <Link to="/">Back to Home</Link>
             </li>
             <li  className="right">
                 <Link to="/play">Play Again</Link>
             </li>
             </ul>
         </section>
       </Fragment>
       );
     }else{
        stats = (
            <section>
        <h1 className="no-stats">No Stats available</h1>
        <ul>
        <li>
            <Link to="/">Back to Home</Link>
        </li>
        <li>
            <Link to="/play">Play</Link>
        </li>
        </ul>
        </section>
        );
    }
      return (
        <Fragment>
            <Helmet><title>Summary - Quiz App</title></Helmet>
          {stats}
     </Fragment>
      );
  }
}

export default Summary;