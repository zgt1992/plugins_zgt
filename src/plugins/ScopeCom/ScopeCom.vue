<template>
    <div class="scopeCom">
        <div class="scopeCom-con">
            <input class="scopeCom-left" :class="{'borderGreen': borderGreen1, 'borderRed': borderRed1}" type="text" v-model="val1" @focus="focusFun">
            <div class="scopeCom-center">
                <div class="scopeCom-center-left">
                    <div v-if="selectLeft">
                        <img v-if="selectVal1 == '1'" src="../../assets/小于.png" alt="小于" @click="showLeft">
                        <img v-else-if="selectVal1 == '2'" src="../../assets/小于等于.png" alt="小于等于" @click="showLeft">
                        <img v-else src="../../assets/无.png" alt="无" @click="showLeft">
                    </div>
                    <transition name="fade">
                        <ul class="scopeCom-center-left-list" v-if="showLeftList">
                            <li @click="changeLeft('1')"><img src="../../assets/小于.png" alt="小于"></li>
                            <li @click="changeLeft('2')"><img src="../../assets/小于等于.png" alt="小于等于"></li>
                            <li @click="changeLeft('6')"><img src="../../assets/无.png" alt="无"></li>
                        </ul>
                    </transition>
                </div>
                <div class="scopeCom-center-conten">x</div>
                <div class="scopeCom-center-right">
                    <div v-if="selectRight">
                        <img v-if="selectVal2 == '3'" src="../../assets/小于.png" alt="小于" @click="showRight">
                        <img v-else-if="selectVal2 == '4'" src="../../assets/小于等于.png" alt="小于等于" @click="showRight">
                        <img v-else-if="selectVal2 == '5'" src="../../assets/等于.png" alt="等于" @click="showRight">
                        <img v-else src="../../assets/无.png" alt="无" @click="showRight">
                    </div>
                    <transition name="fade">
                        <ul class="scopeCom-center-right-list" v-if="showRightList">
                            <li @click="changeRight('3')"><img src="../../assets/小于.png" alt="小于"></li>
                            <li @click="changeRight('4')"><img src="../../assets/小于等于.png" alt="小于等于"></li>
                            <li @click="changeRight('5')"><img src="../../assets/等于.png" alt="等于"></li>
                            <li @click="changeRight('6')"><img src="../../assets/无.png" alt="无"></li>
                        </ul>
                    </transition>
                </div>
            </div>
            <input class="scopeCom-right" :class="{'borderGreen': borderGreen2, 'borderRed': borderRed2}" type="text" v-model="val2" @focus="focusFun">
        </div>
        <!-- <i class="fa fa-warning" v-if="errTip != '校验成功'" :title="errTip"></i> -->
    </div>
</template>

