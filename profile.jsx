
import { useState } from "react";
function Profile() {
  const [getname, setname]=useState("hello world"); 
  const [out, inp]=useState("hello ");  
  const [get1, set1]=useState(""); 
  return (

    <div>
        <p>{getname}</p>
        <input type="text" onChange={(e)=>setname(e.target.value)} />
        <p>{get1}</p>
        <input type="text" onChange={(e)=>set1(e.target.value)} />   
      <p> welcome to my Profile page  </p>
    </div>
  );
}
export default Profile ;
