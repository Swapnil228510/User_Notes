import { Delete } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { createUrl } from "../utils/utils";
import { Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

export default function Notes() {

useEffect(()=>{
    loadAllData();
},[])
    const [data,setData] = useState([]);

        const loadAllData= async()=>{
            try{
                const token = sessionStorage.getItem('token')
                const header ={
                    headers:{
                        token,
                    }
                }
                const url = createUrl(`/note/show`)
                const response = await axios.get(url,header);
                if(response['status'] === 'success'){
                setData(response);
                } else{
                    toast.error('There are no notes')
                }
                

            }catch(ex){
                console.log(ex)
            }
        }
    return (<>
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        {/* <th scope="col">id</th> */}
                        <th scope="col">Title</th>
                        <th scope="col">Details</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>

                    {
                        data.map(e =>
                            <tr>
                                {/* <th scope="row">{e.}</th> */}
                                <td>{e.title}</td>
                                <td>{e.details}</td>
                              

                                <td><Button variant='contained' color="error" startIcon={<Delete />}>Delete</Button></td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>

    </>)
}

