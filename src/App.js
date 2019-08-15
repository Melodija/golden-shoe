import React from "react";
import PrototypeHeader from "./components/PrototypeHeader";
import PrototypeFooter from "./components/PrototypeFooter";
import PrototypeHome from "./components/PrototypeHome";
import PrototypeProduct from "./components/PrototypeProduct";
import PrototypeBasket from "./components/PrototypeBasket";
import PrototypeStockManagement from "./components/PrototypeStockManagement";

import { BrowserRouter as HashRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <PrototypeHeader />

      <Switch>
        <Route exact path="/" component={PrototypeHome} />
        <Route exact path="/product/:id" component={PrototypeProduct} />
        <Route exact path="/basket" component={PrototypeBasket} />
        <Route exact path="/admin/stock" component={PrototypeStockManagement} />
      </Switch>

      <PrototypeFooter />
    </HashRouter>
  );
}

export default App;
