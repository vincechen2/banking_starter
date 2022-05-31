import "./FilterInput.css";

export default function FilterInput({
  allTransfers,
  setTransfers,
  allTransactions,
  setTransactions,
}) {
  return (
    <div className="FilterInput">
      <i className="material-icons">search</i>
      <input
        id="search"
        type="text"
        placeholder={"Search transactions"}
        onKeyUp={(e) => search(e)}
      />
    </div>
  );
  function search(e) {
    if (e.key !== "Enter") {
      return;
    }
    let transactions = [];
    let transfers = [];
    let sText = document.getElementById("search").value;
    let words = sText.split(" ");
    words.forEach((item, index) => {
      allTransactions.forEach((item2, index) => {
        if (
          item2.category.toLowerCase().includes(item.toLowerCase()) ||
          item2.description.toLowerCase().includes(item.toLowerCase())
        ) {
          transactions.push(item2);
        }
      });
    });
    words.forEach((item, index) => {
      allTransfers.forEach((item2, index) => {
        if (
          item2.memo.toLowerCase().includes(item.toLowerCase()) ||
          item2.recipientEmail.toLowerCase().includes(item.toLowerCase())
        ) {
          transfers.push(item2);
        }
      });
    });
    setTransactions(transactions);
    setTransfers(transfers);
    document.getElementById("search").value = "";
  }
}
