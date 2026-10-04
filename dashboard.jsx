import { useState } from "react";

function Dashboard() {
    const [outputname ,inputname]=useState("lilatha");
    const [getname ,setname]=useState("lilatha");

  return (
    <div>
         <p>{getname}</p>
         <input type="text" onChange={(e)=>setname(e.target.value)} />
         <p>{outputname}</p>
      <p> welcome to my page  </p>
    </div>
  );
}


export default Dashboard;
