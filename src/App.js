import {BrowserRouter, Route, Navigate, Routes } from "react-router-dom"
import {useMemo} from "react"
import HomePage from './scenes/homePage';
import LoginPage from './scenes/loginPage';
import ProfilePage from './scenes/profilePage';
import {CssBaseline, ThemeProvider} from "@mui/material"
import { themeSettings } from "./theme";
import {AppBar, Toolbar, Typography, Button, Card, CardContent, Box} from "@mui/material"
import Navbar from "./scenes/navbar";
import {createTheme} from "@mui/material/styles"
import { Provider, useSelector } from "react-redux";



function App() {

  const mode = useSelector((state) => state.mode)

  const theme = useMemo( () => createTheme(themeSettings(mode)), [mode])

  return (
    <>
    <BrowserRouter> 
    <ThemeProvider theme={theme} > 
      <CssBaseline> 
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/profile/:userId" element={<ProfilePage/>}/>
        </Routes>
        <div>The rest of page</div>
      </CssBaseline>
    </ThemeProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
