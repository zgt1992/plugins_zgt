<template>
    <div class="downloadFile">
        <div class="downloadFile-item" v-if="_type" @click="delDownload">
            <!-- <i class="el-icon-download"></i> -->
            <i class="fa fa-download"></i>
            <span>{{ tip ? tip : (fileName || "点击下载") }}</span>
        </div>
        <div class="downloadFile-row" v-else>
            <div class="downloadFile-row-left" title="点击右边下载">
                <i class="el-icon-document" v-if="fileName.indexOf('.txt') != -1" />
                <i class="el-icon-edit-outline" v-if="(fileName.indexOf('.doc') != -1) || (fileName.indexOf('.pdf') != -1)" />
                <i class="el-icon-menu" v-if="(fileName.indexOf('.xls') != -1) || (fileName.indexOf('.ppt') != -1)" />
                <i class="el-icon-tickets" v-if="(fileName.indexOf('.rar') != -1) || (fileName.indexOf('.zip') != -1)" />
                <span>{{ tip ? tip : (fileName || "点击右边下载") }}</span>
            </div>
            <!-- <i class="el-icon-download" @click="delDownload"></i> -->
            <i class="fa fa-download" @click="delDownload"></i>
        </div>
    </div>
</template>

<script>
    import downloadHttp from "./download.js";
    export default {
        name: "DownloadFile",
        props: {
            httpType: {
                type: String,
                default: "get"
            },
            filePath: { // 相对路径  /参考js文件
                type: String
            },
            fileName: { // 文件名称
                type: String,
                default: ""
            },
            type: { // 'row': 行左/名称  行右/下载图标    (不传)默认：只有图标
                type: String,
                default: ""
            },
            tip: { // 不显示名称，显示提示
                type: String,
                default: ""
            },
            params: { // 参数
                type: Object,
                default: null
            }
        },
        computed: {
            _type () {
                return !this.type;
            }
        },
        methods: {
            delDownload () {
                if (this.httpType === "post") {
                    this.$emit("beforeDownload", downloadHttp, [this.httpType, this.filePath, this.fileName, this.params]);
                } else {
                    downloadHttp(this.httpType, this.filePath, this.fileName, this.params);
                }
            }
        }
    };
</script>

<style lang="less" scoped>
    .downloadFile {
        font-family: "Microsoft YaHei", "微软雅黑";
        color: #628098;
        // width: 100%;
        width: 180px;
        height: 24px;
        line-height: 24px;
        .el-icon-download,
        .fa-download { // 下载图标
        	cursor:pointer;
        	color: #67C23A;
        	font-size: 14px;
        }
        .el-icon-download {
            font-size: 20px;
        }
        .downloadFile-item {
            margin: 0 auto;
            cursor:pointer;
        }
        .downloadFile-row {
            display: flex;
            justify-content: space-between;
            align-items: center; //    padding: 0 10px;
            //    box-sizing: border-box;
            .downloadFile-row-left {
                display: flex;
                align-items: center;
                min-width: 150px;
                span { // 文件名称
                    min-width: 120px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
                .el-icon-document,
                .el-icon-edit-outline,
                .el-icon-menu,
                .el-icon-tickets { // 文件图标
                    color: #909399;
                    margin-right: 5px;
                }
            }
        }
    }
</style>
