(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["categories_params"],{"081c":function(t,e,a){"use strict";var n=a("f55f"),i=a.n(n);i.a},1276:function(t,e,a){"use strict";var n=a("d784"),i=a("44e7"),r=a("825a"),s=a("1d80"),o=a("4840"),l=a("8aa5"),c=a("50c4"),u=a("14c3"),d=a("9263"),f=a("d039"),m=[].push,p=Math.min,h=4294967295,g=!f((function(){return!RegExp(h,"y")}));n("split",2,(function(t,e,a){var n;return n="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,a){var n=String(s(this)),r=void 0===a?h:a>>>0;if(0===r)return[];if(void 0===t)return[n];if(!i(t))return e.call(n,t,r);var o,l,c,u=[],f=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),p=0,g=new RegExp(t.source,f+"g");while(o=d.call(g,n)){if(l=g.lastIndex,l>p&&(u.push(n.slice(p,o.index)),o.length>1&&o.index<n.length&&m.apply(u,o.slice(1)),c=o[0].length,p=l,u.length>=r))break;g.lastIndex===o.index&&g.lastIndex++}return p===n.length?!c&&g.test("")||u.push(""):u.push(n.slice(p)),u.length>r?u.slice(0,r):u}:"0".split(void 0,0).length?function(t,a){return void 0===t&&0===a?[]:e.call(this,t,a)}:e,[function(e,a){var i=s(this),r=void 0==e?void 0:e[t];return void 0!==r?r.call(e,i,a):n.call(String(i),e,a)},function(t,i){var s=a(n,t,this,i,n!==e);if(s.done)return s.value;var d=r(t),f=String(this),m=o(d,RegExp),b=d.unicode,v=(d.ignoreCase?"i":"")+(d.multiline?"m":"")+(d.unicode?"u":"")+(g?"y":"g"),y=new m(g?d:"^(?:"+d.source+")",v),_=void 0===i?h:i>>>0;if(0===_)return[];if(0===f.length)return null===u(y,f)?[f]:[];var C=0,x=0,w=[];while(x<f.length){y.lastIndex=g?x:0;var D,k=u(y,g?f:f.slice(x));if(null===k||(D=p(c(y.lastIndex+(g?0:x)),f.length))===C)x=l(f,x,b);else{if(w.push(f.slice(C,x)),w.length===_)return w;for(var $=1;$<=k.length-1;$++)if(w.push(k[$]),w.length===_)return w;x=C=D}}return w.push(f.slice(C)),w}]}),!g)},"14c3":function(t,e,a){var n=a("c6b6"),i=a("9263");t.exports=function(t,e){var a=t.exec;if("function"===typeof a){var r=a.call(t,e);if("object"!==typeof r)throw TypeError("RegExp exec method returned something other than an Object or null");return r}if("RegExp"!==n(t))throw TypeError("RegExp#exec called on incompatible receiver");return i.call(t,e)}},"159b":function(t,e,a){var n=a("da84"),i=a("fdbc"),r=a("17c2"),s=a("9112");for(var o in i){var l=n[o],c=l&&l.prototype;if(c&&c.forEach!==r)try{s(c,"forEach",r)}catch(u){c.forEach=r}}},"17c2":function(t,e,a){"use strict";var n=a("b727").forEach,i=a("a640"),r=a("ae40"),s=i("forEach"),o=r("forEach");t.exports=s&&o?[].forEach:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}},"1b78":function(t,e,a){},4160:function(t,e,a){"use strict";var n=a("23e7"),i=a("17c2");n({target:"Array",proto:!0,forced:[].forEach!=i},{forEach:i})},"44e7":function(t,e,a){var n=a("861d"),i=a("c6b6"),r=a("b622"),s=r("match");t.exports=function(t){var e;return n(t)&&(void 0!==(e=t[s])?!!e:"RegExp"==i(t))}},4840:function(t,e,a){var n=a("825a"),i=a("1c0b"),r=a("b622"),s=r("species");t.exports=function(t,e){var a,r=n(t).constructor;return void 0===r||void 0==(a=n(r)[s])?e:i(a)}},6547:function(t,e,a){var n=a("a691"),i=a("1d80"),r=function(t){return function(e,a){var r,s,o=String(i(e)),l=n(a),c=o.length;return l<0||l>=c?t?"":void 0:(r=o.charCodeAt(l),r<55296||r>56319||l+1===c||(s=o.charCodeAt(l+1))<56320||s>57343?t?o.charAt(l):r:t?o.slice(l,l+2):s-56320+(r-55296<<10)+65536)}};t.exports={codeAt:r(!1),charAt:r(!0)}},"82b9":function(t,e,a){"use strict";var n=a("1b78"),i=a.n(n);i.a},"8aa5":function(t,e,a){"use strict";var n=a("6547").charAt;t.exports=function(t,e,a){return e+(a?n(t,e).length:1)}},9263:function(t,e,a){"use strict";var n=a("ad6d"),i=a("9f7f"),r=RegExp.prototype.exec,s=String.prototype.replace,o=r,l=function(){var t=/a/,e=/b*/g;return r.call(t,"a"),r.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),c=i.UNSUPPORTED_Y||i.BROKEN_CARET,u=void 0!==/()??/.exec("")[1],d=l||u||c;d&&(o=function(t){var e,a,i,o,d=this,f=c&&d.sticky,m=n.call(d),p=d.source,h=0,g=t;return f&&(m=m.replace("y",""),-1===m.indexOf("g")&&(m+="g"),g=String(t).slice(d.lastIndex),d.lastIndex>0&&(!d.multiline||d.multiline&&"\n"!==t[d.lastIndex-1])&&(p="(?: "+p+")",g=" "+g,h++),a=new RegExp("^(?:"+p+")",m)),u&&(a=new RegExp("^"+p+"$(?!\\s)",m)),l&&(e=d.lastIndex),i=r.call(f?a:d,g),f?i?(i.input=i.input.slice(h),i[0]=i[0].slice(h),i.index=d.lastIndex,d.lastIndex+=i[0].length):d.lastIndex=0:l&&i&&(d.lastIndex=d.global?i.index+i[0].length:e),u&&i&&i.length>1&&s.call(i[0],a,(function(){for(o=1;o<arguments.length-2;o++)void 0===arguments[o]&&(i[o]=void 0)})),i}),t.exports=o},"9f7f":function(t,e,a){"use strict";var n=a("d039");function i(t,e){return RegExp(t,e)}e.UNSUPPORTED_Y=n((function(){var t=i("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=n((function(){var t=i("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},a15b:function(t,e,a){"use strict";var n=a("23e7"),i=a("44ad"),r=a("fc6a"),s=a("a640"),o=[].join,l=i!=Object,c=s("join",",");n({target:"Array",proto:!0,forced:l||!c},{join:function(t){return o.call(r(this),void 0===t?",":t)}})},a640:function(t,e,a){"use strict";var n=a("d039");t.exports=function(t,e){var a=[][t];return!!a&&n((function(){a.call(null,e||function(){throw 1},1)}))}},a652:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"params"}},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[t._v("首页")]),a("el-breadcrumb-item",[t._v("商品管理")]),a("el-breadcrumb-item",[t._v("分类参数")])],1),a("el-card",{staticClass:"box-card"},[a("el-alert",{attrs:{title:"注意：只允许为第三级分类设置相关参数！！！",type:"warning","show-icon":"",closable:!1}}),a("el-row",{staticClass:"cat_opt",attrs:{type:"flex",align:"middle"}},[a("el-col",{attrs:{span:3}},[a("span",[t._v("选择商品分类：")])]),a("el-col",{attrs:{span:10}},[a("el-cascader",{attrs:{options:t.cateList,props:t.cascaderProps,clearable:""},on:{change:t.handleChange},model:{value:t.selectKeys,callback:function(e){t.selectKeys=e},expression:"selectKeys"}})],1)],1),a("el-tabs",{on:{"tab-click":t.handleTabClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"动态参数",name:"many"}},[a("el-button",{attrs:{type:"primary",size:"mini",round:"",disabled:t.isBtnDisabled},on:{click:function(e){t.addDialogVisible=!0}}},[t._v("添加参数")]),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.manyTableData,stripe:"",border:""}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._l(e.row.attr_vals,(function(n,i){return a("el-tag",{key:i,attrs:{closable:""},on:{close:function(a){return t.handleClose(n,e.row)}}},[t._v(" "+t._s(n)+" ")])})),e.row.inputVisible?a("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",attrs:{size:"small"},on:{blur:function(a){return t.handleInputConfirm(e.row)}},nativeOn:{keyup:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.handleInputConfirm(e.row)}},model:{value:e.row.inputValue,callback:function(a){t.$set(e.row,"inputValue",a)},expression:"scope.row.inputValue"}}):a("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:function(a){return t.showInput(e.row)}}},[t._v("+ 添加")])]}}])}),a("el-table-column",{attrs:{type:"index"}}),a("el-table-column",{attrs:{label:"参数名称",prop:"attr_name"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(a){return t.showEditDialog(e.row)}}},[t._v("编辑")]),a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(a){return t.delParams(e.row.attr_id)}}},[t._v("删除")])]}}])})],1)],1),a("el-tab-pane",{attrs:{label:"静态属性",name:"only"}},[a("el-button",{attrs:{type:"primary",size:"mini",round:"",disabled:t.isBtnDisabled},on:{click:function(e){t.addDialogVisible=!0}}},[t._v("添加")]),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.onlyTableData,stripe:"",border:""}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._l(e.row.attr_vals,(function(n,i){return a("el-tag",{key:i,attrs:{closable:""},on:{close:function(a){return t.handleClose(n,e.row)}}},[t._v(" "+t._s(n)+" ")])})),e.row.inputVisible?a("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",attrs:{size:"small"},on:{blur:function(a){return t.handleInputConfirm(e.row)}},nativeOn:{keyup:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.handleInputConfirm(e.row)}},model:{value:e.row.inputValue,callback:function(a){t.$set(e.row,"inputValue",a)},expression:"scope.row.inputValue"}}):a("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:function(a){return t.showInput(e.row)}}},[t._v("+ 添加")])]}}])}),a("el-table-column",{attrs:{type:"index"}}),a("el-table-column",{attrs:{label:"属性名称",prop:"attr_name"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(a){return t.showEditDialog(e.row)}}},[t._v("编辑")]),a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(a){return t.delParams(e.row.attr_id)}}},[t._v("删除")])]}}])})],1)],1)],1)],1),a("el-dialog",{attrs:{title:"添加"+t.titleText,visible:t.addDialogVisible,width:"50%"},on:{"update:visible":function(e){t.addDialogVisible=e},close:function(e){return t.DialogClosed("addFormRef")}}},[a("el-form",{ref:"addFormRef",attrs:{model:t.addForm,rules:t.addFormRules,"label-width":"80px"}},[a("el-form-item",{attrs:{label:t.titleText,prop:"attr_name"}},[a("el-input",{attrs:{clearable:""},model:{value:t.addForm.attr_name,callback:function(e){t.$set(t.addForm,"attr_name",e)},expression:"addForm.attr_name"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.addDialogVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.addParams("addFormRef")}}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"修改"+t.titleText,visible:t.editDialogVisible,width:"50%"},on:{"update:visible":function(e){t.editDialogVisible=e},close:function(e){return t.DialogClosed("editFormRef")}}},[a("el-form",{ref:"editFormRef",attrs:{model:t.editForm,rules:t.addFormRules,"label-width":"80px"}},[a("el-form-item",{attrs:{label:t.titleText,prop:"attr_name"}},[a("el-input",{attrs:{clearable:""},model:{value:t.editForm.attr_name,callback:function(e){t.$set(t.editForm,"attr_name",e)},expression:"editForm.attr_name"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.editDialogVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.editParams("editFormRef")}}},[t._v("确 定")])],1)],1)],1)},i=[],r=(a("99af"),a("4de4"),a("4160"),a("a15b"),a("ac1f"),a("1276"),a("159b"),{name:"params",data:function(){return{cateList:[],cascaderProps:{value:"cat_id",label:"cat_name",children:"children",expandTrigger:"hover"},selectKeys:[],activeName:"many",manyTableData:[],onlyTableData:[],addDialogVisible:!1,editDialogVisible:!1,addForm:{attr_name:""},editForm:{},addFormRules:{attr_name:[{required:!0,message:"请输入参数名称",trigger:"blur"}]}}},methods:{getCateList:function(){var t=this;this.$http.get("categories").then((function(e){var a=e.data;if(200!==a.meta.status)return t.$message.error("获取商品分类失败！");t.cateList=a.data}))},handleChange:function(){if(3!==this.selectKeys.length)return this.selectKeys=[],this.manyTableData=[],void(this.onlyTableData=[]);this.getParamsData()},getParamsData:function(){var t=this;if(3!==this.selectKeys.length)return this.selectKeys=[],this.manyTableData=[],void(this.onlyTableData=[]);this.$http.get("categories/".concat(this.cateId,"/attributes"),{params:{sel:this.activeName}}).then((function(e){var a=e.data;if(200!==a.meta.status)return t.$message.error("获取参数列表失败");a.data.forEach((function(t){var e=t.attr_vals.split(",");t.attr_vals=""==t.attr_vals?[]:e,t.inputVisible=!1,t.inputValue=""})),"many"===t.activeName?t.manyTableData=a.data:t.onlyTableData=a.data}))},handleTabClick:function(){this.getParamsData()},DialogClosed:function(t){this.$refs[t].resetFields()},addParams:function(t){var e=this;this.$refs[t].validate((function(t){if(!t)return e.$message.error("请填写参数名称！！");e.$http.post("categories/".concat(e.cateId,"/attributes"),{attr_name:e.addForm.attr_name,attr_sel:e.activeName}).then((function(t){var a=t.data;if(201!==a.meta.status)return e.$message.error("参数添加失败！！！");e.$message.success("参数添加成功"),e.getParamsData(),e.addDialogVisible=!1}))}))},showEditDialog:function(t){this.editForm=t,this.editDialogVisible=!0},editParams:function(t){var e=this;this.$refs[t].validate((function(t){if(!t)return e.$message.error("请填写参数名称！！");e.$http.put("categories/".concat(e.cateId,"/attributes/").concat(e.editForm.attr_id),{attr_name:e.editForm.attr_name,attr_sel:e.activeName}).then((function(t){var a=t.data;if(200!==a.meta.status)return e.$message.error("参数修改失败！！！");e.$message.success("参数修改成功"),e.getParamsData(),e.editDialogVisible=!1}))}))},delParams:function(t){var e=this;this.$confirm("此操作将永久删除该参数, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.$http.delete("categories/".concat(e.cateId,"/attributes/").concat(t)).then((function(t){if(200!==t.data.meta.status)return e.$message.error("参数删除失败");e.$message({type:"success",message:"参数删除成功!"}),e.getParamsData()}))})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))},handleInputConfirm:function(t){var e=this;t.inputValue&&t.attr_vals.push(t.inputValue);var a=t.attr_vals.join(",");this.$http.put("categories/".concat(this.cateId,"/attributes/").concat(t.attr_id),{attr_name:t.attr_name,attr_sel:this.activeName,attr_vals:a}).then((function(a){var n=a.data;if(200!==n.meta.status)return e.$message.error("添加失败！！！");e.$message.success("添加成功"),t.attr_vals=n.data.attr_vals.split(",")})),t.inputVisible=!1,t.inputValue=""},showInput:function(t){var e=this;t.inputVisible=!0,this.$nextTick((function(){e.$refs.saveTagInput.$refs.input.focus()}))},handleClose:function(t,e){var a=this;this.$confirm("此操作将永久删除“".concat(t,"”, 是否继续?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var n=e.attr_vals.filter((function(e){return e!==t})),i=n.join(",");a.$http.put("categories/".concat(a.cateId,"/attributes/").concat(e.attr_id),{attr_name:e.attr_name,attr_sel:a.activeName,attr_vals:i}).then((function(t){var n=t.data;if(200!==n.meta.status)return a.$message.error("删除失败！！！");a.$message.success("删除成功"),e.attr_vals=n.data.attr_vals.split(",")}))})).catch((function(){a.$message({type:"info",message:"已取消删除"})}))}},created:function(){this.getCateList()},computed:{isBtnDisabled:function(){return 3!==this.selectKeys.length},cateId:function(){return 3==this.selectKeys.length?this.selectKeys[2]:null},titleText:function(){return"many"==this.activeName?"动态参数":"静态属性"}}}),s=r,o=(a("82b9"),a("2877")),l=Object(o["a"])(s,n,i,!1,null,"8aae3bc2",null);e["default"]=l.exports},ac1f:function(t,e,a){"use strict";var n=a("23e7"),i=a("9263");n({target:"RegExp",proto:!0,forced:/./.exec!==i},{exec:i})},ad6d:function(t,e,a){"use strict";var n=a("825a");t.exports=function(){var t=n(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},ca6c:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"categories"}},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[t._v("首页")]),a("el-breadcrumb-item",[t._v("商品管理")]),a("el-breadcrumb-item",[t._v("商品分类")])],1),a("el-card",{staticClass:"box-card"},[a("el-row",[a("el-col",[a("el-button",{attrs:{type:"primary"},on:{click:t.showAddCateDialog}},[t._v("添加分类")])],1)],1),a("br"),a("zk-table",{attrs:{data:t.cateList,columns:t.columns,"selection-type":!1,"expand-type":!1,"show-index":"","index-text":"#",border:"","show-row-hover":!1},scopedSlots:t._u([{key:"isok",fn:function(t){return[!1===t.row.cat_deleted?a("i",{staticClass:"el-icon-success",staticStyle:{color:"#67C23A"}}):a("i",{staticClass:"el-icon-error",staticStyle:{color:"#F56C6C"}})]}},{key:"order",fn:function(e){return[0===e.row.cat_level?a("el-tag",{attrs:{type:"primary",size:"mini"}},[t._v("一级")]):1===e.row.cat_level?a("el-tag",{attrs:{type:"success",size:"mini"}},[t._v("二级")]):a("el-tag",{attrs:{type:"warning",size:"mini"}},[t._v("三级")])]}},{key:"opt",fn:function(e){return[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(a){return t.showEditCateDialog(e.row)}}},[t._v("编辑")]),a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(a){return t.delCate(e.row.cat_id)}}},[t._v("删除")])]}}])}),a("el-pagination",{attrs:{background:"",layout:"total,sizes,prev, pager, next,jumper",total:t.total,"page-sizes":[3,5,10,15],"page-size":t.queryInfo.pagesize},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),a("el-dialog",{attrs:{title:"添加分类",visible:t.addCateDialogVisible,width:"50%"},on:{"update:visible":function(e){t.addCateDialogVisible=e},close:function(e){return t.DialogClosed("addCateFormRef")}}},[a("el-form",{ref:"addCateFormRef",attrs:{model:t.addCateForm,rules:t.addCateFormRules,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"分类名称",prop:"cat_name"}},[a("el-input",{attrs:{clearable:""},model:{value:t.addCateForm.cat_name,callback:function(e){t.$set(t.addCateForm,"cat_name",e)},expression:"addCateForm.cat_name"}})],1),a("el-form-item",{attrs:{label:"父级分类"}},[a("el-cascader",{attrs:{options:t.parentCateList,props:t.cascaderProps,clearable:""},on:{change:t.parentCateChanged},model:{value:t.selectKeys,callback:function(e){t.selectKeys=e},expression:"selectKeys"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.addCateDialogVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.addCate()}}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"修改分类",visible:t.editCateDialogVisible,width:"50%"},on:{"update:visible":function(e){t.editCateDialogVisible=e},close:function(e){return t.DialogClosed("editCateFormRef")}}},[a("el-form",{ref:"editCateFormRef",attrs:{model:t.editCateForm,rules:t.addCateFormRules,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"分类名称",prop:"cat_name"}},[a("el-input",{attrs:{clearable:""},model:{value:t.editCateForm.cat_name,callback:function(e){t.$set(t.editCateForm,"cat_name",e)},expression:"editCateForm.cat_name"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.editCateDialogVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.editCate()}}},[t._v("确 定")])],1)],1)],1)},i=[],r={name:"categories",data:function(){return{cateList:[],queryInfo:{type:3,pagenum:1,pagesize:5},total:0,columns:[{label:"分类名称",prop:"cat_name"},{label:"是否有效",type:"template",template:"isok"},{label:"排序",type:"template",template:"order"},{label:"操作",type:"template",template:"opt"}],addCateDialogVisible:!1,editCateDialogVisible:!1,addCateForm:{cat_name:"",cat_pid:0,cat_level:0},editCateForm:{},addCateFormRules:{cat_name:[{required:!0,message:"请输入分类名称",trigger:"blur"}]},parentCateList:[],cascaderProps:{value:"cat_id",label:"cat_name",children:"children",expandTrigger:"hover",checkStrictly:!0},selectKeys:[]}},methods:{getCateList:function(){var t=this;this.$http.get("categories",{params:this.queryInfo}).then((function(e){var a=e.data;if(200!==a.meta.status)return t.$message.error("获取商品分类失败！");t.cateList=a.data.result,t.total=a.data.total}))},handleCurrentChange:function(t){this.queryInfo.pagenum=t,this.getCateList()},handleSizeChange:function(t){this.queryInfo.pagesize=t,this.getCateList()},showAddCateDialog:function(){this.getParentCateList(),this.addCateDialogVisible=!0},getParentCateList:function(){var t=this;this.$http.get("categories",{params:{type:2}}).then((function(e){var a=e.data;if(200!==a.meta.status)return t.$message.error("获取父级商品分类失败！");t.parentCateList=a.data}))},parentCateChanged:function(){this.selectKeys.length>0?(this.addCateForm.cat_pid=this.selectKeys[this.selectKeys.length-1],this.addCateForm.cat_level=this.selectKeys.length):(this.addCateForm.cat_pid=0,this.addCateForm.cat_level=0)},addCate:function(){var t=this;this.$refs.addCateFormRef.validate((function(e){if(!e)return t.$message.error("请填写分类名称！！");t.$http.post("categories",t.addCateForm).then((function(e){var a=e.data;201!==a.meta.status?t.$message.error("分类添加失败"):(t.$message.success("分类添加成功！"),t.addCateDialogVisible=!1,t.getCateList())}))}))},DialogClosed:function(t){this.$refs[t].resetFields(),this.selectKeys=[],this.addCateForm.cat_name="",this.addCateForm.cat_pid=0,this.addCateForm.cat_level=0},showEditCateDialog:function(t){this.editCateForm=t,this.editCateDialogVisible=!0},editCate:function(){var t=this;this.$refs.editCateFormRef.validate((function(e){if(!e)return t.$message.error("请填写分类名称！！");t.$http.put("categories/".concat(t.editCateForm.cat_id),t.editCateForm).then((function(e){var a=e.data;200!==a.meta.status?t.$message.error("分类修改失败"):(t.$message.success("分类修改成功！"),t.editCateDialogVisible=!1,t.getCateList())}))}))},delCate:function(t){var e=this;this.$confirm("此操作将永久删除该分类, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.$http.delete("categories/".concat(t)).then((function(t){if(200!==t.data.meta.status)return e.$message.error("分类删除失败");e.$message({type:"success",message:"分类删除成功!"}),e.getCateList()}))})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))}},created:function(){this.getCateList()}},s=r,o=(a("081c"),a("2877")),l=Object(o["a"])(s,n,i,!1,null,null,null);e["default"]=l.exports},d784:function(t,e,a){"use strict";a("ac1f");var n=a("6eeb"),i=a("d039"),r=a("b622"),s=a("9263"),o=a("9112"),l=r("species"),c=!i((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),u=function(){return"$0"==="a".replace(/./,"$0")}(),d=r("replace"),f=function(){return!!/./[d]&&""===/./[d]("a","$0")}(),m=!i((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var a="ab".split(t);return 2!==a.length||"a"!==a[0]||"b"!==a[1]}));t.exports=function(t,e,a,d){var p=r(t),h=!i((function(){var e={};return e[p]=function(){return 7},7!=""[t](e)})),g=h&&!i((function(){var e=!1,a=/a/;return"split"===t&&(a={},a.constructor={},a.constructor[l]=function(){return a},a.flags="",a[p]=/./[p]),a.exec=function(){return e=!0,null},a[p](""),!e}));if(!h||!g||"replace"===t&&(!c||!u||f)||"split"===t&&!m){var b=/./[p],v=a(p,""[t],(function(t,e,a,n,i){return e.exec===s?h&&!i?{done:!0,value:b.call(e,a,n)}:{done:!0,value:t.call(a,e,n)}:{done:!1}}),{REPLACE_KEEPS_$0:u,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:f}),y=v[0],_=v[1];n(String.prototype,t,y),n(RegExp.prototype,p,2==e?function(t,e){return _.call(t,this,e)}:function(t){return _.call(t,this)})}d&&o(RegExp.prototype[p],"sham",!0)}},f55f:function(t,e,a){},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=categories_params.2704e49d.js.map