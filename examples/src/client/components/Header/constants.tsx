import React from 'react';
import { Colors } from '@graffft-waggle/themes-portfolio';
import { Link } from 'react-router-dom';

const navItemColors = {
  navItemColor: Colors.Primary,
  navItemHoverColor: '#006EDD',
  navItemBgHoverColor: 'rgba(32,33,36,0.04)',
};

const sideNavItemColors = {
  ...navItemColors,
  navItemColor: Colors.TextLead,
  navItemHoverColor: Colors.TextCopy,
  navItemBgHoverColor: 'rgba(32,33,36,0.04)',
};

const getLink = (link: string) => (link === 'home' ? '/' : `/${link}`);

const baseItems = ['home', 'users', 'broadcasters'].map((link) => ({
  key: link,
  navItem: (
    <Link style={{ textDecoration: 'none' }} to={getLink(link)}>
      {link}
    </Link>
  ),
}));

export const headerNavItems = baseItems.map((item) => ({
  ...item,
  ...navItemColors,
}));

export const sideNavItems = baseItems.map((item) => ({
  ...item,
  ...sideNavItemColors,
}));

export const headerLogo = (
  <Link style={{ textDecoration: 'none' }} to="/">
    <img
      src="https://cdn.shopify.com/s/files/1/0311/6102/4645/products/huskypup_1024x1024@2x.jpg?v=1597879186"
      alt="woof"
      style={{ height: '80%' }}
    />
  </Link>
);
