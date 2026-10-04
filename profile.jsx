import { useState } from "react";
function Profile() {
  const [getname, setname] = useState("");
  const [getphone, setphone] = useState();
  const [getemail, setemail] = useState("@gmail.com");
function submit(e){
e.preventDefault()
  console.log(getname);
  console.log(getemail);
  console.log(getphone);
  }
  return (
    <div>
      <p> welcome to my Profile page </p>
      <form onSubmit={submit}>
        <label>name</label>
        <input
          type="text"
          onChange={(e) => setname(e.target.value)}
          placeholder="enter a name "
          value={getname}
        />
        <br></br>
        <label>phone</label>
        <input
          type="text"
          onChange={(e) => setphone(e.target.value)}
          placeholder="enter num "
          value={getphone}
        />
        <br></br>

        <label>email</label>
        <input
          type="text"
          onChange={(e) => setemail(e.target.value)}
          placeholder="enter email "
          value={getemail}
        />
    <button>submit</button>
      </form>
    </div>
  );
}
export default Profile;
