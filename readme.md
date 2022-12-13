## # Step 1

- Init project :
  `yarn init`
- Install package express dan nodemon :
  `yarn install express nodemon`
- Install package mysql2, dotenv, multer (Upload Image), CORS, Sequelize (ORM Database) One line :
  `yarn add mysql2 dotenv multer cors sequelize`

## # Step 2

- Running on development :
  `yarn dev`
- Running on production server :
  `yarn start`

## # Step 3

- Access this endpoint using postman API :

```
const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);
```

- Import collections `Base Express Mysql.postman_collection.json` into Postman

## # Sample Route

```
app.method(path, handler);
app.use("/", (req, res, next) => {
    res.send('Hello World');
})
```

```
app.get('/home', function (req, res) {
    res.send("Hello my Homepage!");
});
app.get('/about', function (req, res) {
    res.send("Hello my About page!");
});
app.get('/biodata/:id', function (req, res) {
    res.send('Biodata id : ' + req.params.id);
});
app.get('/biodata/:name/:id', function (req, res) {
    res.send('Biodata dengan name: ' + req.params.name + ' | id: ' + req.params.id);
});
app.get('/nomor/:id([0-9]{5})', function (req, res) {
    res.send('id: ' + req.params.id);
});
```

## TODO :

- Auth / JWT
- ORM Database Sequelize
- Pagination
- Logging (Sentry in productions)

_For Questions :
`iwan.webdveloper@gmail.com`_
