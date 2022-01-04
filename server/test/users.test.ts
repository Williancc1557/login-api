import * as request from "supertest";
import { app } from "../app";
import { getUsersService } from "../service/users-service";

describe("Testing database", () => {
    it("connection", async () => {
        await getUsersService();
    });
});

describe("Testing routes", () => {
    it("Should test user by email and password", async () => {
        const req = await request(app).post("/users/get");
        expect(req.body).toBeDefined();
        expect(typeof req.body).toBe("object");
        expect(req.statusCode).toEqual(200);
    });

    it("Shold test create token", async () => {
        const req = await request(app).post("/createtoken");
        expect(req.statusCode).toEqual(200);
    });

    it("Should test post user", async () => {
        const req = await request(app).post("/users").send({
            email: "test123",
            password: "test123",
        });
        expect(req.statusCode).toEqual(200);
    });

    it("Should test delete user", async () => {
        const req = await request(app).post("/deleteuser").send({
            "email": "test123",
            "domain": "test123",
            "domainkey": "test123",
        });
        expect(req.statusCode).toEqual(200);
    });

    it("Shoud test get auth", async () => {
        const req = await request(app).post("/updateuser");
        expect(req.statusCode).toEqual(200);
    });

    it("Should test get auth", async () => {
        const req = await request(app).get("/verifyauth/:token");
        expect(req.statusCode).toEqual(200);
    });
});
