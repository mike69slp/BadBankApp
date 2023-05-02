import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { getAccount, updateBalance } from "./accounts_api";
import { NumericFormat } from "react-number-format";

import Card from "./card";

export async function loader({ params }) {
  const account = await getAccount(params.accountid);

  if (!account) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return { account };
}

function Transaction(props){
  const {account}               = useLoaderData();
  const [show, setShow]         = useState(true);
  const [status, setStatus]     = useState('');
  const [amount, setAmount]     = useState('');
  const [balance, setBalance]     = useState(account.balance);

  useEffect(() => {
    clearForm();
    setBalance(account.balance);
  }, [account.id]);

  function validate(field, label){
    if (!field) {
      setStatus('Error: ' + label);
      setTimeout(() => setStatus(''),3000);
      return false;
    }

    if (label == "amount" && isNaN(field)) {
      setStatus('Error, not a number: ' + label);
      setTimeout(() => setStatus(''),3000);
      return false;
    }

    if (label == "amount" && Number(field) < 0.00) {
      setStatus('Error, negative number: ' + label);
      setTimeout(() => setStatus(''),3000);
      return false;
    }

    if (label == "amount" && props.transaction_type == "Withdraw" && Number(field) > Number(balance)) {
      setStatus('Error, overdraft: ' + label);
      setTimeout(() => setStatus(''),3000);
      return false;
    }

    return true;
  }

  function handleUpdate(){
    if (!validate(amount,   'amount'))   return;

    updateBalance(account.id, Number(amount), props.transaction_type).then((newBalance) => {
      setBalance(Number(newBalance));
      setShow(false);
    });
  }    

  function clearForm(){
    setAmount('');
    setStatus('');
    setShow(true);
  }

  return (
    <Card
      bgcolor="primary"
      header={`Make a ${props.transaction_type}`}
      status={status}
      body={show ? (  
              <>
              Current balance<br/>
              <NumericFormat value={balance} displayType="text" prefix={'$'} decimalScale={2} fixedDecimalScale />
              <br/><br/>
              Amount<br/>
              <input type="input" className="form-control" id="amount" placeholder="Enter amount" value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>
              <button type="submit" className="btn btn-light" disabled={!amount} onClick={handleUpdate}>{props.transaction_type}</button>
              </>
            ):(
              <>
              <h5>Success</h5>
              New balance<br/>
              <NumericFormat value={balance} displayType="text" prefix={'$'} decimalScale={2} fixedDecimalScale />
              <br/><br/>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Make another {props.transaction_type}</button>
              </>
            )}
    />
  )  
}

export default Transaction;