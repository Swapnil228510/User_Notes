import { constants } from "./constant";

export function createUrl(path){
    return constants.serverUrl + path
}

export function log(message){
    console.log(message)
}