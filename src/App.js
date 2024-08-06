import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import About from "./components/About";
import Profile from "./components/Profile";

function App() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/about" component={About} />
      <ProtectedRoute exact path="/profile" component={Profile} />
    </Switch>
  );
}

export default App;
