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
import Register from './pages/Register';
import CompanyList from './pages/CompanyList';
import CreateCompany from './pages/CreateCompany';
import EditCompany from './pages/EditCompany';
import ProductList from './pages/ProductList';

function App() {
  return (
    <>
      <div className='main-container'>
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
              path='/company-list'
              element= {
                <CompanyList/>
              }
            ></Route>
            <Route
              path='/create-company'
              element= {
                <TokenGuard children={
                  <CreateCompany/>
                }/>
              }
            ></Route>
            <Route
                path='/edit-company/:company_NIT'
                element= {
                  <TokenGuard children={
                    <EditCompany/>
                  } />
                }
            ></Route>
            <Route
                path='/company/:company_NIT/inventory'
                element= {
                  <TokenGuard children={
                    <ProductList/>
                  } />
                }
            ></Route>
            <Route path='/not-found' element={<NotFound />} />
            <Route path='/*' element={<Navigate to='/not-found'/>} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
