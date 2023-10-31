import React, { useState } from "react";
// import "../../node_modules/.bin/"

import { Link, useNavigate } from "react-router-dom";
import { createUrl } from "../utils/utils";
import { toast } from "react-toastify";
import axios from "axios";

export default function Home() {

const[email,setEmail] = useState('')
const[password,setPassword] = useState('')
const navigate = useNavigate();

const logIn= async()=>{
    if(email.length == '')
        toast.error('Please Enter Email')
    else if(password.length == '')
        toast.error('Please Enter Password')
    else{
        try{
            
            const url = createUrl(`/user/signin`)

            const body = {
                email : email,
                password : password
            }
            console.log(" email "+email+" password "+password)
            const response = await axios.post(url,body)
            // console.log(response)

            if(response.data['status'] === 'success'){
                // const{token ,name} = response['data']
                const token = response.data.data.token
                const name = response.data.data.name
                console.log(" token "+response.data.data.token)
                console.log("name "+name)

                sessionStorage['token'] = token
                // sessionStorage['id'] = id
                sessionStorage['name'] = name

                toast.success(`Welcome ${name} to Notes`)
                navigate('/notes')
            } else{
                toast.error('Invalid User name and Password ')
            }

        }catch(ex){
            console.log(ex)
        }
    }
}


    return (<>
           
       <div className="border" style={{padding:200 }} >
        <center>
            <div>UserName : <input type="email" id="email" placeholder="Enter Email" onChange={(e)=>{setEmail(e.target.value)}} /> </div> <br />
            <div>Password :  <input type="password" id="password" placeholder="Enter Password" onChange={(e)=>{setPassword(e.target.value)}} /> </div><br />
                 <button className="btn btn-primary" onClick={logIn}>LogIn</button>
                 <div>Don't have an account  <Link to="/Register" > Register here</Link>  </div>  
       </center>
       </div>
        
       

    </>)
}