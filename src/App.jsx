import "styles/Styles.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Index from "pages/Index";
import PublicLayout from "layouts/PublicLayout";
import PrivateLayout from "layouts/PrivateLayout";
import PrivateRoute from "components/PrivateRoute";
import Ventas from "pages/Admin/Ventas";
import Usuarios from "pages/Admin/Usuarios";
import Mercancia from "pages/Admin/Mercancia";
import { Auth0Provider } from "@auth0/auth0-react";
import { userContext } from "context/userContext";
import { searchContext } from "context/searchContext";
import { useState } from "react";

//window.location.origin
function App() {
  const [userData, setUserData] = useState({})
  const [search, setSearch] = useState("")
  return (
    <Auth0Provider 
    domain="cervezas-proyecto.us.auth0.com"
    clientId="fXXYABSLe5DP278TGnkld6W6A1OyQgQs"
    redirectUri='http://localhost:3000/admin/ventas'
    audience='https://api-cerverceria-autenticacion/' >
      <div>
        <userContext.Provider value = {{userData, setUserData}}>
          <searchContext.Provider value = {{search, setSearch}} >
            <Router>
              <Switch>

                <Route path= {["/admin/ventas", "/admin/usuarios", "/admin/mercancia" , "/admin/prueba"]}>
                  <PrivateLayout>

                      <Switch>
                        <Route path = "/admin/ventas">
                        <PrivateRoute roleList={["Admin", "Vendedor"]} >
                          <Ventas/>
                        </PrivateRoute>
                        </Route>

                        <Route path ="/admin/usuarios">
                          <PrivateRoute roleList="Admin" >
                            <Usuarios/>
                          </PrivateRoute>
                        </Route>

                        <Route path ="/admin/mercancia">
                          <PrivateRoute roleList={["Admin", "Vendedor"]} >
                            <Mercancia/>
                          </PrivateRoute>
                        </Route>

                      </Switch>
                      
                  </PrivateLayout>
                </Route>

                <Route path= {["/"]}>
                  <PublicLayout>
                    <Route path="/">
                      <Index/>
                    </Route>
                  </PublicLayout>
                </Route>
                
              </Switch>
            </Router>
            </searchContext.Provider>
        </userContext.Provider>
      </div>
    </Auth0Provider>
  );
}

export default App;
