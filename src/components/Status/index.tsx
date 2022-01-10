import { useState, useEffect } from 'react';
import { apiPath } from '../../config/apiPath';
import { ShowTable } from './ShowTable';
import './css/status.css'

export const Status = () => {
    type ArrOfObjType = { [key: string]: string }[] | null
    const [ formResult, setFormResult ] = useState<ArrOfObjType>(null)
    const [ lastUpdate, setLastUpdate ] = useState<string | null>( null ) 

    const fetchRequests = async () => {
        const fetchResult:any = await fetch(`${apiPath}/pdo_read_booking.php`).then( response => response.json() )

        if (Array.isArray(fetchResult)) {  

            const lastUpdateLong = fetchResult.reduce( (total, {lastUpdate:currentLastUpdate}) => {
                return total.localeCompare(currentLastUpdate) > 0 ? total : currentLastUpdate
            }, '0000-01-01 00:00:00' )

            const lastUpdateShort = lastUpdateLong.slice(0,10).split('-').reverse().join('.')

            setLastUpdate(lastUpdateShort)
            setFormResult(fetchResult)
        }
    }

    useEffect( () => { fetchRequests() }, [] )

    return (
        <>
          <div className="header" id="user-logged-in"><b>Aktuální obsazenost</b></div>
            <div className="booking_status">
                <div className="form_result_alert edit_alert" id="form_edit_alert"></div>
                    <ShowTable formResult={formResult} />
                <div className="booking_info">
                    Poslední změna : { lastUpdate }
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
                    <br />Červené termíny = mimo provoz.
                    <br />Ostatní termíny jsou stále volné.
                    <br />Ubytování samozřejmě poskytujeme po celý rok.
                    <br />Průběžně aktualizováno.
                </div>
            </div>
        </>
    )
}