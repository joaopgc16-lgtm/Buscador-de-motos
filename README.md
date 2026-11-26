
#  Buscador de Motos

Aplicação web para pesquisar motos por **modelo e ano** (ex.: `yzf r6 2006`), ver os detalhes de cada uma e, para administradores, gerenciar o catálogo.

🔗 **Demo:** https://buscador-de-motos.vercel.app

<!-- Adicione aqui um print ou GIF da aplicação:
![Tela inicial](./docs/home.png)
-->

##  Funcionalidades

- Busca por nome e ano da moto
- Página de detalhes com imagem, marca, ano e descrição
- Cadastro, login e logout de usuários
- Sessão com JWT guardado em cookie
- Área de administração para adicionar, editar e excluir motos
- Layout responsivo (mobile first)
- Estados de carregamento (skeleton), erro e busca sem resultados
- Modais animados e acessíveis (ESC para fechar, foco no botão, leitores de tela)

##  Tecnologias

**Front-end**
- [React](https://react.dev/) + [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (ícones)

**Back-end** ([repositório da API](https://github.com/joaopgc16-lgtm/moto-server))
- Node.js + Express
- PostgreSQL ([Neon](https://neon.tech/))
- JWT (`jsonwebtoken`) + `cookie-parser`
- CORS com credenciais

**Deploy**
- Front-end: Vercel
- API: Render

##  Como rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- A API rodando (veja o repositório do back-end)

### Front-end

```bash
# clonar o repositório
git clone https://github.com/joaopgc16-lgtm/Buscador-de-motos.git
cd Buscador-de-motos

# instalar as dependências
npm install

# iniciar em modo de desenvolvimento
npm run dev
```

O app abre em `http://localhost:5173`.

Confira em `src/api.js` se a constante `API` aponta para a sua API (por padrão, `http://localhost:5000`).

### Back-end

```bash
git clone https://github.com/joaopgc16-lgtm/moto-server.git
cd moto-server
npm install
npm start
```

Crie um arquivo `.env` na raiz da API:

```env
PORT=5000
DATABASE_URL=postgres://usuario:senha@host/banco
JWT_SECRET=uma_chave_secreta_grande_e_aleatoria
FRONT_URLS=http://localhost:5173,http://localhost:5174
```

| Variável       | Para que serve                                         |
| -------------- | ------------------------------------------------------ |
| `PORT`         | Porta do servidor (padrão `5000`)                      |
| `DATABASE_URL` | String de conexão do PostgreSQL                        |
| `JWT_SECRET`   | Chave usada para assinar e validar os tokens           |
| `FRONT_URLS`   | Origens permitidas no CORS, separadas por vírgula      |

> ⚠️ Nunca suba o `.env` para o GitHub. Ele deve estar no `.gitignore`.

## 🔌 Rotas da API

| Método | Rota               | Descrição                              | Acesso |
| ------ | ------------------ | -------------------------------------- | ------ |
| GET    | `/?motosearch=...` | Busca motos por nome e ano             | Público |
| GET    | `/motos/:id`       | Detalhes de uma moto                   | Público |
| POST   | `/cadastro`        | Cria uma conta                         | Público |
| POST   | `/login`           | Autentica e define o cookie da sessão  | Público |
| POST   | `/logout`          | Encerra a sessão                       | Logado |
| POST   | `/addmotos`        | Adiciona uma moto                      | Admin |
| PUT    | `/modifymoto/:id`  | Edita uma moto                         | Admin |
| DELETE | `/deletemoto/:id`  | Remove uma moto                        | Admin |

##  Estrutura

```
src/
├── componentes/
│   ├── Avatar.jsx          # menu do usuário logado
│   ├── Busca.jsx           # campo de busca
│   ├── DetalhesMoto.jsx    # página de detalhes
│   ├── Layout.jsx
│   ├── ModalAviso.jsx      # aviso de sucesso/erro
│   ├── ModalLogin.jsx      # login e cadastro
│   └── MotosResults.jsx    # grade de resultados
├── api.js                  # URL base da API
├── App.jsx                 # página principal
└── main.jsx                # rotas
```


**João** — [GitHub](https://github.com/joaopgc16-lgtm)