<script>
export default {
    name: "ScopeCom",
    model: {
        prop: "scopeVal",
        event: "cc"
    },
    props: {
        scopeVal: String,
        scopeContainInt: Boolean
    },
    data () {
        return {
            val1: "",
            selectVal1: "1",
            selectLeft: true,
            showLeftList: false,
            val2: "",
            selectVal2: "3",
            selectRight: true,
            showRightList: false,
            errTip: "",
            borderGreen1: false,
            borderGreen2: false,
            borderRed1: false,
            borderRed2: false
        };
    },
    watch: {
        scopeVal () {
            // console.log(this.scopeVal);
            this.scopeValFun();
        },
        val1 () {
            this.val1 += "";
            if (this.val1) this.val1 = this.val1.replace(/\s+/g, "");
            // if (this.val1) this.val1 = this.val1.replace(/\s+/g, "").replace(/[^\d | ^. | ^-]/g, "");
            if (this.selectVal1 === "6") this.val1 = "";
            this.changeFun();
        },
        selectVal1 () {
            if (this.selectVal1 === "6") {
                this.val1 = "";
                if (this.selectVal2 === "6") this.selectVal2 = "3";
            } else {
                // if (!this.val1) this.val1 = "0";
                if (this.selectVal2 === "5") this.selectVal2 = "3";
            }
            this.changeFun();
        },
        val2 () {
            this.val2 += "";
            if (this.val2) this.val2 = this.val2.replace(/\s+/g, "");
            // if (this.val2) this.val2 = this.val2.replace(/\s+/g, "").replace(/[^\d | ^. | ^-]/g, "");
            if (this.selectVal2 === "6") this.val2 = "";
            this.changeFun();
        },
        selectVal2 () {
            if (this.selectVal2 === "6") {
                this.val2 = "";
                // if (!this.val1) this.val1 = "0";
                if (this.selectVal1 === "6") this.selectVal1 = "1";
            } else if (this.selectVal2 === "5") {
                this.val1 = "";
                // if (!this.val2) this.val2 = "0";
                this.selectVal1 = "6";
            } else {
                // if (!this.val2) this.val2 = "0";
            }
            this.changeFun();
        }
    },
    created () {
        // console.log(this.scopeVal);
        this.scopeValFun();
    },
    methods: {
        Range (res, err) { // 区间范围检测
            let range = this.scopeVal.replace(/\s+/g, "");
            // let range = this.scopeVal;
            this.errTip = "区间范围不规范！";
            if (!range) {
                err({ path: "区间范围为空", tip: "区间范围不规范！", data: null });
            }
            let min, max, symbol1, symbol2;
            if (range.indexOf("{") !== -1) { // {5}
                max = parseFloat(range.substring(1, range.length - 1));
                if (max) {
                    this.errTip = "校验成功";
                    res({ path: "{5}情况校验成功", tip: "校验成功！", data: { max: max } });
                } else {
                    max = range.substring(1, range.length - 1);
                    err({ path: "{5}情况值非数字", tip: "区间范围不规范！", data: { max: max } });
                }
            } else { // 非{}的
                let t = range.match(/([[(])([-]?[\w.]+),([-]?[\w.]+)([\])])/);
                if (t && t.length >= 5) { // 规范区间
                    min = t[2];
                    symbol1 = t[1];
                    max = t[3];
                    symbol2 = t[4];
                    let dataObj = { min: min, symbol1: symbol1, max: max, symbol2: symbol2 };
                    if (!/^[mM][iI][nN]$/.test(t[2])) {
                        // min = parseFloat(t[2]);
                        symbol1 = t[1];
                    } else {
                        if (symbol1 === "(" && !isNaN(max)) { // (min,5)
                            this.errTip = "校验成功";
                            res({ path: "(min,5)情况校验成功", tip: "校验成功！", data: dataObj });
                        } else {
                            err({ path: "(min,5)情况不规范", tip: "区间范围不规范！", data: dataObj });
                        }
                    }
                    if (!/^[mM][aA][xX]/.test(t[3])) {
                        // max = parseFloat(t[3]);
                        symbol2 = t[4];
                    } else {
                        if (symbol2 === ")" && !isNaN(min)) { // (6,max)
                            this.errTip = "校验成功";
                            res({ path: "(6,max)情况校验成功", tip: "校验成功！", data: dataObj });
                        } else {
                            err({ path: "(6,max)情况不规范", tip: "区间范围不规范！", data: dataObj });
                        }
                    }
                    if (!isNaN(min) && !isNaN(max) && Number(min) > Number(max)) {
                        err({ path: "(5,10)情况最小值大于最大值", tip: "区间范围不规范！", data: dataObj });
                    }
                    if (this.scopeContainInt && (symbol1 === "(") && (symbol2 === ")") && !isNaN(min) && !isNaN(max) && Number(min) < Number(max)) {
                        let left = min.split(".")[0] || 0;
                        let right = max.split(".")[0] || 0;
                        let right2 = max.split(".")[1] || 0;
                        // console.log(left, right, right2)
                        if ((Number(right) - Number(left) > 1) || ((Number(right) - Number(left) === 1) && Number(right2) !== 0)) {
                            this.errTip = "校验成功";
                            res({ path: "包含整数情况校验成功", tip: "校验成功！", data: dataObj });
                        } else {
                            err({ path: "区间范围没有包含整数", tip: "区间范围不规范！（区间范围没有包含整数）", data: dataObj });
                        }
                    }
                    if (!isNaN(min) && !isNaN(max) && Number(min) === Number(max)) {
                        if (symbol1 === "[" && symbol2 === "]") {
                            this.errTip = "校验成功";
                            res({ path: "[1,1]等于情况校验成功", tip: "校验成功！", data: dataObj });
                        } else {
                            err({ path: "等于情况非{}[]", tip: "区间范围不规范！", data: dataObj });
                        }
                    } else {
                        if (isNaN(min) || isNaN(max)) {
                            err({ path: "(5,10)情况情况非数字", tip: "区间范围不规范！", data: dataObj });
                        } else {
                            this.errTip = "校验成功";
                            res({ path: "全为数字情况校验成功", tip: "校验成功！", data: dataObj });
                        }
                    }
                } else {
                    err({ path: "非规范区间", tip: "区间范围不规范！", data: null });
                }
            }
        },
        focusFun () { // 隐藏下拉，展示选择
            this.showLeftList = false; // 左边隐藏
            this.showRightList = false; // 右边隐藏
            this.selectLeft = true;
            this.selectRight = true;
        },
        showLeft () { // 选区左边符号
            this.showRightList = false; // 右边隐藏
            this.showLeftList = true; // 左边展示
            this.selectLeft = false; // 左边原有
            this.selectRight = true; // you
        },
        changeLeft (type) {
            this.selectVal1 = type;
            this.selectLeft = true;
            this.showLeftList = false;
        },
        showRight () { // 选区右边符号
            this.showLeftList = false; // 左边隐藏
            this.showRightList = true; // 右边展示
            this.selectRight = false; // 右边原有
            this.selectLeft = true;
        },
        changeRight (type) {
            this.selectVal2 = type;
            this.selectRight = true;
            this.showRightList = false;
        },
        changeFun () { // 更改值，符号
            // console.log(this.val1, this.val2, this.selectVal1, this.selectVal2);
            if (!this.val1 && !this.val2) {
                return false;
            }
            if (this.selectVal1 === "6") {
                // 左边 无
                if (this.selectVal2 === "5") {
                    // 右边 =
                    this.$emit("cc", `{${this.val2}}`);
                } else {
                    // 右边 < <=  // X </<= b
                    this.$emit(
                        "cc",
                        `(min,${this.val2}${this.changeValToSymbol(this.selectVal2)}`
                    );
                }
            } else {
                // 左边有值
                if (this.selectVal2 === "6") {
                    // 右边 无  // a </<= X
                    this.$emit(
                        "cc",
                        `${this.changeValToSymbol(this.selectVal1)}${this.val1},max)`
                    );
                } else {
                    // 右边 < <= // a </<= X </<= b
                    this.$emit(
                        "cc",
                        `${this.changeValToSymbol(this.selectVal1)}${this.val1},${this.val2}${this.changeValToSymbol(this.selectVal2)}`
                    );
                }
            }
        },
        scopeValFun () { // 同步数据
            // let scopeValue = this.scopeVal.replace(/\s+/g, "");
            new Promise(this.Range)
                .then(res => {
                    // console.log(res);
                    this.errTip = "校验成功";
                    this.$emit("errFun", this.errTip);
                    this.focusFun();
                    if (res.path === "{5}情况校验成功") { // =
                        this.val1 = "";
                        this.selectVal1 = "6";
                        this.selectVal2 = "5";
                        this.val2 = res.data.max;
                        this.changeBorder(1, 2);
                    } else if (res.path === "(min,5)情况校验成功") {
                        // x<b
                        this.val1 = "";
                        this.selectVal1 = "6";
                        this.selectVal2 = res.data.symbol2 && res.data.symbol2 === ")" ? "3" : "4";
                        this.val2 = res.data.max;
                        this.changeBorder(1, 2);
                    } else if (res.path === "(6,max)情况校验成功") {
                        // a<x
                        this.val2 = "";
                        this.selectVal2 = "6";
                        this.selectVal1 = res.data.symbol1 && res.data.symbol1 === "(" ? "1" : "2";
                        this.val1 = res.data.min;
                        this.changeBorder(2, 1);
                    } else if (res.path === "[1,1]等于情况校验成功") {
                        this.val2 = res.data.min;
                        this.selectVal2 = res.data.symbol2 && res.data.symbol2 === ")" ? "3" : "4";
                        this.selectVal1 = res.data.symbol1 && res.data.symbol1 === "(" ? "1" : "2";
                        this.val1 = res.data.min;
                        this.changeBorder(2, 2);
                    } else {
                        // a<x<b
                        this.val1 = res.data.min;
                        this.selectVal1 = res.data.symbol1 && res.data.symbol1 === "(" ? "1" : "2";
                        this.selectVal2 = res.data.symbol2 && res.data.symbol2 === ")" ? "3" : "4";
                        this.val2 = res.data.max;
                        this.changeBorder(2, 2);
                    }
                    // this.changeBorder(res);
                })
                .catch(err => {
                    // console.log(err);
                    if (err.data) {
                        switch (err.path) {
                        case "{5}情况值非数字":
                            this.val1 = "";
                            this.selectVal1 = "6";
                            this.selectVal2 = "5";
                            this.val2 = err.data.max;
                            this.changeBorder(1, 0);
                            break;
                        case "(min,5)情况不规范":
                            this.val1 = "";
                            this.selectVal1 = "6";
                            this.selectVal2 = err.data.symbol2 === ")" ? "3" : "4";
                            this.val2 = err.data.max;
                            this.changeBorder(1, 0);
                            break;
                        case "(6,max)情况不规范":
                            this.val1 = err.data.min;
                            this.selectVal1 = err.data.symbol1 === "(" ? "1" : "2";
                            this.selectVal2 = "6";
                            this.val2 = "";
                            this.changeBorder(0, 1);
                            break;
                        case "等于情况非{}[]":
                        case "(5,10)情况最小值大于最大值":
                            this.val1 = err.data.min;
                            this.selectVal1 = err.data.symbol1 === "(" ? "1" : "2";
                            this.selectVal2 = err.data.symbol2 === ")" ? "3" : "4";
                            this.val2 = err.data.max;
                            this.changeBorder(1, 0);
                            break;
                        case "(5,10)情况情况非数字":
                            this.val1 = err.data.min;
                            this.selectVal1 = err.data.symbol1 === "(" ? "1" : "2";
                            this.selectVal2 = err.data.symbol2 === ")" ? "3" : "4";
                            this.val2 = err.data.max;
                            if (isNaN(this.val1)) {
                                this.changeBorder(0, 1);
                            } else {
                                this.changeBorder(1, 0);
                            }
                            break;
                        default:
                            this.changeBorder(0, 0);
                            break;
                        }
                        this.focusFun();
                    } else {
                        if (err.path === "区间范围为空") {
                            this.changeBorder(1, 1);
                        } else {
                            this.changeBorder(0, 0);
                        }
                    }
                    this.errTip = err.tip;
                    this.$emit("errFun", this.errTip);
                    this.focusFun();
                    if (!this.scopeVal) {
                        this.val1 = this.val2 = "";
                        this.changeBorder(1, 1);
                    }
                });
        },
        changeBorder (border1, border2) {
            switch (border1) {
            case 1:
                this.borderGreen1 = false;
                this.borderRed1 = false;
                break;
            case 2:
                this.borderGreen1 = true;
                this.borderRed1 = false;
                break;
            default:
                this.borderGreen1 = false;
                this.borderRed1 = true;
                break;
            }
            switch (border2) {
            case 1:
                this.borderGreen2 = false;
                this.borderRed2 = false;
                break;
            case 2:
                this.borderGreen2 = true;
                this.borderRed2 = false;
                break;
            default:
                this.borderGreen2 = false;
                this.borderRed2 = true;
                break;
            }
        },
        changeValToSymbol (str) { // 区间符号转换
            switch (str) {
            case "1": // <
                return "(";
            case "2": // <=
                return "[";
            case "3": // <
                return ")";
            case "4": // <=
                return "]";
            // case "5": // =
            //   return "=";
            // default: // 无
            //   return "无";
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
* {
    box-sizing: border-box;
}
.scopeCom {
    width: 100%;
    min-width: 200px;
    height: 100%;
    min-height: 30px;
    .scopeCom-con { // 内容部分
        width: 100%;
        height: 100%;
        // padding-right: 20px;
        display: flex;
        .scopeCom-left,
        .scopeCom-right { // input
            flex: 1;
            min-width: 50px;
            background-color: #fff;
            background-image: none;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            color: #606266;
            display: inline-block;
            font-size: inherit;
            outline: 0;
            padding: 0 15px;
            -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            &.borderRed {
                border-color: #f56c6c;
            }
            &.borderGreen {
                border-color: #67c23a;
            }
            &:focus {
                border-color: #409eff;
            }
        }
        .scopeCom-center { // 中间件
            flex: 0 0 80px;
            height: 30px;
            line-height: 30px;
            align-self: center;
            display: flex;
            justify-content: space-around;
            img {
                width: 20px;
                height: 20px;
                margin-top: 3px;
            }
            .scopeCom-center-left-list,
            .scopeCom-center-right-list {
                position: relative;
                z-index: 100;
                img {
                    border-radius: 50%;
                    border: 1px solid transparent;
                }
                img:hover {
                    border: 1px solid #409EFF;
                }
            }
        }
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity .6s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
