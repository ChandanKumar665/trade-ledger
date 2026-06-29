
import logo from '../../asset/logo.png'
import { useAuth } from '../../hooks/useAuth'

export default function Navbar(props) {
    const { user } = useAuth();
    const userNav = [{ name: 'Dashboard', key: 'dbh', path: '/dashboard' },
    { name: 'Trade History', key: 'th', path: '/trades' },
    { name: 'Accounts', key: 'acc', path: '/accounts' }];
    const defaultNav = [{ name: 'Login', path: '/' }, { name: 'Pricing', path: '/pricing' }, { name: 'About', path: '/about' }];
    const cls = `av-item nav-link`;
    const finalNav = user ? userNav : defaultNav;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="#">
                <img src={logo} height={50} width={50} />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    {
                        finalNav.map((item, i) => {
                            const isActive = item.key === props.active_id
                            return <a key={i} className={`av-item nav-link ${!isActive ? 'active' : ''}`} href={item.path}>{item.name}</a>
                        })
                    }
                </div>
            </div>
            <span className="navbar-text" className="glyphicon glyphicon-user" />

        </nav>)
}