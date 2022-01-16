import express from "express";
import os from "os";

const app = express();
const port = process.env["SERVER_PORT"]; // default port to listen

function Factorial(n: number) {
    var total = 0;
    if (n <= 1) {
        return 1;
    } else {
        for (var i = n; i > 0; i--) {
            total += n * Factorial(n - 1);
        }
    }
    return total;
}

// define a route handler for the default home page
app.get("/api", (req: express.Request, res: express.Response) => {
    const resp = {
        "responce": "Hello World!",
        "server": os.hostname()
    };
    res.send(JSON.stringify(resp));
});

app.get("/api/factorial", (req: express.Request, res: express.Response) => {
    const value = parseInt(req.query.n as string);
    const resp = {
        "input": value,
        "server": os.hostname(),
        "responce": Factorial(value)
    };
    res.send(JSON.stringify(resp));
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});