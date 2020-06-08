export const applyMixin = (Vue) => {
    //插件混合都在before Create
    Vue.mixin({
        beforeCreate: vuexInit
    })
}
//组件创建时先父后子
function vuexInit() {
    //vue router 是把属性定义到根实例 所有组件都可以拿到根 通过根实例获取这个属性 
    // vuex 给每个组件都定义一个指向同一个的$stores属性 所有组件都公用一个$store
    const options = this.$options;
    if(options.store) {
        //有就是根组件 否则为子组件
        this.$store = options.store
    } else if(options.parent && options.parent.$store){
        //子组件 有爸爸 且爸爸yo
        this.$store = options.parent.$store
    }
}

