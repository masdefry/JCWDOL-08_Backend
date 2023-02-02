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










// import {useEffect, useState} from 'react';
// import axios from 'axios';

// function App(){

//     const [province, setProvince] = useState([])
//     const [cityOrigin, setCityOrigin] = useState([])
//     const [cityDestination, setCityDestination] = useState([])
//     const [cityId, setCityId] = useState({
//         cityIdOrigin: null, 
//         cityIdDestination: null
//     })

//     let onGetProvince = async() => {
//         try {
//             let response = await axios.get('https://pwd-selectiontchallenge.vercel.app/rajaongkir/get-province', {
//                 headers: {
//                     'key': '598395fbbd5364b73d2c50d57df09682'
//                 }
//             })
//             console.log(response.data.data.rajaongkir.province)
//             setProvince(response.data.data.rajaongkir.province)
//         } catch (error) {
            
//         }
//     }

//     let onGetCityOrigin = async(province_id) => {
//         try {
//             let response = await axios.get(`https://pwd-selectiontchallenge.vercel.app/rajaongkir/get-city?province_id=${province_id}`, {
//                 headers: {
//                     'key': '598395fbbd5364b73d2c50d57df09682'
//                 }
//             })

//             setCityOrigin(response.data.data.rajaongkir.city)
//         } catch (error) {
            
//         }
//     }

//     let onGetCityDestination = async(province_id) => {
//         try {
//             let response = await axios.get(`https://pwd-selectiontchallenge.vercel.app/rajaongkir/get-city?province_id=${province_id}`, {
//                 headers: {
//                     'key': '598395fbbd5364b73d2c50d57df09682'
//                 }
//             })

//             setCityDestination(response.data.data.rajaongkir.city)
//         } catch (error) {
            
//         }
//     }

//     let onSelectCityOrigin = (city_id) => {
//         let newCityId = {...cityId}
//         newCityId.cityIdOrigin = city_id 
//         setCityId(newCityId)
//     }

//     let onSelectCityDestination = (city_id) => {
//         let newCityId = {...cityId}
//         newCityId.cityIdDestination = city_id 
//         setCityId(newCityId)
//     }

//     let onCekOngkir = async() => {
//         try {
//             let response = await axios.post(`https://pwd-selectiontchallenge.vercel.app/rajaongkir/get-shipping-cost`, 
//                 {
//                     origin: cityId.cityIdOrigin, 
//                     destination: cityId.cityIdDestination, 
//                     weight: 1700, 
//                     courier: 'jne'
//                 },
//                 {
//                     headers: {
//                         'key': '598395fbbd5364b73d2c50d57df09682'
//                 }
//             })
//             console.log(response)
//         } catch (error) {
            
//         }
//     }

//     useEffect(() => {
//         onGetProvince()
//     }, [])
 
//     return(
//         <>
//             <div className="container px-5 py-5">
//                 <div className="row">
//                     <div className="col-12">
                        
//                         <h1 className="text-primary">
//                             CekOngkir
//                         </h1>
//                     </div>
//                     <div className="col-7">
//                         <h5>
//                             Origin:
//                         </h5>
//                         <select onChange={(e) => onGetCityOrigin(e.target.value)} class="form-control form-control-lg">
//                             <option>Select Province</option>
//                             {
//                                 province.map((value, index) => {
//                                     return(
//                                         <option value={value.province_id}>{value.province}</option>
//                                     )
//                                 })
//                             }
//                         </select>
//                         {
//                             cityOrigin.length !== 0?
//                                 <select onChange={(e) => onSelectCityOrigin(e.target.value)} class="form-control form-control-lg mt-3">
//                                     <option>Select City</option>
//                                     {
//                                         cityOrigin.map((value, index) => {
//                                             return(
//                                                 <option value={value.city_id}>{value.type} {value.city_name}</option>
//                                             )
//                                         })
//                                     }
//                                 </select>
//                             :
//                                 null
//                         }

//                         <h5 className="mt-3">
//                             Destination:
//                         </h5>
//                         <select onChange={(e) => onGetCityDestination(e.target.value)} class="form-control form-control-lg">
//                             <option>Select Province</option>
//                             {
//                                 province.map((value, index) => {
//                                     return(
//                                         <option value={value.province_id}>{value.province}</option>
//                                     )
//                                 })
//                             }
//                         </select>
//                         {
//                             cityDestination.length !== 0?
//                                 <select onChange={(e) => onSelectCityDestination(e.target.value)} class="form-control form-control-lg mt-3">
//                                     <option>Select City</option>
//                                     {
//                                         cityDestination.map((value, index) => {
//                                             return(
//                                                 <option value={value.city_id}>{value.type} {value.city_name}</option>
//                                             )
//                                         })
//                                     }
//                                 </select>
//                             :
//                                 null
//                         }

