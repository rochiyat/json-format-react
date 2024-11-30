'use client'

import { useState } from 'react';
import JSONPretty from 'react-json-pretty';
import '../css/pretty-bg-white.css';

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const formatJson = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString)
      return parsed
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`Invalid JSON: ${e.message}`)
      }
      throw new Error('An unknown error occurred while parsing JSON')
    }
  }

  const handleFormat = () => {
    try {
      const formatted = formatJson(input)
      setOutput(formatted)
      setError('')
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message)
      } else {
        setError('An unknown error occurred')
      }
      setOutput('')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">JSON Formatter</h1>
      <div className='row'>
        <div className='column'>
          <textarea
            placeholder="Enter your JSON here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={50}
            cols={50}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className='column'>
          <button onClick={handleFormat} className="w-full p-2 border rounded">
            Format JSON
          </button>
        </div>
        <div className='column'>
          {
            <div style={{textAlign: "left", overflowX: "auto"}}>
              <JSONPretty className="json-pretty-custom" data={output}/>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

