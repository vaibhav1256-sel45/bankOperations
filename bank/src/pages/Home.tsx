import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../features/store";
import { useState } from "react";
import homeCss from "./Home.module.css";
import SidebarDrawer from "../Components/SideDrawer";
import { decrementBy, incrementBy } from "../features/slices/cashSlice";

function Home() {
  const count = useSelector((state: RootState) => state.cash.count);
  const dispatch = useDispatch<AppDispatch>();
  const [input, setInput] = useState({ deposit: '', withdrawl: '' });

  const deposit = () => {
    if (Number(input.deposit) <= 0) {
      alert("Invalid amount");
      return;
    }

    if(input.deposit?.includes(".") && input.deposit?.length-input.deposit?.indexOf('.')-1>2){
      alert("Invalid Amount supports only two digits")
      return
    }
    dispatch(incrementBy(Number(input.deposit)));
    setInput(prev => ({ ...prev, deposit: '' }));
  };

  const withdrawl = () => {
    if (Number(input.withdrawl) < 0) {
      alert("Invalid amount");
      return;
    }
    if(input.withdrawl?.includes(".") && input.withdrawl?.length-input.withdrawl?.indexOf('.')-1>2){
      alert("Invalid Amount supports only two digits")
      return
    }
    if (Number(input.withdrawl) > count) {
      alert("Withdrawl amount is more than total amount");
      return;
    }
    dispatch(decrementBy(Number(input.withdrawl)));
    setInput(prev => ({ ...prev, withdrawl: '' }));
  };

  return (
    <div className={homeCss["bank-root"]}>
      <div className={homeCss["bank-card"]}>
        <h2 className={homeCss["bank-title"]}>Bank Account</h2>
        <div className={homeCss["bank-actions"]}>
          <div className={homeCss["bank-action"]}>
            <input
              value={input.deposit}
              type="number"
              name="deposit"
              onChange={e => setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))}
              placeholder="Enter deposit amount"
              className={homeCss["bank-input"]}
              min="0"
            />
            <button className={`${homeCss["bank-btn"]} ${homeCss["deposit"]}`}  onClick={deposit} >Deposit</button>
          </div>
          <div className={homeCss["bank-action"]}>
            <input
              type="number"
              value={input.withdrawl}
              name="withdrawl"
              onChange={e => setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))}
              placeholder="Enter withdrawl amount"
              className={homeCss["bank-input"]}
              min="0"
            />
            <button className={`${homeCss["bank-btn"]} ${homeCss["withdrawl"]}`} onClick={withdrawl}>Withdraw</button>
          </div>
        </div>
        <div className={homeCss["bank-balance"]}>
          <span>Total Balance</span>
          <span className={homeCss["bank-balance-amount"]}>{count.toFixed()}</span>
        </div>
      </div>
      <SidebarDrawer/>
    </div>
  );
}

export default Home;
