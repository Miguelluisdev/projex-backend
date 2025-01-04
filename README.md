<div align="center">

  <div>
    <img src="https://img.shields.io/badge/-NestJS-black?style=for-the-badge&logoColor=white&logo=nestjs&color=E0234E" alt="NestJS" />
    <img src="https://img.shields.io/badge/-GraphQL-black?style=for-the-badge&logoColor=white&logo=graphql&color=E10098" alt="GraphQL" />
    <img src="https://img.shields.io/badge/-PostgreSQL-black?style=for-the-badge&logoColor=white&logo=postgresql&color=31648C" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/-JWT-black?style=for-the-badge&logoColor=white&logo=jsonwebtokens&color=000000" alt="JWT" />
  </div>
<br/><br/></br>
 
  <h1 align="center">Backend do Projex</h1>

   <div align="center">
     API robusta e escalável construída com NestJS, GraphQL e PostgreSQL.
    </div>
</div>

## 📋 <a name="table">Sumário</a>

1. 🚀 [Introdução](#introducao)
2. ⚙️ [Tecnologias Utilizadas](#tecnologias)
3. 🔐 [Autenticação e Autorização](#autenticacao)
4. 📊 [GraphQL e Resolvers](#graphql)
5. 💻 [Instalação e Inicialização](#instalacao)
6. 🛡️ [Proteção de Rotas](#protecao-rotas)
7. 📚 [Funcionalidades Futuras](#futuras)
8. 🤝 [Contribuição](#contribuicao)

---

## 🚀 <a name="introducao">Introdução</a>

O backend do **Projex** é responsável por gerenciar toda a lógica de negócios, manipulação de dados e segurança da aplicação. Usando **NestJS** e **GraphQL**, garantimos uma API eficiente, flexível e escalável.

## ⚙️ <a name="tecnologias">Tecnologias Utilizadas</a>

- **NestJS**: Framework para criação de APIs robustas.
- **GraphQL**: Linguagem de consulta para APIs.
- **PostgreSQL**: Banco de dados relacional.
- **Prisma ORM**: Mapeamento de dados para PostgreSQL.
- **JWT (JSON Web Token)**: Autenticação segura.

## 🔐 <a name="autenticacao">Autenticação e Autorização</a>

### 🔑 Autenticação com JWT
- Usuários fazem login utilizando credenciais válidas.
- Um token **JWT** é gerado e enviado no cabeçalho **Authorization Bearer**.
- Tokens têm prazo de expiração configurado.

### 🛡️ Guards e Authorization Bearer
- **AuthGuard**: Protege rotas sensíveis.
- **Exemplo de Cabeçalho:**
  ```http
  Authorization: Bearer <token>
  ```

## 📊 <a name="graphql">GraphQL e Resolvers</a>

- **Resolvers:** Gerenciam as consultas e mutações do GraphQL.
- **Queries:** Consultas de dados.
- **Mutations:** Alterações e criação de dados.
- **Exemplo de Query:**
  ```graphql
  query GetUsers {
    users {
      id
      name
      email
    }
  }
  ```

## 💻 <a name="instalacao">Instalação e Inicialização</a>

1. Clone o repositório:
```bash
  git clone https://github.com/seu-usuario/projex-backend.git
  cd projex-backend
```

2. Instale as dependências:
```bash
  npm install
  npx prisma generate
  npx prisma migrate dev
```

3. Configure variáveis de ambiente no arquivo `.env`:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/projex_db
JWT_SECRET=seuSegredoJWT
NODE_ENV=development 

```

4. Execute o projeto:
```bash
  npm run start:dev
```

5. Acesse a API no navegador:
```
http://localhost:8080/graphql
```

## 🛡️ <a name="protecao-rotas">Proteção de Rotas</a>

- **Rotas protegidas por AuthGuard:** Necessitam de token JWT válido.
- **Exemplo de rota protegida:**
```graphql
  mutation UpdateUser {
    updateUser(id: "123") {
      name
      email
    }
  }
```

## 📚 <a name="futuras">Funcionalidades Futuras</a>

- Implementação para notificações em tempo real.
- Criação de projetos.
- Criação de convites para usuarios.

## 🤝 <a name="contribuicao">Contribuição</a>

1. Faça um Fork do projeto.
2. Crie uma branch:
```bash
git checkout -b feature/nova-feature
```
3. Faça suas alterações e commit:
```bash
git commit -m 'Adiciona nova funcionalidade'
```
4. Envie suas alterações:
```bash
git push origin feature/nova-feature
```
5. Abra um Pull Request.
---

<div align="center">
Projex - Gerenciando Seus projetos
</div>
