import ErrorPage from './components/404'
import Privacy from './components/Privacy'
import Accounts from "./components/accounts/Accounts"
import Dashboard from './components/dashboard/Dashboard'
import Home from "./components/home/Home"
import Login from "./components/login/Login"
import Register from './components/login/Register'
import Profile from './components/profile/Profile'
import Reports from './components/reports/Reports'
import Trades from "./components/trades/Trades"

export const routes = [
    {
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
        name: 'Accounts',
        path: '/accounts',
        component: <Accounts />
    }
]

export const publicRoutes = [
    {
        name: 'Home',
        key: 'hm',
        path: '/',
        component: <Home />
    },
    {
        name: 'Login',
        key: 'log',
        path: '/login',
        component: <Login />
    },
    {
        name: 'Register',
        key: 'reg',
        path: '/signup',
        component: <Register />
    },
    {
        name: 'Privacy',
        key: 'prv',
        path: '/privacy',
        component: <Privacy />
    }
]
export const protectedRoutes = [
    {
        name: 'Dashboard',
        key: 'dbh',
        path: '/dashboard',
        icon: 'bi-grid',
        component: <Dashboard />
    },
    {
        name: 'Trades',
        key: 'th',
        path: '/trades',
        icon: 'bi-bar-chart',
        component: <Trades />
    },
    {
        name: 'Accounts',
        key: 'acc',
        path: '/accounts',
        icon: 'bi-wallet2',
        component: <Accounts />
    },
    {
        name: 'Analytics',
        key: 'aly',
        path: '/analytics',
        icon: 'bi-pie-chart',
        component: <Accounts />
    },
    {
        name: 'Reports',
        key: 'rep',
        path: '/reports',
        icon: 'bi-file-earmark-text',
        component: <Reports />
    },
    {
        name: 'Profile',
        key: 'prf',
        path: '/profile',
        icon: 'bi-person',
        component: <Profile />
    },
    {
        name: 'Settings',
        key: 'sett',
        path: '/settings',
        icon: 'bi-gear',
        component: <ErrorPage />
    }
]
export const common = [
    {
        name: 'Error',
        path: '/error',
        component: <ErrorPage />
    }
]
