import { toast } from "react-toastify";
import { AxiosCall } from "../axiosInstance/AxiosInstance";
async function handleRequest(requestFunction) {
    try {
        const response = await requestFunction();
        return response;
    } catch (ex) {
        console.log(ex);
        if(ex.response && ex.response.status === 400){
            toast.error("Invalid Email or Password!")
        }
        else if (ex.code && ex.code === "ERR_NETWORK") {
            toast.warning("Can't connect to server at the moment! Please try again later.");
        } else {
            toast.error("Some error occurred! Please try again.");
        }
        return null;
    }
}

//SIGNIN
export async function signinUser(url,data){
    return await handleRequest(()=>AxiosCall.post(url,data))
}

//Show All Notes
export async function showAllNotes(url){
    const token = sessionStorage.getItem('token')
    const header ={
        headers:{
            token,
        }
    }
    return await handleRequest(()=>AxiosCall.get(url,header))
}


//anybody can delete note 
export async function deletebyId(url){
    const token = sessionStorage.getItem('token')
    const header ={
        headers:{
            token,
        }
    }
    return await handleRequest(()=>AxiosCall.delete(url,header))
}

//Add Node
export async function addAllNote(url,body){
    const token = sessionStorage.getItem('token')
    const header ={
        headers:{
            token,
        }
    }
    return await handleRequest(()=>AxiosCall.post(url,body,header))
}

//get Note by Id
export async function getNoteById(url){
    const token = sessionStorage.getItem('token')
    const header ={
        headers:{
            token,
        }
    }
    return await handleRequest(()=>AxiosCall.get(url,header))   
}

//upadate Note By NoteId
export async function updateNoteById(url,body){
    const token = sessionStorage.getItem('token')
    const header ={
        headers:{
            token,
        }
    }
    return await handleRequest(()=>AxiosCall.put(url,body,header))
}
