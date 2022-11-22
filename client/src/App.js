import './App.css';

import { Link, Navigate, Route, Routes } from 'react-router-dom';

import { OneDevice} from './views/OneDevice';
import { NotFound } from './views/NotFound';
import { SearchDevice } from './views/SearchDevice';
import  Header  from './components/Header';
import { AllProducts } from './views/AllProducts';

function App() {
  return (
    <div className="container">

    <Header />

      

      {/*
      Front-end routes to display view components.
      these are separate from our server routes.
      */}
      <Routes>
        {/* Redirect example */}
        <Route path="/" element={<Navigate to="/devices/search" replace />} />
        <Route path="/devices/:id" element={<OneDevice />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/devices/search" element={<SearchDevice />} />
        <Route path="/products" element={<AllProducts />} /> 
        
      </Routes>
    </div>
  );
}

export default App;