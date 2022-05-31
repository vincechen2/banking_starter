import { Link } from "react-router-dom";
import FilterInput from "../FilterInput/FilterInput";
import codepath from "../../assets/codepath.svg";
import avatar from "../../assets/avatar.png";
import "./Navbar.css";

export default function Navbar({
  allTransfers,
  setTransfers,
  allTransactions,
  setTransactions,
}) {
  let balance = 0;
  allTransactions.forEach((item, index) => {
    balance += parseInt(item.amount);
  });
  allTransfers.forEach((item, index) => {
    balance += parseInt(item.amount);
  });

  balance /= 100;

  return (
    <nav className="Navbar">
      <Link className="logo" to="/">
        <img src={codepath} alt="logo" />
      </Link>

      <div className="search">
        <FilterInput
          allTrans
          allTransactions={allTransactions}
          setTransactions={setTransactions}
          allTransfers={allTransfers}
          setTransfers={setTransfers}
        />
      </div>

      <div class="total">
        <h2>Balance: {balance}</h2>
      </div>
      <div className="user">
        <div className="notifications">
          <i className="material-icons md-36">notifications</i>
          <div className="green-dot" />
        </div>
        <div className="avatar">
          <img src={avatar} alt="avatar" />F
          <div className="info">
            <p>Person McPerson</p>
            <span>ID: 12345567</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
