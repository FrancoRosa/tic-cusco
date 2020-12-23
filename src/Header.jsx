import './css/Header.css';
import logo from './img/logo.png';
const Header = () => {
	return(
		<div className="header">
			<img
				className="header_logo"
				src={logo}
				alt="logo"
			/>
		<div className="header_search">
			<input className="header_search_input"/>
		</div>
		<div className="header_nav"></div>
		</div>
	);
};

export default Header;