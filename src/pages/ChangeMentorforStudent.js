import React, { useState, useEffect } from "react";
import ListData from "../config/ListAll";
import ChangingMentor from "../config/ChangingMentor";
import AddingStudentsToMentor from "../config/AddingStudentsToMentor";
import Loading from "./Loading";

const ChangeMentorforStudent = () => {
  const [mentor, setMentor] = useState("");
  const [student, setStudent] = useState("");
  const [studentSelected, setStudentSelected] = useState([]);
  const [mentorSelected, setMentorSelected] = useState("");
  const [result, setResult] = useState();

  useEffect(() => {
    ListData().then((resultant) => {
      setMentor(resultant.mentor);
      setStudent(resultant.student);
    });
  }, []);

  const submitForm = async () => {
    console.log(studentSelected, "studentsselected");
    console.log(mentorSelected, "mentorSelected");
    const studData = student.filter((s) => {
      return s._id === studentSelected;
    });
    const isAssigned = studData[0].mentorAssigned;
    console.log(studData, "studData");
    console.log(isAssigned, "isAssigned");

    if (isAssigned) {
      //this act as assign new mentor
      const body = {
        studentId: studentSelected,
        newMentorId: mentorSelected,
      };
      const r = await ChangingMentor(body);
      console.log(r, "result on Submit");
      setResult(r);
    } else {
      //this acts as a modify mentor
      const body = {
        mentorId: mentorSelected,
        studentsArray: new Array(studentSelected),
      };
      const r = await AddingStudentsToMentor(body);
      console.log(r, "result on Submit");
      setResult(r);
    }
  };

  return (
    <div className="container">

      {
        student
          ? <div className="row d-flex flex-column">
            <h2 className="text-center my-3">Change Students for Mentor</h2>
            <div className="col my-3">
              <div>
                <label className="form-label">Select Student</label>
                {student && (
                  <select
                    className="form-control"
                    onChange={(ev) => {
                      setStudentSelected(ev.target.value);
                    }}
                  >
                    <option>Select Student</option>
                    {student &&
                      student.map((stud) => {
                        return (
                          <option value={stud._id} key={stud._id}>
                            {stud.name}
                          </option>
                        );
                      })}
                  </select>
                )}
              </div>
            </div>
            <div className="col my-3">
              <div>
                <label className="form-label">Select Mentor</label>
                <select
                  className="form-control"
                  onChange={(ev) => {
                    setMentorSelected(ev.target.value);
                  }}
                >
                  <option>Select Mentor</option>
                  {mentor &&
                    mentor.map((ment) => {
                      return (
                        <option value={ment._id} key={ment._id}>
                          {ment.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="my-3 col">
              <button type="button" className='btn btn-success' onClick={() => submitForm()}>
                Submit
              </button>
            </div>

            {result && (
              <div
                id="liveToast"
                className={result.status === 200 ? "toast show" : "toast"}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
              >
                <div className="toast-header">
                  <strong className="me-auto">Status</strong>
                  <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">{result.data}</div>
              </div>
            )}
          </div>
          : <Loading />
      }
    </div>
  );
};

export default ChangeMentorforStudent;
