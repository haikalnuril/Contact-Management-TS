import supertest from "supertest";
import { app } from "../src/application/server";
import { logger } from "../src/application/logging";
import { UserTest } from "./test-util";
import bcrypt from "bcryptjs";

describe("POST /api/users", () => {
    afterEach(async () => {
        await UserTest.delete();
    });

    it("should reject register new user if request is invalid", async () => {
        const response = await supertest(app).post("/api/users").send({
            username: "",
            password: "",
            name: "",
        });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.message).toBeDefined();
    });

    it("should register new user", async () => {
        const response = await supertest(app).post("/api/users").send({
            username: "test",
            password: "password",
            name: "test",
        });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.name).toBe("test");
    });
});

describe("POST /api/users/login", () => {
    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
    });

    it("should be able to login", async () => {
        const response = await supertest(app).post("/api/users/login").send({
            username: "test",
            password: "password",
        });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.name).toBe("test");
        expect(response.body.data.token).toBeDefined();
    });

    it("should not be able to login", async () => {
        const response = await supertest(app).post("/api/users/login").send({
            username: "",
            password: "",
        });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.message).toBeDefined();
    });
    it("should not be able to login if username is wrong", async () => {
        const response = await supertest(app).post("/api/users/login").send({
            username: "wrong",
            password: "password",
        });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.message).toBeDefined();
    });
    it("should not be able to login if password is wrong", async () => {
        const response = await supertest(app).post("/api/users/login").send({
            username: "test",
            password: "wrong",
        });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.message).toBeDefined();
    });
});

describe("GET /api/users/current", () => {
    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
    });

    it("should be able to get user", async () => {
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdCIsImlhdCI6MTczOTY5MDg1NSwiZXhwIjoxNzM5Nzc3MjU1fQ.2yqA1o-ICoU6QDDPF9VUHo3JbQ_wTnE8sI7mHYa7BoQ";
        const response = await supertest(app)
            .get("/api/users/current")
            .set("authorization", `Bearer ${token}`);

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.name).toBe("test");
    });

    it("should not be able to get user data", async () => {
        const response = await supertest(app)
            .get("/api/users/current")
            .set("authorization", `Bearer `);

        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.message).toBeDefined();
    });
    it("should not be able to get user data", async () => {
        const response = await supertest(app).get("/api/users/current");

        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.message).toBeDefined();
    });
});

describe("PATCH /api/users/current", () => {
    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
    });

    it("should reject update user if request is invalid", async () => {
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdCIsImlhdCI6MTczOTY5MDg1NSwiZXhwIjoxNzM5Nzc3MjU1fQ.2yqA1o-ICoU6QDDPF9VUHo3JbQ_wTnE8sI7mHYa7BoQ";
        const response = await supertest(app)
            .patch("/api/users/current")
            .set("authorization", `Bearer ${token}`)
            .send({
                name: "",
                password: "",
            });

        logger.debug(response.body);

        expect(response.status).toBe(400);
        expect(response.body.message).toBeDefined();
    });

    it("should reject update user if user have false token", async () => {
        const response = await supertest(app)
            .patch("/api/users/current")
            .set("authorization", `Bearer `);

        logger.debug(response.body);

        expect(response.status).toBe(401);
        expect(response.body.message).toBeDefined();
    });

    it("should update user name", async () => {
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdCIsImlhdCI6MTczOTY5MDg1NSwiZXhwIjoxNzM5Nzc3MjU1fQ.2yqA1o-ICoU6QDDPF9VUHo3JbQ_wTnE8sI7mHYa7BoQ";
        const response = await supertest(app)
            .patch("/api/users/current")
            .set("authorization", `Bearer ${token}`)
            .send({
                name: "bisa",
            });

        logger.debug(response.body);

        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe("bisa");
    });

    it("should update user password", async () => {
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdCIsImlhdCI6MTczOTY5MDg1NSwiZXhwIjoxNzM5Nzc3MjU1fQ.2yqA1o-ICoU6QDDPF9VUHo3JbQ_wTnE8sI7mHYa7BoQ";
        const response = await supertest(app)
            .patch("/api/users/current")
            .set("authorization", `Bearer ${token}`)
            .send({
                password: "firhan12",
            });

        logger.debug(response.body);

        expect(response.status).toBe(200);

        const user = await UserTest.get();

        expect(await bcrypt.compareSync("firhan12", user.password)).toBe(true);
    });
});

describe("DELETE /api/users/current", () => {
    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
    });

    it("should be able to logout", async () => {
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdCIsImlhdCI6MTczOTY5MDg1NSwiZXhwIjoxNzM5Nzc3MjU1fQ.2yqA1o-ICoU6QDDPF9VUHo3JbQ_wTnE8sI7mHYa7BoQ";
        const response = await supertest(app)
            .delete("/api/users/current")
            .set("authorization", `Bearer ${token}`);

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Logout Success");

        const user = await UserTest.get();
        expect(user.token).toBe(null);
    });
    it("should reject to logout if token wrong", async () => {
        const response = await supertest(app)
            .delete("/api/users/current")
            .set("authorization", `Bearer `);

        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.message).toBeDefined();
    });
});
