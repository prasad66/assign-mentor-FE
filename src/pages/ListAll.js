import React, { useEffect, useState } from "react";
import Loading from './Loading'
import ListData from "../config/ListAll";

const ListAll = () => {
  useEffect(() => {
    ListData().then(({ student, mentor }) => {
      setMentorState(mentor);
      setStudentState(student);
      return () => {
        setMentorState("");
        setStudentState("");
      };
    });
  }, []);

  const [studentState, setStudentState] = useState(null);
  const [mentorState, setMentorState] = useState(null);

  return (
    <div className="container ">
      {
        studentState 
        ? <div className="row d-flex flex-column mt-5">
            <div className="col">
              {/* list students */}
              {studentState && (
                <>
                  <h2>Students</h2>
                  <table className="table table-hover table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Course</th>
                        <th>Mentor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentState.map((stud) => {
                        return (
                          <tr key={stud._id}>
                            <td>{stud.name}</td>
                            <td>{stud.email}</td>
                            <td>{stud.course}</td>
                            <td>
                              {stud.mentorAssigned
                                ? "Mentor Assigned"
                                : "Not Assigned"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </>
              )}
            </div>
            <div className="col">
              {/* list mentors */}
              {mentorState && (
                <>
                  <h2 className="mt-3">Mentor Data</h2>
                  <table className="table table-hover table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Expertise</th>
                        <th>Students</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mentorState.map((ment) => {
                        return (
                          <tr key={ment._id}>
                            <td>{ment.name}</td>
                            <td>{ment.email}</td>
                            <td>{ment.expertise}</td>
                            <td>
                              {ment.studentsAssigned.length > 0
                                ? "Students Assigned"
                                : "Not Assigned"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        : <Loading />
      }

    </div>
  );
};

export default ListAll;
