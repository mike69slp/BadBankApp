import { NavLink, Outlet } from "react-router-dom";

function Root(){
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink to={`/`} className="navbar-brand">&nbsp;&nbsp;BadBank&nbsp;&nbsp;</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav  ms-auto">
            <li className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Create the accounts needed">
              <NavLink to={`create_account`} className="nav-link">Create Account</NavLink>
            </li>
            <li className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Select an account and make a deposit">
              <NavLink to={`accounts_deposit`} className="nav-link">Deposit</NavLink>
            </li>
            <li className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Select an account and make a withdraw">
              <NavLink to={`accounts_withdraw`} className="nav-link">Withdraw</NavLink>
            </li>
            <li className="nav-item" data-toggle="tooltip" data-placement="bottom" title="View all accounts">
              <NavLink to={`all_data`} className="nav-link">All Data</NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <div id="detail">
        <Outlet />
      </div>
    </>
  )  
}

export default Root;
