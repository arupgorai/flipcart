import React from 'react';
import Header from '../Header';

/**
* @author
* @function Layout
**/

const Layout = ({ children }) => {
  return(
    <>
      <Header />
      {children}
    </>
   )

 }

export default Layout