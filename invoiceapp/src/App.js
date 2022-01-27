import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registerstore from './components/Registerstore';
import Loginstore from './components/Loginstore';
import NewInvoice from './components/NewInvoice';
import Settinginvoice from './components/Settinginvoice';
import ConfirmInvoice from './components/ConfirmInvoice';
import Dashboard from './components/Dashboard';
import Userinvoice from './components/Userinvoice';
import Frontpage from './components/Frontpage';
import Home from './components/Home';

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<Frontpage />}>
                   <Route path="/" element={<Registerstore/>}/>
                   <Route path="/signup" element={<Registerstore/>}/>
                   <Route path="/signin" element={<Loginstore/>}/>
          </Route>

          <Route path="/dashboard" element={<Dashboard/>}>
                    <Route path="/dashboard" element={<Home/>}/>
                    <Route path="/dashboard/home" element={<Home/>}/>
           
                    <Route path="newinvoice" element={<NewInvoice/>}/>
                    <Route path="confirminvoice" element={<ConfirmInvoice/>}/>
           
                    <Route path="settinginvoice" element={<Settinginvoice/>}/>
                    <Route path="userinvoice" element={<Userinvoice/>}/>
          </Route>
        </Routes>
      </Router>


    </div>
  );
}

export default App;
