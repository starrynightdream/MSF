// system
const DATA_TYPE = {
    STACK = 1,
    MAP = 2
}

const sysLog = true
const LOG = function (info) {
    if (sysLog){
        console.log(info)
    }
}

_INFO_COVER = {}
_CALLBACK = {}
_SYS = {
    dataType = DATA_TYPE,
    // 获取数值
    getv = function (key) {

        if (typeof key == 'string') {
            // str key
            if (_INFO_COVER[key]._type == DATA_TYPE.STACK) {
                // STACK
                let _o = _INFO_COVER[key]
                return _o._idx != -1 ?_o._data[_o._idx] : undefined
            } else if (_INFO_COVER[key]._type == DATA_TYPE.MAP) {
                // MAP
                return _INFO_COVER[key]._data
            } else {
                // UNKNOW
                return _INFO_COVER[key]
            }
        } else if (Array.isArray(key)) {
            // Array
            let ansList = key.map( item =>{
                return getv(item)
            })
            return ansList
        } else {
            // Other
        }
    }, 
    setv = function(key, val, silent = false) {
        // set val and call_back
        if (typeof key == 'string') {
            // str key
            if (_INFO_COVER[key] == undefined) {
                LOG("设置值前需要初始化")
                return false
            } else {

                if (_INFO_COVER[key]._type == DATA_TYPE.STACK) {
                    // STACK
                    let _o = _INFO_COVER[key]
                    _o._idx++
                    _o._data[_o._idx] = val
                } else if (_INFO_COVER[key]._type == DATA_TYPE.MAP) {
                    // MAP
                    _INFO_COVER[key]._data = val
                } else {
                    // UNKNOW
                    _INFO_COVER[key] = val
                }

                if (!silent) {
                    // callback
                    for (let fblock of _CALLBACK[key]) {
                        _blockCallBack(fblock)
                    }
                }
            }
        } else if (Array.isArray(key)) {
            // list key
            let ans = []
            if ( Array.isArray(val) && key.length === val.length) {
                // one by one
                for (let idx in key) {
                    ans[idx] = setv(key[idx], val[idx], true)
                }
            } else {
                // all set same
                for (let idx in key) {
                    ans[idx] = setv(key[idx], val, true)
                }
            }

            if (!silent) {
                let funcs = new Set()
                for (let k of key) {
                    
                    if (_CALLBACK[k]) {

                        for (let fb of _CALLBACK[k]) {
                            funcs.add(fb)
                        }
                    }
                }

                for (let callBackBlock of funcs) {
                    _blockCallBack(callBackBlock)
                }
            }
            return ans
        } else {
            // other
        }

        return true
    }, 
    createv = function(key, val, type = DATA_TYPE.MAP) {
        
        if (typeof key == 'string') {

            if (type === DATA_TYPE.MAP) {

                _INFO_COVER[key] = {
                    _type : DATA_TYPE.MAP,
                    _data : val
                }
            } else if (type === DATA_TYPE.STACK) {

                _INFO_COVER[key] = {
                    _type : DATA_TYPE.STACK,
                    _data : [val],
                    _idx : 0
                }
            } else {

                _INFO_COVER[key] = val
            }
        } else if (Array.isArray(key)) {

            if (Array.isArray(val) && key.length === val.length) {

                key.forEach((k, idx) =>{
                    createv(k, val[idx], type)
                })
            } else {

                key.forEach((k) =>{
                    createv(k, val, type)
                })
            }
        } else {
            // other
        }
    },
    bindv = function(key, callback) {
        let fb = {
            _keys : key,
            _f : callback
        }
        if (typeof key == 'string') {

            if (_CALLBACK[key]) {
                _CALLBACK[key].push(fb)
            } else {
                _CALLBACK[key] = [fb]
            }
        } else if (Array.isArray(key)) {

            for (let k of key) {

                if (_CALLBACK[k]) {
                    _CALLBACK[k].push(fb)
                } else {
                    _CALLBACK[k] = [fb]
                }
            }
        } else {
            // other
        }
    },
    isExistKey = function(key) {
        return _INFO_COVER[key] !== undefined
    },
    popStack = function (key) {

        if (typeof key == 'string') {

            if (_INFO_COVER[key]._type == DATA_TYPE.STACK) {
                _INFO_COVER[key]._idx = Math.max(-1, _INFO_COVER[key]._idx - 1)
            } else {
                LOG(`不可以回退非栈存储的数据 key = ${key}`)
            }
        } else if (Array.isArray(key)) {
            key.forEach(k =>{
                popStack(k)
            })
        } else {
            // other
        }
    },
    emptyStack = function(key) {

        if (typeof key == 'string') {

            if (_INFO_COVER[key]._type == DATA_TYPE.STACK) {
                return _INFO_COVER[key]._idx
            } else {
                LOG(`非栈存储 key = ${key}`)
            }
        } else if (Array.isArray(key)) {
            return key.map(k =>{return emptyStack(k)})
        } else {
            // other
        }
    },
    clearStack = function(key) {

        if (typeof key == 'string') {

            if (_INFO_COVER[key]._type == DATA_TYPE.STACK) {
                _INFO_COVER[key]._idx = -1
            } else {
                LOG(`非栈存储 key = ${key}`)
            }
        } else if (Array.isArray(key)) {
            return key.map(k =>{return emptyStack(k)})
        } else {
            // other
        }
    },
    _blockCallBack = (fb) =>{
        fb._f( getv(fb._keys))
        return this
    }
}

export default _SYS