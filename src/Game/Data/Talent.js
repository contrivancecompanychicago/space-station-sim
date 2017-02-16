// @flow


import DataMap from 'Game/Data/Map'

export type TalentType = 
    'VOUCHER'|
    'VENDOR'|
    'SECURITY'|
    'COOKS'|
    'WAITERS'|
    'PHONE'|
    'DELIVERY'|
    'ACCOUNTING'|
    'SIDES'|
    'DRINKS'|
    'ADVERTISING'

export type TalentDataType = {
    requires:Array<TalentType>,
    label: string,
    researchDays: number,
}

let TalentMap:DataMap<TalentType, TalentDataType> = new DataMap();

export Talent{[id:TalentType]:TalentType} = {
    'VOUCHER': 'VOUCHER',
    'VENDOR': 'VENDOR',
    'SECURITY': 'SECURITY',
    'COOKS': 'COOKS',
    'WAITERS': 'WAITERS',
    'PHONE': 'PHONE',
    'DELIVERY': 'DELIVERY',
    'ACCOUNTING': 'ACCOUNTING',
    'SIDES': 'SIDES',
    'DRINKS': 'DRINKS',
    'ADVERTISING': 'ADVERTISING',
}

// let talents:{[id:TalentType]:TalentDataType} = {
TalentMap.put('VOUCHER', {
    requires: [],
    label:'Voucher',
    researchDays: 5,
})
TalentMap.put('VENDOR', {
    requires: [],
    label:'Vendor',
    researchDays: 5,
})
TalentMap.put('SECURITY',{
    requires:[],
    label:'Security',
    researchDays: 1,
})
TalentMap.put('COOKS',{
    requires:[],
    label:'Cooks',
    researchDays: 1,
})
TalentMap.put('WAITERS',{
    requires:[],
    label:'Waiters',
    researchDays: 1,
})
TalentMap.put('PHONE',{
    requires:[],
    label:'Phone',
    researchDays: 1,
})
TalentMap.put('DELIVERY',{
    requires:[],
    label:'Delivery',
    researchDays: 1,
})
TalentMap.put('ACCOUNTING',{
    requires:[],
    label:'Accounting',
    researchDays: 1,
})
TalentMap.put('SIDES',{
    requires:[],
    label:'Sides',
    researchDays: 1,
})
TalentMap.put('DRINKS',{
    requires:[],
    label:'Drinks',
    researchDays: 1,
})
TalentMap.put('ADVERTISING',{
    requires:[],
    label:'Advertising',
    researchDays: 1,
})

export default TalentMap;
// }
// export default talents


/*
vouchers
 - shop a docket
 - meal deals
 - 
vendors
security
 - bouncers
 - cameras
cooks
 - experiment
 - train
waiters
 - front desk
phone
 - preorder
 - online 
delivery
 - bike
 - car
 - ubereats
 - drone
accounting
 - tax cut
 - offshore bank account
 - money laundering
sides
 - drinks
   - alco
 garlic bread

advertising
 - radio
 - tv
 - newspaper
 - fliers
 - social media

 facilities 
 - bathrooms
 - disabled
 - mothers room



*/