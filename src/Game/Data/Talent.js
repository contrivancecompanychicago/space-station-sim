// @flow

export type TalentType = 'VOUCHER'|'VENDOR'

export type TalentDataType = {
    requires:Array<TalentType>,
    label: string,
    researchDays: number,
}

let talents:{[id:TalentType]:TalentDataType} = {
    'VOUCHER': {
        requires: [],
        label:'Voucher',
        researchDays: 5,
    }
}
export default talents


// vouchers
// vendors
// security
//  - bouncers
//  - cameras
// waiters
//  - front desk
// phone
//  - preorder
// delivery
//  - bike
//  - car
//  - ubereats
//  - drone

// sides
//  - drinks
//    - alco
//  garlic bread
