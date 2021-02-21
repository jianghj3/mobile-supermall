import BackTop from "components/content/backTop/BackTop";
import { POP, NEW, SELL } from "common/const"

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBack: false,
        }
    },
    methods: {
        backClick() {
            this.$refs.bscroll.scrollTo(0, 0);
        },
    }
}


export const tabControlMixin = {
    data() {
        return {
            currentType: POP
        }
    },
    methods: {
        tabClick(index) {
            switch (index) {
                case 0:
                    this.currentType = POP;
                    break;
                case 1:
                    this.currentType = NEW;
                    break;
                case 2:
                    this.currentType = SELL;
                    break;
            }
        }
    }

}
