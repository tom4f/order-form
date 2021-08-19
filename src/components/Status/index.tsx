import { useState, useEffect } from 'react';
import './css/status.css'

export const Status = () => {

    type ArrOfObjType = { [key: string]: string }[] | null

    const [ formResult, setFormResult ] = useState<ArrOfObjType>(null)

    const loadBooking = () => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', `http://localhost/lipnonet/rekreace/api/pdo_read_booking.php`, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                setFormResult( JSON.parse(xhr.responseText) );
                // mySQL week starts from 0, real week starts from 1
                //clearOldWeek( formResult[actualWeek() - 1] );
            } 
        }
        xhr.onerror = () => console.log("** An error occurred during the transaction");
        xhr.send();
    }

    const firstWeekStart = (week = 0) => {
        let firstSat;
        const year = new Date().getFullYear();
        // Get the firt day of year + get day of week : 0 (Sunday) to 6 (Saturday)
        const firstDay = new Date(year,0).getDay();
        if (firstDay >= 0 && firstDay < 5) {
            firstSat  = new Date( year, 0, 7 * week - firstDay );
        } else {
            firstSat  = new Date( year, 0, 7 * week + 7 - firstDay );
        }
        const getSaturday = {
            date        : firstSat.getDate()  < 10 ? `0${firstSat.getDate()}`      : `${firstSat.getDate()}`,
            month       : firstSat.getMonth() <  9 ? `0${firstSat.getMonth() + 1}` : `${firstSat.getMonth() + 1}`,
            year        : firstSat.getFullYear(),
            firstSat    : firstSat.getTime()
        }
       // console.log( {getSaturday} )
        return getSaturday;
    }
    
    const actualWeek = () =>{
        const today = new Date().getTime();
        const first = firstWeekStart(0).firstSat;
        //console.log( Math.floor((today - first) / ( 1000 * 60 * 60 * 24 * 7 )) )
        return Math.floor((today - first) / ( 1000 * 60 * 60 * 24 * 7 ));
    } 


    const showTableRows = (formResult:ArrOfObjType) => {

        const setBackgroundColor = [
            {},
            { backgroundColor: 'rgba(255, 208,   0, 0.9)' },
            { backgroundColor: 'rgba(255,   0,   0, 0.9)' },
            { backgroundColor: 'rgba(202, 202, 202, 0.9)' },
            { backgroundColor: 'rgba(  0, 255,   0, 0.9)' },
        ]


       let weekModified = 0;
        const createTr = (week:number) =>{

            if (!formResult?.length) return (<></>)

            // for weeks in current year
             if (week < formResult.length){
                weekModified = week;
            // for weeks in next year
            } else{
                weekModified = week - formResult.length;
            }

            const termin = `(${weekModified + 1}) ${firstWeekStart(week).date}.${firstWeekStart(week).month}-${firstWeekStart(week+1).date}.${firstWeekStart(week+1).month}.${firstWeekStart(week+1).year}`
            
            return <tr key={week}>
                            <td>{termin}</td>
                            <td style={setBackgroundColor[ +formResult[weekModified]['g1_status'] ]}> {formResult[weekModified]['g1_text']}</td>
                            <td style={setBackgroundColor[ +formResult[weekModified]['g2_status'] ]}> {formResult[weekModified]['g2_text']}</td>
                            <td style={setBackgroundColor[ +formResult[weekModified]['g3_status'] ]}> {formResult[weekModified]['g3_text']}</td>
                        </tr>

        }

        const allTr:any[] = []
        if (!formResult?.length) return null
        for (let week = actualWeek(); week < actualWeek() + formResult.length - 26; week++){
            allTr.push( createTr(week) );
        }

        return allTr
    }


    useEffect( loadBooking, [] )


    return (
        <>
          <div className="header" id="user-logged-in"><b>Aktuální obsazenost</b></div>
            <div className="booking_status">
                <div className="form_result_alert edit_alert" id="form_edit_alert"></div>
                <table className="booking_table">
                    <thead>
                        <tr>
                            <th>Datum (týden so-so)</th>
                            <th>Apartmán č.1</th>
                            <th>Apartmán č.2</th>
                            <th>Apartmán č.3</th>
                        </tr>
                    </thead>
                    <tbody>
                    { showTableRows(formResult) }
                    </tbody>

                </table>

                <div className="booking_info">
                    Poslední změna : { actualWeek() }
                    <span id="last_booking_update"></span>
                    <br />Pro zamluvení termínu použijte
                        <a href="formular.php#1">závaznou objednávku</a>] nebo
                        [<a href="mailto:ubytovani@lipnonet.cz">email</a>]
                    <br />Popis : 
                        [<a href="garsonka.php#4">Apartmá č.1</a>]
                        [<a href="garsonka.php#2">Apartmá č.2</a>]
                        [<a href="garsonka.php#3">Apartmá č.3</a>] a 
                        [<a href="garsonka.php#1">CENÍK</a>]
                    <br />Žluté a zelené plochy odpovídají již obsazeným termínům (týdnům).
                    <br />Šedé plochy odpovídají částečně obsazeným týdnům.
                    <br />Ostatní termíny jsou stále volné.
                    <br />Ubytování samozřejmě poskytujeme po celý rok.
                    <br />Průběžně aktualizováno.
                </div>
            </div>
        </>
    )

}