//state就是vue实例上的data getter相当于vue实例上的computed
import applyMixin from '../mixin'
import {forEach} from '../utils'
let Vue
// 用户拿到的时这个类的实例

class Store{
    constructor (options) {
        //this.state = options.state //用户传递过来的状态
        //直接将state定义在实例上 稍后状态发生变化 视图时不会更新的
        //defineReactive =》 vue-router只定义了一个属性
        //observer 创建vue实例 就会观测data
        //vue中定义数据属性名是有特点 如果属性名是$开头的 他不会代理到vue实例上的
        let state = options.state
        //this.getter = options.getter 是一个函数 我们取值的时候 是通过 this.$store.getAge去拿到的 所以不能单纯的将this.geeter= option.getter
        //getter写的是方法 但是取值时候是通过属性
        //defineProperty可以达到上面的方法
        this.getters= {}
        //每次重新渲染 getter就会重新取值 getter就会重新执行 所以数值不变的情况下 getter中的方法还是会执行
        const computed = {} 
        forEach(options.getters, (fn,key) => {
            computed[key]=() => {
                return fn(this.state)
            }
            Object.defineProperty(this.getters,key, {
                get: () => this._vm[key]
            })
        })
    
        this._vm = new Vue({
            data: {
                $$state: state
            },
            computed//计算属性会将自己的属性放到实例上
        })
        // 发布订阅模式 将用户定义的mutation和action先缓存起来 当调用commit是就找订阅的mutation方法
        // dispatch就找对应的action方法
        this._mutations = {}
        forEach(options.mutations, (fn, type) => {
            this._mutations[key] = (payload) => fn.call(this, this.state, payload)
        })
        this._actions = {}
        forEach(options.actions, (fn, type) => {
            this._actions[key] = (payload) => fn.call(this, this, payload)
        })
    }
    commit = (type, payload) => {
        this._mutations[type](payload)
    }
    dispathch = (type, payload) => {
        this._actions[type](payload)
    }

    // 类的属性访问器 当用户去这个实例上取state属性是 会执行此方法
    get state() {
        return this._vm._data.$$state
    }
}
const install= (_Vue) => { // vue-router是注册了全局组件原型方法 mixin将router 实例绑定给了所有组件
    Vue = _Vue
    applyMixin()
    console.log('install')
}

//模块没有作用域
//状态不要和模块名字相同 模块会覆盖掉状态 模块嵌套
// getter  所有计算属性都可以直接.取到 默认计算属性没有模块得概念
// 如果增加 namespace:true 会将这个模块的属性都封装到这个作用域下
// 命名空间会找当前模块是否有namespace并且将父级得namespace一同算上做成命名空间 

export {
    Store,
    install
}