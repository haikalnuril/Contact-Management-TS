import { User } from "@prisma/client";
import { ContactResponse, CreateContactRequest, toContactResponse } from "../models/contact.model";
import { ContactValidation } from "../validations/contact.validation";
import { Validation } from "../validations/index";
import { prismaClient } from "../application/database";

export class ContactService {
    static async create(user: User,
        request: CreateContactRequest
    ): Promise<ContactResponse> {
        const createRequest = Validation.validate(
            ContactValidation.CREATE,
            request
        );

        const record = {
            ...createRequest,
            ...{username: user.username}
        }

        const contact = await prismaClient.contact.create({
            data: record
        })

        return toContactResponse(contact)
    }
}
