
# TaskFlow - Gerenciador de Tarefas

O **TaskFlow** é um gerenciador de tarefas desenvolvido para facilitar a organização de equipes e tarefas, permitindo a criação, atribuição e acompanhamento de status de atividades de maneira eficiente.

## 🚀 Tecnologias Utilizadas

Este projeto utiliza as seguintes tecnologias e ferramentas:

- **Node.js** com **Express**: Para criação do backend.
- **Prisma ORM**: Para manipulação do banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional.
- **Zod**: Para validação de schemas.
- **JWT (JSON Web Token)**: Para autenticação e controle de acesso.
- **Bcrypt**: Para hashing de senhas.
- **Jest**: Para testes automatizados.

## 🛠️ Funcionalidades

- Gerenciamento de usuários:
  - Criação, edição e exclusão de usuários.
  - Autenticação via JWT.
- Gerenciamento de equipes:
  - Criação e organização de equipes.
  - Atribuição de membros às equipes.
- Gerenciamento de tarefas:
  - Criação, edição, exclusão e listagem de tarefas.
  - Acompanhamento de status e prioridade das tarefas.
- Controle de permissões e acessos:
  - Diferenciação entre usuários admin e membros.

## ⚙️ Instalação e Configuração

Siga as etapas abaixo para configurar o projeto localmente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/seuusuario/taskflow.git
   cd taskflow
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`:
   ```env
   DATABASE_URL=postgresql://<usuario>:<senha>@localhost:5432/taskflow
   JWT_SECRET=<sua_chave_secreta>
   ```

4. Configure o banco de dados:
   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor:
   ```bash
   npm run dev
   ```

## 📂 Estrutura do Projeto

```
src/
├── configs/              # Configurações gerais do projeto
│   └── auth.ts           # Configuração de autenticação
├── controllers/          # Lógica de negócios
│   ├── sessions-controller.ts # Controle de sessões
│   ├── tasks-controller.ts    # Controle de tarefas
│   ├── team-members-controller.ts # Controle de membros do time
│   ├── teams-controller.ts    # Controle de times
│   └── users-controller.ts    # Controle de usuários
├── database/             # Configuração do banco de dados (Prisma)
│   └── dbConfig.ts       # Conexão e inicialização do banco
├── middlewares/          # Middlewares de autenticação e erros
│   ├── ensure-authenticated.ts # Verifica autenticação
│   ├── error-handling.ts      # Tratamento de erros
│   └── verifyTaskUser.ts      # Verificação de tarefas específicas
├── routes/               # Definição das rotas da API
│   ├── index.ts          # Rotas principais
│   ├── sessions-routes.ts # Rotas de sessões
│   ├── tasks-routes.ts    # Rotas de tarefas
│   ├── team-members-routes.ts # Rotas de membros do time
│   ├── teams-routes.ts    # Rotas de times
│   └── users-routes.ts    # Rotas de usuários
├── tests/                # Testes unitários e de integração
│   └── user-controller.test.ts # Exemplo de teste do controller de usuários
├── types/                # Tipos e interfaces TypeScript
│   └── express.d.ts      # Extensões para Request/Response do Express
├── utils/                # Classes e utilitários auxiliares
│   ├── AppErrors.ts      # Classe para manipulação de erros customizados
├── app.ts                # Configuração principal do Express
├── server.ts             # Ponto de entrada do servidor
```

## 🌟 Contribuições

Contribuições são muito bem-vindas! Sinta-se à vontade para abrir _issues_ e _pull requests_.

## 📄 Licença

Este projeto está licenciado sob a licença **MIT**.

---

💻 Desenvolvido por Gustavo Berçacollo Vilela.
