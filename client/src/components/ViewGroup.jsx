import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ViewGroup() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    async function fetchGroupDetails() {
      try {
        const response = await axios.get(`http://localhost:3000/groups/${id}`);
        setGroup(response.data);
      } catch (error) {
        console.error("Error fetching group details:", error.message);
      }
    }

    fetchGroupDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/groups/${id}`);
      navigate("/groups"); // Use navigate to go back to home page
    } catch (error) {
      console.error("Error deleting group:", error.message);
    }
  };

  return (
    <div>
      <h1>Group Details</h1>
      {group ? (
        <>
          <h2>Group Name: {group.name}</h2>
          <p>Created At: {new Date(group.created_at).toLocaleDateString()}</p>
          <h3>Members:</h3>
          <ul>
            {group.members.map((member) => (
              <li key={member._id}>{member.name}</li>
            ))}
          </ul>
          <button onClick={handleDelete}>Delete Group</button>
        </>
      ) : (
        <p>Loading group details...</p>
      )}
      <Link to="/groups">All Groups</Link>
    </div>
  );
}

export default ViewGroup;
