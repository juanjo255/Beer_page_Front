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
import Cervezas from "pages/Admin/Cervezas";
import Usuarios from "pages/Admin/Usuarios";
import Prueba from "pages/Prueba";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserContext } from "context/UserContext";
import { useState } from "react";


function App() {
  const [userData, setUserData] = useState({})
  return (
    <Auth0Provider 
    domain="cervezas-proyecto.us.auth0.com"
    clientId="fXXYABSLe5DP278TGnkld6W6A1OyQgQs"
    redirectUri={window.location.origin}
    audience='https://api-cerverceria-autenticacion/' >
      <div>
        <UserContext.Provider value = {{userData, setUserData}}> 
            <Router>
              <Switch>

                <Route path= {["/admin/cervezas", "/admin/usuarios"]}>
                  <PrivateLayout>
                      <Switch>
                        <Route path = "/admin/cervezas">
                          <Cervezas/>
                        </Route>
                        <Route path ="/admin/usuarios">
                        <PrivateRoute roleList = {["Admin"]} >
                          <Usuarios/>
                        </PrivateRoute>
                        </Route>
                      </Switch>
                  </PrivateLayout>
                </Route>
                <Route path="/prueba">
                      <Prueba/>
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
        </UserContext.Provider>
      </div>
    </Auth0Provider>
  );
}

export default App;
