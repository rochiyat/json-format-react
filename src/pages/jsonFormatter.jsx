'use client'

import { useState } from 'react';
import JSONPretty from 'react-json-pretty';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../css/pretty-bg-white.css';

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

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
    } catch (e) {
      if (e instanceof Error) {
        window.alert(e.message)
      } else {
        window.alert('An unknown error occurred')
      }
      setOutput('')
    }
  }

  const copyToClipboardHandle = async () => {
    <CopyToClipboard text={output} onCopy={(output, result) => console.log(result)}>
      <button>Copy</button>
    </CopyToClipboard>
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">JSON Formatter</h1>
      <div className='row'>
        <div className='column'>
          <h1>Input JSON</h1>
          <textarea
            placeholder="Enter your JSON here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{height: "600px", width: "500px", borderRadius: 5, padding: 5}}
            className="p-2 border rounded"
          />
        </div>
        <div className='column'>
          <h1>Action</h1>
          <div className='size-10'>
            <button onClick={handleFormat} className="w-full p-2 border rounded border-radius-5">
              Format JSON
            </button>
          </div>
          <div className='size-10'>
            <CopyToClipboard text={output} onCopy={(text, result) => console.log(text)}>
              <button>Copy JSON</button>
            </CopyToClipboard>
          </div>
        </div>
        <div className='column'>
          <h1>Output JSON</h1>
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

