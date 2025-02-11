import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import ReservationPage from "./components/ReservationPage";
import PersonalDetailsPage from "./components/PersonalDetailsPage";
import ConfirmationDetailsPage from "./components/ConfirmationDetailsPage";
import { ReservationProvider } from "./components/ReservationContext";
import { PersonalDetailsProvider} from "./components/PersonalDetailsContext";
import ManageBookingPage from "./components/ManageBookingPage";

// Body Component
function BodySection() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/landing");
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
    <ReservationProvider>
    <PersonalDetailsProvider>
    <Router>
    <Header />
    <main className="container-new">
      <Routes>
        <Route path="/" element={<BodySection />} />
        {/* Landing Page */}
        <Route path="/landing" element={<LandingLayout />}>
          <Route index element={<LandingPage />} />

          {/* Reservation Section */}
          <Route path="reserve" element={<ReservationLayout />}>
            <Route index element={<ReservationPage />} />
            
            {/* Personal Details Section */}
            <Route path="personaldetails" element={<PersonalDetailsLayout />}>
              <Route index element={<PersonalDetailsPage />} />

              {/* Print details Page */}
              <Route path="confirmationdetails" element={<ConfirmationDetailsLayout/>}>
                <Route index element={<ConfirmationDetailsPage/>}/>
              </Route>

            </Route>

          </Route>

        </Route>
        {/* Manage booking Page */}
        <Route path="/manageBooking" element={<ManageBookingPage />} /> 
      </Routes>
    </main>
    <Footer />
  </Router>
  </PersonalDetailsProvider>
  </ReservationProvider>
  );
}
const LandingLayout = () => <Outlet />;
const ReservationLayout = () => <Outlet />;
const PersonalDetailsLayout = () => <Outlet/>;
const ConfirmationDetailsLayout = () => <Outlet/>;
export default App;
