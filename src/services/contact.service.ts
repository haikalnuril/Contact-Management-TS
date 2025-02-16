import { Contact, User } from "@prisma/client";
import { ContactResponse, CreateContactRequest, toContactResponse, UpdateContactRequest } from "../models/contact.model";
import { ContactValidation } from "../validations/contact.validation";
import { Validation } from "../validations/index";
import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response.error";
import { logger } from "../application/logging";

export class ContactService {

    static async checkContactMustExists(username: string, contactId: number) : Promise<Contact> {
        const contact = await prismaClient.contact.findUnique({
            where: {
                id: contactId,
                username: username
            }
        })

        if(!contact) {
            throw new ResponseError(404, "Contact not found");
        }

        return contact
    }

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

    static async get(user: User, id: number): Promise<ContactResponse> {
        const contact = await this.checkContactMustExists(user.username, id)

        return toContactResponse(contact)
    }

    static async update(user: User, request: UpdateContactRequest) : Promise<ContactResponse> {
        const updateRequest = Validation.validate(ContactValidation.UPDATE, request)

        await this.checkContactMustExists(user.username, request.id)
        const contact = await prismaClient.contact.update({
            where: {
                id: updateRequest.id,
                username: user.username
            }, 
            data: updateRequest
        })

        return toContactResponse(contact)
    }
}
