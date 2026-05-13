import { useState } from 'react'
import { divide, multiply, subtract, sum } from './calculator/calculator.js'
import './App.css'

function App() {
  const [firstNumber, setFirstNumber] = useState('')
  const [secondNumber, setSecondNumber] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const getValues = () => [Number(firstNumber), Number(secondNumber)]

  const handleOperation = (operation) => {
    try {
      const [leftValue, rightValue] = getValues()
      const nextResult = operation(leftValue, rightValue)

      setResult(nextResult)
      setError('')
    } catch (operationError) {
      setResult(null)
      setError(operationError.message)
    }
  }

  return (
    <main className="app-shell">
      <section className="calculator-card">
        <h1>GitHub Actions Calculator</h1>

        <div className="input-group">
          <label htmlFor="first-number">Primer numero</label>
          <input
            id="first-number"
            type="number"
            value={firstNumber}
            onChange={(event) => setFirstNumber(event.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="second-number">Segundo numero</label>
          <input
            id="second-number"
            type="number"
            value={secondNumber}
            onChange={(event) => setSecondNumber(event.target.value)}
          />
        </div>

        <div className="button-row">
          <button type="button" onClick={() => handleOperation(sum)}>
            Sumar
          </button>
          <button type="button" onClick={() => handleOperation(subtract)}>
            Restar
          </button>
          <button type="button" onClick={() => handleOperation(multiply)}>
            Multiplicar
          </button>
          <button type="button" onClick={() => handleOperation(divide)}>
            Dividir
          </button>
        </div>

        <div className="result-panel" aria-live="polite">
          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            <p className="result-text">Resultado: {result ?? '-'}</p>
          )}
        </div>
      </section>
    </main>
  )
}

export default App
