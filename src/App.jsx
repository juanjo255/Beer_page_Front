import "styles/Styles.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from "pages/Login";
import Register from "pages/Register";
import Index from "pages/Index";
import PublicLayout from "layouts/PublicLayout";
import PrivateLayout from "layouts/PrivateLayout";
import AuthLayout from "layouts/AuthLayout";
import Cervezas from "pages/Admin/Cervezas";
import AdminMain from "pages/Admin/AdminMain";

function App() {
  return (
    <div >
        <Router>
          <Switch>

            <Route path= {["/login", "/register"]}>
              <AuthLayout>
                <Switch>
                  <Route path = "/login">
                    <Login/>
                  </Route>
                  <Route path= "/register">
                    <Register/>
                  </Route>
                </Switch>
              </AuthLayout>
            </Route>

            <Route path= {["/admin/main","/admin/cervezas"]}>
              <PrivateLayout>
                <Switch>
                  <Route path = "/admin/cervezas">
                    <Cervezas/>
                  </Route>
                  <Route path ="/admin/main">
                    <AdminMain/>
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
  );
}

export default App;
