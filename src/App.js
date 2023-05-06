import React from 'react'
import { SignUp } from './Componant/SignUp/SignUp';
import { Routes, Route } from 'react-router';
import { Room } from './Componant/Room/Room';
import { Editor } from './Componant/Editor/Editor';
import { ProtectedRoute } from './ProtectedRoute';
const App = () => {
  return (
    <div className='bg-black w-full h-screen'>

      {/* <Toaster
        position='top-right'
        toastOptions={{
          success:{
            theme:{
              primary: '#2e3866'
            },
          },
        }}
      > 
      </Toaster> */}

      <Routes>
        <Route path='/' element={<SignUp/>}></Route>
        <Route path='/room' element={<Room/>}></Route>
        <Route path='/editor/:roomid' element={
          <ProtectedRoute>
            <Editor/>
          </ProtectedRoute>
        }></Route>
      </Routes>
    </div>
  )
}

export default App;