## 🛠️ **Back-end (Fastify + Prisma + MongoDB)**

### 🔹 Requisitos de Negócio

- [X] Armazenar transações por usuário
- [X] Armazenar categorias globais
- [X] Proteger rotas com autenticação
- [X] Calcular e retornar:
    - [X] Resumo financeiro
    - [X] Despesas por categoria
    - [X] Histórico mensal de receitas e despesas

### 🔧 Requisitos Técnicos

- [X] Fastify com middlewares
- [X] Conexão com Neon via Prisma
- [X] Middleware de autenticação com Firebase
- [X] Entidades no banco:
    - [X] `Transaction`
    - [X] `Category`
    - [X] `User`
- [ ] Rotas:
    - [X] `POST /transactions` — Criar transação
    - [X] `GET /transactions` — Listar transações com filtros
    - [X] `DELETE /transactions/:id` — Excluir transação
    - [X] `GET /transactions/summary` — Resumo financeiro
    - [X] `GET /categories` — Listar categorias (opcionalmente por tipo)
    - [ ] `GET /users/info` — Dados do usuário logado
- [X] Validações:
    - [X] Schemas por rota (via `schema`)
    - [X] Com `ZOD`
- [X] Tipagem forte com `FastifyRequest<>`
- [X] Organização em `controllers`, `routes`, `middlewares`, `types`


