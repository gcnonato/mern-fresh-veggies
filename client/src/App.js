import React from 'react';
import { Route, Switch } from 'react-router-dom';
//import { useSelector, useDispatch } from 'react-redux';

import Landing from 'pages/landing/landing.page';
import Authentication from 'pages/authentication/authentication.page';
import Shop from 'pages/shop/shop.page';
import FarmerAdmin from 'pages/farmer/farmer-admin.page';

const App = () => {
  const farmerIsLogged = true;
  const farmerUser = {};

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/shop" component={Shop} />

        {/* <farmerAdmin/> is displayed once farmer is logged */}
        <Route
          exact
          path="/farmer/admin"
          render={() =>
            farmerIsLogged ? (
              <FarmerAdmin user={farmerUser} />
            ) : (
              <Authentication />
            )
          }
        />
      </Switch>
    </div>
  );
};

export default App;
