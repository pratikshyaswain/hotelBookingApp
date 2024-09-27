import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} StaySuite. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
