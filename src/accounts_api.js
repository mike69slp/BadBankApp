import localforage from "localforage";

export async function getAccounts() {
  let accounts = await localforage.getItem("accounts");

  if (!accounts) accounts = [];

  return accounts;
}

export async function createAccount(account) {
  const id = Math.random().toString(36).substring(2, 9);
  const newAccount = { id, ...account };

  const accounts = await getAccounts();
  accounts.unshift(newAccount);

  await set(accounts);

  return newAccount;
}

export async function getAccount(id) {
  const accounts = await localforage.getItem("accounts");
  const account = accounts.find(account => account.id === id);

  return account ?? null;
}

export async function updateBalance(id, amount, type) {
  const accounts = await localforage.getItem("accounts");
  const account = accounts.find(account => account.id === id);

  if (!account) throw new Error("No account found for", id);

  let balance = 0.00;

  if (type === "Deposit") {
    balance = account.balance + amount;
  } else {
    balance = account.balance - amount;
  }

  Object.assign(account, {balance: balance});

  await set(accounts);
  
  return balance;
}


function set(accounts) {
  return localforage.setItem("accounts", accounts);
}
