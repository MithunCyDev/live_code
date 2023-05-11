import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Spiner } from './Spiner/Spiner';
import { StateProvider } from './Context/StateProvider';
import {InitialState } from './Context/InitialState';
import reducer from './Context/Reducer'
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Router>
    <GoogleOAuthProvider clientId = "747315352467-3c1bahbmlbos8tv3tgdebe33v7218b9h.apps.googleusercontent.com">
      <StateProvider initialState={InitialState} reducer = {reducer}>
        <AnimatePresence>
          <Spiner/>
        </AnimatePresence>
      </StateProvider>
    </GoogleOAuthProvider>
  </Router>
);
//   <Router>
//     <React.StrictMode>
//       <AnimatePresence>
//         <App />
//       </AnimatePresence>
//     </React.StrictMode>
//   </Router>
// );
