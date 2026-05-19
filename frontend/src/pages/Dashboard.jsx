import { useEffect, useState } from "react";

import API from "../services/api";

function Dashboard() {

  const [complaints, setComplaints] =
    useState([]);

  useEffect(() => {

    fetchComplaints();

  }, []);

  const fetchComplaints = async () => {

    try {

      const res = await API.get(
        "/complaints"
      );

      setComplaints(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="dashboard">

      <h1>All Complaints</h1>

      <div className="card-grid">

        {complaints.map((item) => (

          <div
            className="complaint-card"
            key={item._id}
          >

            <h2>{item.title}</h2>

            <p>{item.description}</p>

            <p>
              <strong>Status:</strong>
              {item.status}
            </p>

            <p>
              <strong>Priority:</strong>
              {item.priority}
            </p>

            <p>
              <strong>Department:</strong>
              {item.department}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Dashboard;