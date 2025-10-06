import React from 'react';
import './About.css';
// import aboutImg from '../assets/charusat-campus.jpg'; // Replace with your image path

function About() {
  return (
    <div className="page about-page">
      <div className="about-header">
        <h1>About CHARUSAT</h1>
        <p>Empowering Innovation, Education, and Excellence</p>
      </div>

      <div className="about-content">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            CHARUSAT (Charotar University of Science and Technology) is a premier university located in Gujarat, India. 
            Recognized for academic excellence and a strong emphasis on research and innovation, CHARUSAT offers diverse programs 
            in engineering, technology, management, and healthcare.
          </p>
          <h2>Our Mission</h2>
          <p>
            To become a world-class center of learning and research, fostering global standards in education, technology, and values.
          </p>
          <h2>Vision</h2>
          <p>
            To drive societal development through knowledge, innovation, and skill-based learning.
          </p>
        </div>
       
        </div>
      
    </div>
  );
}

export default About;
