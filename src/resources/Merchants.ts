import {
    CRUDResource,
    CRUDIdParam,
    CRUDPaginationParams,
    CRUDMerchantIdParam,
    CRUDDefinedRoute
} from "./CRUDResource"
import { SDKCallbackFunction } from "../api/RestAPI"
import { ContactInfoParams } from "./common/ContactInfo"
import { ConfigurationParams } from "./common/Configuration"
import {
    merchantCreateSchema,
    merchantUpdateSchema,
    merchantChangePasswordSchema,
    merchantResetPasswordSchema
} from "../validation/schemas/merchant"

export interface MerchantCommonParams {
    email?: string
    address?: ContactInfoParams
    configuration?: ConfigurationParams
}

export interface MerchantCreateParams extends MerchantCommonParams {
    email: string
    password: string
}

export interface MerchantUpdateParams extends MerchantCommonParams {}

export interface MerchantChangePassword {
    oldPassword?: string
    newPassword: string
    confirmPassword: string
}

export interface MerchantResetPassword {
    email: string
}

export class Merchants extends CRUDResource {

    public static routeBase: string = "/merchants"

    public _changePasswordRoute: CRUDDefinedRoute =
        this.defineRoute("POST", "/(merchants/:merchantId/)change_password")

    public _resetPasswordRoute: CRUDDefinedRoute =
        this.defineRoute("POST", "/reset_password")

    public list (data: CRUDPaginationParams, callback?: SDKCallbackFunction, token?: string): Promise<any> {
        return this._listRoute(null, data, callback, { token })
    }

    public create (data: MerchantCreateParams, callback?: SDKCallbackFunction, token?: string): Promise<any> {
        return this._createRoute(null, data, callback, { token, validationSchema : merchantCreateSchema })
    }

    public get (id: string, callback?: SDKCallbackFunction, token?: string): Promise<any> {
        const params: CRUDIdParam = { id }
        return this._getRoute(params, null, callback, { token })
    }

    public update (id: string, data?: MerchantUpdateParams, callback?: SDKCallbackFunction, token?: string): Promise<any> {
        const params: CRUDIdParam = { id }
        return this._updateRoute(params, data, callback, { token, validationSchema : merchantUpdateSchema })
    }

    public changePassword (data: MerchantChangePassword,
                           callback?: SDKCallbackFunction,
                           merchantId?: string,
                           token?: string): Promise<any> {
        const params: CRUDMerchantIdParam = { merchantId }
        const validationSchema: any = merchantChangePasswordSchema(Boolean(token))
        return this._changePasswordRoute(params, data, callback, { token, validationSchema })
    }

    public resetPassword (data: MerchantResetPassword, callback?: SDKCallbackFunction): Promise<any> {
        return this._resetPasswordRoute(null, data, callback, { validationSchema : merchantResetPasswordSchema })
    }

}
