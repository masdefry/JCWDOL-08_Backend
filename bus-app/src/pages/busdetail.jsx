import {useParams, useLocation} from 'react-router-dom';

import {useEffect, useState} from 'react';

import axios from 'axios';

import {TbArmchair, TbSteeringWheel} from 'react-icons/tb';

import toast, { Toaster } from 'react-hot-toast';

export default function BusDetail(){

    const {id} = useParams()

    let query = useLocation().search
    let getQuery = new URLSearchParams(query);
    let schedule_date = getQuery.get("schedule_date")
    let from = getQuery.get("from")
    let to = getQuery.get("to")
    let total_seat = getQuery.get("total_seat")

    const [data, setData] = useState([])
    const [seatNumber, setSeatNumber] = useState([])
    const [selectSeat, setSelectSeat] = useState([])
    
    let onGetBusDetail = async() => {
        try {
            let response = await axios.get(`http://localhost:5004/bus/details/${id}?schedule_date=${schedule_date}&from=${from}&to=${to}`)
            
            let totalSeat = response.data.data[0].total_seat
            let mapSeatNumber = [] // [1, 2, 3, 4, 5, dst...]
            for(let i = 1; i <= totalSeat; i++){
                mapSeatNumber.push(i)
            }
            setSeatNumber(mapSeatNumber)
            response.data.data[0].seat_number_booked = response.data.data[0].seat_number_booked.split(',')
            console.log(response.data.data[0])
            setData(response.data.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    let onSelectSeat = (number) => {
        if(data.seat_number_booked.includes(number)){
            toast('Your seat already to book')
        }else{
            if(selectSeat.includes(number)){

            }else{
                let newSelectSeat = [...selectSeat] 
                newSelectSeat.push(number)
                setSelectSeat(newSelectSeat)
            }
        }
    }

    useEffect(() => {
        onGetBusDetail()
    }, [])

    if(!data) return(
        <div>
            Loading...
        </div>
    )

    return(
        <>
            <Toaster />
            <div className="container px-5 py-5">
                <div className="border mb-2">
                    <div className="row pl-5">
                        <div className="col-6 row pt-5">
                            <div className="col-12">
                                <h3>
                                    {data.name}
                                </h3>
                                <h6 className="font-weight-light">
                                    Executive Class
                                </h6>
                                <h5>
                                    Rp. {data.price?.toLocaleString()}
                                </h5>
                                <h6 className="font-weight-light mt-5">
                                    {data.total_seat_available} Seat Tersedia
                                </h6>
                                <div class="progress w-75">
                                    <div class="progress-bar bg-success" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{width: `${(data.total_seat_available)/data.total_seat * 100}%`}}></div>
                                </div>
                            </div>
                            <div className="col-5 row mb-5">
                                <h5 className='ml-3 mt-5'>
                                    Seat Map: 
                                </h5>
                                <div className="col-6">
                                    <TbSteeringWheel />
                                </div>
                                <div className="col-6">
                                </div>
                                {
                                    seatNumber.map((value, index) => {
                                        return(
                                            <div className="col-3 text-center">
                                                <TbArmchair onClick={() => onSelectSeat(value.toString())} style={{color: data.seat_number_booked.includes(value.toString())? 'red':selectSeat.includes(value.toString())?'blue':'black'}} /> 
                                                <span className='text-center pl-1' style={{fontSize: '10px'}}> 
                                                    {value.toString()}
                                                </span>
                                            </div> 
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="col-6 row">
                            <div className="border mx-2 my-2 w-100">
                                <div className="row px-2 py-2">
                                    <div className="col-12">
                                        <h3 className="border-bottom mb-3">
                                            Summary
                                        </h3>
                                    </div>
                                    <div className="col-6 pl-4">
                                        <h6>
                                            Tanggal Berangkat
                                        </h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="font-weight-light">
                                            : {schedule_date}
                                        </h6>
                                    </div>
                                    <div className="col-6 pl-4">
                                        <h6>
                                            Dari
                                        </h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="font-weight-light">
                                            : {from}
                                        </h6>
                                    </div>
                                    <div className="col-6 pl-4">
                                        <h6>
                                            Menuju
                                        </h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="font-weight-light">
                                            : {to}
                                        </h6>
                                    </div>
                                    <div className="col-6 pl-4">
                                        <h6>
                                            Total Seat
                                        </h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="font-weight-light">
                                            : {total_seat}
                                        </h6>
                                    </div>
                                    <div className="col-6 pl-4">
                                        <h6>
                                            Selected Seat
                                        </h6>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="font-weight-light">
                                            : {
                                               selectSeat.join(',')
                                            }
                                        </h6>
                                    </div>
                                    <div className="col-12 py-3">
                                        <div className="border-bottom">

                                        </div>
                                    </div>
                                    <div className="col-6 pl-4">
                                        <h3>
                                            Total Price
                                        </h3>
                                    </div>
                                    <div className="col-6">
                                        <h3 className="font-weight-light">
                                            : Rp. {(data.price * total_seat).toLocaleString()}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="w-100 px-2 mb-2">
                                <button type="submit" class="btn btn-danger w-100">Book Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}