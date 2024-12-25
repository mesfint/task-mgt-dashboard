import './App.css'
import Counter from './components/Counter'

interface CounterProps {
  count: number,
  setCount: (count: number) => void,
  step: number
}

function App() {


  return (
    <>
      <Counter />

       
    </>
  )
}

export default App
