import { useState } from "react";
function Profile() {
  const [getname, setname] = useState("");
  const [getphone, setphone] = useState("");
  const [getemail, setemail] = useState("@gmail.com");
  const [geterrorname, seterrorname] = useState(false);
  const [geterrorphone, seterrorphone] = useState(false);
  const [geterroremail, seterroremail] = useState(false);
  
  const isdisabled = !getname || !getphone;

  async function submit(e) {
    debugger
    e.preventDefault();

    const response = await fetch("https://api.elurucoders.online/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: getname,
        email: getemail,
        phone: getphone,
      }),
    });

    const data = await response.json();
    console.log(data);

    setname("");
  }

  function handleErrorName() {
    getname === "" ? seterrorname(true) : seterrorname(false);
  }
  function handleErrorPhone() {
    getphone === "" ? seterrorphone(true) : seterrorphone(false);
  }

  function handleErrorEmail() {
    getemail === "@gmail.com" ? seterroremail(true) : seterroremail(false);
  }
  console.log(!getname);
  console.log(!getphone);

  return (
    <div>
      <p> welcome to my Profile page </p>
      <form onSubmit={submit}>
        <label>
          name<span style={{ color: getname === "" ? "red" : "black" }}>*</span>
        </label>
        <input
          type="text"
          onChange={(e) => setname(e.target.value)}
          placeholder="enter a name "
          value={getname}
          onBlur={handleErrorName}
        />
        {geterrorname && getname == "" && (
          <p style={{ color: "red", backgroundColor: "greenyellow" }}>
            {"name is required"}
          </p>
        )}
        <br />

        <label>phone</label>
        <input
          type="text"
          onChange={(e) => setphone(e.target.value)}
          placeholder="enter num "
          value={getphone}
          onBlur={handleErrorPhone}
        />
        {geterrorphone && getphone == "" && <p>{"phn no is required"}</p>}
        <br />

        <label>email</label>
        <input
          type="text"
          onChange={(e) => setemail(e.target.value)}
          placeholder="enter email "
          value={getemail}
          onBlur={handleErrorEmail}
        />
        {geterroremail && getemail == "@gmail.com" && <p>{"email is req"}</p>}
        <button disabled={isdisabled}>submit</button>
      </form>
    </div>
  );
}
export default Profile;
