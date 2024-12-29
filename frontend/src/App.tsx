import { Route, Routes } from 'react-router-dom';
import { useReducer } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { CreateProduct } from './pages/CreateProduct';
import { ProductsProvider } from './contexts/productsContext';
import { initialState, productReducer } from './reducers/productReducer';

function App() {
  // Use the useReducer hook with the productReducer
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    // Pass the state and dispatch to the ProductsProvider
    <ProductsProvider value={{ state, dispatch }}>
      <main className={'min-h-full'}>
        <Navbar />
        <section className={'py-20 px-4'}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateProduct />} />
          </Routes>
        </section>
      </main>
    </ProductsProvider>
  );
}

export default App;
