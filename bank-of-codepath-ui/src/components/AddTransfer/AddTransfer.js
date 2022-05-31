import "./AddTransfer.css";
import axios from "axios";

export default function addTransfer({ setTransfers }) {
  async function add() {
    let recipient = document.getElementById("recipient").value;
    let amount = document.getElementById("transferAmount").value;
    let memo = document.getElementById("memo").value;
    let data = {
      transfer: {
        recipientEmail: recipient,
        amount: amount,
        memo: memo,
      },
    };
    let callback = await axios.post(
      "http://localhost:3001/bank/transfers",
      data
    );

    setTransfers((transfers) => [...transfers, callback.data.transfer]);
    document.getElementById("recipient").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("memo").value = "";
  }
  return (
    <div className="AddTransaction">
      <h2>Add Transaction</h2>

      <div className="form">
        <div className="fields">
          <div className="field">
            <label>Memo</label>
            <input
              id="memo"
              type="text"
              name="description"
              placeholder="Enter a memo..."
            />
          </div>
          <div className="field">
            <label>Recipient</label>
            <input
              id="recipient"
              type="text"
              name="category"
              placeholder="Enter a recipient..."
            />
          </div>
          <div className="field" style={{ flex: 0.5 }}>
            <label>Amount (cents)</label>
            <input id="transferAmount" type="number" name="amount" />
          </div>

          <button className="btn add-transaction" type="submit" onClick={add}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
