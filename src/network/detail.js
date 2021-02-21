import { request } from "./request"

export function getDetailData(iid) {
    return request({
        url: "/detail",
        params: {
            iid
        }

    })
}

export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.columns = columns;
        this.services = services;
        this.realPrice = itemInfo.lowNowPrice;
    }
}

export class Shop {
    constructor(shopInfo) {
        this.shopLogo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.cFans = shopInfo.cFans
        this.cSells = shopInfo.cSells;
        this.cGoods = shopInfo.cGoods;
        this.score = shopInfo.score;
    }
}

export class GoodsParams {
    constructor(info, rule) {
        // images的值可能有，可能没有
        this.image = info.images ? info.images[0] : '';
        this.info = info.set;
        this.sizes = rule.tables;

    }
}


export function getRecommendsData() {
    return request({
        url: "/recommend",

    })
}
