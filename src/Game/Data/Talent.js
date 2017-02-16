// @flow


import DataMap from 'Game/Data/Map'

export type TalentType = 'VOUCHER'|'VENDOR'|'SECURITY'|'COOKS'|'WAITERS'|'PHONE'|'DELIVERY'|'ACCOUNTING'|'SIDES'|'DRINKS'|'ADVERTISING'

export type TalentDataType = {
    requires:Array<TalentType>,
    label: string,
    researchDays: number,
}

let TalentMap:DataMap<TalentType, TalentDataType> = new DataMap();

let talents:{[id:TalentType]:TalentDataType} = {
    'VOUCHER': {
        requires: [],
        label:'Voucher',
        researchDays: 5,
    },
    'VENDOR': {
        requires: [],
        label:'Vendor',
        researchDays: 5,
    },
    'SECURITY':{
        requires:[],
        label:'Security',
        researchDays: 1,
    },
    'COOKS':{
        requires:[],
        label:'Cooks',
        researchDays: 1,
    },
    'WAITERS':{
        requires:[],
        label:'Waiters',
        researchDays: 1,
    },
    'PHONE':{
        requires:[],
        label:'Phone',
        researchDays: 1,
    },
    'DELIVERY':{
        requires:[],
        label:'Delivery',
        researchDays: 1,
    },
    'ACCOUNTING':{
        requires:[],
        label:'Accounting',
        researchDays: 1,
    },
    'SIDES':{
        requires:[],
        label:'Sides',
        researchDays: 1,
    },
    'DRINKS':{
        requires:[],
        label:'Drinks',
        researchDays: 1,
    },
    'ADVERTISING':{
        requires:[],
        label:'Advertising',
        researchDays: 1,
    },
}
export default talents


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