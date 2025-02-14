import "./AddTransaction.css";
import axios from "axios";

export default function AddTransaction({ setTransactions }) {
  async function add() {
    let category = document.getElementById("category").value;
    let amount = document.getElementById("amount").value;
    let description = document.getElementById("description").value;
    let data = {
      transaction: {
        category: category,
        amount: amount,
        description: description,
      },
    };
    let callback = await axios.post(
      "http://localhost:3001/bank/transactions",
      data
    );

    setTransactions((transactions) => [
      ...transactions,
      callback.data.transaction,
    ]);
    document.getElementById("category").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";
  }
  return (
    <div className="AddTransaction">
      <h2>Add Transaction</h2>

      <div className="form">
        <div className="fields">
          <div className="field">
            <label>Description</label>
            <input
              id="description"
              type="text"
              name="description"
              placeholder="Enter a description..."
            />
          </div>
          <div className="field">
            <label>Category</label>
            <input
              id="category"
              type="text"
              name="category"
              placeholder="Enter a category..."
            />
          </div>
          <div className="field" style={{ flex: 0.5 }}>
            <label>Amount (cents)</label>
            <input id="amount" type="number" name="amount" />
          </div>

          <button className="btn add-transaction" type="submit" onClick={add}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
