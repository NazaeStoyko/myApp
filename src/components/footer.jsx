import React from "react";
import "./footer.css";


const Footer = () => {
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <h3>Company<span>logo</span></h3>
        <p className="footer-links">
          <a href="#" className="link-1">Home</a>
          <a href="#">Pricing</a>
          <a href="#">About</a>
        </p>
        <p className="footer-company-name">Company Name © 2023</p>
      </div>

      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p><span>Address</span> Lorem ipsum dolor sit</p>
        </div>
        <div>
          <i className="fa fa-phone"></i>
          <p>+38098969495</p>
        </div>
        <div>
          <i className="fa fa-envelope"></i>
          <p><a href="mailto:support@company.com">support@company.com</a></p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>About the company</span>
          Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
        </p>
        <div className="footer-icons">
          <a href="#">Icon</a>
          <a href="#">Icon</a>
          <a href="https://github.com/NazaeStoyko/myApp">Icon</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
