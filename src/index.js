import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./root";
import Home from "./home";
import CreateAccount from "./create_account";
import Accounts, { loader as accountsLoader } from "./accounts";
import Transaction, { loader as transactionLoader } from "./transaction";
import AllData from "./all_data";
import ErrorPage from "./error_page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "create_account",
        element: <CreateAccount />,
        errorElement: <ErrorPage />,
      },
      {
        path: "accounts_deposit",
        element: <Accounts transaction_type="Deposit" />,
        loader: accountsLoader,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "deposit/:accountid",
            element: <Transaction transaction_type="Deposit" />,
            loader: transactionLoader,
          },
        ],
      },
      {
        path: "accounts_withdraw",
        element: <Accounts transaction_type="Withdraw" />,
        loader: accountsLoader,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "withdraw/:accountid",
            element: <Transaction transaction_type="Withdraw" />,
            loader: transactionLoader,
          },
        ],
      },
      {
        path: "all_data",
        element: <AllData />,
        loader: accountsLoader,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);