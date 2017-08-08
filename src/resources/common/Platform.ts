import { WithCreatedOn, AmountWithCurrency } from "./Common"
import { CardBrandPercentFeesItem } from "./Configuration"
import { TransferSchedule } from "./TransferSchedule"
import { InvoiceChargeFee } from "./Invoice"

export interface PlatformUserDefaults {
    percentFee: number
    transferSchedule: TransferSchedule
    flatFees: Array<AmountWithCurrency>
    waitPeriod: string
    cardBrandPercentFees: CardBrandPercentFeesItem
}

export interface PlatformPaymentDefaults {
    cardsEnabled: boolean
    qrScanEnabled: boolean
    prepaidEnabled: boolean
    debitEnabled: boolean
}

export interface PlatformItem extends WithCreatedOn {
    id: string
    key: string
    name: string
    invoiceChargeFee: Array<InvoiceChargeFee>
}

export interface PlatformConfiguration {
    adminEmailAddresses: Array<string>
    notifyUserTransactions: boolean
    defaultLanguage: string
    country: string
    currency: string
    logoUri: string
    userDefaults: PlatformUserDefaults
    paymentDefaults: PlatformPaymentDefaults
}
