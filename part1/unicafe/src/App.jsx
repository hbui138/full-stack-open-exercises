import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleBad = () => {
    setBad(bad +1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleGood = () => {
    setGood(good + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button clickHandler={handleGood} name='good' />
      <Button clickHandler={handleNeutral} name='neutral' />
      <Button clickHandler={handleBad} name='bad' />

      <h1>statistics</h1>
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = ({name, clickHandler}) => {
  return (
    <button onClick={clickHandler}>{name}</button>
  )
}

const Stats = ({ good, neutral, bad }) => {
  let total = bad + good + neutral
  let avg = (good * 1 + neutral * 0 + bad * (-1)) / total
  let positiveRate = good / total

  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine content='good' value={good} />
        <StatisticLine content='neutral' value = {neutral} />
        <StatisticLine content='bad' value={bad} />
        <StatisticLine content='all' value={total} />
        <StatisticLine content='average' value={avg} />
        <StatisticLine content='positive' value={positiveRate*100 + ' %'} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({content, value}) => {
  return (
    <tr>
      <td>{content}</td>
      <td>{value}</td>
    </tr>
  )
}

export default App