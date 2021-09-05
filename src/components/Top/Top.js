import mainImg  from './../../images/main.jpg';
import GoogleAd from '../GoogleAd';
import './css/top.css'

export const Top = () => {
    return ( 
        <>
            <div className="header">
                <a className="menu" href="../index.html" target="_top">Start</a> | 
                <a className="menu" href="../rekreace.php" target="_top"> Apartmány</a> | 
                <a className="menu" href="../booking-form/" target="_top"> Objednávka</a> | 
                <a className="menu" href="../ceny.php" target="_top"> Ceny</a> | 
                <a className="menu" href="../kontakt.php" target="_top"> Kontakt</a> | 
                <a className="menu" href="../frymburk.php" target="_top"> O Frymburku</a>

            </div>

            <div className="mainpictures">
                <a href="rekreace.php"><img className="img" src={mainImg} alt="Ubytování u Kučerů ve Frymburku - zima" /></a>
            </div>

            <div className="header">
                <a className="menu" href="../meteo/" target="_top"> Meteostanice</a> | 
                <a className="menu" href="../forum/" target="_top"> Fórum</a> | 
                <a className="menu" href="../fotogalerie.html" target="_top"> Fotogalerie</a> | 
                <a className="menu" href="../windsms/" target="_top"> MeteoAlarm</a> | 
                <a className="menu" href="../kaliste.php" target="_top"> Kaliště</a> |
                <a className="menu" href="../../4f/" target="_top"> Windsurfing</a>
            </div>

            <GoogleAd />
        </>
    );
}