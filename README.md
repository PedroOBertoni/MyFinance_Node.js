# MyFinance_Node.js

Sistema de gerenciamento de contas em linha de comando, desenvolvido com **Node.js**. Ele permite a criação de contas, consulta de saldo, depósitos e saques, utilizando bibliotecas como **inquirer**, **fs** e **chalk**. Ideal para fins didáticos e como um projeto prático para manipulação de arquivos no sistema.

---

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido com o intuito de **aprimorar meus conhecimentos em Node.js**, manipulação de arquivos (File System), e interação com o usuário através do terminal.

A ideia surgiu como parte do meu processo de aprendizado prático: construir um sistema bancário simples, que envolvesse a criação de arquivos para armazenar dados de contas e funcionalidades básicas de um banco, como depósito e saque. Isso me permitiu entender melhor como um aplicativo de linha de comando funciona e como gerenciar dados sem a necessidade de um banco de dados tradicional.

---

## 🧩 Funcionalidades

- **Criação de Conta:** Permite criar uma nova conta de usuário, salvando-a em um arquivo `.json`.
- **Consulta de Saldo:** Exibe o saldo atual de uma conta específica.
- **Depósito:** Adiciona um valor ao saldo da conta.
- **Saque:** Retira um valor do saldo da conta, com verificação de saldo insuficiente.
- **Validações:** O sistema verifica se a conta existe, se o valor é válido (não é um texto) e se há saldo suficiente para o saque.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **JavaScript**
- **Inquirer.js:** Para criar uma interface interativa na linha de comando.
- **Chalk:** Para adicionar cores e estilo ao texto no terminal.
- **FS (File System):** Módulo nativo do Node.js para interagir com arquivos.

---

## 🚀 Como executar o projeto

1. Clone o repositório:
    ```bash
    git clone [https://github.com/PedroOBertoni/MyFinance_Node.js.git](https://github.com/PedroOBertoni/MyFinance_Node.js.git)
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd MyFinance_Node.js
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```
4. Execute a aplicação:
    ```bash
    node index.js
    ```
    (Ou `node <nome-do-seu-arquivo>.js` se o nome for diferente de `index.js`).
