"use client"
import { useState } from "react";

export default function Todo() {

  const [c, setC] = useState([])
  console.log(c)
  
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <form>
  <div className="flex space-x-2 items-center my-6">
    <input
      type="text"
      id="text"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="enter todo..."
      required=""
    />
  <button onClick={()=>{setC((oldC)=>{
    const newState = [...oldC, "zoi"]
return newState
  })}}
  type="button"
    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    Add
  </button>
  </div>
</form>
{c.map((value,index)=>{
return <p key={index}>this is our {value}</p>
})}

</div>
</section>
  )
}
