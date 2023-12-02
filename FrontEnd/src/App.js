import './App.css'
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import store from './service/store/ReserveStore';
import HomePage from './pages/HomePage';
import BusesPage from './pages/BusesPage';
import PassangerPage from './pages/PassangerPage';
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';
import NavBar from './components/NavBar'


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <NavBar />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/buses' element={<BusesPage />} />
            <Route path='/book' element={<PassangerPage />} />
            <Route path='/success' element={<SuccessPage />} />
            <Route path='/cancel' element={<CancelPage />} />
          </Routes>
        </BrowserRouter>
      
      </div>
    </Provider>
  );
}

export default App;
