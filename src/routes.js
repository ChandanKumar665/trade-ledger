import Dashboard from './components/dashboard/Dashboard'
import Trades from "./components/trades/Trades"
import Accounts from "./components/accounts/Accounts"
import AddTrade from "./components/trades/AddTrade"
import Login from "./components/login/Login"

export const routes = [{
    name: 'Login',
    path: '/login',
    component: <Login />
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
},
{
    name: 'Trades',
    path: '/trades/add',
    component: <AddTrade />
},
{
    name: 'Accounts',
    path: '/accounts',
    component: <Accounts />
}





]
