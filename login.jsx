import { useState, useEffect } from "react";

function Profile() {
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
  const [studentdata, setstudentdata] = useState([]);
  const [studentcount, setstudentcount] = useState(0);
  const [updateid, setupdateid] = useState("");

  // CREATE
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

    fetchStudents();
  }

  // GET ALL STUDENTS
  const fetchStudents = async () => {
    const response = await fetch("https://api.elurucoders.online/api/students");

    const result = await response.json();

    setstudentdata(result?.data);
    setstudentcount(result?.count);

    console.log(result?.data);
  };

  // RUN WHEN PAGE LOADS
  useEffect(() => {
    fetchStudents();
  }, []);

  // GET INDIVIDUAL STUDENT
  const handleEdit = async (studentId) => {
    setupdateid(studentId);

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

  // UPDATE
  async function update() {
    if (updateid === "") {
      setmessage("Please select a student to update");
      return;
    }

    const response = await fetch(
      `https://api.elurucoders.online/api/students/${updateid}`,
      {
        method: "PUT",
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

    const data = await response.json();

    console.log(data);

    setmessage("Details updated successfully");

    setname("");
    setphone("");
    setemail("");
    setupdateid("");

    fetchStudents();
  }

  // DELETE
  const handleDelete = async (studentId) => {
    console.log("studentId", studentId);

    try {
      const response = await fetch(
        `https://api.elurucoders.online/api/students/${studentId}`,
        {
          method: "DELETE",
        },
      );

      const jsonResult = await response.json();

      console.log("jsonResult", jsonResult.data);

      setmessage("Student deleted successfully");

      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div>
      <p>Hello World</p>

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

        <button type="button" onClick={update}>
          Update
        </button>

        <button type="submit">Submit</button>

        <p
          style={{
            color:
              message === "Details submitted successfully" ||
              message === "Details updated successfully" ||
              message === "Student deleted successfully"
                ? "green"
                : "red",
          }}
        >
          {message}
        </p>
      </form>

      <h1>List {studentcount}</h1>

      <table border="1">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Action1</th>
            <th>Action2</th>
          </tr>
        </thead>

        <tbody>
          {studentdata?.map((student, index) => (
            <tr key={student._id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.phone}</td>
              <td>{student.email}</td>

              <td>
                <button type="button" onClick={() => handleEdit(student._id)}>
                  Edit
                </button>
              </td>

              <td>
                <button type="button" onClick={() => handleDelete(student._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Profile;
