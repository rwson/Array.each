/**
 *
 * build by rwson @2015-03-07
 * mail:rw_Song@sina.com
 * http://rwson.github.io
 *
 * 拓展js数组对象原型的下的each方法,实现forEach没有实现的多维数组遍历
 *
 */

!function(){
    Array.prototype.each = function(fn){
        try{
            this.index || (this.index = 0);
            //计数器存储当前遍历位置

            (this.length > 0 && fn.constructor == Function) && function(i,l,a){
                while(i < l){
                    var item = a[i];
                    //  获取数组的每一项
                    (item && item.constructor == Array) && function(){
                        item.each(fn);
                    }();

                    //  如果当前数组是个数组,继续递归操作
                    !(item && item.constructor == Array) && function(){
                        //  fn.apply(true,[a,i,e]);
                        /**
                         *  @param item 当前的这一项
                         *  @param i    当前这一项的下标
                         *  @param e    当前数组
                         */
                        fn.call(true,item,i,a);
                        //  数组的当前元素传递给fn,并执行fn
                        item = null;
                    }();

                    i ++;
                }
                //  遍历数组
            }(this.index,this.length,this);
            //  当数组长度大于0,再进入主方法体

        }catch (ex){}

        return this;
        //  返回当前调用方法对象,方便后面继续跟方法,执行链式操作
    };
}();