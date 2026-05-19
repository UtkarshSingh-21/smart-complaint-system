import { useEffect, useState } from "react";
import API from "../services/api";
import "./Dashboard.css";

const Dashboard = () => {

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {

    fetchComplaints();

  }, []);

  const fetchComplaints = async () => {

    try {

      const res = await API.get("/complaints");

      setComplaints(res.data);

    } catch (error) {

      console.log(error);

      alert("Failed to load complaints");
    }
  };

  return (

    <div className="dashboard-container">

      <h1 className="dashboard-title">
        All Complaints
      </h1>

      <div className="complaints-grid">

        {complaints.map((complaint) => (

          <div
            className="complaint-card"
            key={complaint._id}
          >

            <h2>
              {complaint.title}
            </h2>

            <p className="description">
              {complaint.description}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {complaint.status}
            </p>

            <p>
              <strong>Priority:</strong>{" "}
              {complaint.priority}
            </p>

            <p>
              <strong>Department:</strong>{" "}
              {complaint.department}
            </p>

            <div className="ai-box">

              <h3>
                🤖 AI Analysis
              </h3>

              <p>
                AI detected this complaint as{" "}
                <strong>
                  {complaint.priority}
                </strong>{" "}
                priority.
              </p>

              <p>
                Suggested Department:
                <strong>
                  {" "}
                  {complaint.department}
                </strong>
              </p>

              <p>
                AI Response:
                Complaint forwarded successfully.
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Dashboard;