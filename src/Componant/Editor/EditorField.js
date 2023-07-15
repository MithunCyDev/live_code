import React, { useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution";
import "./Editor.css";
import { useStateValue } from "../../Context/StateProvider";

function EditorField({socketRef}) {
  const [code, setCode] = useState();
  const [{ roomId, user }, dispatch] = useStateValue();
  

  // const handleEditorDidMount = (editor) => {
  //   // You can perform additional setup or access the editor instance here
  //   console.log('Editor did mount:', editor);
  // };

  useEffect(() => {
    if (code !== undefined) {
      socketRef.current.emit('codeChange', {
        user,
        roomId,
        code,
      });
      // console.log(code, 'code run');
    }
  }, [socketRef, code]);
  
  
  useEffect(() => {
    // Set up the event listener for receiving code updates
    const handleCodeUpdate = (code) => {
      if (code) {
        setCode(code);
        // console.log(code, 'database code');
      }
    };
  
    if (socketRef.current) {
      socketRef.current.on('updateCode', handleCodeUpdate);
    }
  
    // Clean up the event listener when the component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.off('updateCode', handleCodeUpdate);
      }
    };
  }, [code, socketRef]);
  

  return (
    <MonacoEditor
      className="py-7 w-screen h-full overflow-auto text-themeColor"
      language="javascript"
      theme="vs-dark"
      options={{
        selectOnLineNumbers: true,
        automaticLayout: true,
      }}
      value={code}
      onChange={(e)=> setCode(e) }
      
    />
  );
}

export default EditorField;
