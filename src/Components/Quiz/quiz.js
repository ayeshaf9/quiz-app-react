import React,{Component, Fragment} from 'react';
import {Helmet} from 'react-helmet';
import questions from '../../questions.json';
import isEmpty from '../../Utilities/isEmpty';
import message from 'materialize-css';
import button_notification from '../../Assets/Images/Audio/button.mp3';
import correct_notification from '../../Assets/Images/Audio/correctAnswer.mp3';
import wrong_notification from '../../Assets/Images/Audio/wrongAnswer.mp3';
import classnames from 'classnames';



class PlayQuiz extends Component{
  constructor(props){
    super(props);
    this.state = {
      questions,
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: '',
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      nextButtDisabled: false,
      prevButtDisabled: true,
      hints: 5,
      prevRandNum: [],
      time: {}
    };
    this.interval = null
  };


  componentWillMount(){
     clearInterval(this.interval);
  };

  componentDidMount(){
    const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
    this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
    this.startTimer();
  };

   displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
      
    let {currentQuestionIndex} = this.state;
    if(!isEmpty(this.state.questions)){
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      this.setState({
          currentQuestion,
          nextQuestion,
          previousQuestion,
          numberOfQuestions: questions.length,
          answer,
          prevRandNum: []
      }, () => {
        this.showOptions();
        this.handleDisableButton();
      });
    }
   };

   handleOptionClick = (a) => {
    
    if(a.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
      setTimeout(() => {
        document.getElementById('correct-sound').play();
      }, 500);
      this.correctAnswer();
    }else{
      setTimeout(() => {
        document.getElementById('wrong-sound').play();
      }, 500);
      this.wrongAnswer();
    }

   };

   handleButtonClick =(a) => {
    switch(a.target.id){
      case 'next-button':
        this.handleNextButtonClick();
        break;
      case 'previous-button':
        this.handlePreviousButtonClick();
        break;
      case 'quit-button':
        this.handleQuitButtonClick();
        break;
      default:
        break;
    } 
   };

   playButtonSound = () => {
    
    document.getElementById('button-sound').play();

   };

   handleNextButtonClick =() =>{
      this.playButtonSound();
      if (this.state.nextQuestion !== undefined){
        this.setState(prevState => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1 
        }), () =>{
          this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
        });
      }
   };

   handlePreviousButtonClick =() =>{
    this.playButtonSound();
    if (this.state.previousQuestion !== undefined){
      this.setState(prevState => ({
        currentQuestionIndex: prevState.currentQuestionIndex - 1 
      }), () =>{
        this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
      });
    }
 };

 handleQuitButtonClick =() =>{
  this.playButtonSound();
  if (window.confirm('Are you sure you want to quit?')){
    this.props.history.push('/');
  }
};

   correctAnswer = () => {
     message.toast({
      html: 'Correct Answer!',
      classes: 'toast-valid',
      displayLength: 1500
     });
     this.setState(prevState => ({
       score: prevState.score + 1,
       correctAnswers: prevState.correctAnswers + 1,
       currentQuestionIndex: prevState.currentQuestionIndex + 1,
       numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
     }), () => {
      if(this.state.nextQuestion === undefined){
        this.endGame();
      }else{
       this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
       }
      });
   };

  wrongAnswer = () => {
    navigator.vibrate(1000);
    message.toast({
     html: 'Wrong Answer!',
     classes: 'toast-invalid',
     displayLength: 1500
    });
    this.setState(prevState => ({
      wrongAnswers: prevState.wrongAnswers + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
    }), () => {
       if(this.state.nextQuestion === undefined){
         this.endGame();
       }else{
        this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
       }
      });
  };


  showOptions = () => {
   const options = Array.from(document.querySelectorAll('.option'));
  
   options.forEach(option => {
      option.style.visibility = 'visible';
   });

  };



  handleHints = () => {
    if(this.state.hints>0){
   const options = Array.from(document.querySelectorAll('.option'));
   let indeexOfAnswer;

   options.forEach((option, index) => {
     if(option.innerHTML.toLowerCase()=== this.state.answer.toLowerCase()){
       indeexOfAnswer = index;
     }
    });
    while(true){
      const randNum = Math.round(Math.random() * 3);
      if(randNum !== indeexOfAnswer && !this.state.prevRandNum.includes(randNum)){
        options.forEach((option, index) => {
          if(index ===randNum){
            option.style.visibility = 'hidden';
            this.setState((prevState) => ({
              hints: prevState.hints - 1,
              prevRandNum: prevState.prevRandNum.concat(randNum)
            }));
          }
        });
        break;
      }
      if(this.state.prevRandNum.length >=3) break;
    }
  }
};

