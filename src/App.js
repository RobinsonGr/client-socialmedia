import './App.css';
import {BrowserRouter, Route, Navigate, Routes } from "react-router-dom"
import homePage from 'scenes/homePage';
import loginPage from 'scenes/loginPage';
import profilePage from 'scenes/profilePage';



function App() {
  return (
    <div className="app">

      <BrowserRouter>
      
        <Route path={"/"} element={<loginPage/>} />
        <Route path={"/home"} element={<homePage/>} />
        <Route path={"/profile/:userId"} element={<profilePage/>} />
      
      </BrowserRouter>
     
    </div>
  );
}

export default App;
