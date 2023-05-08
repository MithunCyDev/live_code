import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Spiner } from './Spiner/Spiner';
import { StateProvider } from './Context/StateProvider';
import {InitialState } from './Context/InitialState';
import reducer from './Context/Reducer'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Router>
    <StateProvider initialState={InitialState} reducer = {reducer}>
      <AnimatePresence>
        <Spiner/>
      </AnimatePresence>
    </StateProvider>
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
