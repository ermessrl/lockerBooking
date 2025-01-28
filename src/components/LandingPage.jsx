import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import ReservationPage from './ReservationPage';

// Continue Button Component
function LandingPageSection() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/reserve");
  };

  return (
    <button
      className="cta-button"
      onClick={handleButtonClick}
      data-it="CONTINUA"
      data-en="CONTINUE"
      data-fr="CONTINUER"
      data-de="WEITERMACHEN"
      data-es="CONTINUAR"
      data-zh="继续"
      data-ja="続く"
      data-ru="ПРОДОЛЖАТЬ"
    >
      CONTINUE
    </button>
  );
}

function LandingPage() {
  return (
    <>
      <div className="landing">
        {/* First Paragraph */}
        <p>
          Worried about carrying luggages everywhere you go? We are here to take care of your luggages while you wander hassle-free.
        </p>

        {/* Boxes Section */}
        <div className="boxes-container">
          <div className="box" onClick={() => alert('Locker 1 clicked')}>
            <p className="box-title">Locker 1</p>
            <p><i className="fa-solid fa-clock icon"></i>Open : 00:00 - 23:59</p>
            <p><i className="fa-solid fa-location-dot icon"></i>Bologna</p>
            <p><i className="fa-solid fa-building icon"></i>Bologna Centrale, Piazza delle Medaglie d'Oro, 40121 BO</p>
          </div>
          <div className="box" onClick={() => alert('Locker 2 clicked')}>
            <p className="box-title">Locker 2</p>
            <p><i className="fa-solid fa-clock icon"></i>Open : 06:00 - 00:00</p>
            <p><i className="fa-solid fa-location-dot icon"></i>Bologna</p>
            <p><i className="fa-solid fa-building icon"></i>Via G. Grassilli, 11, 40012 Calderara di Reno BO</p>
          </div>
          <div className="box" onClick={() => alert('Locker 3 clicked')}>
            <p className="box-title">Locker 3</p>
            <p><i className="fa-solid fa-clock icon"></i>Open : 08:00 - 22:00</p>    
            <p><i className="fa-solid fa-location-dot icon"></i>Bologna</p>
            <p><i className="fa-solid fa-building icon"></i>Bologna Autostazione, 40126 Bologna BO</p>
          </div>
        </div>

        {/* Pagination Section */}
        <div className="pagination">
          <button className="pagination-button">1</button>
          <button className="pagination-button">2</button>
          <button className="pagination-button">3</button>
        </div>

        {/* Second Paragraph */}
        <p>
          Book your lockers online and get yourself a guaranteed locker now. Select a locker and proceed.
        </p>

        {/* Continue Button */}
        <LandingPageSection />

        {/* Routes */}
        <Routes>
          <Route path="/reserve" element={<ReservationPage />} />
        </Routes>
      </div>
    </>
  );
}

export default LandingPage;
