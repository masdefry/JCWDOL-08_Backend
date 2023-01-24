export default function BusList(){
    return(
        <>
            <div className="container px-5 py-5">
                <div className="border mb-2">
                    <div className="row pl-5">
                        <div className="col-4 row">
                            <div className="col-12">
                                <h3>
                                    Holiday Trans
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
                                    Bandung
                                </h6>
                            </div>
                            <div className="col-4 text-center">
                                <h6 className="font-weight-light">
                                    -
                                </h6>
                            </div>
                            <div className="col-4">
                                <h6>
                                    Tangerang Selatan
                                </h6>
                            </div>
                        </div>
                        <div className="col-4 text-right">
                            <div className="col-12">
                                <h3>
                                    Rp. 145.000
                                </h3>
                            </div>
                            <div className="col-12">
                                <h6 className="font-weight-light">
                                    15 from 18
                                </h6>
                                <div class="progress">
                                    <div class="progress-bar bg-danger" role="progressbar"  style={{width: 10}}></div>
                                </div>
                            </div>
                            <div className="col-12">
                                <button type="submit" class="btn btn-danger w-20 mt-3 mb-3">Book Seat</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}