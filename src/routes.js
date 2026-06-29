import Home from "./components/home"
import Dashboard from './components/dashboard'
import Trades from "./components/trades"
import Accounts from "./components/accounts"

export const routes = [{
    name: 'Home',
    path: '/',
    component: <Home />
},
{
    name: 'Dashboard',
    path: '/dashboard',
    component: <Dashboard />
},
{
    name: 'Trades',
    path: '/trades',
    component: <Trades />
}, {
    name: 'Accounts',
    path: '/accounts',
    component: <Accounts />
}





]
