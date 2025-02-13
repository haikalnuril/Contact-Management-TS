import supertest from "supertest";
import { app } from "../src/application/server";
import { logger } from "../src/application/logging";
import { UserTest } from "./test-util";

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

    it('should be able to login', async () => {
        const response = await supertest(app).post('/api/users/login').send({
            username: "test",
            password: "password"
        })

        logger.debug(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.name).toBe("test");
        expect(response.body.data.token).toBeDefined();

    })

    it('should not be able to login', async() => {
        const response = await supertest(app).post('/api/users/login').send({
            username: "",
            password: ""
        })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.message).toBeDefined()
    })
    it('should not be able to login if username is wrong', async() => {
        const response = await supertest(app).post('/api/users/login').send({
            username: "wrong",
            password: "password"
        })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.message).toBeDefined()
    })
    it('should not be able to login if password is wrong', async() => {
        const response = await supertest(app).post('/api/users/login').send({
            username: "test",
            password: "wrong"
        })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.message).toBeDefined()
    })
});
