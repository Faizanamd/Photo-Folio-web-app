import logo from '../../images/logo.png'
import styles from  './navbar.module.css';
function Navbar() {
    return (
        <nav>
            <img src={logo} alt="logo"  />
            <span>FZN PhotoFolio</span>
        </nav>
    )
}

export default Navbar;