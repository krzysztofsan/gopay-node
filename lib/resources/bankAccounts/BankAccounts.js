"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RestAPI_1 = require("../../api/RestAPI");
var MerchantListResource_1 = require("../MerchantListResource");
var BankAccounts = (function (_super) {
    __extends(BankAccounts, _super);
    function BankAccounts() {
        _super.apply(this, arguments);
        this.urlSegment = "bank_accounts";
        this.accessType = RestAPI_1.ResourceAccessType.Token;
    }
    BankAccounts.prototype.read = function (params) {
        return this._read(params);
    };
    return BankAccounts;
}(MerchantListResource_1.MerchantListResource));
exports.BankAccounts = BankAccounts;
//# sourceMappingURL=BankAccounts.js.map