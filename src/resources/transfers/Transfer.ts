import { ICRUDResource, CRUDResource, CRUDParamsRead, CRUDParamsCreate } from "../CRUDResource"
import {IParams, URLSegments} from "../Resource"
import { ResourceAccessType } from "../../api/RestAPI"
import { IValidatedResource, ValidationSchema } from "../../validation/Validation"
import Validator from "../../validation/validators/Validator"
import { ACTION_NOT_PERMITTED } from "../../errors/Errors"

export interface PTransfer {
    id?: string
    bankAccountId?: string
    amount?: number
    currency?: string
    status?: string
    daysPrior?: number
    metadata?: Object,
    createdOn?: number
    updatedOn?: number
}

export class Transfer extends CRUDResource<PTransfer> implements ICRUDResource<PTransfer>, IValidatedResource<PTransfer> {

    public urlSegment: string = "transfers"
    public accessType: ResourceAccessType = ResourceAccessType.Token

    public schemaCreate (): ValidationSchema {
        return {
            daysPrior : [ new Validator.Required(), new Validator.Numeric() ]
        }

    }

    public create (params: CRUDParamsCreate<PTransfer>): Promise<PTransfer> {
        return this._create(params)
    }

    public read (params: CRUDParamsRead): Promise<PTransfer> {
        return this._read(params)
    }

    public update (params?: any): Promise<any> {
        return Promise.reject(ACTION_NOT_PERMITTED)
    }

    public delete (params?: any): Promise<any> {
        return Promise.reject(ACTION_NOT_PERMITTED)
    }

}