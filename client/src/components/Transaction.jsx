import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import url from "../url";
import ClipLoader from "react-spinners/ClipLoader";

function Transaction() {
  const { id } = useParams();
  const [members, setMembers] = useState([]);
  const [transactions, setTransactions] = useState([
    { payer: "", receiver: "", amount: "" },
  ]);
  const [responseData, setResponseData] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchGroupMembers() {
      try {
        let user = localStorage.getItem("user");
        user = JSON.parse(user);
        const response = await axios.get(`${url}/groups/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setMembers(response.data.members);
      } catch (error) {
        console.error("Error fetching group members:", error.message);
      }
    }

    fetchGroupMembers();
  }, [id]);

  const handleInputChange = (index, field, value) => {
    const updatedTransactions = [...transactions];
    updatedTransactions[index][field] = value;
    setTransactions(updatedTransactions);
  };

  const handleAddTransaction = () => {
    setTransactions([...transactions, { payer: "", receiver: "", amount: "" }]);
  };

  const handleRemoveTransaction = (index) => {
    const updatedTransactions = [...transactions];
    updatedTransactions.splice(index, 1);
    setTransactions(updatedTransactions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${url}/transaction`, transactions);
      const size = Object.keys(response.data).length;
      if (size) setResponseData(response.data);
      else setResponseData("No transaction required");
      setLoading(false);
    } catch (error) {
      console.error("Error submitting transactions:", error.message);
    }
  };
  return (
    <div className="container mt-5">
      <h2>Create Transaction</h2>
      <form onSubmit={handleSubmit}>
        {transactions.map((transaction, index) => (
          <div className="form-row mb-3" key={index}>
            <div className="col mb-1">
              <select
                required
                className="form-select"
                value={transaction.payer}
                onChange={(e) =>
                  handleInputChange(index, "payer", e.target.value)
                }
              >
                <option value="">Select Payer</option>
                {members.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col mb-1">
              <select
                required
                className="form-select"
                value={transaction.receiver}
                onChange={(e) =>
                  handleInputChange(index, "receiver", e.target.value)
                }
              >
                <option value="">Select Receiver</option>
                {members.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col mb-1">
              <input
                required
                type="number"
                className="form-control"
                placeholder="Amount"
                value={transaction.amount}
                onChange={(e) =>
                  handleInputChange(index, "amount", e.target.value)
                }
                min={0}
              />
            </div>
            <div className="col">
              <button
                type="button"
                className="btn btn-danger me-2 mb-2"
                onClick={() => handleRemoveTransaction(index)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-primary me-2 mb-2 mt-2"
          onClick={handleAddTransaction}
        >
          Add Transaction
        </button>
        <button type="submit" className="btn btn-success me-2 mb-2 mt-2">
          Submit
        </button>
      </form>
      {loading ? (
        <ClipLoader/>
      ) : (
        responseData && (
          <div className="mt-4 border p-3">
            <h3>Response from server</h3>
            {responseData === "No transaction required" ? (
              <h5>No transaction required</h5>
            ) : (
              responseData.map((ele, ind) => (
                <div key={ind}>
                  <h5>
                    {ele.payer} gives {ele.receiver} = {ele.amount}
                  </h5>
                </div>
              ))
            )}
          </div>
        )
      )}
    </div>
  );
}

export default Transaction;
