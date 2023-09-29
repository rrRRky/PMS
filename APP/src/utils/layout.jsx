import React from 'react';
import Navigation from '../routes/navigation/navigation.component';
import Sidebar from '../component/sidebar/sidebar.component';
const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Navigation />
        <div style={{ flex: 1, display: 'flex' }}>
            <Sidebar />
            {children}
        </div>
    </div>
  );
};

export default Layout;
