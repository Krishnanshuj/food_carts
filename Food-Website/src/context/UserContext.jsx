import React,{createContext,useState} from "react";
import { food_items } from "../food";

export const DataContext=createContext()
function UserContext({children}){
    let [cate,setCate]=useState(food_items)
    let[input,setInput]=useState("")
    let[showCart,setShowCart]=useState(false)
    
    let data={
input,
setInput,
cate,
setCate,
showCart,
setShowCart,
    }
    return(
        <div>
        <DataContext.Provider value={data}>
        {children}
        </DataContext.Provider>
        </div>
    )
}
export default UserContext 