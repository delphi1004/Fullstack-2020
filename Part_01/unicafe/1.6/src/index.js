import React , {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick = { () => setGood(good+1)}>Good</button>
      <button onClick = { () => setNeutral(neutral+1)}>Natural</button>
      <button onClick = { () => setBad(bad+1)}>Bad</button>
      <h2>Statistics</h2>
      <h3>good {good}</h3>
      <h3>natural {neutral}</h3>
      <h3>bad {bad}</h3>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)