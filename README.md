# To-Do NestJS Backend (+E2E)
#### exploration of rest api with testable code


### Requirements:

* Node.js
* NPM
* TypeScript, NestJS v10.0.0
* Git
* MongoDB

<br>

Let's clone the repository on your machine.

The application includes the following files and folders.

- `src` - code for the application written in TypeScript, NestJS, Express.js.
- `test` - to test all the features.
- `.env.example` - a sample of .env which can be helpful for configuration.

```bash
# architecture
# deep drive in src directory

src/
├── todo/
│   ├── dto/
│   │   ├── todo.dto.ts
│   │   └── index.ts
│   │
│   ├── schemas/
│   │   └── todo.schema.ts
│   │
│   ├── todo.controller.ts
│   ├── todo.module.ts
│   └── todo.service.ts
│
├── app.module.ts
└── main.ts

```


## Installation and Configuration

Let's move to the cloned directory with your terminal.

To install, build, and start the application for the first time, run the following commands:

```bash
npm install
```

<br>

Let's rename from `.env.example` to `.env` and make sure all the necessary information is correct:

```bash
PORT=3000

MONGODB_URI=<MongoDB_ATLAS_URI_HERE_PLEASE>
FRONTEND_URL=<FRONTEND_WEB_APP_URL_HERE_PLEASE>
```

<br>

Already done? Cool! You are almost ready to enjoy the app. ⛳️

### Build & Run:

```bash
npm run start

```


### Test:
Oh! You wanna trigger testing for the application from terminal

```bash
# e2e tests
npm run test:e2e

```
<br>

### 🥇 Congrats!! You are good to go

### 🧑‍💻 Stay in touch

- Author - [Sazal Ahamed](https://sazal.vercel.app)
- Linkedin - [Profie](https://www.linkedin.com/in/sazal-ahamed/)
- GitHub - [DevSazal](https://github.com/DevSazal)


### 🎉🎉 tada! 🎉🎉
