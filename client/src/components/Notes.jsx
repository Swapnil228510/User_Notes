import { Delete,  Update } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { createUrl } from "../utils/utils";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { addAllNote, deletebyId, getNoteById, showAllNotes, updateNoteById } from "../axioscall/NoteAxios";
import { useNavigate } from "react-router-dom";

export default function Notes() {

useEffect(()=>{
    loadAllData();
},[])
    const [data,setData] = useState([]);
    const[id,setId] = useState();
    const[addflag,setAddFlag] = useState(true);
    const[title,setTitle] = useState('') //i am using this state for both add and get in update
    const[details,setDetails] = useState('')
    const navigate = useNavigate();
    const[updatebtn , setUpdatebtn] = useState(true)
    const[addbtn , setAddbtn] = useState(false)
    

    const deleteNote=async(id)=>{
        // alert("id is=> "+id)

        try{
            const url = createUrl(`/note/delete/${id}`)
            const response = await deletebyId(url)
            console.log("in delete "+response.data.status + " id "+ id)
            if(response.data.status === 'success'){
                loadAllData();
                toast.success('Deleted')
            }
        }catch(ex){
            console.log(ex)
        }
    }
        const loadAllData= async()=>{
            try{
                const url = createUrl(`/note/show`)
                const response = await showAllNotes(url)
                if(response.data.status === 'success'){                    
                setData(response.data.data);
                } else{
                    toast.error('There are no notes')
                }
                

            }catch(ex){
                console.log(ex)
            }
        }

        const addNote=async()=>{
            setAddbtn(true)
            setUpdatebtn(false)
           
            if(title.length === '')
                toast.error('Add Title')
            else if(details.length === '')
                toast.error('Add Details')
            else{
                try{
                    const url = createUrl(`/note/insert`)
                    const body ={
                        title : title ,
                        details : details
                    }
                    console.log(" title "+title+" details "+details)
                        const response = await addAllNote(url,body)
                        // console.log(" response "+response.data.status)
                        if(response.data.status === 'success'){
                            setAddFlag(true)
                            loadAllData();
                            toast.success("Note added")
                        }

                }catch(ex){
                    console.log(ex)
                }
            }           
        }

        const signOut=()=>{
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('name')
            navigate("/")
        }

        const editNote=async(id)=>{
            setId(id)
            setAddbtn(true)
            setUpdatebtn(false)
            //get note by id
            try{
                const url = createUrl(`/note/showbyid/${id}`)
                const getResponse = await getNoteById(url)
                // console.log(" response "+getResponse.data.status)
                if(getResponse.data.status === 'success'){
                    // console.log(" getResponse "+getResponse.data.data[0].title)
                    // console.log(" getResponse "+getResponse.data.data[0].details)
                    setTitle(getResponse.data.data[0].title)
                    setDetails(getResponse.data.data[0].details)
                    setAddFlag(false)
                    
                }

            }catch(ex){
                console.log(ex)
            }
        }
        
        const addBtnDown=()=>{
            document.getElementById("titleId").value=""
            document.getElementById("detailsId").value=""
            console.log("hiiihhiihiih")
            setAddFlag(false);
            setUpdatebtn(true);
            setAddbtn(false);
        }

        const updateNote=async()=>{
            try{
                const url = createUrl(`/note/update/${id}`)
                console.log(" iiidddd "+id)
                const body = {
                    title : title ,
                    details : details
                }
               const response =  await updateNoteById(url,body)
               console.log(" update response "+ response.data.status )
               if(response.data.status === 'success'){
                    setAddFlag(true);
                    loadAllData();
                    toast.success('Notes Updated Successfully')
    
               }
            }catch(ex){
                console.log(ex)
            }
          
        }


    return (<>
        <div> 
            <div style={{padding:10}}> </div>
            <header style={{marginLeft:"90%"}}>
                <button className="btn btn-danger" onClick={signOut} >Log Out</button>
            </header>
            <h1 style={{margin:55}}>All Notes By Writer</h1> 

            <center>
            <table className="table table-bordered table-primary table-striped-columns" hidden={addflag} style={{border:1, height
            :"100%" , width:"90%"}}>
                <thead>
                    <tr>
                        {/* <th scope="col">id</th> */}
                        <th scope="col">Title</th>
                        <th scope="col">Details</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td> <input id="titleId" type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Enter Title" /> </td>
                        <td> <input id="detailsId" type="text" value={details} onChange={(e)=>setDetails(e.target.value)} style={{height:50 , width:1000}} placeholder="Enter Details" /> &nbsp; &nbsp; &nbsp;
                        <button className="btn btn-primary" hidden={addbtn} onClick={addNote}>Add Note</button> &nbsp;&nbsp;&nbsp;
                        &nbsp;
                        <button className="btn btn-success" onClick={updateNote} hidden={updatebtn} >Update</button>
                        </td>                        
                    </tr>
                   
                </tbody><br />
               
            </table>
            <br />
            <table className="table table-bordered table-success table-striped-columns" style={{border:1, height
            :"100%" , width:"90%"}}>
                <thead>
                    <tr>
                        {/* <th scope="col">id</th> */}
                        <th scope="col">Id</th>
                        <th scope="col">Title</th>
                        <th scope="col">Details</th>
                        <th scope="col">Writer</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>

                    {
                        data.map((e ,index) =>
                            <tr>
                               
                                {/* <th scope="row">{e.}</th> */}
                                <td>{index+1}</td>
                                <td>{e.title}</td>
                                <td>{e.details}</td>
                                <td>{e.name}</td>
                                                        
                                 <td><Button variant='contained' color="error" startIcon={<Delete />} key={e.id}
                                 onClick={()=>deleteNote(e.id)} >Delete</Button></td>
                                <td><Button variant='contained' color="error" startIcon={<Update />} 
                                onClick={()=>editNote(e.id)} >Edit</Button></td> 
                            </tr>)
                            
                    }
                </tbody>
            </table>
            </center>
            <h2 style={{marginLeft:30}}> Want's to add Notes !!!<button className="btn btn-info" 
            onClick={()=>addBtnDown()}>Add Note</button> </h2>

        </div>

    </>)
}

