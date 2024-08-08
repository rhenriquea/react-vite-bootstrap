import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

import Router from './router/index';

const App = () => {
  return (
    <div id="scroll">
      <Router />
      <ToastContainer />
    </div>
  );
};

export default App;
