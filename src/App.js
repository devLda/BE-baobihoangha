import { BrowserRouter as Router} from 'react-router-dom'
import Routes from './routes/Routes';
import ScrollToTop from './components/ScrollToTop'
import { getAllSanPham } from "./stores/sanpham/asyncAction";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSanPham());
  }, [dispatch]);
  return (
    <Router>
        <ScrollToTop />
        
        <Routes />
    </Router>
  );
}

export default App;
