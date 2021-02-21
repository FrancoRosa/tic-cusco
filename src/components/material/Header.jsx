import { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { Button, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { setFilter } from '../../actions';
import { useHistory } from 'react-router-dom';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import Link from '@material-ui/core/Link';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import RoomIcon from '@material-ui/icons/Room';
import MessageIcon from '@material-ui/icons/Message';
import './css/Header.css';



const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    flexGrow: 1,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    flexGrow: 1,
    borderRadius: "5px",
    border: "solid 1px lightgray",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Header = ({ basket, user, setFilter, products }) => {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [input, setInput] = useState('');

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsNoneOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const getOptions = products => {
    const options = [];
    products.forEach(product => {
      if (!options.includes(product.brand)) options.push(product.brand)
      product.categories.forEach(category => {
        if (!options.includes(category)) options.push(category)
      })
    })
    return options;
  }

  return (
    <header className={classes.grow}>
      <div className="header_float__flogo bounce1">
        <a href="http://m.me/TecnoligiadeInteligenciaColectiva" target="_blank">
          <img src="/img/flogo.png"/>
        </a>
      </div>
      <div className="header_float__wlogo bounce">
        <a href="http://wa.link/1fjg4y" target="_blank">
          <img src="/img/wlogo.png"/>
        </a>
      </div>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <img alt="logo" src="/img/logo.png"
            onClick={()=>history.push('/')}
            style={{
              display: "block",
              maxHeight: "3rem",
              width: "auto",
              height: "auto",
              cursor: "pointer",
            }}
          />
          <div className="header__contact_info">
            <Link href="http://wa.link/1fjg4y" target="_blank">
              <WhatsAppIcon className="header__icon" color="disabled"/>
            </Link>
            <Typography className="header__contact_text">984 464086</Typography>
            <Link href="https://g.page/centro-comercial-el-carmen?share" target="_blank">
              <RoomIcon className="header__icon" color="disabled"/>
            </Link>
            <Typography className="header__contact_text">Centro Comercial El Carmen Of. 101-102 y 218</Typography>
          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <TextInput 
              options={getOptions(products)}
              className="header__input"
              trigger=""
              spacer=""
              onChange={text => setFilter(text)}
              Component="input"
              placeHolder="Buscar por producto o marca..."
            />
          </div>
          
          <Button style={{textTransform: 'none'}} color="inherit">Ingresa</Button>
          
          <IconButton color="inherit" onClick={()=>history.push('/checkout')}>
            <Badge 
              badgeContent={basket.reduce((sum, item)=> sum + item.count ,0)} 
              color="secondary"
            >
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
          <div className={classes.sectionDesktop}>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </header>
  );
}

const mapDispatchToProps = dispatch => ({
  setFilter: filter => dispatch(setFilter(filter)),
});

const mapStateToProps = state => ({
  basket: state.basket,
  products: state.products,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);