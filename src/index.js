import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Spiner } from './Spiner/Spiner';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Router>
      <AnimatePresence>
        <Spiner/>
      </AnimatePresence>
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
