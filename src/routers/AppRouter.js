import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import LoginPage from '../components/LoginPage'
import DashboardPage from './../components/DashboardPage'
import NotFoundPage from './../components/NotFoundPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

// Created to have access to the browsers history API anywhere
// Previously used BrowserRouter which had history built in but only for components
export const history = createHistory()

const AppRouter = () => (
    <Router history={history}>
        <div>           
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/dashboard" component={DashboardPage}/>
                <Route component={NotFoundPage}/>
            </Switch>   
        </div>             
    </Router>
)

export default AppRouter