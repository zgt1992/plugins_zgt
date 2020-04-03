# Z0.0.1
# 使用
    （、、）
        <div class="aaaa">
            <scopeCom v-model="scopeVal" :scopeContainInt="true" @errFun="errFun"></scopeCom>
        </div>
    （、、）
    宽高由父元素(如上.aaaa)控制，最小宽200px 最小高30px.
    scopeContainInt: 区间是否包含整数

# 范围字符串格式说明：

    "(5,max)"表示x>5
    "[5,max)"表示x>=5
    "(min,10)"表示x<10
    "(min,10]"表示x<=10
    "(5,10)"表示5<x<10
    "(5,10]"表示5<x<=10
    "[5,10)"表示5<=x<10
    "[5,10]"表示5<=x<=10
    "{5}"表示x=5

##  scopeVal1 绑定值
    支持负数/小数（.89）
##  errFun 错误提示函数
    （、、）
        errFun (err) {
            console.log(err);
        }
    （、、）
    err === "校验成功" 时，scopeVal为有效值，否则为无效值。
