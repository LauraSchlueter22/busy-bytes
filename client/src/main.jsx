import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './app.jsx';
import './style.css';
import RecipeDetails from './RecipeDetails.jsx';
import ThirtyMinuteMeals from "./ThirtyMinuteMeals.jsx";
import CuisinePicker from "./CuisinePicker.jsx";
import RandomRecipe from "./RandomRecipe.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
    // adding BrowserRouter & routes so that I can have multiple pages within my application
    <React.StrictMode>
        <BrowserRouter>
        <Routes>

            <Route path="/" element={<App />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} /> 

            {/* drop down feature routes */}
            <Route path="/30-minute-meals" element={<ThirtyMinuteMeals />} />
            <Route path="/cuisine" element={<CuisinePicker />} />
            <Route path="/random" element={<RandomRecipe />} />
        </Routes>
        </BrowserRouter> 
    </React.StrictMode>
);
