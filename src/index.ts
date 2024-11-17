import { configDotenv } from "dotenv";
import cors from "cors";
import express, { Request, Response, response } from "express";
import { User, createUser, loginUser, updateUser } from "./schema/user.schema";
import { CommonResponse } from "./schema/common-response";
import { createJWT, generateHash, verifyJWT } from "./security/secure";
import { authMiddleware } from "./middleware/verify.user";
import { sendVerificationEmail } from "./email/verify";
configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("server is running");
});

app.post("/signup", (req, res) => {
    const body = req.body;
    if (!body.email || !body.password || !body.name) {
        const response: CommonResponse = {
            statusCode: 400,
            error: "Missing required fields",
            message: "Missing required fields",
        };
        res.status(400).send(response);
        return;
    }
    const user: User = {
        email: body.email,
        password: generateHash(body.password),
        name: body.name
    };
    createUser(user).then( async (user) => {
        const token = createJWT(user, 10 * 60);
        if (!user.email) throw new Error("Failed to create token");
        const email = await sendVerificationEmail(user.email, token);
        console.log(email);
        
        const response: CommonResponse<User> = {
            statusCode: 200,
            // data: user,
            message: "User created successfully",
        };
        res.send(response);
    }).catch((error) => {
        console.log(error);
        const response: CommonResponse = {
            statusCode: 500,
            error: error.message ?? "Internal Server Error",
            message: error.message,
        };
        res.status(500).send(response);
    });
});

app.post("/signin", (req, res) => {
    const body = req.body;
    if (!body.email || !body.password) {
        const response: CommonResponse = {
            statusCode: 400,
            error: "Missing required fields",
            message: "Missing required fields",
        };
        res.status(400).send(response);
        return;
    }
    const providedUser: User = {
        email: body.email,
        password: generateHash(body.password),
    };
    
    loginUser(providedUser).then((user) => {
        const response: CommonResponse<User> = {
            statusCode: 200,
            data: user,
            token: createJWT(user, 6 * 30 * 24 * 60 * 60),
        };
        res.status(200).send(response);
    }).catch((error) => {
        const response: CommonResponse = {
            statusCode: 500,
            error: error.message ?? "Internal Server Error",
            message: error.message,
        };
        res.status(500).send(response);
    });
});

app.get("/verify/:token", (req, res) => {
    const token = req.params.token;
    verifyJWT(token).then((user) => {
        const response: CommonResponse<User> = {
            statusCode: 200,
            data: user,
        };
        res.status(200).send(response);
    }).catch((error) => {
        const response: CommonResponse = {
            statusCode: 500,
            error: error.message ?? "Internal Server Error",
            message: error.message,
        };
        res.status(500).send(response);
    });
});

app.get("/user", authMiddleware, (req, res) => {
    const response: CommonResponse<User> = {
        statusCode: 200,
        data: req.user,
    };
    res.status(200).send(response);
});

app.patch("/user", authMiddleware, (req, res) => {
    const body = req.body;
    if (!req.user) throw new Error("Unauthorized");
    if (!req.user.email) throw new Error("Missing required fields");
    updateUser(req.user.email, body).then((user) => {
        const response: CommonResponse<User> = {
            statusCode: 200,
            data: user,
        };
        res.status(200).send(response);
    }).catch((error) => {
        const response: CommonResponse = {
            statusCode: 500,
            error: error.message ?? "Internal Server Error",
            message: error.message,
        };
        res.status(500).send(response);
    });
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

