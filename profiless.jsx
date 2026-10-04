import { useState } from "react";
function Profile() {
  const [getname, setname] = useState("");
  const [getphone, setphone] = useState("");
  const [getemail, setemail] = useState("@gmail.com");
  const [geterrorname, seterrorname] = useState(false);
  const [geterrorphone, seterrorphone] = useState(false);
  const [geterroremail, seterroremail] = useState(false);

  function submit(e) {
    e.preventDefault();
    console.log("submit true");
    setname("")
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
        <button>submit</button>
      </form>
    </div>
  );
}
export default Profile;
