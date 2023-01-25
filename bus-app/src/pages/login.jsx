import {useRef} from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Login(){

    const inputUsernameOrEmail = useRef()
    const inputPassword = useRef()

    let onLogin = async() => {
        try {
            let usernameOrEmail = inputUsernameOrEmail.current.value 
            let password = inputPassword.current.value 

            let response = await axios.get(`http://localhost:5004/users/login?usernameOrEmail=${usernameOrEmail}&password=${password}`)
            toast(response.data.message)
            localStorage.setItem('myToken', response.data.data.token)
        } catch (error) {
            toast(error.response.data.message)
        }
    }

    return(
        <>
            <div className="container px-5 py-5">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email or Username</label>
                    <input type="email" ref={inputUsernameOrEmail} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" ref={inputPassword} class="form-control" id="exampleInputPassword1" />
                </div>
                <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" onClick={onLogin} class="btn btn-danger">Login</button>
                <Toaster />
            </div>
        </>
    )
}