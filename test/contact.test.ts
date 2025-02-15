import supertest from "supertest";
import { ContactTest, UserTest } from "./test-util";
import { app } from "../src/application/server";
import { logger } from "../src/application/logging";
import bcrypt from "bcryptjs";

describe("POST /api/contacts", () => {

    beforeEach(async () => {
            await UserTest.create();
        });
    
        afterEach(async () => {
            await ContactTest.deleteAll();
            await UserTest.delete();
        });

    it('should create new contact', async () => {
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdCIsImlhdCI6MTczOTU0NzUyNCwiZXhwIjoxNzM5NjMzOTI0fQ.GXhylDrcHSYlsGb7c9ohaG2dGoSdds2cwfhQ4eX8Uy0";
        const response = await supertest(app)
        .post("/api/contacts")
        .set("authorization", `Bearer ${token}`)
        .send({
            first_name: "jetro",
            last_name: "sulthan",
            email: "jetro@example.com",
            phone: "08510101015"
        })

        logger.debug(response.body)
        expect(response.status).toBe(201)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.first_name).toBe("jetro")
        expect(response.body.data.last_name).toBe("sulthan")
        expect(response.body.data.email).toBe("jetro@example.com")
        expect(response.body.data.phone).toBe("08510101015")
    })

    it('should not be able to create new contact if data is invalid', async () => {
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdCIsImlhdCI6MTczOTU0NzUyNCwiZXhwIjoxNzM5NjMzOTI0fQ.GXhylDrcHSYlsGb7c9ohaG2dGoSdds2cwfhQ4eX8Uy0";
        const response = await supertest(app)
        .post("/api/contacts")
        .set("authorization", `Bearer ${token}`)
        .send({
            first_name: "",
            last_name: "",
            email: "jet",
            phone: "08921038901283901230912803218901283"
        })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.message).toBeDefined()
    })
})