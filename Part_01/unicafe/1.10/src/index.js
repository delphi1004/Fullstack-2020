import React , {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const StatisticLine = ({text, value}) =>{
  return(
    <div>
      <h3>{text} {value} </h3>
    </div>
  )
}

const Statistics = ({good,natural,bad}) => {

  let sum = (good + natural + bad);
  let avg = (good * 1 + bad * -1) / sum;
  let positive = (good / sum) * 100;

  return(
    <div>
      {sum === 0 ? <h3>No feedback given</h3> :
        <div>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="natural" value ={natural} />
          <StatisticLine text="bad" value ={bad} />
          <StatisticLine text="all" value ={sum} />
          <StatisticLine text="average" value ={avg} />
          <StatisticLine text="positive" value ={positive} />
        </div>
      }
    </div>
  )
}

const FeedbackButton = ({text,value,event}) =>{
  return(
    <button onClick = { () => event(prev => prev+1)}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [natural, setNatural] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <FeedbackButton text = 'Good' event = {setGood} />
      <FeedbackButton text = 'Natural' event = {setNatural} />
      <FeedbackButton text = 'Bad' event = {setBad} />
      <Statistics good = {good} natural = {natural} bad = {bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
