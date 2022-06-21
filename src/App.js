import React from 'react';

import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import { Navbar, Exchanges, Homepage, Cryptocurrencies, News, CryptoDetails } from './components';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar/>
      </div>
      <div className="main">  
        <Layout>
          <div className="routes">
            <Routes>
              <Route excact path="/" element={<Homepage/>}/>
              <Route excact path="/exchanges" element={<Exchanges/>}/>
              <Route excact path="/cryptocurrencies" element={<Cryptocurrencies/>}/>
              <Route excact path="/crypto/:coinId" element={<CryptoDetails/>}/>
              <Route excact path="/news" element={<News/>}/>
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title  level={5} style={{ color:'white', textAlign: 'center' }}>
            Cryptoverse <br/>
            All rights reserverd
          </Typography.Title>
          <Space derection="virtical" size="middle" style={{display: 'flex'}}>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
