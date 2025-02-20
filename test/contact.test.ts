import supertest from "supertest";
import { ContactTest, UserTest } from "./test-util";
import { app } from "../src/application/server";
import { logger } from "../src/application/logging";

describe("POST /api/contacts", () => {
    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it("should create new contact", async () => {
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdCIsImlhdCI6MTczOTc4NjYxNiwiZXhwIjoxNzM5ODczMDE2fQ.kbyiPcOn6tUv_1OmM20TpU1tDgc__syW9vyozwIEvIc";
        const response = await supertest(app)
            .post("/api/contacts")
            .set("authorization", `Bearer ${token}`)
            .send({
                first_name: "jetro",
                last_name: "sulthan",
                email: "jetro@example.com",
                phone: "08510101015",
            });

        logger.debug(response.body);
        expect(response.status).toBe(201);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.first_name).toBe("jetro");
        expect(response.body.data.last_name).toBe("sulthan");
        expect(response.body.data.email).toBe("jetro@example.com");
        expect(response.body.data.phone).toBe("08510101015");
    });

    it("should not be able to create new contact if data is invalid", async () => {
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdCIsImlhdCI6MTczOTc4NjYxNiwiZXhwIjoxNzM5ODczMDE2fQ.kbyiPcOn6tUv_1OmM20TpU1tDgc__syW9vyozwIEvIc";
        const response = await supertest(app)
            .post("/api/contacts")
            .set("authorization", `Bearer ${token}`)
            .send({
                first_name: "",
                last_name: "",
                email: "jet",
                phone: "08921038901283901230912803218901283",
            });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.message).toBeDefined();
    });
});

describe("GET /api/contacts/:contactId", () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    });

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it("should be able to get contact data by id params", async () => {
        const contact = await ContactTest.get();
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdCIsImlhdCI6MTczOTc4NjYxNiwiZXhwIjoxNzM5ODczMDE2fQ.kbyiPcOn6tUv_1OmM20TpU1tDgc__syW9vyozwIEvIc";
        const response = await supertest(app)
            .get(`/api/contacts/${contact.id}`)
            .set("authorization", `Bearer ${token}`);

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.first_name).toBe(contact.first_name);
        expect(response.body.data.last_name).toBe(contact.last_name);
        expect(response.body.data.email).toBe(contact.email);
        expect(response.body.data.phone).toBe(contact.phone);
    });

    it("should not be able to get contact data by id params cause wrong id", async () => {
        const contact = await ContactTest.get();
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdCIsImlhdCI6MTczOTc4NjYxNiwiZXhwIjoxNzM5ODczMDE2fQ.kbyiPcOn6tUv_1OmM20TpU1tDgc__syW9vyozwIEvIc";
        const response = await supertest(app)
            .get(`/api/contacts/${contact.id + 1}`)
            .set("authorization", `Bearer ${token}`);

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.message).toBeDefined();
    });
});

describe("PUT /api/contacts/:contactId", () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    });

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it("should be able to update contact by id params", async () => {
        const contact = await ContactTest.get();
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdCIsImlhdCI6MTczOTc4NjYxNiwiZXhwIjoxNzM5ODczMDE2fQ.kbyiPcOn6tUv_1OmM20TpU1tDgc__syW9vyozwIEvIc";
        const response = await supertest(app)
            .put(`/api/contacts/${contact.id}`)
            .set("authorization", `Bearer ${token}`)
            .send({
                first_name: "haikal",
                last_name: "abiyit",
                email: "haikal.nuril@example.com",
                phone: "08954444312",
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.first_name).toBe("haikal");
        expect(response.body.data.last_name).toBe("abiyit");
        expect(response.body.data.email).toBe("haikal.nuril@example.com");
        expect(response.body.data.phone).toBe("08954444312");
    });

    it("should not be able to update contact by id params", async () => {
        const contact = await ContactTest.get();
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdCIsImlhdCI6MTczOTc4NjYxNiwiZXhwIjoxNzM5ODczMDE2fQ.kbyiPcOn6tUv_1OmM20TpU1tDgc__syW9vyozwIEvIc";
        const response = await supertest(app)
            .put(`/api/contacts/${contact.id + 1}`)
            .set("authorization", `Bearer ${token}`)
            .send({
                first_name: "haikal",
                last_name: "abiyit",
                email: "haikal.nuril@example.com",
                phone: "08954444312",
            });

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.message).toBeDefined();
    });
});

describe("DELETE /api/contacts/:contactId", () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    });

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it("should be able to delete contact by id params", async () => {
        const contact = await ContactTest.get();
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdCIsImlhdCI6MTczOTc4NjYxNiwiZXhwIjoxNzM5ODczMDE2fQ.kbyiPcOn6tUv_1OmM20TpU1tDgc__syW9vyozwIEvIc";
        const response = await supertest(app)
            .delete(`/api/contacts/${contact.id}`)
            .set("authorization", `Bearer ${token}`);

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.message).toBeDefined();
    });

    it("should not be able to delete contact by id params", async () => {
        const contact = await ContactTest.get();
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdCIsImlhdCI6MTczOTc4NjYxNiwiZXhwIjoxNzM5ODczMDE2fQ.kbyiPcOn6tUv_1OmM20TpU1tDgc__syW9vyozwIEvIc";
        const response = await supertest(app)
            .delete(`/api/contacts/${contact.id + 1}`)
            .set("authorization", `Bearer ${token}`);

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.message).toBeDefined();
    });
});

describe("GET /api/contacts/:query", () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    });

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });
    it("should be able to get contacts data without using query", async () => {
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdCIsImlhdCI6MTczOTc4NjYxNiwiZXhwIjoxNzM5ODczMDE2fQ.kbyiPcOn6tUv_1OmM20TpU1tDgc__syW9vyozwIEvIc";
        const response = await supertest(app)
            .get("/api/contacts")
            .set("authorization", `Bearer ${token}`);

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.size).toBe(5);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
    });
    it("should be able to get contacts data using query", async () => {
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdCIsImlhdCI6MTczOTc4NjYxNiwiZXhwIjoxNzM5ODczMDE2fQ.kbyiPcOn6tUv_1OmM20TpU1tDgc__syW9vyozwIEvIc";
        const response = await supertest(app)
            .get("/api/contacts")
            .query({
                name: "es",
                email: "john",
                phone: "089",
            })
            .set("authorization", `Bearer ${token}`);

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.size).toBe(5);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
    });

    it("should be able to get contacts data using query that false", async () => {
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdCIsImlhdCI6MTczOTc4NjYxNiwiZXhwIjoxNzM5ODczMDE2fQ.kbyiPcOn6tUv_1OmM20TpU1tDgc__syW9vyozwIEvIc";
        const response = await supertest(app)
            .get("/api/contacts")
            .query({
                name: "salah",
            })
            .set("authorization", `Bearer ${token}`);

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0);
        expect(response.body.paging.size).toBe(5);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(0);
    });

    it("should not be able to get contacts data", async () => {
        const response = await supertest(app)
            .get("/api/contacts")
            .query({
                name: "es",
                email: "john",
                phone: "089",
            })
            .set("authorization", `Bearer `);

        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.message).toBeDefined();
    });
});
