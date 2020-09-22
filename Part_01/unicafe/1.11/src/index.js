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
        <table>
          <tr width = '200px'>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>natural</td>
            <td>{natural}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{sum}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{avg.toFixed(1)}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{positive.toFixed(1)}%</td>
          </tr>
        </table>
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
