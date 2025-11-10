import React from 'react';
import Footer from './Footer';

import { Outlet } from 'react-router';
import Header from './Navbar';
import Navbar from './Navbar';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;