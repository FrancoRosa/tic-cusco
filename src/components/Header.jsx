import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../css/Header.css';

const Header = ({ basket, user }) => {
	return(
		<div className="header">
			<Link to='/'>
        <h2 className="header__title">
          <LocalMallIcon className="header__titleIcon"/>
          TIC CUSCO
        </h2>
      </Link>
      <div className="header__search">
        <input className="header__searchInput"/>
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link to="/login">
          <div className="header__option">
            <span className="header__lineOne">
              Hola! {user.email}
            </span>
              <span className="header__lineTwo">
                Ingresa
              </span>
          </div>
        </Link>
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
        <Link to='/checkout'>
          <div className="header__optionBasket">
            <ShoppingCartIcon fontSize="inherit" />
            <span className="header__lineTwo header__count">{basket.reduce((sum, item)=> sum + item.count ,0)}</span>
          </div>
        </Link>
      </div>
		</div>
	);
};

const mapStateToProps = state => ({
  basket: state.basket,
});

export default connect(mapStateToProps)(Header);