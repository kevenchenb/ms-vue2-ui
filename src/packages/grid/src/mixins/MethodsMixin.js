/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 2017/1/13
 * Time: 10:30
 */
'use strict';
import Vue from "vue";
import _ from "lodash";
export default {
    methods:{
        dataFormat:function (data,parent,level) {
            let me = this;
            let tmp = [];
            _.forEach(data,function(record) {
                if(record._expanded == undefined){
                    Vue.set(record,'_expanded',false);
                }
                if(parent){
                    Vue.set(record,'_parent',parent);
                }
                let _level = 1;
                if(level!=undefined && level!=null){
                    _level = level+1;
                }
                Vue.set(record,'_level',_level);
                tmp.push(record);
                if(record.children && record.children.length>0 ){
                    let children = me.dataFormat(record.children,record,_level);
                    tmp = _.concat(tmp,children);
                }
            });
            return tmp;
        },
        columnsLeafs:function (columns,parent) {
            let me = this;
            let tmp = [];
            _.forEach(columns,function (column) {
                if(parent){
                    Vue.set(column,'_parent',parent);
                }
                if(column.columns && column.columns.length>0 ){
                    let children = me.columnsLeafs(column.columns,column);
                    tmp = _.concat(tmp,children);
                }else{
                    tmp.push(column);
                }
            });
            return tmp;
        }
    }
}