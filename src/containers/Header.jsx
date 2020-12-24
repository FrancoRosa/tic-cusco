import '../css/Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalMallIcon from '@material-ui/icons/LocalMall';

const Header = () => {
	return(
		<div className="header">
			<h2 className="header__title">
        <LocalMallIcon className="header__titleIcon"/>
        TIC CUSCO
      </h2>
      <div className="header__search">
        <input className="header__searchInput"/>
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <div className="header__option">
          <span className="header__lineOne">
            Hola!
          </span>
          <span className="header__lineTwo">
            Ingresa
          </span>
        </div>
        <div className="header__option">
          <span className="header__lineOne">
            Comentarios
          </span>
          <span className="header__lineTwo">
            & Ordenes
          </span>
        </div>
        <div className="header__option">
          <span className="header__lineOne">
            Tus
          </span>
          <span className="header__lineTwo">
            Servicios
          </span>
        </div>
        <div className="header__optionBasket">
          <ShoppingCartIcon fontSize="inherit" />
          <span className="header__lineTwo header__count">0</span>
        </div>
      </div>
		</div>
	);
};

export default Header;