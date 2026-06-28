import React from 'react';
import BottomNav from './BottomNav'; // તમારા BottomNav નો પાથ સાચો રાખજો

function Layout({ children }) {
  return (
    <div style={{ minHeight: "100vh", position: "relative", paddingBottom: "80px" }}>
      {/* અહીં Header પણ મૂકી શકાય જો તમારે બધી જગ્યાએ જોઈએ તો */}
      <main>
        {children}
      </main>
      <BottomNav />
    </div>
  );
}

export default Layout;