startTimer = () =>{
 const countDown= Date.now() + 180000;
 this.interval = setInterval(()=> {
   const now = new Date();
   const dist = countDown - now;
   const min = Math.floor((dist % (1000*3600))/ (1000*60));
   const sec = Math.floor((dist % (1000*60))/ (1000));
   if(dist <0){
     clearInterval(this.interval);
     this.setState({
      time: {
        min: 0,
        sec: 0
      }
     }, () => {
       this.endGame();
     });
   } else {
     this.setState({
      time: {
        min,
        sec
      }
     });
   }
 }, 1000);
};


handleDisableButton = () =>{
  if(this.state.previousQuestion === undefined || this.state.currentQuestionIndex === 0){
    this.setState({
      prevButtDisabled: true
    });
  }else{
    this.setState({
      prevButtDisabled: false
    });
  }
  if(this.state.nextQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions){
    this.setState({
      nextButtDisabled: true
    });
  }else{
    this.setState({
      nextButtDisabled: false
    });
  }
};


endGame =() => {
 alert('Quiz has ended!');
 const {state} = this;
 const playerStats = {
   score: state.score,
   numberOfQuestions: state.numberOfQuestions,
   numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
   correctAnswers: state.correctAnswers,
   wrongAnswers: state.wrongAnswers,
   hintsUsed: 5-state.hints
 };
  console.log(playerStats);
  setTimeout(()=>{
    this.props.history.push('/summary', playerStats);
  }, 1000);
};

    render(){
      
      const {hints,time, currentQuestion, currentQuestionIndex, numberOfQuestions} = this.state;
        return(
          <Fragment>
            <Helmet><title>Play - Quiz App</title></Helmet>
            <Fragment>
              <audio id="correct-sound" src={correct_notification}></audio>
              <audio id="wrong-sound"  src={wrong_notification}></audio>
              <audio id="button-sound"  src={button_notification}></audio>
            </Fragment>
            <div className="questions">
            <h2>Quiz</h2>
            <div className="hint-container">
            <p>
            <span className="left" style={{ float: 'left'}}>{currentQuestionIndex + 1} of {numberOfQuestions}</span>
            </p>
            <p>
              <span onClick={this.handleHints} className="mdi mdi-lightbulb-on-outline mdi-24px hint-icon"></span> 
              <span >{hints}</span>
            </p>
            </div>
            <div className="timer-container">
              <p>
                <span className="right">{time.min}:{time.sec}<span className="mdi mdi-clock-outline mdi-24px"></span></span>
              </p>
            </div>
               <h5>{currentQuestion.question}</h5>
               <div className="options-container">
                    <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
                    <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionA}</p>
               </div>
               <div className="options-container">
                    <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
                    <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
               </div>
               <div className="button-container">
                    <button 
                        className={classnames('',{'disable': this.state.prevButtDisabled})}
                        id="previous-button" 
                        onClick={this.handleButtonClick}>
                    Previous
                    </button>
                    <button 
                        className={classnames('',{'disable': this.state.nextButtDisabled})}
                        id="next-button" 
                        onClick={this.handleButtonClick}>
                    Next
                    </button>
                    <button id="quit-button" onClick={this.handleButtonClick}>Quit</button>
               </div>
            </div>
          </Fragment>
        );
    };
}


export default PlayQuiz;