import React from "react";
//import { Link } from "react-router-dom";

const Footer = () => {
    return(
        <>
        <div className="footer-body">
        <div id ="contatti" className="footer-content">
            <div className="footer-section">
                <h4 data-it="Contatti" 
                    data-en="Contact"
                    data-fr="Contact"       
                    data-de="Kontakt"
                    data-es="Contacto"
                    data-zh="联系我们"
                    data-ja="お問い合わせ"
                    data-ru="КОНТАКТЫ">Contatti</h4>
                <p><i className="fas fa-phone"></i> +39 347 715 2409, +39 331 648 8471</p>
                <p><i className="fas fa-envelope"></i> f.baglockers.a@gmail.com</p>
                <p><i className="fas fa-map-marker-alt"></i> Via Santa Caterina da Siena, 1f - 50123 Firenze FI</p>
            </div>
            <div className="footer-section">
                <h4 data-it="Orari" 
                    data-en="Opening Hours"
                    data-fr="Heures d'Ouverture"
                    data-de="Öffnungszeiten"
                    data-es="Horario"
                    data-zh="营业时间"
                    data-ja="営業時間"
                    data-ru="РАБОЧИЕ ЧАСЫ">Orari</h4>
                <p data-it="Lunedì - Domenica" 
                   data-en="Monday - Sunday"
                   data-fr="Lundi - Dimanche"
                   data-de="Montag - Sonntag"
                   data-es="Lunes - Domingo"
                   data-zh="周一至周日"
                   data-ja="月曜日～日曜日"
                   data-ru="ПОНЕДЕЛЬНИК - ВОСКРЕСЕНЬЕ">Lunedì - Domenica</p>
                <p>07:00 - 23:00</p>
            </div>
            <div className="footer-section">
                <h4 data-it="Social" 
                    data-en="Social"
                    data-fr="Réseaux Sociaux"
                    data-de="Soziale Medien"
                    data-es="Redes Sociales"
                    data-zh="社交媒体"
                    data-ja="ソーシャルメディア"
                    data-ru="СОЦИАЛЬНЫЕ СЕТИ">Social</h4>
                <div className="social-links">
                    <a href="#"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-whatsapp"></i></a>
                </div>
            </div>  
            <div className="footer-section">
                <h4 data-it="Regolamento Privacy" 
                    data-en="Privacy"
                    data-fr="Vie privée"
                    data-de="Privatsphäre"
                    data-es="Privacidad"
                    data-zh="隐私政策"
                    data-ja="プライバシーポリシー"
                    data-ru="ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ">Privacy</h4>
                <div className="social-links_1">
                    <a href="privacy.html" data-it="Regolamento Privacy" 
                    data-en="Privacy Policy"
                    data-fr="Politique de Confidentialité"
                    data-de="Datenschutzerklärung"
                    data-es="Política de Privacidad"
                    data-zh="隐私政策"
                    data-ja="プライバシーポリシー"
                    data-ru="ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ">Regolamento Privacy</a>
                </div>
            </div>
        </div>
        <div className="footer-bottom">
            <p data-it=" 2024 BagLocker Clone. Tutti i diritti riservati." 
               data-en=" 2024 BagLocker Clone. All rights reserved."
               data-fr=" 2024 BagLocker Clone. Tous droits réservés."
               data-de=" 2024 BagLocker Clone. Alle Rechte vorbehalten."
               data-es=" 2024 BagLocker Clone. Todos los derechos reservados."
               data-zh=" 2024 BagLocker Clone. 版权所有。"
               data-ja=" 2024 BagLocker Clone. すべての権利は所有者に帰属します。"
               data-ru=" 2024 BagLocker Clone. Все права защищены."> 2024 BagLocker. Tutti i diritti riservati.</p>
        </div>
        </div>
    </>
    );
};

export default Footer;