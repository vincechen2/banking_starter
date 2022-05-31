import { useParams } from "react-router-dom";
import { formatAmount, formatDate } from "../../utils/format";
import "./TransactionDetail.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TransactionDetail() {
  let params = useParams();

  const transactionId = params.transactionId; // replace this
  let [transaction, setTransaction] = useState(undefined);
  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    let transaction = await axios.get(
      "http://localhost:3001/bank/transactions" + "/" + transactionId
    );
    console.log(transaction);
    setTransaction(transaction.data.transaction);
    setIsLoading(false);
  }

  const renderTransactionContent = () => {
    if (isLoading) return <h1>Loading...</h1>;
    if (error) return <p className="description">No transaction found</p>;

    return (
      <>
        <p className="description">{transaction?.description}</p>
        <div className="meta">
          <p className={`amount ${transaction?.amount < 0 ? "minus" : ""}`}>
            {formatAmount(transaction?.amount)}
          </p>
          <p className="date">{formatDate(transaction?.postedAt)}</p>
        </div>
      </>
    );
  };

  return (
    <div className="TransactionDetail">
      <div className="card">
        <div className="title">
          <h3>Transaction #{transactionId}</h3>
          <p className="category">{transaction?.category}</p>
        </div>

        {renderTransactionContent()}
      </div>
    </div>
  );
}
