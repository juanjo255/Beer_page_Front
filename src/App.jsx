import "styles/Styles.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from "pages/Login";
import Index from "pages/Index";
import PublicLayout from "layouts/PublicLayout";
import PrivateLayout from "layouts/PrivateLayout";
import AuthLayout from "layouts/AuthLayout";
import Cervezas from "pages/Admin/Cervezas";
import AdminMain from "pages/Admin/AdminMain";
import Empleados from "pages/Admin/Empleados";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  return (
    <Auth0Provider 
      domain="cervezas-proyecto.us.auth0.com"
      clientId="fXXYABSLe5DP278TGnkld6W6A1OyQgQs"
      redirectUri={window.location.origin}>
      <div >
          <Router>
            <Switch>

              <Route path= {["/login"]}>
                <AuthLayout>
                  <Switch>
                    <Route path = "/login">
                      <Login/>
                    </Route>
                  </Switch>
                </AuthLayout>
              </Route>

              <Route path= {["/admin/main","/admin/cervezas", "/admin/empleados"]}>
                <PrivateLayout>
                    <Switch>
                      <Route path = "/admin/cervezas">
                        <Cervezas/>
                      </Route>
                      <Route path ="/admin/main">
                        <AdminMain/>
                      </Route>
                      <Route path ="/admin/empleados">
                        <Empleados/>
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
      </div>
    </Auth0Provider>
  );
}

export default App;
