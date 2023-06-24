import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import './Editor.css';


function EditorField() {
  const handleEditorDidMount = (editor) => {
    // You can perform additional setup or access the editor instance here
    console.log('Editor did mount:', editor);
  };

  const handleEditorChange = (value, event) => {
    // Handle changes in the editor's content
    console.log('Editor content changed:', value);
  };

  return (
    <MonacoEditor className="py-7 w-screen h-full overflow-auto text-themeColor"
      language="javascript"
      theme="vs-dark"
      value=""
      options={{
        selectOnLineNumbers: true,
      }}
     
      onChange={handleEditorChange}
      editorDidMount={handleEditorDidMount}
    />
  );
}

export default EditorField;
