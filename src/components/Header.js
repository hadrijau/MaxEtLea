import React, {Suspense, useState} from 'react';
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import "./Header.css";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from 'react-i18next';
import {AppProvider} from "../context/AppContext";
import {AppContext} from "../context/AppContext";
import {useContext} from 'react';
import {Link} from "react-router-dom";
import drapeau_francais from '../assets/drapeau-francais.png';
import shopping_cart from '../assets/shopping-cart.png';
import i18next from "i18next";
import CardHover from "./CardHover";
import home from '../assets/home.png';

const Header = () => {

  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);

  const lang = i18next.language;
  const [cart, setCart] = useContext(AppContext);
  let totalPrice1 = 0;
  if (cart) {
    for (let data in cart.products) {
      totalPrice1 += parseFloat(cart.products[data].totalPrice)
    }
  }
  let user = '';

  if (localStorage.getItem('userName')) {
    user = localStorage.getItem('userName');
  }

  const productCount = (null !== cart && Object.keys(cart).length) ? cart.totalProductCount : '';
  const totalPrice = (null !== cart && Object.keys(cart).length) ? cart.totalProductsPrice: '';


  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [imgurl, setImgUrl] = useState("https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/fr.png")

  console.log(open)
  const handleClose = (lang, url) => {
    i18n.changeLanguage(lang).then(() => setAnchorEl(null)).then(() => setImgUrl(url));
  };

  const renderCart = () => {

    return <CardHover />

  }

  return (
    <div>
      <div style={{backgroundColor: '#e72c59', textAlign: 'center', height: '70px'}}>
        <h1 className="free-livraison">Livraison GRATUITE en Europe (3-5 jours) à partir de 30€ d'achat</h1>
      </div>

        <nav>
          <div className="drapeau-container">
            <p className="langue">{lang}</p>
            <img src={imgurl} alt="drapeau français" className="drapeau-img" onClick={handleClick}/>
          </div>
          <Nav className="ml-auto nav-bar">
            <div className="img-container"><img src="https://maxandlea.com/wp-content/uploads/2020/05/Logo-Max-et-Lea_Plan-de-travail-1-1536x567.png" alt="" className="img-navbar"/></div>
            <LinkContainer to="/" style={{marginTop: '5%'}}>
              <Nav.Link><img src={home} alt="" style={{width: "80%"}} className="home"/></Nav.Link>
            </LinkContainer>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleClose('en', 'https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/en.png')}><img src="https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/en.png" alt=""/></MenuItem>
              <MenuItem onClick={() => handleClose('es', 'https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/es.png')}><img src="https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/es.png" alt=""/></MenuItem>
              <MenuItem onClick={() => handleClose('al', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/langfr-225px-Flag_of_Germany.svg.png')}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/langfr-225px-Flag_of_Germany.svg.png" className="drapeau-allemand" alt=""/></MenuItem>
              <MenuItem onClick={() => handleClose('fr', 'https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/fr.png')}><img src="https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/fr.png" alt=""/></MenuItem>

            </Menu>
            <div className="account-shopping">
              <LinkContainer to="/cart">
                <Nav.Link>

                  <div className="cart-wrap">
                    {productCount && (<div className="products-count-container">
                      <div className='product-count-inner-container'>{productCount ? <span className="product-count-text">{productCount}</span> : ''}</div>
                    </div>)}
                    <img src={shopping_cart} alt="shopping cart" onMouseOver={() => setOpen(!open)}/>
                    {totalPrice1 ? <span className="total-price-span">€{totalPrice1.toFixed(2)}</span> : ''}
                  </div>
                </Nav.Link>

              </LinkContainer>
            </div>
          </Nav>
        </nav>
      {open && renderCart()}
    </div>
  )
}

export default Header;
