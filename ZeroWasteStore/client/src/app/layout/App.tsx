import { ThemeProvider } from "@emotion/react";
import { Container, createTheme, CssBaseline } from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import Header from "./Header";


function App() {
    const [darkMode, setDarkMode] = useState(false);
    const backgroundColor = darkMode ? 'rgb(255, 77, 106)' : 'rgb(240, 240, 240)';
    const navbarColor = darkMode ? 'rgb(255, 77, 106)' : 'rgb(70, 123, 250)'; 
    const theme = createTheme({
        palette: {
            background: {
                default: backgroundColor
            },
            primary: {
                main: navbarColor
            },
            
        }
    })
    function changeTheme() {
        setDarkMode(!darkMode);
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header changeTheme={changeTheme} />
            <Container>
                <Routes>
                    <Route path='/' Component={HomePage} />
                    <Route path='/catalog' Component={() => (
                        <Catalog
                            color={navbarColor}
                        />
                    )} />
                    <Route path='/catalog/:id' Component={ProductDetails} />
                    <Route path='/about' Component={AboutPage} />
                    <Route path='/contact' Component={ContactPage} />

                </Routes>
                

            </Container>
      </ThemeProvider>
          
         
      
  );
}

export default App;
