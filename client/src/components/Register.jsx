import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUrl } from "../utils/utils";

export default function Register(){
    const[firstName,setFirstName] = useState('')
    const[lastName,setLastName] = useState('')
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')

    var navigate = useNavigate();
    const back=()=>{

        navigate('/')
    }

    const registerUser= async()=>{
        if(firstName.length == '')
            toast.error('Please Enter Firstname')
        else if(lastName.length == '')
            toast.error('Please Enter lastName')
        else if(email.length == '')
            toast.error('Please Enter Email')
        else if(password.length == '')
            toast.error('Please Enter Password')
        else{
            try{
                const url = createUrl(`/user/signup`)
                // const url =  `http://localhost:4000/user/signup`
                const body = {
                    firstName : firstName,
                    lastName : lastName,
                    email : email,
                    password : password
                }

                const response = await axios.post(url , body)
                if(response != null){
                    toast.success('User Successfully Register')
                    document.getElementById('firstName').value='';
                    document.getElementById('lastName').value='';
                    document.getElementById('email').value='';
                    document.getElementById('password').value='';
                    setFirstName('')
                    setLastName('')
                    setEmail('')
                    setPassword('')
                   
                    navigate('/')
                }


            }catch(ex){
                console.log(ex)
            }
        }
    }

    return(<>
         <div className="border" style={{padding:200}} >
            <center>
                <div>First Name : <input type="text" id="firstName" onChange={(e)=>{setFirstName(e.target.value)}} placeholder="Enter First Name here" /> </div> <br />
                <div>Last Name : <input type="text" id="lastName" onChange={(e)=>{setLastName(e.target.value)}} placeholder="Enter Last Name here" /> </div> <br /> 
                <div>Email: <input type="email" id="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter Email here" /> </div> <br /> 
                <div>Password :  <input type="password" id="password" onChange={(e)=>{setPassword(e.target.value)}}placeholder="Enter Password here" /> </div><br />
                    <button className="btn btn-primary" onClick={registerUser} >Register</button> &nbsp;
                    <button className="btn btn-dark" onClick={back} > Back </button>
            </center>
       </div>
    </>)
}