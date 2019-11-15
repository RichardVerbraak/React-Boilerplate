import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter'
import configureStore from './store/configure-store'
import { login, logout } from './actions/auth'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css'
import { firebase } from './firebase/firebase'
import LoadingPage from './components/LoadingPage'

const store = configureStore()

// Provide the store for all of the components inside of AppRouter
const jsx = (
    <Provider store={store}>
        <AppRouter></AppRouter>
    </Provider>
)

ReactDOM.render(<LoadingPage/> , document.getElementById('app'))

// Refactor to one render instead of having 2 lines of ReactDOM.render
let hasRendered = false
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx , document.getElementById('app'))
        hasRendered = true
    }
}

// Watches if the login state changes, also on your first visit
// If user is logged in -> fetch their expenses -> render the page -> if on login page -- push them to the dashboard page (so we don't get redirected when logged in and refreshing page)
// If not logged in or when logging out -> render the app -- start over on the login page
firebase.auth().onAuthStateChanged((user) => {
 if (user) {
    store.dispatch(login(user.uid))
    renderApp()
    if (history.location.pathname === '/') {
        history.push('/dashboard')
    }
 } else {
    store.dispatch(logout())
    renderApp()
    history.push('/')
 }
})

