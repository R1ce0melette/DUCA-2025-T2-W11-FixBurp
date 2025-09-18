import React from 'react';
// ...existing code...
// Import your existing components
import AppHeader from './Header';
import Banner from './Banner';
import Articles from './Articles';
import Tutorials from './Tutorials';
import Email from './Email';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="app-container">
      <AppHeader />
      <Banner />
      <div style={{ background: '#fffbe6', border: '1px solid #ffe58f', padding: '10px', borderRadius: '6px', margin: '16px 0', color: '#ad8b00', textAlign: 'center' }}>
        <strong>Hint:</strong> There is a hidden page in this app.<br />
        Use a tool like <b>ffuf</b> to discover hidden endpoints.<br />
        Once you find correct endpoints, you will need the right credentials and role to access it.<br />
        Try intercepting and brute-forcing the login process!
      </div>
      <Articles />
      <Tutorials />
      <Email />
      <Footer />
    </div>
  );
};

export default Home;