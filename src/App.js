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
    }  
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1
          data-it="DEPOSITO BAGAGLI FIRENZE"
          data-en="FLORENCE LUGGAGE STORAGE"
          data-fr="CONSIGNE À BAGAGES FLORENCE"
          data-de="GEPÄCKAUFBEWAHRUNG FLORENZ"
          data-es="CONSIGNA DE EQUIPAJE FLORENCIA"
          data-zh="佛罗伦萨行李寄存"
          data-ja="フィレンツェ荷物預かり所"
          data-ru="КАМЕРА ХРАНЕНИЯ БАГАЖА ВО ФЛОРЕНЦИИ"
        >
          DEPOSITO BAGAGLI FIRENZE
        </h1>
        <p
          data-it="Il tuo deposito bagagli sicuro nel centro di Firenze"
          data-en="Your secure luggage storage in the heart of Florence"
          data-fr="Votre consigne à bagages sécurisée au cœur de Florence"
          data-de="Ihre sichere Gepäckaufbewahrung im Herzen von Florenz"
          data-es="Su consigna de equipaje segura en el corazón de Florencia"
          data-zh="您在佛罗伦萨市中心安全的行李寄存处"
          data-ja="フィレンツェの中心部での安全な荷物預かりサービス"
          data-ru="Надежное хранение багажа в центре Флоренции"
        >
          Il tuo deposito bagagli sicuro nel centro di Firenze
        </p>
        <button
          className="cta-button"
          onClick={handleButtonClick}
          data-it="PRENOTA ORA"
          data-en="BOOK NOW"
          data-fr="RÉSERVER"
          data-de="JETZT BUCHEN"
          data-es="RESERVAR AHORA"
          data-zh="立即预订"
          data-ja="今すぐ予約"
          data-ru="ЗАБРОНИРОВАТЬ"
        >
          PRENOTA ORA
        </button>
      </div>
    </section>
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
      <main className="container-new">
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
