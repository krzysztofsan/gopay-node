import { request } from "popsicle"
import prefix = require("popsicle-resolve")
import { isEmpty, underscore, camelCase } from "../utils"
import { Headers } from "~popsicle/dist/base";
import { RequestError } from "../errors/RequestError"
import { ResponseError } from "../errors/ResponseError"
import Response from "~popsicle/dist/response";
import { RequestOptions } from "~popsicle/dist/request";

export type RestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT"

export enum ResourceAccessType {
    None          = 0,
    AppId         = 1 << 0,
    Secret        = 1 << 2,
    Token         = 1 << 3,
    SecretOrToken = Secret | Token
}

export interface RestAPIOptions {
    endpoint : string
    appId?   : string
    secret?  : string
    token?   : string
    camel    : boolean
}

export class RestAPI {

    public token    : string
    public endpoint : string
    public appId    : string
    public secret   : string
    private camel   : boolean

    constructor (options: RestAPIOptions) {
        this.endpoint = options.endpoint
        this.appId = options.appId
        this.secret = options.secret
        this.token = options.token
        this.camel = options.camel
    }

    private hasCredentials (accessType: ResourceAccessType): boolean {
        switch (accessType) {
            case ResourceAccessType.SecretOrToken :
                return !isEmpty(this.token) || (!isEmpty(this.appId) && !isEmpty(this.secret))

            case ResourceAccessType.Token :
                return !isEmpty(this.token)

            case ResourceAccessType.Secret :
                return !isEmpty(this.appId) && !isEmpty(this.secret)

            case ResourceAccessType.AppId :
                return !isEmpty(this.appId)

            default :
                return true
        }
    }

    public getHeaders (accessType: ResourceAccessType): Headers {
        let authorization: string

        switch (accessType) {
            case ResourceAccessType.Token :
                authorization = `Token ${this.token}`
                break

            case ResourceAccessType.Secret :
                authorization = `Credentials ${this.appId}:${this.secret}`
                break

            case ResourceAccessType.AppId :
                authorization = `Credentials ${this.appId}`
                break

            default :
                authorization = null
        }

        return Object.assign({
            "Accept"        : "application/json",
            "Content-Type"  : "application/json"
        }, !isEmpty(authorization) ? { "Authorization" : authorization } : {})
    }

    public send (options: RequestOptions, accessType: ResourceAccessType = ResourceAccessType.None): Promise<Object> {
        if (!this.hasCredentials(accessType)) {
            return Promise.reject<Object>(new RequestError("SDK_WRONG_CREDENTIALS"))
        }

        const body: Object = options.body  ? underscore(options.body) : null

        return new Promise((resolve, reject) => {
            request(Object.assign({}, options, { body, headers : this.getHeaders(accessType) }))
                .use(prefix(this.endpoint))
                .then((response: Response) => {
                    if (response.status >= 200 && response.status < 400) {
                        resolve(this.camel ? camelCase(response.body) : response.body)
                    } else {
                        reject(new ResponseError(response))
                    }
                })
                .catch(() => reject(new ResponseError()))
        })
    }
}