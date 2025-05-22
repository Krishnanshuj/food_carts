import React, { useContext } from "react";
import Nav from "../Components/Nav";
import categories from "../categories";
import Card from "../Components/Card";
import Card2 from "../Components/Card2";
import { food_items } from "../food";
import { DataContext } from "../context/UserContext";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
function Home(){
  let {cate,setCate,input,setInput,showCart,setShowCart}=useContext(DataContext)

function filter (category){
  if(category==="All"){
    
    setCate(food_items)
  }else{
    const newList=food_items.filter(
      (item)=>item.food_category===category)
    setCate(newList)
  }
}
let items=useSelector(state=>state.cart)

let subtotal=items.reduce((total,item)=>total+item.qty*item.price,0)
let deliveryFee=20;
let taxes=subtotal*0.5/100;
let total=Math.floor(subtotal+deliveryFee+taxes);
    return(
        <>
    <div className="bg-gray-200 w-full min-h-screen">
       <Nav/>
       {!input?<div className=" flex flex-wrap justify-center items-center gap-4 w-[100%] ">
         {categories.map((item,index)=>{
            return <div
            key={index}
       onClick={()=>filter(item.name)}
            className="w-[140px] h-[140px] bg-white flex flex-col gap-5 p-5 items-start text-[20px] font-semibold text-gray-600 rounded-lg shadow-xl hover:bg-green-200 cursor-pointer transition-all" >
                {item.icon}
                {item.name}
            </div>
         })}
       </div>:null}

       

       <div className="w-full flex flex-wrap justify-center gap-6 p-6">
        {cate.map((item)=>(
           <Card 
           key={item.id}
           name={item.food_name} 
           image={item.food_image} 
           price={item.price} 
           id={item.id} 
           type={item.food_type}
            />

        ))}
       
    </div>

    <div className={`w-full md:w-[40vw] h-[100%] fixed  top-0 right-0 bg-white shadow-xl p-6 transition-all duration-500 flex flex-col items-center overflow-auto ${showCart?"translate-x-0":"translate-x-full"}`}>
      <header className="w-[100%] flex justify-between items-center">
<span className="text-green-400 text-[18px] font-semibold">order Items</span>
<RxCross2 className="w-[30px] h-[30px] text-green-400 text-18px font-semibold cursor-pointer hover:text-gray-700" onClick={()=>setShowCart(false)}/>
      </header>
      {items.length>0?<>
      <div className="w-full mt-9 flex flex-col gap-8 ">
        {items.map((item)=>(
          <Card2 key={item.id} name={item.name} price={item.price} image={item.image} id={item.id} qty={item.qty}  />
        ))}
      
      </div>
      <div className="w-full mt-7 border-t-2 border-b-2 border-gray-400 flex flex-col gap-2 p-8 ">
<div className="w-full flex justify-between items-center">
  <span className="text-lg text-gray-400 font-semibold">Subtotal</span>
  <span className="text-green-400 font-semibold text-lg">Rs {subtotal}/-</span>
</div>

<div className="w-full flex justify-between items-center">
  <span className="text-lg text-gray-400 font-semibold">Delivery Fee</span>
  <span className="text-green-400 font-semibold text-lg">Rs {deliveryFee}/-</span>
</div>

<div className="w-full flex justify-between items-center">
  <span className="text-lg text-gray-400 font-semibold">Taxes</span>
  <span className="text-green-400 font-semibold text-lg">Rs {taxes}/-</span>
</div>
      </div>
      <div className="w-full flex justify-between items-center p-8 ">
  <span className="text-2xl text-gray-400 font-semibold">Total</span>
  <span className="text-green-400 font-semibold text-2xl">Rs {total}/-</span>
</div>
<button className="w-[80%] p-3 rounded-lg bg-green-300 text-gray-700 hover:bg-green-400 transition-all" onClick={()=>{toast.success("Order Placed")}}>Place Order</button>
</>:<div className="text-center text-2xl text-green-400 font-semibold pt-5">Empty Cart</div>}
      
    </div>
    </div>

    
    </>
  )
}

export default Home