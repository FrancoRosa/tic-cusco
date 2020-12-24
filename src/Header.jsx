import './css/Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalMallIcon from '@material-ui/icons/LocalMall';

const Header = () => {
	return(
		<div className="header">
			<h2 className="header_title">
        <LocalMallIcon className="header_title_icon"/>
        TIC CUSCO
      </h2>
      <div className="header_search">
        <input className="header_search_input"/>
        <SearchIcon className="header_search_icon" />
      </div>
      <div className="header_nav">
        <div className="header_option">
          <span className="header_line_one">
            Hello
          </span>
          <span className="header_line_two">
            Sign in
          </span>
        </div>
        <div className="header_option">
          <span className="header_line_one">
            Retunrs
          </span>
          <span className="header_line_two">
            & Orders
          </span>
        </div>
        <div className="header_option">
          <span className="header_line_one">
            Your
          </span>
          <span className="header_line_two">
            Prime
          </span>
        </div>
        <div className="header_option_basket">
          <ShoppingCartIcon/>
          <span className="header_line_two header_count">0</span>
        </div>
      </div>
		</div>
	);
};

export default Header;