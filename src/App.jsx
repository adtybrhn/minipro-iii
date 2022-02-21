import AuthPages from './pages/auth';
import Dashboard from './pages/dashboard';
import Catalog from './pages/catalog';
import CatalogByID from './pages/catalog/byId';
import PermissionPages from './pages/auth/denied';
import Navbar from './component/navbar';
import {Routes, Route, useLocation, Navigate, BrowserRouter, Outlet} from 'react-router-dom';


function NotFound() {
  return (
    <div className="permission-page">
      <p>
        <h1>ERROR 404 </h1>
        <hr/>
        <h3> PAGES NOT FOUND </h3>
        <br />
        <h5>return to <a href='/'> HomePage </a> ?</h5>
      </p>
    </div>
  );
}

function RequireAuth() {
  let auth = sessionStorage.getItem('logged');
  let location = useLocation();

  if (!auth) {
    // cek auth logged ada atau tidak
    // jika tidak ada maka arahkan ke login pages 
    // endpoint login ===>  'baseURL/'
    return <Navigate to="/denied" state={{ from: location }} />;
  }

  //Renders child route's element, jika ada.
  return <Outlet />;
}

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
        <Routes>

          {/* PUBLIC ROUTES
          Pages yang bisa di akses oleh siapa pun pengunjung website
          */}
          <Route>
            <Route path="/" element={<AuthPages />} />
            <Route path="/denied" element={<PermissionPages />} />
            <Route index path="/catalog" element={<Catalog/>} />
            <Route path="/products/:id" element={<CatalogByID/>}/>
                
            
            
             
            


            {/* PRIVATE ROUTES
          Pages yang hanya bisa di akses oleh user yang terotentikasi
          */}
            <Route element={<RequireAuth />}>
              <Route index path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>

           {/* NOT FOUND PAGE
           end point yang tak terdapaftar akan dialihkan ke page not found
          */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}




export default App;



