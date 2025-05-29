import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { DocumentEditorDialog } from './components/DocumentEditorDialog';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const testDocUrl = "C:\Users\mserr\test.docx"
  return (
    <>
      <div>
        Editor for file {testDocUrl}. Click the button to open the file and save it.
      </div>
      <div>
       <DocumentEditorDialog
        link={testDocUrl}
        title="Sample Document Editor"/>
      </div>
    </>
  )
}

export default App
