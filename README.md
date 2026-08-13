# ⚙️ DevBills - Backend

O **DevBills** é uma plataforma moderna e intuitiva de controle financeiro pessoal. Este repositório contém o código-fonte da **API REST (backend)** da aplicação, desenvolvida com foco em performance, tipagem estática e segurança.

O projeto segue os princípios da **Arquitetura em Camadas (Controller-Service-Repository)**, garantindo separação de responsabilidades, facilidade de manutenção e validação rigorosa de dados.

---

## ✨ Funcionalidades Principais

*   **🛡️ Autenticação com Firebase Admin SDK**: Validação e decodificação do Token JWT enviado pelo frontend nas rotas protegidas.
*   **📐 Validação de Dados com Zod**: Validação automática e segura dos payloads e parâmetros das requisições via integração `fastify-type-provider-zod`.
*   **🗄️ Integração com Prisma ORM e PostgreSQL**: Modelagem, relacionamento e acesso rápido e robusto ao banco de dados relacional.
*   **📊 Lógica de Negócios e Agregações**: Agrupamento automático de despesas por categoria, cálculo de balanço mensal e histórico financeiro.
*   **🌱 Inicialização Automática**: Criação automática de categorias padrão (alimentação, lazer, salário, etc.) ao inicializar a aplicação.

---

## 🛠️ Tecnologias Utilizadas

A API foi desenvolvida utilizando as seguintes tecnologias e bibliotecas:

*   [**Node.js**](https://nodejs.org/) — Ambiente de execução JavaScript/TypeScript.
*   [**TypeScript**](https://www.typescriptlang.org/) — Linguagem com tipagem estática.
*   [**Fastify**](https://fastify.dev/) — Framework web extremamente rápido e de baixo overhead.
*   [**Prisma ORM**](https://www.prisma.io/) — Object-Relational Mapping (ORM) moderno e tipo-seguro.
*   [**PostgreSQL**](https://www.postgresql.org/) — Banco de dados relacional e escalável.
*   [**Zod**](https://zod.dev/) — Declaração de esquemas de dados e validação em tempo de execução.
*   [**Firebase Admin SDK**](https://firebase.google.com/docs/admin) — SDK para administração e validação de tokens JWT no backend.

---

## 📂 Estrutura de Pastas

Abaixo está a organização de pastas dentro do diretório `src/`:

```text
src/
├── config/         # Arquivos de inicialização (Prisma, Firebase Admin)
├── controllers/    # Camada HTTP que lida com requisições e respostas
├── middlewares/    # Interceptadores de rotas (ex: middleware de autenticação)
├── routes/         # Definição e agrupamento dos endpoints da API
├── schemas/        # Schemas do Zod para validação e tipagem
├── services/       # Camada de lógica de negócio isolada do protocolo HTTP
├── types/          # Declaração global de tipos do TypeScript
├── app.ts          # Inicialização e registro de plugins do Fastify
└── server.ts       # Inicialização do servidor web na porta de escuta
```

---

## 🚀 Como Executar o Projeto

Siga os passos abaixo para rodar o backend localmente:

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
*   [Node.js](https://nodejs.org/)
*   [npm](https://www.npmjs.com/)
*   Instância de banco de dados [PostgreSQL](https://www.postgresql.org/) (ou um cluster no Neon / Supabase)

---

### Passo a Passo

1.  **Clonar o repositório**:
    ```bash
    git clone https://github.com/gabrieltomazi/devbills-backend.git
    cd devbills-backend
    ```

2.  **Instalar as dependências**:
    ```bash
    npm install
    ```

3.  **Configurar as Variáveis de Ambiente**:
    Crie um arquivo `.env` na raiz do backend e preencha as variáveis conforme exemplo abaixo:
    ```env
    PORT=3333
    DATABASE_URL="postgresql://usuario:senha@localhost:5432/devbills?schema=public"
    NODE_ENV="dev"
    
    # Credenciais do Firebase Admin (formato JSON compactado ou chaves individuais)
    FIREBASE_PROJECT_ID="seu-projeto-id"
    FIREBASE_CLIENT_EMAIL="seu-email-cliente-firebase"
    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nsua-chave-privada\n-----END PRIVATE KEY-----\n"
    ```

4.  **Rodar as Migrations do Prisma**:
    Crie a estrutura do banco de dados executando as migrations:
    ```bash
    npx prisma migrate dev
    ```

5.  **Iniciar o Servidor em Modo de Desenvolvimento**:
    ```bash
    npm run dev
    ```
    A API estará rodando por padrão na porta `3333` (ex: `http://localhost:3333`).

---

## 🛣️ Rotas Principais (Endpoints)

Todas as rotas de transação requerem o cabeçalho `Authorization: Bearer <ID_TOKEN_DO_FIREBASE>`.

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| **POST** | `/api/transaction` | Cria uma nova transação (receita ou despesa) |
| **GET** | `/api/transactions` | Lista transações filtradas por mês, ano e categoria |
| **GET** | `/api/transactions/summary` | Retorna o balanço, total de despesas, receitas e gastos por categoria |
| **GET** | `/api/transactions/history` | Retorna o histórico consolidado de receitas/despesas de meses anteriores |
| **DELETE** | `/api/transactions/:id` | Remove uma transação específica |
| **GET** | `/api/categories` | Lista as categorias cadastradas |
