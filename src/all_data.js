import { useLoaderData } from "react-router-dom";

import Card from "./card";

function AllData(props){
  const { accounts } = useLoaderData();
  
  return (
    <Card
      bgcolor="primary"
      header="Accounts"
      status=""
      body={
        <div>
        {accounts.length ? (
          <ul className="list-group">
            {accounts.map((account) => (
              <li key={account.id} className="list-group-item">
                Id: {account.id}<br />
                Name: {account.name}<br />
                Email: {account.email}<br />
                Password: {account.password}<br />
                Balance: {account.balance}
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <i>No accounts</i>
          </p>
        )}
        </div>                    
      }
    />
  );
}

export default AllData;