// System.js
// 系统功能

// todo 由设定导入页面的自定义信息
import pageState from "../component/pageState.js";

// Q: 如何在不同的页面获取对应的h5代码？
// 监听一个全局的 PageName 属性，然后根据属性变化设置？
// Q：进入页面的过程是不属于各类状态的。合理么?
// 应该无所谓
// Q：如果需要不停移动页面，如何减少页面渲染的次数？（保存结果，无需多次渲染重复的办法)
// 由组件内部解决
// Q：你的CDATA函数是干嘛用的？
// 专门用于处理动态数据的变化。页面相对固定的结构信息则由内部执行
// A：就是说，页面的变化由两部分进行，其一是让系统接管class的变化，其二是观察者模式的对页面信息的响应
// Q：监听后修改页面在内部进行，是否需要外部函数？

const TransitionDefaultTime = 500;
const NameOfPageName = 'pageName';
const UnMountClassName = 'unmount';

// 全局函数
const G = {};

const _SYSG = {
    version: "1.0",
}

// 总理页面变化的数据结构
let _idx = 0;
let _pageArr = [];
const _pageChange = {
    getVal(keys, f) {

        if (typeof keys == 'string') {
            this._bindAKey(keys, f, keys);
        } else if (typeof keys == 'object') {

            keys.forEach(key => {
                this._bindAKey(key, f, keys);
            });
        } else {
            throw "can't bind keys with" + keys;
        }

        f(this._getValSilent(keys));
        return this;
    },
    setVal(keys, value) {

        this._setValSilent(keys, value);

        if (typeof keys == 'string') {
            this._cValCallBack(this._fArr[keys]);
        } else if (typeof keys == 'object') {
            let _tempset = new Set();
            if (Array.isArray(keys)) {

                for (let key in keys) {
                    this._cValCallBack(this._fArr[key], _tempset);
                }
            } else {

                for (let key in Object.keys(keys)) {
                    this._cValCallBack(this._fArr[key], _tempset);
                }
            }
        }

        return this;
    },
    mountPageClass(...nodes) {

        nodes.forEach(item => {
            item.classList.add(UnMountClassName);
            this._nodeArr.push(item);
        });
    },
    registerConterol (...conterols) {

        for (let con of conterols) {
            this._conterol[con._name] = con;
        }
    },
    get conterols() {
        return this._conterol;
    },
    addEve (root,e_type, callback) {
        root.addEventListener(e_type, callback);
    },
    removeEve (root,e_type, callback) {
        root.removeEventListener(e_type, callback);
    },
    bindEve (root, e_type, callback, keys, catech = false) {

        let callf = (values) =>{
            let val = true;
            if (typeof values == 'object') {
                for (let key in Object.keys(values)) {
                    val = val && values[key];
                    if (!val) break;
                }
            } else {
                val = values == true;
            }

            if (val) {
                root.addEventListener(e_type, callback, catech);
            } else {
                root.removeEventListener(e_type, callback, catech);
            }
        }

        _pageChange.getVal(keys, callf); // bind callback
    },
    bindPage (callback){
        _pageChange.getVal(NameOfPageName, callback);
    },
    toPage(pname) {
        let _isinner = false;
        for (let _n in pageState.pages) {
            if (pname == _n) {
                _isinner = true;
                break;
            }
        }

        if (_isinner) {
            throw "目标页面不存在"
        }

        // history
        if (_idx < _pageArr.length) {
            _pageArr.splice(_idx + 1);
        }
        _pageArr.push({
            pname
        });

        // change environment
        // global css class change
        if (_SYSG.pageClass == pageState.states[pname].class){
        }
        else{
            this._nodeArr.forEach(node=> {
                node.classList.add(pageState.states[pname].class);
                node.classList.remove(UnMountClassName);
                node.classList.remove(_SYSG.pageClass);
            });
            _SYSG.pageClass = pageState.states[pname].class;

        }

        let ready = () => {
            this._nodeArr.forEach( node =>{
                node.classList.add('ready');
                node.classList.remove('finish');
            });
            setTimeout(() => {
                enter();
            }, 0);
        }

        let enter = ()=> {
            this._nodeArr.forEach( node =>{
                node.classList.add('enter');
                node.classList.remove('keep');
                node.classList.remove('ready');
            });
            setTimeout(() => {
                keep();
            }, 0);
        }

        let keep = () =>{
            this._nodeArr.forEach( node =>{
                node.classList.add('keep');
                node.classList.remove('enter');
            });

            setTimeout(() => {
                finish();
            }, TransitionDefaultTime);
        }

        let finish = () =>{
            this._nodeArr.forEach( node =>{
                node.classList.add('finish');
            });
        }

        // todo: make time settingable 
        // and can skip the enter path
        setTimeout(() => {
            // ready(TransitionDefaultTime);
            ready()
        }, 0);

        // global attr change
        let _o = pageState.states[pname].state
        for(let key of Object.keys(_o)) {
            this.setVal(key, _o[key])
        }

        _pageChange.setVal(NameOfPageName, pname);
    },
    _coverO : {}, // save data
    _nodeArr : [], // the node receive css class
    _fArr : {}, // the cdata callback block
    _conterol : {}, // the component sign in system
    _eventCallBack: [], // the callback of bind event.(which system control to add and remove)
    _bindAKey(key, f, keys) {

        if (!this._fArr[key]) {
            this._coverO[key] = undefined;
            this._fArr[key] = [];
        }

        this._fArr[key].push({
            _f: f,
            _keys: keys
        });

        return this;
    },
    // 获取数据但并不绑定新的callback
    _getValSilent(keys) {

        if (typeof keys == 'string') {
            return this._coverO[keys];
        } else if (typeof keys == 'object') {
            let _o = {};
            for (let key in keys) {
                _o[key] = this._coverO[key];
            }
            return _o;
        }
    },
    _setValSilent(keys, vals) {
        if (typeof keys == 'string') {
            this._coverO[keys] = vals;
            if (!this._fArr[keys]) this._fArr[keys] = [];
        } else if (typeof keys == 'object') {

            if (Array.isArray(keys)) {

                for (let idx of keys) {
                    this._coverO[keys[idx]] = vals[idx];
                    if(!this._fArr[keys[idx]]) this._fArr[keys[idx]] =[];
                }
            } else {

                for (let key of Object.keys(keys)) {
                    this._coverO[key] = keys[key];
                    if(!this._fArr[key]) this._fArr[key] =[];
                }
            }
        }

        return this;
    },
    _cValCallBack(calls, avoid = new Set()) {

        for (let _fo of calls) {

            if (avoid.has(_fo)) {} 
            else {
                _fo._f(this._getValSilent(_fo._keys));
                avoid.add(_fo);
            }
        }
        return avoid;
    },
}


function history(idx = 0) {
    // navi
    if (idx > 0) {
        // forword
    } else if (idx < 0) {
        // back
        if (-idx > _pageArr.length) {
            // tohome
        }
    } else {
        // reflesh
    }

}

export default {
    history,
    G,
    reflesh: _pageChange,
    _SYSG,
}