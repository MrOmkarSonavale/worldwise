import { Link } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";

function PageNav() {
	return (
		<nav className={styles.nav}>

			<nav className={styles.logo}>
				<Logo />
			</nav>

			<ul>
				<li>
					<Link to="/pricing">Pricing</Link>
				</li>
				<li>
					<Link to="/product">Product</Link>

				</li>
				<li>
					<Link to="/login" className={styles.ctaLink}>login</Link>

				</li>
			</ul>
		</nav>
	)
}

export default PageNav;
