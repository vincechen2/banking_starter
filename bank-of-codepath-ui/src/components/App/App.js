import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TransactionDetail from "../TransactionDetail/TransactionDetail";
import TransferDetail from "../TransferDetail/TransferDetail";
export default function App() {
  let [transactions, setTransactions] = useState([]);
  let [allTransactions, setAllTransactions] = useState([]);
  let [transfers, setTransfers] = useState([]);
  let [allTransfers, setAllTransfers] = useState([]);
  let [loading, setLoading] = useState(true);

  async function loadTransactions() {
    setLoading(true);
    let transactions = await axios.get(
      "http://localhost:3001/bank/transactions"
    );
    setAllTransactions(transactions.data.transactions);
    setTransactions(transactions.data.transactions);
    setLoading(false);
  }
  async function loadTransfers() {
    setLoading(true);
    let transfers = await axios.get("http://localhost:3001/bank/transfers");
    setAllTransfers(transfers.data.transfers);
    setTransfers(transfers.data.transfers);
    setLoading(false);
  }

  useEffect(() => {
    loadTransactions();
    loadTransfers();
  }, []);

  // useEffect(() => {
  //   setTransactions(allTransactions);
  // }, [allTransactions]);
  // useEffect(() => {
  //   if (transactions.length) setLoading(false);
  // }, [transactions]);

  if (!loading) {
    let app = (
      <div className="App">
        <Navbar
          allTransactions={allTransactions}
          setTransactions={setTransactions}
          allTransfers={allTransfers}
          setTransfers={setTransfers}
        />
        <Home
          setTransactions={setTransactions}
          setTransfers={setTransfers}
          transactions={transactions}
          transfers={transfers}
        />
      </div>
    );
    let transactionDetail = (
      <div className="App">
        <Navbar
          allTransactions={allTransactions}
          setTransactions={setTransactions}
          allTransfers={allTransfers}
          setTransfers={setTransfers}
        />
        <TransactionDetail />
      </div>
    );
    let transferDetail = (
      <div className="App">
        <Navbar
          allTransactions={allTransactions}
          setTransactions={setTransactions}
          allTransfers={allTransfers}
          setTransfers={setTransfers}
        />
        <TransferDetail />
      </div>
    );
    return (
      <Router>
        <Routes>
          <Route path="/" element={app} />
          <Route
            path="/transaction/:transactionId"
            element={transactionDetail}
          />
          <Route path="/transfer/:transferId" element={transferDetail} />
        </Routes>
      </Router>
    );
  }
  return <div>Loading...</div>;
}
