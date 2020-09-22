import React , {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
      <h2>Statistics</h2>
      <h3>good {good}</h3>
      <h3>natural {natural}</h3>
      <h3>bad {bad}</h3>
      <h3>all {(good + natural + bad)}</h3>
      <h3>average {(good * 1 + bad * -1) / ((good + natural + bad))}</h3>
      <h3>positive {(good / ((good + natural + bad))) * 100}</h3>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)