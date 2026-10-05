import { useState, useEffect } from "react";

function Profile() {
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
  const [studentdata, setstudentdata] = useState([]);
  const [studentcount, setstudentcount] = useState(0);

  async function handleSubmit(e) {
    e.preventDefault();

    let errors = [];

    if (name === "") {
      errors.push("Name");
    }

    if (phone === "") {
      errors.push("Phone");
    }

    if (email === "") {
      errors.push("Email");
    }

    if (errors.length > 0) {
      setmessage("Please enter " + errors.join(", "));
      return;
    }

    const response = await fetch(
      "https://api.elurucoders.online/api/students",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
        }),
      },
    );

    const info = await response.json();

    console.log(info);

    setmessage("Details submitted successfully");

    setname("");
    setphone("");
    setemail("");
  }
  // get api call for all student data

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
    console.log("studentId", studentId);
    try {
      const response = await fetch(
        `https://api.elurucoders.online/api/students/${studentId}`,
      );
      const jsonResult = await response.json();
      console.log("jsonResult", jsonResult.data);
      setname(jsonResult.data.name);
    } catch (error) {
      console.error("Error fetching single student:", error);
    }
  };

  return (
    <div>
      <p>hello world</p>

      <form onSubmit={handleSubmit}>
        <label>Name</label>

        <input
          type="text"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />

        <br />
        <br />

        <label>Phone</label>

        <input
          type="text"
          value={phone}
          onChange={(e) => setphone(e.target.value)}
        />

        <br />
        <br />

        <label>Email</label>

        <input
          type="text"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Submit</button>

        <p
          style={{
            color:
              message === "Details submitted successfully" ? "green" : "red",
          }}
        >
          {message}
        </p>
      </form>

      <table border="1">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>action</th>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Profile;
