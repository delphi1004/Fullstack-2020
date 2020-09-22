import React , {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Statistics = ({good,natural,bad}) => {

let sum = (good + natural + bad);
let avg = (good * 1 + bad * -1) / sum;
let positive = (good / sum) * 100;

return(
  <div>
    <h2>Statistics</h2>
    {sum === 0 ? <h3>No feedback given</h3> :
      <div>
        <h3>good {good}</h3>
        <h3>natural {natural}</h3>
        <h3>bad {bad}</h3>
        <h3>all {sum}</h3>
        <h3>average {avg}</h3>
        <h3>positive {positive}</h3>
      </div>
    }
  </div>
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
      <button onClick = { () => setGood(good+1)}>Good</button>
      <button onClick = { () => setNatural(natural+1)}>Natural</button>
      <button onClick = { () => setBad(bad+1)}>Bad</button>
      <Statistics good = {good} natural = {natural} bad = {bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
