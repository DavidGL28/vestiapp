import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import {Shop} from './Pages/shop';
import {ShopCategory} from './Pages/ShopCategory'; 
import {Product} from './Pages/Product'; 
import {Cart} from './Pages/Cart'; 
import {LoginSignup} from './Pages/LoginSignup';
import {Auten} from './Pages/Autenticacion'; 
import { Footer } from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/hombres' element={<ShopCategory banner={men_banner} category='hombres'/>}/>
        <Route path='/mujeres' element={<ShopCategory banner={women_banner} category='mujeres'/>}/>
        <Route path='/niños' element={<ShopCategory banner={kid_banner} category='niños'/>}/>
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/carro' element={<Cart/>}/>
        <Route path='/inicioSesion' element={<LoginSignup/>}/>
        <Route path='/autenticacion' element={<Auten/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter> 
    </div>
  );
}

export default App;
