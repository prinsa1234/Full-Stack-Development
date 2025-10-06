import React from 'react';
import './charusat.css';
import cspit from '../assets/charusat/cspit.jpg';
import depstar from '../assets/charusat/depstar.jpg';
import iiim from '../assets/charusat/iiim.jpg'; // or correct this to rpcp.jpg if you have it
import cmpica from '../assets/charusat/cmpica.jpg';
function Charusat() {
  return (
    <div className="charusat-page">
      <h1>Welcome to CHARUSAT</h1>

      <div className="intro-section">
        <p>
          CHARUSAT (Charotar University of Science and Technology) is a globally recognized university based in Gujarat, India. With a mission to provide quality education and promote research, innovation, and entrepreneurship, CHARUSAT stands out among institutions for its student-centric approach and academic excellence.
        </p>

        <p>
          The university houses multiple faculties and departments offering undergraduate, postgraduate, and doctoral programs. Key focus areas include engineering, pharmacy, computer science, management, applied sciences, medical sciences, and humanities.
        </p>
      </div>

      <h2>Major Departments</h2>
      <div className="departments">
        <div className="department-card">
          <img src={cspit} alt="CSPIT" />
          <h3>CSPIT (Engineering)</h3>
          <p>B.Tech, M.Tech, Ph.D. programs in various disciplines of Engineering.</p>
        </div>
        <div className="department-card">
          <img src={depstar} alt="DEPSTAR" />
          <h3>DEPSTAR (Advance Technology & Research)</h3>
          <p>Dedicated to innovation, AI, ML, Data Science, and interdisciplinary research.</p>
        </div>
        <div className="department-card">
          <img src={iiim} alt="IIIM" />
          <h3>RPCP (Pharmacy)</h3>
          <p>Known for pharmaceutical research, drug design, and advanced pharmaceutics.</p>
        </div>
        <div className="department-card">
          <img src={cmpica} alt="CMPICA" />
          <h3>CMPICA (Computer Applications)</h3>
          <p>Offers programs like BCA, MCA, MSc(IT) with a focus on software development and analytics.</p>
        </div>
      </div>

      <div className="extra-info">
        <h2>Achievements & Innovation</h2>
        <p>
          CHARUSAT has received A+ Grade accreditation from NAAC and is ranked among top private universities in India. Its incubation center has successfully launched several startups and fosters innovation with active industry collaborations.
        </p>
        <p>
          Research is a pillar of CHARUSAT’s excellence, with numerous papers published in international journals across domains like AI, IoT, Biomedical Engineering, Pharmaceutical Science, and Sustainable Energy.
        </p>
        <p>
          CHARUSAT continuously promotes social responsibility, technical fests, hackathons, international MOUs, and student exchange programs with renowned foreign universities.
        </p>
      </div>
    </div>
  );
}

export default Charusat;
