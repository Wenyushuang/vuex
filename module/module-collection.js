export default class ModuleColletion{
    constructor(options) {
        //注册模块 递归注册 跟模块 子模块 通过数组几记录每次要递归的
        this.register([],options)
    }
    register(path, rootModule) {
        let newModule = {
            _raw: rootModule,
            _children: {},
            state: rootModule.state
        }
        if(path.length === 0) {
            this.root = newModule
        } else {
            let parent = path.slice(0, -1).reduce((memo, current) => {
                return memo._children[current]
            }, this.root)
            //this.root._children[path[path.length-1]] = newModule //都在根模块上 所以有找爸爸得过程
            parent._children[path[path.length-1]]
        }
        if(rootModule.modules){ // 有子模块
            forEach(rootModule.modules, (module, moduleNAme) => { 
                this.register([...path, moduleNAme], module)
            })
        } //说明有子模块

    }
}
//格式化树形  
// this.root = {
//     _raw: xxx,
//     _children: {
//         a: {
//             state: a.state,
//             _raw: xxx
//         },
//         b: {
//             _raw: xxx,
//             state: b.state
//         }
//     },
//     state: xx.state
// }
