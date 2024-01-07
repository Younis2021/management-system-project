import React from 'react';
import './Welcome.css';

export default function WelcomePage() {

    function Start() {
        window.location.pathname = '/show_products'
    }

  return (
    <div className="welcome-page">
      <div className="welcome-content">
        <h1>مرحبًا بك في نظام الإدارة لدينا</h1>
        <p>تحكم في عملك بواسطة أدوات الإدارة القوية التي نقدمها .</p>
        <button className="get-started-button" onClick={Start}>ابدأ الآن</button>
      </div>
    </div>
  );
}
