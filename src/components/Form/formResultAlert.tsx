import { Fragment } from "react";
export const formResultAlert = (formResult:any, setResult:any, setFormData:any) =>{

    const antispamFailed = <>
        <h2>Objednávku se nepodařilo odeslat.</h2>
        <h2>špatný kód</h2></>
    const mailFailed = <>
        <h2>Objednávku se nepodařilo odeslat.</h2>
        <h2>zkuste to později</h2></>
    const loginFailed = <>
        <h2>Přihlášení se nezdařilo :-(</h2>
        <h2>zkuste to později</h2></>
    const loginSuccess = <>
        <h2>Přihlášení proběhlo v pořádku :-)</h2></>

    
    switch (formResult.mailResult){
        case 'ajax_failed':
            setResult({
                html: mailFailed,
                style: { display: 'block', backgroundColor: 'rgba(255, 0, 0, 0.8)' }
            })
            break; 
        case 'error':
            setResult({
                html: loginFailed,
                style: { display: 'block', backgroundColor: 'rgba(255, 0, 0, 0.8)' }
            })
            break;   
        case 'loginSuccess':
            setResult({
                html: loginSuccess,
                style: { display: 'block', backgroundColor: 'rgba(0, 255, 0, 0.8)' }
            })
            break;
        case 'loginFailed':
            setResult({
                html: loginFailed,
                style: { display: 'block', backgroundColor: 'rgba(255, 0, 0, 0.8)' }
            })
            break;             
        case 'success':
            // adress from <textarea> divided to array based on new lines
            const adressDecode = formResult.mailResult === 'ajax_failed' ? [''] : formResult.adresa_1.split('\n');
            let addressDecodeHtml = [ <Fragment key="999"></Fragment> ];
            adressDecode.forEach( (value:string, index:number) => addressDecodeHtml.push( <Fragment key={index}><br/>{value}</Fragment>) );
            const formConfirmation = <>
                <h2>Objednávka byla odeslána.</h2>
                <ul>
                    <li>Jméno : <b>{formResult.jmeno}</b></li>
                    <li>Telefon :{formResult.telefoni_cislo}</li>
                    <li>Termín :{formResult.datum_prijezdu} - {formResult.datum_odjezdu}</li>
                    <li>Apartmá :{formResult.Garsonka_cislo}</li>
                    <li>Osob :{formResult.pocet_osob}</li>
                    <li>Adresa :{addressDecodeHtml}</li>
                    <li>Potvrdit :{formResult.potvrdit}</li>
                    <li>E-mail :{formResult.emailova_adresa}</li>
                    <li>Info :{formResult.doplnkove_informace}</li>
                </ul>
                <h2>Děkujeme</h2></>;
            setResult({
                html: formConfirmation,
                style: { display: 'block', backgroundColor: 'rgba(0, 255, 0, 0.8)' }
            })
            break;
        case 'antispam_failed':
            setResult({
                html: antispamFailed,
                style: { display: 'block', backgroundColor: 'rgba(255, 0, 0, 0.8)' }
            })
            // generate new antispam value pair
            // setAntispam();
            // clear actual <input> value
            // antispamCodeInputPlace.value = '';
            // set focus on related input
            // antispamCodeInputPlace.focus();
            break;
        case 'failed':
            setResult({
                html: mailFailed,
                style: { display: 'block', backgroundColor: 'rgba(255, 0, 0, 0.8)' }
            })
            break;
        case 'termin_changed':
            const editConfirmation = <>
                <h2>Termmín byl změněn</h2>
                <h2>Děkujeme</h2></>
            setResult({
                html: editConfirmation,
                style: { display: 'block', backgroundColor: 'rgba(0, 255, 0, 0.8)' }
            })
            // loadBooking();
            break;
        case 'login_success':
            const loginConfirmation = <>
                <h2>Přihlášení proběhlo úspěšně</h2>
                <h2>Děkujeme</h2></>
            setResult({
                html: loginConfirmation,
                style: { display: 'block', backgroundColor: 'rgba(0, 255, 0, 0.8)' }
            })
            //loadBooking();
            break;
        default:
            setResult({
                html: mailFailed,
                style: { display: 'block', backgroundColor:'rgba(255, 0, 0, 0.8)' }
            })        
    }

    const hideAlert = () => {
        setResult( (old:any) => {
            const { html, style:{ backgroundColor } } = old
            return ({ html, display: 'none', style: { backgroundColor } })
        })
        setFormData( (old:any) => ( { ...old, antispam_code_orig: `${new Date().getMilliseconds()}` } ) )
    }

    const timeout = setTimeout( hideAlert, 5000 );
    return () => clearTimeout(timeout)
}