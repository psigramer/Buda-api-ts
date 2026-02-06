import app from './app';

const port = Number(process.env.PORT || 3000);

app.listen(port, (error?: Error) => {
  if (!error) {
    console.log(`Server is Successfully Running, \nand App is listening on: \nhttp://localhost:${port}\n`);
    return;
  }

  console.log("Error occurred, server can't start", error);
});
