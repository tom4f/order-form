import './css/showTable.css'

interface formResultType {
    formResult : { [key: string]: string }[] | null
}

export const ShowTable = ( {formResult}:formResultType) => {

        const firstWeekStart = (week = 0) => {
            let firstSat
            const year     = new Date().getFullYear();
            const today    = new Date().getTime();
            const firstDay = new Date(year,0).getDay();
            // Get the firt day of year + get day of week : 0 (Sunday) to 6 (Saturday)
            const plusDays = firstDay >= 0 && firstDay < 5 ? 0 : 7
            firstSat  = new Date( year, 0, 7 * week - firstDay + plusDays );
    
            return {
                date        : `0${firstSat.getDate()}`.slice(-2),
                month       : `0${firstSat.getMonth() + 1}`.slice(-2),
                year        : firstSat.getFullYear(),
                actualWeek  : Math.floor((today - firstSat.getTime()) / ( 1000 * 60 * 60 * 24 * 7 ))
            }
        }

        const bgColor = [
            {},
            { backgroundColor: 'rgba(255, 208,   0, 0.9)' },
            { backgroundColor: 'rgba(255,   0,   0, 0.9)' },
            { backgroundColor: 'rgba(202, 202, 202, 0.9)' },
            { backgroundColor: 'rgba(  0, 255,   0, 0.9)' },
        ]

        const createTr = (week:number) => {

            if (!formResult?.length) return (<></>)

            const weekModified = week < formResult.length ? week : week - formResult.length

            const { date:dateStart, month:monthStart             } = firstWeekStart(week)
            const { date:dateEnd  , month:monthEnd, year:yearEnd } = firstWeekStart(week+1)
            const termin = `(${weekModified + 1}) ${dateStart}.${monthStart}-${dateEnd}.${monthEnd}.${yearEnd}` 
            return <tr key={week}>
                            <td>{termin}</td>
                            <td style={bgColor[ +formResult[weekModified]['g1_status'] ]}> {formResult[weekModified]['g1_text']}</td>
                            <td style={bgColor[ +formResult[weekModified]['g2_status'] ]}> {formResult[weekModified]['g2_text']}</td>
                            <td style={bgColor[ +formResult[weekModified]['g3_status'] ]}> {formResult[weekModified]['g3_text']}</td>
                    </tr>
        }

        const allTr:JSX.Element[] = []
        if (!formResult?.length) return null
        for (let week = firstWeekStart(0).actualWeek; week < firstWeekStart(0).actualWeek + formResult.length; week++){
            allTr.push( createTr(week) );
        }

        return (
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
                    { allTr }
                </tbody>
            </table>
        )
    }