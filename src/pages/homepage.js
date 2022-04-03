import React, { useState, useEffect } from 'react';
import { history } from '../helpers/history';
import { Router, Route, Switch } from 'react-router-dom';
import clima from './clima';
import welcome from './welcome';

function HomePage() {


    return ( 
        <Router history = { history } >
        <Switch >
        <Route path = "/clima"
        component = { clima }/>    
        <Route path = "/welcome"
        component = { welcome }/>        
        </Switch>  
        </Router>
    );
}

export default HomePage;