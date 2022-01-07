import * as request from "supertest";
import { app } from "../app";
import * as dotenv from "dotenv"; // Used to get data in .env
import UserData from "../data/users-data";
dotenv.config();

const emailSend = "test123@gmail.com";
const passwordSend = "test123";
const domainSend = "test123";
const domainKeySend = "test123";

describe("Actions get user router", () => {
    it("Should test if get route return valid account", async () => {
        const req = await request(app).post("/users/get").send({
            "email": "willianccc@gmail.com",
            "domain": "domain11key",
            "domainkey": process.env.DOMAINKEY_SENSIVE,
        });

        expect(typeof req.body.email).toBe("string");
    });

    it("Should test if get route result account not found", async () => {
        const req = await request(app).post("/users/get").send({});

        expect(req.body.value).toBe(false);
    });
});


describe("Actions createtoken router", () => {
    it("Should test if return token", async () => {
        const req = await request(app).post("/createtoken").send({
            "email": "willianccc@gmail.com",
        });

        expect(typeof req.body).toBe("string");
    });
});

describe("Actions verify token router", () => {
    it("Should test if checktoken router return true", async () => {
        const token = await request(app).post("/createtoken").send({
            "email": "willianccc@gmail.com",
        });
        const req = await request(app).get(`/verifyauth/${token.body}`);

        expect(Boolean(req.text)).toBe(true);
    });

    it("Should test if checktoken router return false", async () => {
        const req = await request(app).get("/verifyauth/123");

        expect(req.body).toBe(false);
    });
});

describe("Actions postuser router", () => {
    it("Should test if postuser return true", async () => {

        const req = await request(app).post("/users").send({
            email: emailSend,
            password: passwordSend,
            domain: domainSend,
            domainkey: domainKeySend,
        });

        await new UserData().delete({
            email: emailSend,
            domain: domainSend,
            domainkey: domainKeySend,
        });

        expect(req.body).toBe(true);
    });

    it("Should test if postuser return false", async () => {
        const req = await request(app).post("/users");

        expect(req.body.value).toBe(false);
    });
});

describe("Actions updateuser router", () => {
    it("Should test if updateuser return true", async () => {
        const req = await request(app).post("/updateuser").send({
            email: "willianccc@gmail.com",
            domain: "domain11key",
            domainKey: process.env.DOMAINKEY_SENSIVE,
            newEmail: "willianccc@gmail.com",
            newPassword: "123123",
        });

        expect(req.body).toBe(true);
    });

    it("Should test if updateuser return false", async () => {
        const req = await request(app).post("/updateuser");
        expect(req.body).toBe(false);
    });
});

describe("Actions deleteuser router", () => {
    it("Should test if delete user return true", async () => {
        await new UserData().post({
            email: emailSend,
            password: passwordSend,
            domain: domainSend,
            domainkey: domainKeySend,
        });

        const req = await request(app).post("/deleteuser").send({
            email: emailSend,
            domain: domainSend,
            domainkey: domainKeySend,
        });

        expect(req.body).toBe(true);
    });

    it("Should test if delete user return false", async () => {
        const req = await request(app).post("/deleteuser");

        expect(req.body).toBe(false);
    });
});