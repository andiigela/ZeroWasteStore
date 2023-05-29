import { ThemeProvider } from "@emotion/react";
import { Container, createTheme, CssBaseline } from "@mui/material";
import {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BasketPage from "../../features/basket/BasketPage";
import {useStoreContext} from "../context/StoreContext";
import {getCookie} from "../util/util";
import agent from "../api/agent";
import CheckoutPage from "../../features/checkout/CheckoutPage";


function App() {
    const { setBasket } = useStoreContext();
    const[loading,setLoading]=useState(true);
    
    useEffect(()=>{
        const buyerId = getCookie('buyerId');
        if (buyerId) {
            agent.Basket.get()
                .then(basket => setBasket(basket))
                .catch(error => console.log(error))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    },[setBasket])
    
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
    if(loading) return <h1>Initialising app ...</h1>
    
    return (
        <ThemeProvider theme={theme}>

            <ToastContainer position="bottom-right" hideProgressBar />
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
                    <Route path='/basket' Component={BasketPage}></Route>
                    <Route path='/checkout' Component={CheckoutPage}></Route>
                    

                </Routes>
            </Container>
        </ThemeProvider>



    );
}

export default App;