import React from 'react';
import './Depstar.css';
import depstarImg from '../assets/depstar.jpg';

function Depstar() {
  return (
    <div className="depstar-page">
      <img src={depstarImg} alt="Depstar" className="background-img" />

      <div className="section">
        <h1>Welcome to DEPSTAR</h1>
        <p>
          Devang Patel Institute of Advance Technology and Research (DEPSTAR), a constituent of CHARUSAT, is known for its advanced curriculum, academic excellence, and outstanding faculty. It nurtures students to become competent professionals and responsible citizens.
        </p>
      </div>

      <div className="section">
        <h2>Academic Programs</h2>
        <p>
          DEPSTAR offers UG and PG programs in:
          <ul>
            <li>Computer Engineering (CE)</li>
            <li>Information Technology (IT)</li>
            <li>Computer Science and Engineering (CSE)</li>
          </ul>
        </p>
      </div>

      <div className="section">
        <h2>State-of-the-Art Laboratories</h2>
        <p>
          DEPSTAR is equipped with modern labs:
          <ul>
            <li>Mac Lab with iMacs for iOS and multimedia development</li>
            <li>Cybersecurity Lab for ethical hacking and defense</li>
            <li>Cloud Computing Lab with AWS and Azure integrations</li>
            <li>AI & ML Lab for real-time data science experiments</li>
          </ul>
        </p>
      </div>

      <div className="section">
        <h2>Faculty Excellence</h2>
        <p>
          DEPSTAR's faculty comprises PhD holders, researchers, and industry experts. The teaching methods involve real-world project-based learning, hackathons, and internships.
        </p>
      </div>

      <div className="section">
        <h2>Student Opportunities</h2>
        <p>
          DEPSTAR students actively participate in:
          <ul>
            <li>Technical clubs (GDSC, CSI, IIC, etc.)</li>
            <li>Annual events like WTCC (World Technology Coding Championship)</li>
            <li>Research projects, Startup incubation, and Internship programs</li>
          </ul>
        </p>
      </div>
    </div>
  );
}

export default Depstar;
