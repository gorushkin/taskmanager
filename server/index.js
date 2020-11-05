import app from './app.js';
const port = process.env.PORT || 4000;

console.log(process.env.DB_K);

app.listen(port, () => {
  console.log(`server started at ${port} port`);
});
