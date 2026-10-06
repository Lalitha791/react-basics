import { useEffect, useState } from "react";
function Profile() {
  const [getname, setname] = useState("");
  const [getphone, setphone] = useState("");
  const [getemail, setemail] = useState("@gmail.com");
  const [geterrorname, seterrorname] = useState(false);
  const [geterrorphone, seterrorphone] = useState(false);
  const [geterroremail, seterroremail] = useState(false);
  const [studentdata, setstudentdata] = useState([]);
  const [studentcount, setstudentcount] = useState(0);
  const [updateid,setupdateid]=useState("");

  const isdisabled = !getname || !getphone;

  // create call
  async function submit(e) {
    e.preventDefault();

    const response = await fetch(
      "https://api.elurucoders.online/api/students",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: getname,
          email: getemail,
          phone: getphone,
        }),
      },
    );

    const data = await response.json();
    console.log(data);

    setname("");
  }

  // get api call for the all student  data

  const fetchStudents = async () => {
    const response = await fetch("https://api.elurucoders.online/api/students");
    const result = await response?.json();
    setstudentdata(result?.data);
    setstudentcount(result?.count);
    console.log(result?.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // get api call for the student indivual data

  const handleEdit = async (studentId) => {
    setupdateid(studentId)
    console.log("studentId", studentId);
    try {
      const response = await fetch(
        `https://api.elurucoders.online/api/students/${studentId}`,
      );
      const jsonResult = await response.json();
      console.log("jsonResult", jsonResult.data);
      setname(jsonResult.data.name);
      setphone(jsonResult.data.phone);
      setemail(jsonResult.data.email);
    } catch (error) {
      console.error("Error fetching single student:", error);
    }
  };

  // update function
  async function update() {
    const response = await fetch(
      `https://api.elurucoders.online/api/students/${updateid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
           name: getname,
          email: getemail,
          phone: getphone,
        }),
      },
    );
    const data = await response.json();
    fetchStudents();
  }


// delete call 
  const handleDelete = async (studentId) => {
    console.log("studentId", studentId);
    try {
      const response = await fetch(
        `https://api.elurucoders.online/api/students/${studentId}`,
        { method: "DELETE" },
      );
      const jsonResult = await response.json();
      console.log("jsonResult", jsonResult.data);
      fetchStudents();
    } catch (error) {
      console.error("Error fetching single student:", error);
    }
  };

// form conditions

  function handleErrorName() {
    getname === "" ? seterrorname(true) : seterrorname(false);
  }
  function handleErrorPhone() {
    getphone === "" ? seterrorphone(true) : seterrorphone(false);
  }
  function handleErrorEmail() {
    getemail === "@gmail.com" ? seterroremail(true) : seterroremail(false);
  }
// display content and  form with (submit, update)button  and table
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
        <button onClick={update}>Update</button>
      </form>



      <h1>list {studentcount}</h1>
      <table border="1">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>action1</th>
            
          </tr>
        </thead>

        <tbody>
          {studentdata?.map((student, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.phone}</td>
              <td>{student.email}</td>
              <td>
                <button onClick={() => handleEdit(student._id)}>edit</button>
                <button onClick={() => handleDelete(student._id)}> delete </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Profile;