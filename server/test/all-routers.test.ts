import * as request from "supertest";
import { app } from "../app";
import * as dotenv from "dotenv"; // Used to get data in .env
dotenv.config();

describe("Actions get user router", () => {
    it("Should test if get route result account not found", async () => {
        const req = await request(app).post("/users/get").send({});
        expect(req.body.value).toBe(false);
    });

    it("Should test if get route return valid account", async () => {
        const req = await request(app).post("/users/get").send({
            "email": "willianccc@gmail.com",
            "domain": "domain11key",
            "domainkey": process.env.DOMAINKEY_SENSIVE,
        });
        expect(typeof req.body.email).toBe("string");
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
});