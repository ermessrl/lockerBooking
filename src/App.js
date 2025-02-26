import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import ReservationPage from "./components/ReservationPage";
import PersonalDetailsPage from "./components/PersonalDetailsPage";
import ConfirmationDetailsPage from "./components/ConfirmationDetailsPage";
import { ReservationProvider } from "./components/ReservationContext";
import { PersonalDetailsProvider} from "./components/PersonalDetailsContext";
import { LoginDetailsProvider } from "./components/LoginDetailsContext";
import { LockerProvider } from "./components/LockerContext";
import ManageBookingPage from "./components/ManageBookingPage";
import LoginPage from "./components/LoginPage";
import { mockLockers } from "./api/mockData";
import { USE_MOCK_DATA } from "./config";
import axios from "axios";
import { Button } from "@mui/material";
// Body Component
function BodySection() {
  const navigate = useNavigate();
  const [lockers,setLockers] = useState(null);
  const [selectedLocker, setSelectedLocker] = useState(null);
  const handleButtonClick = () => {
    if (USE_MOCK_DATA) {
      setLockers(mockLockers);
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://dev.ermes-srv.com/test_priyanka/be/v8/locker/list');
          const filteredLockers = response.data.data.filter(
            (locker) => locker.onlineBooking === true
          );         
          if (filteredLockers.length === 1) {
            console.log('Filtered Lockers:', filteredLockers[0]);
            setSelectedLocker(filteredLockers[0]);
            localStorage.setItem('lockerData', JSON.stringify(filteredLockers[0]));
            const lockerData = localStorage.getItem("lockerData");
            console.log('lockerData in appjs', lockerData);
            navigate("landing/reserve");
          } else {
            console.log('Filtered Lockers:', filteredLockers);
            setLockers(filteredLockers);
            localStorage.setItem('lockerData', JSON.stringify(filteredLockers));
            navigate("/landing");
          }
        } catch (err) {
          console.log('error', err);
        }
      };
      fetchData(); 
      console.log(lockers, selectedLocker);
    };  
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    image: "",
    title: "",
    description: "",
    hours: "",
    price: "",
    address: "",
  });
  const openModal = (image, title, description, hours, price, address) => {
    setModalData({image, title, description, hours, price, address});
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
    <section id="home" className="hero">
      <div className="hero-content">
        <h1
          data-it="DEPOSITO BAGAGLI FIRENZE"
          data-en="FLORENCE LUGGAGE STORAGE"
        >
          DEPOSITO BAGAGLI FIRENZE
        </h1>
        <p
          data-it="Il tuo deposito bagagli sicuro nel centro di Firenze"
          data-en="Your secure luggage storage in the heart of Florence"
        >
          Il tuo deposito bagagli sicuro nel centro di Firenze
        </p>
        <Button
          variant="contained" size="large"
          onClick={handleButtonClick}
          data-it="PRENOTA ORA"
        >
          PRENOTA ORA
        </Button>
      </div>
    </section>
    <section className="features">
      <div className="feature-card">
        <i className="fa-solid fa-lock icon"></i>
        <h3>Guaranteed Security</h3>
        <p>Secure and video-monitored luggage storage 24/7</p>
      </div>
      <div className="feature-card">
        <i className="fa-solid fa-location-dot icon"></i>
        <h3>Central Location</h3>
        <p>In the heart of Florence, close to main attractions</p>
      </div>
      <div className="feature-card">
        <i className="fa-solid fa-clock icon"></i>
        <h3>Always Open</h3>
        <p>Service available every day</p>
      </div>
    </section>
    <section id ="chi-siamo" className="about">
      <h2>About Us</h2>
      <div>
      We are your reference point for luggage storage at Santa Maria Novella station in Florence! <br /><br />
      We offer an innovative, automatic, secure, and convenient service to store your luggage while you explore the city.<br /><br />
      Just two minutes from Santa Maria Novella station, in the heart of beautiful Florence, 
      we make your trip even more comfortable and hassle-free. <br /><br />
      Our service is designed to safely and reliably free you from the burden of your luggage.
      </div>
    </section>
    <section id ="prezzi" className="price-details">
      <div>
      <h2>Our Prices</h2>
      <div className="price-cards">
        <div className="price-card">
          <h3>Standard Storage</h3>
          <p className="price"> starting from 5€</p>
          <p>per bag</p>
          <p>up to 24 hours</p>
        </div>
        <div className="price-card">
          <h3>Big Storage</h3>
          <p className="price"> starting from 10 €</p>
          <p>per bag</p>
          <p>up to 24 hours</p>
        </div>
      </div>
      </div>
    </section>
    <section id="scopri-firenze" className="discover-florence">
      <h2>Discover Florence</h2>
      <div className="discover-grid">
        <div className="discover-card" onClick={() => openModal('/duomo.webp', 'Duomo di Firenze', 'La Cattedrale di Santa Maria del Fiore, simbolo di Firenze, è uno dei più grandi edifici religiosi d\'Italia. La sua maestosa cupola, opera del Brunelleschi, domina lo skyline cittadino ed è considerata un capolavoro dell\'architettura rinascimentale.', 
              '10:15 - 16:45 (Lun-Sab)', '€20 (biglietto completo)', 'Piazza del Duomo, Firenze')}>
          <img src="/duomo.webp" alt="Duomo di Firenze"/>
          <h3>Duomo di Firenze</h3>
          <p>The majestic cathedral symbol of the city</p>
        </div>
        <div className="discover-card" onClick={() => openModal('/cupola.webp', 'Cupola del Brunelleschi', 'La Cupola del Brunelleschi è il capolavoro architettonico che corona la Cattedrale di Santa Maria del Fiore. Alta 116 metri, fu costruita tra il 1420 e il 1436 ed è ancora oggi la più grande cupola in muratura mai costruita.One of the most famous museums in the world', 
              '8:15 - 18:45 (Lun-Dom)', '€20 (incluso nel biglietto del Duomo)', 'Piazza del Duomo, Firenze')}>
          <img src="/cupola.webp" alt="Cupola del Brunelleschi"/>
          <h3>Cupola del Brunelleschi</h3>
          <p>One of the most famous museums in the world</p>
        </div>
        <div className="discover-card" onClick={() => openModal('/campanile.webp','Campanile di Giotto','Il Campanile di Giotto è la torre campanaria della Cattedrale. Alto 84,7 metri e largo circa 15, è considerato il più bel campanile d\'Italia per la sua ricchezza decorativa e il perfetto equilibrio architettonico.',
          '8:15 - 19:30 (Lun-Dom)', '€15', 'Piazza del Duomo, Firenze')}>
          <img src="/campanile.webp" alt="Campanile di Giotto"/>
          <h3>Campanile di Giotto</h3>
          <p>The historic bridge with its goldsmith shops</p>
        </div>
        <div className="discover-card" onClick={() => openModal('/ponte.webp','Ponte Vecchio','Il Ponte Vecchio è il più antico ponte di Firenze sull\'Arno. Famoso per le sue botteghe di orafi e gioiellieri, è l\'unico ponte fiorentino che non fu distrutto durante la Seconda Guerra Mondiale.',
          'Sempre aperto', 'Gratuito', 'Ponte Vecchio, Firenze')}>
          <img src="/ponte.webp" alt="Ponte Vecchio"/>
          <h3>Ponte Vecchio</h3>
          <p>The palace symbol of city power</p>
        </div>
        <div className="discover-card" onClick={() => openModal('/palazzo.webp', 'Palazzo Vecchio e Piazza della Signoria','Palazzo Vecchio è il municipio di Firenze e si affaccia su Piazza della Signoria. Il palazzo, costruito in stile romanico, è uno dei più significativi edifici pubblici d\'Italia.',
          '9:00 - 19:00 (Gio-Mar), 9:00 - 14:00 (Mer)','€12.50', 'Piazza della Signoria, Firenze' )}>
          <img src="/palazzo.webp" alt="Palazzo Vecchio e Piazza della Signoria"/>
          <h3>Palazzo Vecchio e Piazza della Signoria</h3>
          <p>A wonderful historic park in the heart of the city</p>
        </div>
        <div className="discover-card" onClick={() => openModal('/battistero.webp','Battistero di San Giovanni','Il Battistero di San Giovanni è uno dei più antichi edifici di Firenze, noto per le sue magnifiche porte di bronzo, in particolare la Porta del Paradiso del Ghiberti.',
          '8:15 - 18:30 (Lun-Dom)', '€15', 'Piazza San Giovanni, Firenze' )}>
          <img src="/battistero.webp" alt="Battistero di San Giovanni"/>
          <h3>Battistero di San Giovanni</h3>
          <p>The basilica that houses the tombs of great Italians</p>
        </div>
      </div>
    </section>
    {/* Modal */}
      {modalVisible && (
          <div className="modal-overlay">
            <div className="modal-content">
              <span className="close-modal" onClick={closeModal}>
                &times;
              </span>
              <div className="modal-header">
                <img src={modalData.image} alt={modalData.title} />
                <h2 className="modal-title">{modalData.title}</h2>
              </div>
              <div className="modal-body">
                <p>{modalData.description}</p>
                <div className="modal-details">
                  <div className="detail-item">
                    <i className="fa-solid fa-clock icon"></i> <span>{modalData.hours}</span>
                  </div>
                  <div className="detail-item">
                    <i className="fa-solid fa-ticket-alt icon"></i>{" "}
                    <span>{modalData.price}</span>
                  </div>
                  <div className="detail-item">
                    <i className="fa-solid fa-map-marker-alt icon"></i>{" "}
                    <span>{modalData.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    <section id="dove-siamo" className="map-section">
      <h2>Where we are</h2>
      <div className="map-container">
        <img src="map.png" alt="Mappa della nostra posizione" className="map-image"/>
      </div>
    </section>
    </>
  );
}

// App Component
function App() {
  return (
    <LockerProvider>
    <ReservationProvider>
    <PersonalDetailsProvider>
    <LoginDetailsProvider>
    <Router>
      <Header />
      <main>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<BodySection />} />
          <Route path="/landing" element={<LandingLayout />}>
            <Route index element={<LandingPage />} />
            
            {/* Reservation Section */}
            <Route path="reserve" element={<ReservationLayout />}>
              <Route index element={<ReservationPage />} />
              
              {/* Personal Details Section */}
              <Route path="personaldetails" element={<PersonalDetailsLayout />}>
                <Route index element={<PersonalDetailsPage />} />

                {/* Print details Page */}
                <Route path="confirmationdetails" element={<ConfirmationDetailsLayout />}>
                  <Route index element={<ConfirmationDetailsPage />} />
                </Route>
              </Route>
            </Route>
          </Route>
          {/* LOGIN SECTION (NOW WITH NESTED ROUTES) */}
          <Route path="/login" element={<LoginLayout />}>
            <Route index element={<LoginPage />} />
            <Route path="manageBooking" element={<ManageBookingPage />} />  
          </Route>
        </Routes>
      </main>
      <Footer />
    </Router>
  </LoginDetailsProvider>
  </PersonalDetailsProvider>
  </ReservationProvider>
  </LockerProvider>
  );
}
const LandingLayout = () => <Outlet />;
const ReservationLayout = () => <Outlet />;
const PersonalDetailsLayout = () => <Outlet/>;
const ConfirmationDetailsLayout = () => <Outlet/>;
const LoginLayout = () => <Outlet/>;
export default App;
