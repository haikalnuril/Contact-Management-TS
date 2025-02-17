import supertest from "supertest";
import { app } from "../src/application/server";
import { AddressTest, ContactTest, UserTest } from "./test-util";
import { logger } from "../src/application/logging";

describe("POST /api/contacts/:contactId/addresses", () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    });

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it("should be able to create a new address for contact_id from params", async () => {
        const contact = await ContactTest.get();
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdCIsImlhdCI6MTczOTc4NjYxNiwiZXhwIjoxNzM5ODczMDE2fQ.kbyiPcOn6tUv_1OmM20TpU1tDgc__syW9vyozwIEvIc";
        const response = await supertest(app)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set("authorization", `Bearer ${token}`)
            .send({
                street: "Mangli st.",
                city: "Jember",
                province: "East Java",
                country: "Indonesia",
                postal_code: "68331",
            });

        logger.debug(response.body);
        expect(response.status).toBe(201);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.street).toBe("Mangli st.");
        expect(response.body.data.city).toBe("Jember");
        expect(response.body.data.province).toBe("East Java");
        expect(response.body.data.country).toBe("Indonesia");
        expect(response.body.data.postal_code).toBe("68331");
    });

    it("should not be ablt to create new address beacause wrong contact_id", async () => {
        const contact = await ContactTest.get();
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdCIsImlhdCI6MTczOTc4NjYxNiwiZXhwIjoxNzM5ODczMDE2fQ.kbyiPcOn6tUv_1OmM20TpU1tDgc__syW9vyozwIEvIc";
        const response = await supertest(app)
            .post(`/api/contacts/${contact.id + 1}/addresses`)
            .set("authorization", `Bearer ${token}`)
            .send({
                street: "Mangli st.",
                city: "Jember",
                province: "East Java",
                country: "Indonesia",
                postal_code: "68331",
            });

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.message).toBeDefined();
    });
});

describe("GET /api/contacts/:contactId/addresses/:addressId", () => {
    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
        await AddressTest.create();
    });

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it("shhould be able to get data address", async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdCIsImlhdCI6MTczOTc4NjYxNiwiZXhwIjoxNzM5ODczMDE2fQ.kbyiPcOn6tUv_1OmM20TpU1tDgc__syW9vyozwIEvIc";
        const response = await supertest(app)
            .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("authorization", `Bearer ${token}`);

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.street).toBe("Mangli st.");
        expect(response.body.data.city).toBe("Jember");
        expect(response.body.data.province).toBe("East Java");
        expect(response.body.data.country).toBe("Indonesia");
        expect(response.body.data.postal_code).toBe("68331");
    });

    it("shhould not be able to get data address because wrong address id", async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdCIsImlhdCI6MTczOTc4NjYxNiwiZXhwIjoxNzM5ODczMDE2fQ.kbyiPcOn6tUv_1OmM20TpU1tDgc__syW9vyozwIEvIc";
        const response = await supertest(app)
            .get(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
            .set("authorization", `Bearer ${token}`);

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.message).toBeDefined();

    });
});
