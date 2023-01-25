import {useRef} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Login(){

    const inputFrom = useRef()
    const inputTo = useRef()
    const inputScheduleDate = useRef()
    const inputTotalSeat = useRef()

    const navigate = useNavigate()

    let onSearch = async() => {
        try {
            let schedule_date = inputScheduleDate.current.value 
            let from = inputFrom.current.value 
            let to = inputTo.current.value 
            let total_seat = inputTotalSeat.current.value 

            navigate(`/buslist?schedule_date=${schedule_date}&from=${from}&to=${to}`)

        } catch (error) {
            
        }
    }

    return(
        <>
            <div className="container px-5 py-5">
                <div class="form-group">
                    <label>Dari</label>
                    <input type="text" ref={inputFrom} class="form-control" />
                </div>
                <div class="form-group">
                    <label>Menuju</label>
                    <input type="text" ref={inputTo} class="form-control" />
                </div>
                <div class="form-group">
                    <label>Tanggal Berangkat</label>
                    <input type="text" ref={inputScheduleDate} class="form-control" />
                </div>
                <div class="form-group">
                    <label>Jumlah</label>
                    <input type="text" ref={inputTotalSeat} class="form-control" />
                </div>
                <button type="submit" onClick={onSearch} class="btn btn-danger w-100">Search Bus</button>
            </div>
        </>
    )
}