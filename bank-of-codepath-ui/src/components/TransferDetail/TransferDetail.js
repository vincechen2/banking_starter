import { useParams } from "react-router-dom";
import { formatAmount, formatDate } from "../../utils/format";
import "./TransferDetail.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TransactionDetail() {
  let params = useParams();
  const transferId = params.transferId; // replace this
  let [transfer, setTransfer] = useState(undefined);
  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState(false);

  useEffect(() => {
    loadTransfer();
  }, []);

  async function loadTransfer() {
    let transfer = await axios.get(
      "http://localhost:3001/bank/transfers" + "/" + transferId
    );

    setTransfer(transfer.data.transfer);
    setIsLoading(false);
  }

  const renderTransferContent = () => {
    if (isLoading) return <h1>Loading...</h1>;
    if (error) return <p className="description">No transfer found</p>;

    return (
      <>
        <p className="description">{transfer?.memo}</p>
        <div className="meta">
          <p className={`amount ${transfer?.amount < 0 ? "minus" : ""}`}>
            {formatAmount(transfer?.amount)}
          </p>
          <p className="date">{formatDate(transfer?.postedAt)}</p>
        </div>
      </>
    );
  };

  return (
    <div className="TransactionDetail">
      <div className="card">
        <div className="title">
          <h3>Transfer #{transferId}</h3>
          <p className="category">{transfer?.recipientEmail}</p>
        </div>

        {renderTransferContent()}
      </div>
    </div>
  );
}
