import React  from "react";

const Header = () => {
    return(
        <>
            <nav className="navbar navbar-expand-lg fixed-top">
            <div className="container-fluid">
                <div className="logo">
                    <img src="logo.png" alt="BagLocker Logo"/>
                </div>
                
                {/*!-- Language Dropdown for Mobile --*/}
                <div className="dropdown d-lg-none">
                    <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        🌐
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li><button className="dropdown-item" onclick="changeLang('it')">🇮🇹 Italiano</button></li>
                        <li><button className="dropdown-item" onclick="changeLang('en')">🇬🇧 English</button></li>
                        <li><button className="dropdown-item" onclick="changeLang('fr')">🇫🇷 Français</button></li>
                        <li><button className="dropdown-item" onclick="changeLang('de')">🇩🇪 Deutsch</button></li>
                        <li><button className="dropdown-item" onclick="changeLang('es')">🇪🇸 Español</button></li>
                        <li><button className="dropdown-item" onclick="changeLang('zh')">🇨🇳 中文</button></li>
                        <li><button className="dropdown-item" onclick="changeLang('ja')">🇯🇵 日本語</button></li>
                        <li><button className="dropdown-item" onclick="changeLang('ru')">🇷🇺 Русский</button></li>
                    </ul>
                </div>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <i className="fas fa-bars"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" href="#home" data-it="HOME" data-en="HOME" data-fr="ACCUEIL" data-de="HOME" data-es="INICIO" data-zh="主页" data-ja="ホーム" data-ru="ГЛАВНАЯ">HOME</a>
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
                    </ul>

                    {/*} Language Selector for Desktop */}
                    <div className="language-selector d-none d-lg-flex">
                        <button onclick="changeLang('it')" className="lang-btn active" title="Italiano">🇮🇹</button>
                        <button onclick="changeLang('en')" className="lang-btn" title="English">🇬🇧</button>
                        <button onclick="changeLang('fr')" className="lang-btn" title="Français">🇫🇷</button>
                        <button onclick="changeLang('de')" className="lang-btn" title="Deutsch">🇩🇪</button>
                        <button onclick="changeLang('es')" className="lang-btn" title="Español">🇪🇸</button>
                        <button onclick="changeLang('zh')" className="lang-btn" title="中文">🇨🇳</button>
                        <button onclick="changeLang('ja')" className="lang-btn" title="日本語">🇯🇵</button>
                        <button onclick="changeLang('ru')" className="lang-btn" title="Русский">🇷🇺</button>
                    </div>
                </div>
            </div>
        </nav>
        </>
    );
};
export default Header;