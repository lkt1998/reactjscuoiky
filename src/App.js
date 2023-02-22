import Header from 'components/Header';
import ProductFeature from 'features/Products';
import ListPage from 'features/Products/pages/ListPage';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/products" element={<ListPage />} />
      </Routes>
    </div>
  );
}

export default App;
