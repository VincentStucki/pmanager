"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [orgUser, setOrgUser] = useState([]);

  function buttonHandler() {
    fetch("http://localhost:8080/manageusers")
        .then((response) => response.json())
        .then((data) => {
          setOrgUser(data);
        });
  }
  return (
    <div>
      <button onClick={buttonHandler}>Fetch Users</button>
      <ul>
        {orgUser.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}
