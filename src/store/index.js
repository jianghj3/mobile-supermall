import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        cartList: []
    },
    mutations: {
        addCount(state, payload) {
            payload.count += 1;
        },
        addToCart(state, payload) {
            payload.check = true;
            state.cartList.push(payload);
        }

    },
    actions: {
        addCart(context, payload) {
            return new Promise((resolve, reject) => {
                let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
                if (oldProduct) {
                    context.commit('addCount', oldProduct);
                    resolve('当前商品数量加1')

                } else {
                    payload.count = 1;
                    context.commit('addToCart', payload);
                    resolve('成功添加到购物车')

                }

            })
        }

    },
    getters: {
        cartListLength(state) {
            return state.cartList.length
        }


    }
})

export default store