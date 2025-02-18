# Contact-Management-TS

# Setup Project

- Copy .env.example to .env file

```shell
cp .env.example .env
```
- setup node

```shell

npm install

npx prisma migrate dev

npx prisma generate

npm run build

npm run start
```

# What we build here

- <a href="./doc/user.md">User API</a>
- <a href="./doc/contact.md">Contact API</a>
- <a href="./doc/address.md">Address API</a>