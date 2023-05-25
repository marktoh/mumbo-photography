import { Routes, Route } from 'react-router-dom';

import LandingView from './views/LandingView';
import PhotoView from './views/PhotoView';
import OrderSuccessView from './views/OrderSuccessView';

import Header from './components/Header';
import Footer from './components/Footer';

import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route index element={<LandingView />} />
        <Route path="photo">
          <Route path=":id" element={<PhotoView />} />
        </Route>
        <Route path="stripe">
          <Route path="success" element={<OrderSuccessView />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