//                         <h5 className="mt-3">
//                             Courier:
//                         </h5>
//                         <select class="form-control form-control-lg">
//                             <option>Select Courier</option>
//                             <option value='jne'>JNE</option>
//                         </select>
//                     </div>
//                     <div className="col-5 mt-3 px-4 py-3 border">
//                         <h5 className="border-bottom pb-3">
//                             Summary
//                         </h5>
//                         <table class="table table-bordered">
//                             <tbody>
//                                 <tr>
//                                     <th scope="row" className="border-right-0 w-25">Origin</th>
//                                     <td className="border-left-0">: </td>
//                                 </tr>
//                                 <tr>
//                                     <th scope="row" className="border-right-0 w-25">Destination</th>
//                                     <td className="border-left-0">: </td>
//                                 </tr>
//                                 <tr>
//                                     <th scope="row" className="border-right-0 w-25">Courier</th>
//                                     <td className="border-left-0">: jne</td>
//                                 </tr>
//                             </tbody>
//                         </table>
                        
//                         <button onClick={onCekOngkir} className="btn btn-primary w-100 rounded-0">
//                             Cek Ongkir
//                         </button>
//                     </div>
//                     <div className="col-12 mt-5">
//                     <table className="table table-bordered">
//                         <thead>
//                             <tr>
//                             <th scope="col">No</th>
//                             <th scope="col">Service Name</th>
//                             <th scope="col">Description</th>
//                             <th scope="col">Estimation</th>
//                             <th scope="col">Ongkir</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <th scope="row"></th>
//                                 <td></td>
//                                 <td></td>
//                                 <td>Days</td>
//                                 <td></td>
//                             </tr>
//                         </tbody>
//                     </table>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default App










import axios from 'axios';
import {useEffect, useState} from 'react';

export default function App(){

    let onGetData = async() => {
        try {
        } catch (error) {
            
        }
    }

    useEffect(() => {
        onGetData()
    }, [])

    return(
        <div className='container px-5 py-5'>
            <div className='shadow rounded px-4 py-3'>
                {/* Statistic Section */}
                <div>
                    <h5>
                        Match Preview
                    </h5>
                    <div className='row d-flex align-items-center px-5 pt-5 pb-3'>
                        <div className='col-4 text-center'>
                            <img style={{width: '100px'}} src='https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/Persib_Bandung_crest_with_stars.svg/1200px-Persib_Bandung_crest_with_stars.svg.png' />
                            <h3>
                                Persib Bandung
                            </h3>
                            <h6 style={{color: 'grey'}}>
                                League Rank: 1
                            </h6>
                            <h6 style={{color: 'grey'}}>
                                (3-4-2-1)
                            </h6>
                        </div>
                        <div className='col-4 row'>
                            <div className='col-4 text-center'>
                                <h1>
                                    1
                                </h1>
                            </div>
                            <div className='col-4 text-center'>
                                <h1>
                                    :
                                </h1>
                            </div>
                            <div className='col-4 text-center'>
                                <h1>
                                    0
                                </h1>
                            </div>
                        </div>
                        <div className='col-4 text-center'>
                            <img style={{width: '115px'}} src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Lambang_Persija_Jakarta.svg/1200px-Lambang_Persija_Jakarta.svg.png' />
                            <h3>
                                Persija Jakarta
                            </h3>
                            <h6 style={{color: 'grey'}}>
                                League Rank: 2
                            </h6>
                            <h6 style={{color: 'grey'}}>
                                (4-3-3)
                            </h6>
                        </div>
                    </div>
                </div>

                {/* Other Section */}
                <div className='border border-bottom'>

                </div>
                <div className='px-3 py-3'>
                    <btn className='btn btn-dark'>
                        Formations
                    </btn>
                    <btn className='btn btn-dark mx-3'>
                        Timeline
                    </btn>
                    <btn className='btn btn-dark'>
                        Match Stats
                    </btn>

                    <div className='bg-success rounded mt-4 px-3 py-3'>
                        <div className='row py-5'>
                            <div className={`col-3 d-flex justify-content-center`}>
                                <h6 className='bg-primary text-light d-flex justify-content-center align-items-center' style={{width: '50px', height: '50px', borderRadius: '100%'}}>
                                    -
                                </h6>
                            </div>
                        </div>
                        <div className='border-top'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}