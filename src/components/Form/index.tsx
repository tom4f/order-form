import { useState } from 'react'
import { formResultAlert } from './formResultAlert'
import { apiPath } from '../../config/apiPath';
import './css/formular.css'

export const Form = () => {

    const [result, setResult] = useState({
        html: <></>,
        style: {
            display: 'none',
            backgroundColor: 'rgba(255, 0, 0, 0.8)'
        }

    })

    const [ formData, setFormData ] = useState( {
        Garsonka_cislo: '',
        pocet_osob: '',
        datum_prijezdu: '',
        datum_odjezdu: '',
        emailova_adresa: '',
        telefoni_cislo: '',
        jmeno: '',
        potvrdit: '',
        adresa_1: '',
        doplnkove_informace: '',
        antispam_code: '',
        antispam_code_orig: `${new Date().getMilliseconds()}`
    } )

    const sendFormBooking = (e:any) => {

            e.preventDefault()

            let xhr = new XMLHttpRequest();
            xhr.open('POST', `${apiPath}/ajax_form_booking.php`, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onload = function(){
                if (this.readyState === 4 && this.status === 200) {
                    const formResult = JSON.parse(this.responseText);
                    formResultAlert(formResult, setResult, setFormData);
                } 
            }
            xhr.onerror = function () {
                const formResultAjaxEror = JSON.parse('{"mailResult" : "ajax_failed"}');
                console.log(formResultAjaxEror)
                formResultAlert(formResultAjaxEror, setResult, setFormData);
            }
            xhr.send(JSON.stringify(formData));

    }

    return (
        <>
            <form autoComplete="off" onSubmit={ sendFormBooking } id="form_booking" name="form_booking">
                <div className="header"><b>Závazná objednávka ubytování</b></div>
                <div className="form_booking">
                    <div className="form_result_alert" style={result.style}>
                        {result.html}
                    </div>
                    <div className="input_booking">
                        <label>Apartmán číslo :</label><br />
                        <select value={formData.Garsonka_cislo} onChange={ (e) => setFormData( old => ({ ...old, Garsonka_cislo: e.target.value }) ) } name="Garsonka_cislo" required>
                            <option value="" >vyberte zde</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>

                    <div className="input_booking">
                        <label>Počet osob :</label><br />
                        <select value={formData.pocet_osob} onChange={ (e) => setFormData( old => ({ ...old, pocet_osob: e.target.value }) ) } name="pocet_osob" required>
                            <option value="" >vyberte zde</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <div className="input_booking">
                        <label>Datum příjezdu :</label><br />
                        <input value={formData.datum_prijezdu} onChange={ (e) => setFormData( old => ({ ...old, datum_prijezdu: e.target.value }) ) } type="date" name="datum_prijezdu" required />
                    </div>

                    <div className="input_booking">
                        <label>Datum odjezdu :</label><br />
                        <input value={formData.datum_odjezdu} onChange={ (e) => setFormData( old => ({ ...old, datum_odjezdu: e.target.value }) ) } type="date" name="datum_odjezdu" required />
                    </div>

                    <div className="input_booking">
                        <label>E-mail :</label><br />
                        <input value={formData.emailova_adresa} onChange={ (e) => setFormData( old => ({ ...old, emailova_adresa: e.target.value }) ) } type="email" name="emailova_adresa" placeholder="vyplňte zde" required />
                    </div>

                    <div className="input_booking">
                        <label>Telefon :</label><br />
                        <input value={formData.telefoni_cislo} onChange={ (e) => setFormData( old => ({ ...old, telefoni_cislo: e.target.value }) ) } type="tel" name="telefoni_cislo" minLength={9} placeholder="vyplňte zde" required />
                    </div>

                    <div className="input_booking">
                        <label>Jméno a příjmení :</label><br />
                        <input value={formData.jmeno} onChange={ (e) => setFormData( old => ({ ...old, jmeno: e.target.value }) ) } type="text" name="jmeno" placeholder="vyplňte zde" required />
                    </div>
                    
                    <div className="input_booking">
                        <label>Odpovědět :</label><br />
                        <select value={formData.potvrdit} onChange={ (e) => setFormData( old => ({ ...old, potvrdit: e.target.value }) ) } name="potvrdit" required>
                            <option value="">vyberte</option>
                            <option value="telefonem">telefonem</option>
                            <option value="emailem">emailem</option>
                        </select>
                    </div>

                    <div className="input_booking">
                        <label>Adresa :</label><br />
                        <textarea value={formData.adresa_1} onChange={ (e) => setFormData( old => ({ ...old, adresa_1: e.target.value }) ) } name="adresa_1" rows={4} cols={68} wrap="Yes" placeholder="Váše adresa" required></textarea>
                    </div>

                    <div className="input_booking">
                        <label>Váš komentář</label><br />
                        <textarea value={formData.doplnkove_informace} onChange={ (e) => setFormData( old => ({ ...old, doplnkove_informace: e.target.value }) ) } name="doplnkove_informace" rows={4} cols={68} wrap="Yes" placeholder="napište nám..."></textarea>
                    </div>

                    <input id="antispam_code_orig" type="hidden" name="antispam_code_orig" />
                    <div className="antispam_booking input_booking">
                        <label id="antispam_code_label">Opište kód : {formData.antispam_code_orig}</label>
                        <input value={formData.antispam_code} onChange={ (e) => setFormData( old => ({ ...old, antispam_code: e.target.value }) ) } id="antispam_code_input" type="text" name="antispam_code" size={5} placeholder="sem kód" />
                    </div>   

                    <div className="submit_booking">
                        <input type="submit" name="odesli" value="Odeslat" />
                    </div>
                </div>
            </form>
        </>
    )
}