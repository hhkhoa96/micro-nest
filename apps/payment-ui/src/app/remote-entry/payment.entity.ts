
type CardType = "visa" | "master card"

export interface PaymentMethod {
    _id: string
    name: string
    number: string
    isDefault: boolean
    expiredDate: string
    type: CardType
}

export interface PaymentMethodCreate {
    name: string
    number: string
    expiredDate: string
    cvc: string
}