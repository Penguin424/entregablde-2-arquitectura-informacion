import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import FormIngHome from '../pages/FormIngHome';
import InicioMes from '../pages/InicioMes';
import ReportMonth from '../pages/ReportMonth';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/inicio" component={HomePage} />
        <Route path="/regIng" component={FormIngHome} />
        <Route path="/incioMes" component={InicioMes} />
        <Route path="/reportesMes" component={ReportMonth} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
