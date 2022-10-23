import React from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import TreeList from './components/TreeList';
import Subheader from './components/Subheader';
import './styles.scss';

const Dashboard = () => {
  return (
    <div className="main-container">
      <Header />
      <Subheader />
      <div className="main-body">
        <Categories />
        <TreeList />
      </div>
    </div>
  );
};

export default Dashboard;
