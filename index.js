import inquirer from "inquirer";
import fs from "fs";
import chalk from "chalk";

// Start the app
operation();

// Main menu
function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: [
          "Criar Conta",
          "Consultar Saldo",
          "Depositar",
          "Sacar",
          "Sair",
        ],
      },
    ])
    .then((answer) => {
      const action = answer["action"];

      switch (action) {
        case "Criar Conta":
          createAccount();
          break;
        case "Consultar Saldo":
          getAccountBalance();
          break;
        case "Depositar":
          deposit();
          break;
        case "Sacar":
          withdraw();
          break;
        case "Sair":
          console.log("\n" + chalk.bgBlue.black("Obrigado por usar o Accounts!\n"));
          process.exit();
      }
    })
    .catch((err) => handleError(err));
}

// Handle errors with a standard format
function handleError(err) {
  console.log("\n" + chalk.bgRed.black(`[ERROR] ${err.message || err}\n`));
}

// Create a new account
function createAccount() {
  console.log("\n" + chalk.bgGreen.black("Parabéns por escolher o nosso banco!"));
  console.log(chalk.green("Defina as opções da sua conta a seguir:\n"));
  buildAccount();
}

// Build account file
function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para a sua conta:",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }
      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log("\n" + chalk.bgRed.black("[ERROR] Esta conta já existe! Escolha outro nome\n"));
        return buildAccount();
      }

      fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}');

      console.log("\n" + chalk.green("Parabéns, a sua conta foi criada!\n"));
      operation();
    })
    .catch((err) => handleError(err));
}

// Check account balance
function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!checkAccount(accountName)) {
        return getAccountBalance();
      }

      const accountData = getAccount(accountName);
      console.log(
        "\n" +
          chalk.bgBlue.black(`O saldo da sua conta é de R$${accountData.balance}\n`)
      );
      operation();
    })
    .catch((err) => handleError(err));
}

// Read account data
function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf8",
    flag: "r",
  });

  return JSON.parse(accountJSON);
}

// Verify if account exists
function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log("\n" + chalk.bgRed.black("[ERROR] Esta conta não existe! Tente novamente\n"));
    return false;
  }

  return true;
}

// Deposit money
function deposit() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: " Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!checkAccount(accountName)) {
        return deposit();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto você deseja depositar?",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];
          addAmount(accountName, amount);
        })
        .catch((err) => handleError(err));
    })
    .catch((err) => handleError(err));
}

// Add deposit to account
function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount || isNaN(amount)) {
    console.log("\n" + chalk.bgRed.black("[ERROR] Valor inválido! Digite um número válido\n"));
    return deposit();
  }

  accountData.balance = parseFloat(accountData.balance) + parseFloat(amount);

  fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData));

  console.log("\n" + chalk.green(`Foi depositado o valor de R$${amount} na sua conta!\n`));
  operation();
}

// Withdraw money
function withdraw() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: " Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!checkAccount(accountName)) {
        return withdraw();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto você deseja sacar?",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];
          removeAmount(accountName, amount);
        })
        .catch((err) => handleError(err));
    })
    .catch((err) => handleError(err));
}

// Remove amount from account
function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount || isNaN(amount)) {
    console.log("\n" + chalk.bgRed.black("[ERROR] Valor inválido! Digite um número válido\n"));
    return withdraw();
  }

  if (amount > accountData.balance) {
    console.log("\n" + chalk.bgRed.black("[ERROR] Saldo insuficiente!\n"));
    return withdraw();
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

  fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData));

  console.log("\n" + chalk.green(`Foi sacado o valor de R$${amount} da sua conta!\n`));
  operation();
}
