import { Route, Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import About from "./components/About";
import Menu from "./components/Menu";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import { CartProvider } from "./components/CartContext";
import Cart from "./components/Cart";
import OrderHistory from "./components/OrderHistory";

function App() {
  return (
    <CartProvider>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/about" component={About} />
        <ProtectedRoute exact path="/menu" component={Menu} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <ProtectedRoute exact path="/order-history" component={OrderHistory} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    </CartProvider>
  );
}

export default App;
