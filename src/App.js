import React from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [licenseType, setLicenseType] = React.useState(""); // passport, national_id, driver_license, voter, ssnit
  const [nationality, setNationality] = React.useState(""); // gh, ng, ke, ug
  const [id, setId] = React.useState("");
  const [full_name] = React.useState("");
  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [date_of_birth, setDOB] = React.useState(new Date());
  const [response, setResponse] = React.useState({});
  const [status, setStatus] = React.useState("init");

  const testCards = [
    {
      country: "Ghana",
      cards: [
        {
          type: "Voter Card",
          id_number: "2000100000",
          first_name: "Elizabeth",
          last_name: "Adjei",
          date_of_birth: "1996-02-21",
        },
        {
          type: "Passport",
          id_number: "G0000000",
          first_name: "Evans",
          last_name: "Amankwah",
          date_of_birth: "1986-04-05",
        },
        {
          type: "SSNIT",
          id_number: "C000007000001",
          first_name: "Michael",
          last_name: "Essien",
          date_of_birth: "",
        },
        {
          type: "Driver License",
          id_number: "G0000001",
          first_name: "Kwabena",
          last_name: "Aikens",
          date_of_birth: "1992-04-05",
        },
        {
          type: "TIN",
          id_number: "C0000000002",
          first_name: "",
          last_name: "",
          date_of_birth: "",
        },
      ],
    },
    {
      country: "Nigeria",
      cards: [
        {
          type: "Voter Card",
          id_number: "90F5B0407E2960502637",
          first_name: "Nwabia",
          last_name: "Chidozie",
          date_of_birth: "1998-01-10",
        },
        {
          type: "Passport",
          id_number: "A50013320",
          first_name: "Ifeanyi",
          last_name: "Nduka",
          date_of_birth: "1981-02-14",
        },
        {
          type: "Passport",
          id_number: "A01796255",
          first_name: "Ifeanyi",
          last_name: "Nduka",
          date_of_birth: "1981-02-14",
        },
        {
          type: "Passport",
          id_number: "A06324464",
          first_name: "Felix",
          last_name: "Nnadi",
          date_of_birth: "1970-12-28",
        },
        {
          type: "National ID",
          id_number: "AKW06968AA2",
          first_name: "Michael",
          last_name: "Olugbenga",
          date_of_birth: "1982-05-20",
        },
        {
          type: "Driver License",
          id_number: "ABC00578AA2",
          first_name: "Henry",
          last_name: "Nwandicne",
          date_of_birth: "1976-04-15",
        },
        {
          type: "Driver License",
          id_number: "EKY00003AA01",
          first_name: "Esther",
          last_name: "Olatunde",
          date_of_birth: "1986-07-17",
        },
        {
          type: "BVN",
          id_number: "22000000900",
          first_name: "Ayodele",
          last_name: "Obasooto",
          date_of_birth: "1988-10-20",
        },
        {
          type: "TIN",
          id_number: "00000000-0001",
          first_name: "",
          last_name: "",
          date_of_birth: "",
        },
      ],
    },
    {
      country: "Kenya",
      cards: [
        {
          type: "National ID",
          id_number: "00000001",
          first_name: "Fiona",
          last_name: "Nyawera",
          date_of_birth: "1986-05-13",
        },
        {
          type: "National ID",
          id_number: "00000002",
          first_name: "Joyce",
          last_name: "Maina",
          date_of_birth: "1981-02-14",
        },
        {
          type: "Passport",
          id_number: "A0000003",
          first_name: "Fiona",
          last_name: "Nyawera",
          date_of_birth: "1981-02-14",
        },
        {
          type: "Passport",
          id_number: "A0000004",
          first_name: "Joyce",
          last_name: "Maina",
          date_of_birth: "1981-02-14",
        },
      ],
    },
  ];

  const handleSubmit = async () => {
    const data = {
      id,
      full_name,
      date_of_birth: moment(date_of_birth).format("YYYY-MM-DD"),
      // picture: "string",
    };
    console.log(data);
    try {
      setStatus("submitting");
      let req = await axios({
        method: "post",
        url: `${process.env.REACT_APP_APPRUVE_BASE_URL}/v1/verifications/${nationality}/${licenseType}`,
        data,
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_APPRUVE_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const { data: response } = req;
      console.log(response);
      setResponse(response);
      setStatus("loaded");
    } catch (err) {
      console.error(err);
      const { data } = await err.response;
      console.log(data);
      setResponse(data);
      setStatus("loaded");
    }
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ padding: "2rem" }}>
          <strong>Test Cards</strong>
          <pre
            style={{
              padding: ".25rem .5rem",
              overflowX: "scroll",
              backgroundColor: "e3e3e3",
            }}
          >
            {JSON.stringify(testCards, null, 2)}
          </pre>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          style={{ padding: "2rem" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "1rem",
            }}
          >
            <label htmlFor="licenseType" style={{ marginBottom: "1rem" }}>
              License Type
            </label>
            <select
              name="licenseType"
              id="licenseType"
              onChange={(e) => setLicenseType(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="driver_license">Driver's License</option>
              <option value="passport">Passport</option>
              <option value="voter">Voter ID</option>
              <option value="national_id">National ID</option>
              <option value="bvn">BVN</option>
            </select>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "1rem",
            }}
          >
            <label htmlFor="nationality" style={{ marginBottom: "1rem" }}>
              Nationality
            </label>
            <select
              name="nationality"
              id="nationality"
              onChange={(e) => setNationality(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="gh">Ghana</option>
              <option value="ng">Nigeria</option>
              <option value="ke">Kenya</option>
            </select>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "1rem",
            }}
          >
            <label htmlFor="nationality" style={{ marginBottom: "1rem" }}>
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={first_name}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "1rem",
            }}
          >
            <label htmlFor="nationality" style={{ marginBottom: "1rem" }}>
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={last_name}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "1rem",
            }}
          >
            <label htmlFor="nationality" style={{ marginBottom: "1rem" }}>
              ID Number
            </label>
            <input
              type="text"
              name="idNumber"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "1rem",
            }}
          >
            <label htmlFor="nationality" style={{ marginBottom: "1rem" }}>
              Date of Birth
            </label>
            <DatePicker
              selected={date_of_birth}
              onChange={(date) => setDOB(date)}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
        <div style={{ padding: "2rem" }}>
          <p>{licenseType}</p>
          <p>{nationality}</p>
          <p>{id}</p>
          <p>{first_name}</p>
          <p>{last_name}</p>
          <p>{moment(date_of_birth).format("YYYY-MM-DD")}</p>
          <div style={{ marginTop: "2rem" }}>
            <strong>Response</strong>
          </div>

          {status === "init" && null}
          {status === "submitting" && <p>Submitting...</p>}
          {status === "loaded" && (
            <pre>{JSON.stringify(response, null, 2)}</pre>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
