import React, { useEffect, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import './Editor.css';
import { useStateValue } from '../../Context/StateProvider';
import { actionType } from '../../Context/Reducer';


function EditorField() {

  const [code, setCode] = useState()
  const [{ newCode }, dispatch] = useStateValue();

  const handleEditorDidMount = (editor) => {
    // You can perform additional setup or access the editor instance here
    // console.log('Editor did mount:', editor);
    
  };
  
  const handleEditorChange = async (value, event) => {
    
    // Handle changes in the editor's content
    console.log('Editor content changed:', value);

    localStorage.setItem('newCode', JSON.stringify(value))
    //Dispatch code in the Context
     dispatch({
      type: actionType.SET_CODE,
      newCode: value,
    });
  };

  useEffect(()=>{
    setCode(newCode)
  },[])

  
  return (
    <MonacoEditor className="py-7 w-screen h-full overflow-auto text-themeColor"
      language="javascript"
      theme="vs-dark"
      options={{
        selectOnLineNumbers: true,
        automaticLayout: true,
      }}
      value={code}
      onChange={handleEditorChange}
      editorDidMount={handleEditorDidMount}
    />
  );
}

export default EditorField;
