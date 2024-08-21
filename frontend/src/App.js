import "./App.css";
import { Login } from "./pages/login/Login";
import { SignUp } from "./pages/signup/SignUp";
import { Map } from "./pages/map/Map";
import { Route, Routes } from "react-router-dom";
import { APP_ROUTES } from "./utils";
import { ProtectedRoute } from "./components/protectedRoute/ProtectedRoute";
import { addAuthInterceptor } from "./interceptor";

addAuthInterceptor();

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={APP_ROUTES.LOGIN} element={<Login />} />
        <Route path={APP_ROUTES.SIGNUP} element={<SignUp />} />
        <Route path={"/"} element={<ProtectedRoute />}>
          <Route path={APP_ROUTES.MAP} element={<Map />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
