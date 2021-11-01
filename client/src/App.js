import { Switch, BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import List from "./pages/List";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={AddUser} />
          <Route path="/list" component={List} />
          <Route path="/edit/:id" component={EditUser} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
