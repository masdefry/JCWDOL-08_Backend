// import axios from 'axios';
// import {useEffect, useState, useRef} from 'react';

// export default function App() {

//     const [standings, setStandings] = useState([])

//     let onGetData = async() => {
//         try {
//             let response = await axios.get('http://localhost:5000/data')
//             setStandings(response.data.football.liga1.season.standings)
//         } catch (error) {
            
//         }
//     }

//     useEffect(() => {
//         onGetData()
//     }, [])

//   return (
//     <div className="container py-5">
//       <table class="table table-bordered">
//         <thead>
//           <tr>
//             <th scope="col">No.</th>
//             <th scope="col">Club</th>
//             <th scope="col">P</th>
//             <th scope="col">W</th>
//             <th scope="col">D</th>
//             <th scope="col">L</th>
//             <th scope="col">GS</th>
//             <th scope="col">GC</th>
//             <th scope="col">GD</th>
//             <th scope="col">Point</th>
//             <th scope="col">5 Last Match</th>
//           </tr>
//         </thead>
//         <tbody>
//             {
//                 standings.map((value, index) => {
//                     return(
//                         <tr>
//                             <th scope="row">{index+1}</th>
//                             <td>{value.teamName}</td>
//                             {
//                                 value.tables.split(',').map((value, index) => {
//                                     return(
//                                         <td>{value.split('|')[1]}</td>
//                                     )
//                                 })
//                             }
                            
//                             <td>
//                             <div className="d-flex">
//                                 {
//                                     value.last_match.split(',').map((value, index) => {
//                                         return(
//                                             <div className={value === 'w'? "bg-success text-center text-light":value === 'd'? "bg-secondary text-center text-light":"bg-danger text-center text-light"} style={{ width: '25px', height: '25px', borderRadius: '100%' }}>
//                                                 {value}
//                                             </div>
//                                         )
//                                     })
//                                 }
//                             </div>
//                             </td>
//                         </tr>
//                     )
//                 })
//             }
//         </tbody>
//       </table>

//     </div>
//   );
// }










import {useEffect, useState} from 'react';
import axios from 'axios';

function App(){

    const [province, setProvince] = useState([])
    const [cityOrigin, setCityOrigin] = useState([])
    const [cityDestination, setCityDestination] = useState([])
    const [cityId, setCityId] = useState({
        cityIdOrigin: null, 
        cityIdDestination: null
    })

    let onGetProvince = async() => {
        try {
            let response = await axios.get('https://pwd-selectiontchallenge.vercel.app/rajaongkir/get-province', {
                headers: {
                    'key': '598395fbbd5364b73d2c50d57df09682'
                }
            })
            console.log(response.data.data.rajaongkir.province)
            setProvince(response.data.data.rajaongkir.province)
        } catch (error) {
            
        }
    }

    let onGetCityOrigin = async(province_id) => {
        try {
            let response = await axios.get(`https://pwd-selectiontchallenge.vercel.app/rajaongkir/get-city?province_id=${province_id}`, {
                headers: {
                    'key': '598395fbbd5364b73d2c50d57df09682'
                }
            })

            setCityOrigin(response.data.data.rajaongkir.city)
        } catch (error) {
            
        }
    }

    let onGetCityDestination = async(province_id) => {
        try {
            let response = await axios.get(`https://pwd-selectiontchallenge.vercel.app/rajaongkir/get-city?province_id=${province_id}`, {
                headers: {
                    'key': '598395fbbd5364b73d2c50d57df09682'
                }
            })

            setCityDestination(response.data.data.rajaongkir.city)
        } catch (error) {
            
        }
    }

    let onSelectCityOrigin = (city_id) => {
        let newCityId = {...cityId}
        newCityId.cityIdOrigin = city_id 
        setCityId(newCityId)
    }

    let onSelectCityDestination = (city_id) => {
        let newCityId = {...cityId}
        newCityId.cityIdDestination = city_id 
        setCityId(newCityId)
    }

    let onCekOngkir = async() => {
        try {
            let response = await axios.post(`https://pwd-selectiontchallenge.vercel.app/rajaongkir/get-shipping-cost`, 
                {
                    origin: cityId.cityIdOrigin, 
                    destination: cityId.cityIdDestination, 
                    weight: 1700, 
                    courier: 'jne'
                },
                {
                    headers: {
                        'key': '598395fbbd5364b73d2c50d57df09682'
                }
            })
            console.log(response)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        onGetProvince()
    }, [])
 
    return(
        <>
            <div className="container px-5 py-5">
                <div className="row">
                    <div className="col-12">
                        
                        <h1 className="text-primary">
                            CekOngkir
                        </h1>
                    </div>
                    <div className="col-7">
                        <h5>
                            Origin:
                        </h5>
                        <select onChange={(e) => onGetCityOrigin(e.target.value)} class="form-control form-control-lg">
                            <option>Select Province</option>
                            {
                                province.map((value, index) => {
                                    return(
                                        <option value={value.province_id}>{value.province}</option>
                                    )
                                })
                            }
                        </select>
                        {
                            cityOrigin.length !== 0?
                                <select onChange={(e) => onSelectCityOrigin(e.target.value)} class="form-control form-control-lg mt-3">
                                    <option>Select City</option>
                                    {
                                        cityOrigin.map((value, index) => {
                                            return(
                                                <option value={value.city_id}>{value.type} {value.city_name}</option>
                                            )
                                        })
                                    }
                                </select>
                            :
                                null
                        }

                        <h5 className="mt-3">
                            Destination:
                        </h5>
                        <select onChange={(e) => onGetCityDestination(e.target.value)} class="form-control form-control-lg">
                            <option>Select Province</option>
                            {
                                province.map((value, index) => {
                                    return(
                                        <option value={value.province_id}>{value.province}</option>
                                    )
                                })
                            }
                        </select>
                        {
                            cityDestination.length !== 0?
                                <select onChange={(e) => onSelectCityDestination(e.target.value)} class="form-control form-control-lg mt-3">
                                    <option>Select City</option>
                                    {
                                        cityDestination.map((value, index) => {
                                            return(
                                                <option value={value.city_id}>{value.type} {value.city_name}</option>
                                            )
                                        })
                                    }
                                </select>
                            :
                                null
                        }

                        <h5 className="mt-3">
                            Courier:
                        </h5>
                        <select class="form-control form-control-lg">
                            <option>Select Courier</option>
                            <option value='jne'>JNE</option>
                        </select>
                    </div>
                    <div className="col-5 mt-3 px-4 py-3 border">
                        <h5 className="border-bottom pb-3">
                            Summary
                        </h5>
                        <table class="table table-bordered">
                            <tbody>
                                <tr>
                                    <th scope="row" className="border-right-0 w-25">Origin</th>
                                    <td className="border-left-0">: </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="border-right-0 w-25">Destination</th>
                                    <td className="border-left-0">: </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="border-right-0 w-25">Courier</th>
                                    <td className="border-left-0">: jne</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <button onClick={onCekOngkir} className="btn btn-primary w-100 rounded-0">
                            Cek Ongkir
                        </button>
                    </div>
                    <div className="col-12 mt-5">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                            <th scope="col">No</th>
                            <th scope="col">Service Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Estimation</th>
                            <th scope="col">Ongkir</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row"></th>
                                <td></td>
                                <td></td>
                                <td>Days</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App