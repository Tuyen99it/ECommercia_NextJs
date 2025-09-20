"use client";
import { useEffect } from "react";

const Home=()=>{
    useEffect(()=>{
        console.log("rendered");
    },[])
    return (
        <div >
            Home page
        </div>
    )
}
export default Home;