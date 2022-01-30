import React, { useState, useEffect } from "react";
import ListMentor from "../config/ListMentor";
import ListData from "../config/ListAll";
import Loading from './Loading'
const AllStudentsforEachMentor = () => {
  const [mentorDetails, setmentorDetails] = useState();
  const [state, setState] = useState();
  const [mentorName, setMentorName] = useState();

  useEffect(() => {
    ListData().then((result) => {
      setMentorName(result.mentor);
    });
    return () => {
      setMentorName("");
    };
  }, []);

  const submitForm = () => {
    ListMentor(state).then((result) => {
      setmentorDetails(result);
    });
  };
  if (!mentorName) {
    return <p><Loading /></p>;
  }

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <h2 className="text-center my-3">Students for a Mentor</h2>

        <div className="col my-3">
          <div>
            <label className="form-label">Select Mentor</label>
            <select className="form-control" onChange={(ev) => setState(ev.target.value)}>
              <option>Select Mentor</option>
              {mentorName &&
                mentorName.map((ment) => {
                  return (
                    <option value={ment._id} key={ment._id}>
                      {ment.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            <button type="button" className='my-3 btn btn-success' onClick={() => submitForm()}>
              Submit
            </button>
          </div>
        </div>

        <div className="col">
          {mentorDetails ? (
            <ul className="list-group">
              {mentorDetails.studentsAssigned.map((stud) => (
                <li className="list-group-item" key={stud._id}>{stud.name}</li>
              ))}
            </ul>
          ) : (
            ""
          )}
          {mentorDetails
            ? mentorDetails.studentsAssigned.length < 1
              ? "No Students Assigned"
              : ""
            : ""}
        </div>
      </div>
    </div>
  );
};

export default AllStudentsforEachMentor;
