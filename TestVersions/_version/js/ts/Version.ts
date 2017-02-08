namespace com.jifeng.mvc {

    export class version {
        public _vue;
        
        public constructor() {
         
            this._vue = new Vue({
                el: "div[vue=vue]",
                data: {
                    showall: false,
                    AllFile:[],
                    NewFile: [],
                    date: "",
                    length: 0,
                    version: "",
                    remark: "",
                    loading: false,
                    Scan: false,
                    List: [],
                    SearchText:""
                },
                computed: {
                    getFiles: function () {
                        if (this.showall) {
                            return this.AllFile.filter( (number)=> {
                                return number.FullName.indexOf(this.SearchText) >= 0 || (number.LastVersion !=null &&number.LastVersion.indexOf(this.SearchText)>=0)
                            });
                        }
                        return this.NewFile.filter((number) =>{
                            return number.FullName.indexOf(this.SearchText) >= 0 || (number.LastVersion != null && number.LastVersion.indexOf(this.SearchText) >= 0)
                        });
                    }   
                },
                methods: {
                    scan: function () {
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
                            .then(data=> {
                                this.AllFile = data.AllFile;
                                this.NewFile = data.NewFile;
                                this.date = new Date().toTimeString();
                                this.length = data.length;
                                this.loading = false;
                                this.remark = "";
                                this.version = "";
                                console.log(data);
                                this.Scan = true;
                            })
                            .catch(error => {
                                this.loading = false;



                                console.log(error);
                            });
                        //alert("s2212213sad2213asdsadsadsadsa2d");
                    },
                    save: function () {
                        if (this.version == "") {
                            alert("请输入版本号");
                            return;
                        }
                        this.loading = true;
                        axios.post('VersionHandler.ashx?_op=Save', {
                                version: this.version,
                                remark: this.remark,                
                                    AllFile: this.AllFile,
                                    NewFile:this.NewFile
                        })
                            .then( (response)=> {
                                console.log(response);
                                this.loading = false;

                                if (response.status == 200) {
                                    return response.data;
                                }
                                else
                                    throw response.statusText;
                            })
                            .then(data => {
                                if (data == "操作成功") {
                                    this.AllFile = [];
                                    this.NewFile = [];
                                    this.date = new Date().toTimeString();
                                    this.length = 0;
                                    this.Scan = false;
                                }
                                alert(data)
                                console.log(data);
                            })
                            .catch(error=> {
                                this.loading = false;

                                console.log(error);
                            });
                        
                    },
                    getlist: function () {
                        this.loading = true;
                        axios.get('VersionHandler.ashx?_op=GetList', {

                        })
                            .then(response=> {
                                console.log(response);
                                this.loading = false;
                                if (response.status == 200) {
                                    return response.data;
                                }
                                else
                                    throw response.statusText;
                            })
                            .then(data => {
                                this.List = data.reverse();
        
                          
                                console.log(data);
                            })
                            .catch(error => {
                                this.loading = false;

                                console.log(error);
                            });
                    },
                    show: function (item) {
                        this.loading = true;
                        axios.get('VersionHandler.ashx', {
                            params: {
                                _op: "Get",
                                file:item.file
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
                            .then(data => {
                                this.AllFile = data.AllFile;
                                this.NewFile = data.NewFile;
                                this.date = new Date().toTimeString();
                                this.length = data.length;
                                this.remark = data.remark;
                                this.version = data.version;
                                this.loading = false;
                                console.log(data);
                                this.Scan = false;
                            })
                            .catch(error => {
                                this.loading = false;

                                console.log(error);
                            });
                    }

                },
                filters: {
                    getFileName: (fullname) => {
                        return fullname.substring(this._vue.length);
                            ;
                    }

                },
                created: function () {
                    //获取历史记录；
                    this.getlist();
                }

         
           

            });
        }
    }

    let v = new version();
}