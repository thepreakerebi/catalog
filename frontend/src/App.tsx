import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar'
import { HomePage } from './pages/HomePage'
import { CreateProduct } from './pages/CreateProduct'

function App() {

  return (
    <main className={'min-h-full'}>
      <Navbar />
      <main className={'py-20 px-4'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateProduct />} />
        </Routes>
      </main>
    </main>
  )
}

export default App
