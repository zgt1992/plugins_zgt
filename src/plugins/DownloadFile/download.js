// 文件下载
/*
 *   基于vue axios
 *
 *   访问路径：filePath  (相对路径)
 *       全路径：http://172.16.16.129/group1/M00/00/12/rBAQgVs9DdeAH_nuAABWmquPrro235.doc
 *       相对路径：/group1/M00/00/12/rBAQgVs9DdeAH_nuAABWmquPrro235.doc
 *   下载文件名：fileName (下载时显示名称)
 */

// 导入axios，ajax的promise版本
import axios from "axios";

const ajaxUrl = "";   //  开发环境/代理 （/group）              生产环境 / "http://172.16.16.129"

const Axios = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000,
    responseType: "blob"
    // headers: {
    //     "Content-Type": "application/pdf;charset=utf-8" // 'application/xxxx-form' // 'application/json'
    // }
});
/**
 * 响应拦截器
 */
// Axios.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         return Promise.reject(error.response.data);
//     });

function download (httpType, filePath, fileName, params) {
    // if ((filePath.indexOf("http://") !== -1) || (filePath.charAt(0) !== "/")) {
    //     return false;
    // }
    if (params && (httpType !== "post")) { // 非post请求，参数拼接url
        let str = "?";
        for (let key in params) {
            str += key + "=" + params[key] + "&";
        }
        filePath += filePath + str.substring(0, str.length - 1);
        sendHttp(httpType, filePath, fileName, params);
    } else {
        sendHttp(httpType, filePath, fileName, params);
    }
}

let temp = false;
function sendHttp (httpType, filePath, fileName, params) {
    if (temp) return false;
    temp = true;
    window.setTimeout(function () {
        temp = false;
    }, 2000);
    if (httpType === "post") {
        httpPost(filePath, fileName, params);
    } else {
        httpGet(filePath, fileName, params);
    }
}

function httpGet (filePath, fileName, params) {
    Axios.get(filePath)
        .then(function (res) {
            if (res.status === 200) {
                // 获取后台文件名称
                // 下载指标框架
                let reg = new RegExp("\"", "g");
                // let norm = decodeURIComponent(res.headers["content-disposition"].split("filename=")[1].replace(reg, "")).split(";")[0];
                let showSileName = fileName || decodeURIComponent(res.headers["content-disposition"].split("filename=")[1].replace(reg, "")).split(";")[0];
                if (window.navigator.msSaveOrOpenBlob) { // IE
                    try {
                        var blobObject = new Blob([res.data]);
                        window.navigator.msSaveOrOpenBlob(blobObject, showSileName);
                    } catch (e) {
                        console.log(e);
                    }
                } else { // !IE
                    var a = document.createElement("a");
                    var blobObj = new Blob([res.data]);
                    var objectURL = URL.createObjectURL(blobObj);
                    a.href = objectURL; // xhr.response is a blob  group filePath;
                    a.download = showSileName;
                    a.style.display = "none";
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                }
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

function httpPost (filePath, fileName, params) {
    Axios.post(filePath, params)
        .then(function (res) {
            if (res.status === 200) {
                // 获取后台文件名称
                // 下载指标框架
                let reg = new RegExp("\"", "g");
                // let norm = decodeURIComponent(res.headers["content-disposition"].split("filename=")[1].replace(reg, "")).split(";")[0];
                let showSileName = fileName || decodeURIComponent(res.headers["content-disposition"].split("filename=")[1].replace(reg, "")).split(";")[0];
                if (window.navigator.msSaveOrOpenBlob) { // IE
                    try {
                        var blobObject = new Blob([res.data]);
                        window.navigator.msSaveOrOpenBlob(blobObject, showSileName);
                    } catch (e) {
                        console.log(e);
                    }
                } else { // !IE
                    var a = document.createElement("a");
                    var blobObj = new Blob([res.data]);
                    var objectURL = URL.createObjectURL(blobObj);
                    a.href = objectURL; // xhr.response is a blob  group filePath;
                    a.download = showSileName;
                    a.style.display = "none";
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                }
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

export default download;
