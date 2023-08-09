import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
function Transaction() {
  const { id } = useParams();
  const [members, setMembers] = useState([]);
  const [transactions, setTransactions] = useState([
    { payer: "", receiver: "", amount: "" },
  ]);
  const [responseData, setResponseData] = useState("");

  useEffect(() => {
    async function fetchGroupMembers() {
      try {
        let user = localStorage.getItem("user");
        user = JSON.parse(user);
        const response = await axios.get(`http://localhost:3000/groups/${id}`, {
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
    try {
      const response = await axios.post(
        `http://localhost:3000/transaction`,
        transactions
      );
      console.log(response.data)
      const size = Object.keys(response.data).length;
      if (size) setResponseData(response.data);
      else setResponseData("No transaction required");
    } catch (error) {
      console.error("Error submitting transactions:", error.message);
    }
  };

  return (
    <div>
      <h2>Create Transaction</h2>
      <form onSubmit={handleSubmit}>
        {transactions.map((transaction, index) => (
          <div key={index}>
            <select
              required
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
            <select
              required
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
            <input
              required
              type="number"
              placeholder="Amount"
              value={transaction.amount}
              onChange={(e) =>
                handleInputChange(index, "amount", e.target.value)
              }
              min={0}
            />
            <button
              type="button"
              onClick={() => handleRemoveTransaction(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddTransaction}>
          Add Transaction
        </button>
        <button type="submit">Submit</button>
      </form>
      {responseData && (
        <div>
          <h3>Repsonse from server</h3>
          {responseData == "No transaction required" ? (
            <p>No transaction required</p>
          ) : (
            responseData.map((ele, ind) => (
              <div key={ind}>
                <p>
                  {ele.payer} gives {ele.receiver} = {ele.amount}
                </p>
              </div>
            ))
          )}
          {}
        </div>
      )}
    </div>
  );
}

export default Transaction;
