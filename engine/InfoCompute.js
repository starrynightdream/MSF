// InfoCompute.js
// get the block by info type
_bindUnit(
    (info, type) =>{
        if (type === 'systemQuickInfo')
            return true
    },
    (info, type) =>{
        let _root = document.createElement('h1');
        _root.innerHTML = info;
        return _root;
    }
)

export default {
    compute(info, type = 'html') {
        // todo: use right renderer for info by type
        for (let _unit of this._) {

            if (_unit.checkFunc(info, type)) {
                return _unit.unitFunc(info, type);
            }
        }
    },
    _ = [],
    _bindUnit(checkFunc, unitFunc) {
        this._.push({
            checkFunc, unitFunc
        })
    }
}