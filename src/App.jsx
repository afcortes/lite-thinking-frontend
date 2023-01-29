import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import NotFound from './components/NotFound';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/'
            element= {
              <h1>root path</h1>
            }
          ></Route>
          <Route
            path='/admin'
            element= {
              <h1>admin</h1>
            }
          ></Route>
          <Route
            path='/login'
            element= {
              <h1>login</h1>
            }
          ></Route>
          <Route 
            path='/register'
            element= {
              <h1>register</h1>
            }
          ></Route>
          <Route
            path='/create-company'
            element= {
              <h1>Create company</h1>
            }
          ></Route>
          <Route
            path='/edit-company/:companyId'
            element= {
              <h1>Edit company</h1>
            }
          ></Route>
          <Route
            path='/inventory'
            element= {
              <h1>Inventory list</h1>
            }
          ></Route>
          <Route
            path='/inventory/:inventoryId'
            element= {
              <h1>Inventory speciffic</h1>
            }
          ></Route>
          <Route
            path='/inventory/:inventoryId/product'
            element= {
              <h1>Product from an speciffic inventory</h1>
            }
          ></Route>
          <Route
            path='/inventory/:inventoryId/product/:productId'
            element= {
              <h1>speciffic product from an speciffic inventory</h1>
            }
          ></Route>
          <Route path='/not-found' element={<NotFound />} />
          <Route path='/*' element={<Navigate to='/not-found'/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
