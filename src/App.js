import './App.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from "./redux/store/configureStore";
import Home from './pages/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import BuyBasketPage from './pages/buyBasket/BuyBasketPage';
import Footer from './components/footer/Footer';

function App() {
  const { store, persistor } = configureStore();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header/>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path='/order/checkout' Component={BuyBasketPage} />
          </Routes>
        </BrowserRouter>
        <Footer/>
      </PersistGate>
    </Provider>
  );
}

export default App;
