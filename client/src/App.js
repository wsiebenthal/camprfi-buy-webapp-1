import './App.css';
import React from 'react';

import { Link, Navigate, Route, Routes } from 'react-router-dom';

import { OneDevice} from './views/OneDevice';
import { NotFound } from './views/NotFound';
import { SearchDevice } from './views/SearchDevice';
import  Header  from './components/Header';
import { AllProducts } from './views/AllProducts';
import { OrderSuccess}  from './views/OrderSuccess';
import { PaymentPage } from "./views/PaymentPage";

import Success from "./components/Success";
import Cancel from "./components/Cancel";

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
        <Route path="/devices/search" element={<SearchDevice {...searchButtonData}/>} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="success" element={<Success />} />
          <Route path="cancel" element={<Cancel />} />
        
      </Routes>
    </div>
  );
}

export default App;




const searchButtonData = {
  enterDeviceNumber: "Enter device Number",
  searchButton: "/img/search-button@1x.png",
};