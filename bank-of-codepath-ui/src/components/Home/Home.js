import AddTransaction from "../AddTransaction/AddTransaction";
import BankActivity from "../BankActivity/BankActivity";
import "./Home.css";

export default function Home({
  transactions,
  transfers,
  setTransactions,
  setTransfers,
}) {
  return (
    <div className="Home">
      <AddTransaction
        transactions={transactions}
        setTransactions={setTransactions}
      />
      <BankActivity
        setTransfers={setTransfers}
        transactions={transactions}
        transfers={transfers}
      />
    </div>
  );
}
