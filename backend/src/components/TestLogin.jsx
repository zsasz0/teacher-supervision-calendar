import React, { useState } from "react";
import axios from "axios";

const TestLogin = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:9999/user/${id}/auth`, {
        pwd: pwd,
      });
      console.log(res.data);
      setResponse(JSON.stringify(res.data));
    } catch (err) {
      console.error(err);
      if (err.response) {
        setResponse(
          `Backend returned status ${err.response.status}: ${JSON.stringify(
            err.response.data
          )}`
        );
      } else if (err.request) {
        setResponse("No response received from server");
      } else {
        setResponse("Error setting up request: " + err.message);
      }
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Test Login API</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID: </label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
        <button type="submit">Send</button>
      </form>
      <div style={{ marginTop: "1rem" }}>
        <strong>Response:</strong>
        <pre>{response}</pre>
      </div>
    </div>
  );
};

export default TestLogin;
