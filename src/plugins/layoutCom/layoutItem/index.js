const comName = require.context("./", false, /.vue/);
const comList = comName.keys();

let arr = [];
comList.forEach((ele) => {
    arr.push(comName(ele).default || comName(ele));
});

export default arr;
