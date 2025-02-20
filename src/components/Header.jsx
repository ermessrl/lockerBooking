import React  from "react";
import { Outlet, Link } from "react-router-dom";
const Header = () => {
    return(
        <>
            <nav className="navbar navbar-expand-lg fixed-top">
            <div className="container-fluid">
                <div className="logo">
                    <Link to="/">
                    <img src= {`/logo.png?v=${Date.now()}`} alt="BagLocker Logo" style={{ cursor: 'pointer' }}/>
                    </Link>
                </div>
                
                {/*!-- Language Dropdown for Mobile --*/}
                <div className="dropdown d-lg-none">
                    <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        🌐
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li><button className="dropdown-item" >🇮🇹 Italiano</button></li>
                        <li><button className="dropdown-item" >🇬🇧 English</button></li>
                        <li><button className="dropdown-item" >🇫🇷 Français</button></li>
                        <li><button className="dropdown-item" >🇩🇪 Deutsch</button></li>
                        <li><button className="dropdown-item" >🇪🇸 Español</button></li>
                        <li><button className="dropdown-item" >🇨🇳 中文</button></li>
                        <li><button className="dropdown-item" >🇯🇵 日本語</button></li>
                        <li><button className="dropdown-item" >🇷🇺 Русский</button></li>
                    </ul>
                </div>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <i className="fas fa-bars"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to= "/" data-it="HOME" data-en="HOME" data-fr="ACCUEIL" data-de="HOME" data-es="INICIO" data-zh="主页" data-ja="ホーム" data-ru="ГЛАВНАЯ">HOME</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#chi-siamo" data-it="CHI SIAMO" data-en="ABOUT US" data-fr="QUI SOMMES-NOUS" data-de="ÜBER UNS" data-es="QUIÉNES SOMOS" data-zh="关于我们" data-ja="会社概要" data-ru="О НАС">CHI SIAMO</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#prezzi" data-it="PREZZI" data-en="PRICES" data-fr="PRIX" data-de="PREISE" data-es="PRECIOS" data-zh="价格" data-ja="料金" data-ru="ЦЕНЫ">PREZZI</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#scopri-firenze" data-it="SCOPRI FIRENZE" data-en="DISCOVER FLORENCE" data-fr="DÉCOUVREZ FLORENCE" data-de="ENTDECKEN SIE FLORENZ" data-es="DESCUBRE FLORENCIA" data-zh="探索佛罗伦萨" data-ja="フィレンツェを探索" data-ru="ОТКРОЙТЕ ФЛОРЕНЦИЮ">SCOPRI FIRENZE</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#dove-siamo" data-it="DOVE SIAMO" data-en="WHERE WE ARE" data-fr="OÙ SOMMES-NOUS" data-de="WO WIR SIND" data-es="DÓNDE ESTAMOS" data-zh="位置" data-ja="アクセス" data-ru="ГДЕ МЫ НАХОДИМСЯ">DOVE SIAMO</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#contatti" data-it="CONTATTI" data-en="CONTACT" data-fr="CONTACT" data-de="KONTAKT" data-es="CONTACTO" data-zh="联系我们" data-ja="お問い合わせ" data-ru="КОНТАКТЫ">CONTATTI</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login"> MANAGE BOOKING</Link>
                        </li>
                    </ul>

                    {/*} Language Selector for Desktop */}
                    {/*onClick="changeLang('fr')"*/} 
                    <div className="language-selector d-none d-lg-flex">
                        <button className="lang-btn active" title="Italiano">🇮🇹</button>
                        <button className="lang-btn" title="English">🇬🇧</button>
                        <button className="lang-btn" title="Français">🇫🇷</button>
                        <button className="lang-btn" title="Deutsch">🇩🇪</button>
                        <button className="lang-btn" title="Español">🇪🇸</button>
                        <button className="lang-btn" title="中文">🇨🇳</button>
                        <button className="lang-btn" title="日本語">🇯🇵</button>
                        <button className="lang-btn" title="Русский">🇷🇺</button>
                    </div>
                </div>
            </div>
        </nav>
        <Outlet/>
        </>
    );
};
export default Header;