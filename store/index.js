import applyMixin from '../mixin'
import {forEach} from '../utils'
import {ModuleCollection} from '../module/modu-colletions'
let Vue
class Stroe{
    constructor(options) {
        //格式化用户传入得参数 -- vue-router routes createRoutesMap
        //把用户定义得模块格式化成树形模式 更好理解和操作
        this._modules = new ModuleCollection(option)
    }
}

export {
    Stroe
}