var com;
(function (com) {
    var jifeng;
    (function (jifeng) {
        var mvc;
        (function (mvc) {
            var version = (function () {
                function version() {
                    var _this = this;
                    this._vue = new Vue({
                        el: "div[vue=vue]",
                        data: {
                            showall: false,
                            AllFile: [],
                            NewFile: [],
                            date: "",
                            length: 0,
                            version: "",
                            remark: "",
                            loading: false,
                            Scan: false,
                            List: [],
                            SearchText: ""
                        },
                        computed: {
                            getFiles: function () {
                                var _this = this;
                                if (this.showall) {
                                    return this.AllFile.filter(function (number) {
                                        return number.FullName.indexOf(_this.SearchText) >= 0 || (number.LastVersion != null && number.LastVersion.indexOf(_this.SearchText) >= 0);
                                    });
                                }
                                return this.NewFile.filter(function (number) {
                                    return number.FullName.indexOf(_this.SearchText) >= 0 || (number.LastVersion != null && number.LastVersion.indexOf(_this.SearchText) >= 0);
                                });
                            }
                        },
                        methods: {
                            scan: function () {
                                var _this = this;
                                this.loading = true;
                                axios.get('VersionHandler.ashx', {
                                    params: {
                                        _op: "Scan"
                                    }
                                })
                                    .then(function (response) {
                                    console.log(response);
                                    if (response.status == 200) {
                                        return response.data;
                                    }
                                    else
                                        throw response.statusText;
                                })
                                    .then(function (data) {
                                    _this.AllFile = data.AllFile;
                                    _this.NewFile = data.NewFile;
                                    _this.date = new Date().toTimeString();
                                    _this.length = data.length;
                                    _this.loading = false;
                                    _this.remark = "";
                                    _this.version = "";
                                    console.log(data);
                                    _this.Scan = true;
                                })
                                    .catch(function (error) {
                                    _this.loading = false;
                                    console.log(error);
                                });
                                //alert("s2212213sad2213asdsadsadsadsa2d");
                            },
                            save: function () {
                                var _this = this;
                                if (this.version == "") {
                                    alert("请输入版本号");
                                    return;
                                }
                                this.loading = true;
                                axios.post('VersionHandler.ashx?_op=Save', {
                                    version: this.version,
                                    remark: this.remark,
                                    AllFile: this.AllFile,
                                    NewFile: this.NewFile
                                })
                                    .then(function (response) {
                                    console.log(response);
                                    _this.loading = false;
                                    if (response.status == 200) {
                                        return response.data;
                                    }
                                    else
                                        throw response.statusText;
                                })
                                    .then(function (data) {
                                    if (data == "操作成功") {
                                        _this.AllFile = [];
                                        _this.NewFile = [];
                                        _this.date = new Date().toTimeString();
                                        _this.length = 0;
                                        _this.Scan = false;
                                    }
                                    alert(data);
                                    console.log(data);
                                })
                                    .catch(function (error) {
                                    _this.loading = false;
                                    console.log(error);
                                });
                            },
                            getlist: function () {
                                var _this = this;
                                this.loading = true;
                                axios.get('VersionHandler.ashx?_op=GetList', {})
                                    .then(function (response) {
                                    console.log(response);
                                    _this.loading = false;
                                    if (response.status == 200) {
                                        return response.data;
                                    }
                                    else
                                        throw response.statusText;
                                })
                                    .then(function (data) {
                                    _this.List = data.reverse();
                                    console.log(data);
                                })
                                    .catch(function (error) {
                                    _this.loading = false;
                                    console.log(error);
                                });
                            },
                            show: function (item) {
                                var _this = this;
                                this.loading = true;
                                axios.get('VersionHandler.ashx', {
                                    params: {
                                        _op: "Get",
                                        file: item.file
                                    }
                                })
                                    .then(function (response) {
                                    console.log(response);
                                    if (response.status == 200) {
                                        return response.data;
                                    }
                                    else
                                        throw response.statusText;
                                })
                                    .then(function (data) {
                                    _this.AllFile = data.AllFile;
                                    _this.NewFile = data.NewFile;
                                    _this.date = new Date().toTimeString();
                                    _this.length = data.length;
                                    _this.remark = data.remark;
                                    _this.version = data.version;
                                    _this.loading = false;
                                    console.log(data);
                                    _this.Scan = false;
                                })
                                    .catch(function (error) {
                                    _this.loading = false;
                                    console.log(error);
                                });
                            }
                        },
                        filters: {
                            getFileName: function (fullname) {
                                return fullname.substring(_this._vue.length);
                                ;
                            }
                        },
                        created: function () {
                            //获取历史记录；
                            this.getlist();
                        }
                    });
                }
                return version;
            }());
            mvc.version = version;
            var v = new version();
        })(mvc = jifeng.mvc || (jifeng.mvc = {}));
    })(jifeng = com.jifeng || (com.jifeng = {}));
})(com || (com = {}));
//# sourceMappingURL=Version.js.map