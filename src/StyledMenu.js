import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import styled from 'styled-components';

import Colors from './colors.js';

// Workaround for styling with Styled-components, by wrapping menu in a div
const WrappedMenu = ({className, children}) => (
  <div className={className}>
    <Menu children={children} />
  </div>
);

const StyledMenu = styled(WrappedMenu)`
/* Position and sizing of burger button */
.bm-burger-button {
  position: fixed;
  width: 36px;
  height: 30px;
  left: 36px;
  top: 36px;
}

/* Color/shape of burger icon bars */
.bm-burger-bars {
  background: ${Colors.hamburgerButtonLines};
}

/* Position and sizing of clickable cross button */
.bm-cross-button {
  height: 30px;
  width: 24px;
}

/* Color/shape of close button cross */
.bm-cross {
  background: #bdc3c7;
}

/* General sidebar styles */
.bm-menu {
  background: ${Colors.menuBackground};
  padding: 2.5em 1.5em 0;
  font-size: 1.15em;
}

/* Morph shape necessary with bubble or elastic */
.bm-morph-shape {
  fill: #373a47;
}

/* Wrapper for item list */
.bm-item-list {
  color: #b8b7ad;
  padding: 0.8em;
}

/* Styling of overlay */
.bm-overlay {
  background: rgba(100, 0, 0, 0.3);
  border: solid 3px black;
}

.menu-item {
  text-decoration: none;
  color: white;
  font-weight: bold;
}

`;

export default StyledMenu;
