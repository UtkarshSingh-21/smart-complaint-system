import { useState } from "react";

import API from "../services/api";

function ComplaintForm() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    category: "",
    location: "",
  });

  const [aiResult, setAiResult] = useState(null);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const aiRes = await API.post(
        "/ai/analyze",
        {
          description: form.description,
          category: form.category,
        }
      );

      setAiResult(aiRes.data);

      const finalData = {
        ...form,
        ...aiRes.data,
      };

      await API.post(
        "/complaints",
        finalData
      );

      alert("Complaint Added");

    } catch (error) {

      console.log(error);

      alert("Error");
    }
  };

  return (

    <div className="page">

      <form
        className="complaint-form"
        onSubmit={handleSubmit}
      >

        <h1>Add Complaint</h1>

        <input
          placeholder="Name"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          placeholder="Title"
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Description"
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <input
          placeholder="Category"
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
            })
          }
        />

        <input
          placeholder="Location"
          onChange={(e) =>
            setForm({
              ...form,
              location: e.target.value,
            })
          }
        />

        <button type="submit">
          Submit Complaint
        </button>

      </form>

      {aiResult && (

        <div className="ai-card">

          <h2>AI Analysis</h2>

          <p>
            <strong>Priority:</strong>
            {aiResult.priority}
          </p>

          <p>
            <strong>Department:</strong>
            {aiResult.department}
          </p>

          <p>
            <strong>Summary:</strong>
            {aiResult.summary}
          </p>

          <p>
            <strong>Response:</strong>
            {aiResult.aiResponse}
          </p>

        </div>
      )}

    </div>
  );
}

export default ComplaintForm;