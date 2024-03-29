import React, { Component } from 'react';
import dateFns from 'date-fns';

export class Calendar extends Component {
    constructor(){
        super();
        this.state = {
            currentMonth : new Date(),
            selectedDate : new Date()
        }
    }

    /*********************************
     * @DESC - RENDER NEXT, PREVIOUS
     * @DESC - AND CURRENT MONTH
     ********************************/
    renderHeaderCells = () => {
        return (
            <table style={{ width:'100%' }}>
                <tr>
                    <td><button onClick={ () => this.setState({
                        currentMonth: dateFns.subMonths(this.state.currentMonth,1)
                    }) }>Previous</button></td>
                    <td>{ dateFns.format(this.state.currentMonth, "MMMM YYYY") }</td>
                    <td><button onClick={ () => this.setState({
                        currentMonth:dateFns.addMonths(this.state.currentMonth,1)
                    }) }>Next</button></td>
                </tr>
            </table>
        )
    }
    /*********************************
     * @DESC - RENDER DATE CELLS
     *********************************/
    renderCells =  () =>{
        //console.log(absentDays,attendanceDays);
        const {currentMonth} = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = 'D';
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate='';

        while(day<=endDate){
            for(let i = 0; i < 7; i++){
                formattedDate = dateFns.format(day,dateFormat);
                //console.log(attendance,exday);
                days.push(
                    <td  >{formattedDate}</td>
                );
                day = dateFns.addDays(day,1);
            }
            rows.push(
                <tr key={day}>
                    {days}
                </tr>
            );
            days = [];
        }
        const dateFormats = 'ddd';
        const daysname = [];

        let startDay = dateFns.startOfWeek(this.state.currentMonth);
        for(let i=0; i < 7;i++){
            daysname.push(
            <td key={i} className='text-center days_name'>{dateFns.format(dateFns.addDays(startDay,i),dateFormats)}</td>
                )
        }
        return (
            <div className='table_responsive '>
                <table className='table table-bordered my_calender_background'>
                    <tbody>
                        <tr>
                            {daysname}
                        </tr>
                    {rows}
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        return (
            <div>
                { this.renderHeaderCells() }
                { this.renderCells()}
            </div>
        )
    }
}

export default Calendar
