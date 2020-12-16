import React from 'react';
import './css/Admin.css';
import Navbar from '../components/Admin_Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Products from './pages/Products';


export default function AdminScreen(){
    return(
    <>
      <Router>
        <Navbar />

      </Router>
    </>
        
    )
}