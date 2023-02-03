import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import NotFound from './components/NotFound';
import './App.css';
import Login from './pages/Login';
import TokenGuard from './components/TokenGuard';
import RoleGuard from './components/RoleGuard';
import constants from './constants/constants';
import Admin from './pages/Admin'
import External from './pages/External';
import Register from './pages/Register';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/'
            element= {
              <Navigate to='login'/>
            }
          ></Route>
          <Route
            path='/login'
            element= {
              <TokenGuard mustBeLogged={false} children={
                <Login/>
              }/>
            }
          ></Route>
          <Route 
            path='/register'
            element= {
              <TokenGuard mustBeLogged={false} children={
                <Register/>
              }/>
            }
          ></Route>
          <Route
            path='/admin'
            element= {
              <TokenGuard  children={
                <RoleGuard role={constants.roles.ADMIN} redirect={'./../login'} children={
                  <Admin/>
                }/>
              }/>
            }
          ></Route>
          <Route
            path='/external'
            element= {
              <TokenGuard children={
                <RoleGuard role={constants.roles.EXTERNAL} redirect={'./../login'} children={
                  <External/>
                }/>
              }/>
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
