import app from "./app.js";

const PORT = process.env.PORT || 3000;
const hostName = process.env.HOST || 'localhost';

app.listen(PORT, hostName, () => {
    console.log(`SERVER IS RUNNING ON ${hostName}:${PORT}`)
})