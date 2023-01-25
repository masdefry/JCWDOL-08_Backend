import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';

export default function BusList(){

    let query = useLocation().search
    const [busList, setBusList] = useState([])

    let onSearchBus = async() => {
        try {
            let response = await axios.get(`http://localhost:5004/bus/search${query}`)
            console.log(response.data.data)
            setBusList(response.data.data)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        onSearchBus()
    }, [])

    return(
        <>
            <div className="container px-5 py-5">
                {
                    busList.map((value, index) => {
                        return(
                            <div className="border mb-2" key={index}>
                                <div className="row pl-5">
                                    <div className="col-4 row">
                                        <div className="col-12">
                                            <h3>
                                                {value.name}
                                            </h3>
                                        </div>
                                        <div className="col-12">
                                            <h6 className="font-weight-light">
                                                Executive
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="col-4 row">
                                        <div className="col-4">
                                            <h5>
                                                14:00
                                            </h5>
                                        </div>
                                        <div className="col-4 text-center">
                                            <h6 className="font-weight-light">
                                                14j 50m
                                            </h6>
                                        </div>
                                        <div className="col-4">
                                            <h5>
                                                04:00
                                            </h5>
                                        </div>
                                        <div className="col-4">
                                            <h6>
                                                {value.from}
                                            </h6>
                                        </div>
                                        <div className="col-4 text-center">
                                            <h6 className="font-weight-light">
                                                -
                                            </h6>
                                        </div>
                                        <div className="col-4">
                                            <h6>
                                               {value.to}
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="col-4 text-right">
                                        <div className="col-12">
                                            <h3>
                                                Rp. {value.price.toLocaleString()}
                                            </h3>
                                        </div>
                                        <div className="col-12">
                                            <h6 className="font-weight-light">
                                                {value.total_seat - value.total_seat_available} Booked from {value.total_seat} Seat Available
                                                
                                            </h6>
                                            <div class="progress">
                                                <div class="progress-bar bg-danger" role="progressbar"  style={{width: `${(value.total_seat - value.total_seat_available)/value.total_seat * 100}%`}}></div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button type="submit" class="btn btn-danger w-20 mt-3 mb-3">Book Seat</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}