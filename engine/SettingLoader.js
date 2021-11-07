// SettingLoader.js
// 读取设置
const PROJECT_JSON_PATH = '../project.json';
const FromProjectToThis = '..';

let request = new XMLHttpRequest();
request.open('GET', PROJECT_JSON_PATH);
request.responseType = 'json';
request.send();
let themeReq;

request.onload = function (){
    let res = request.response;

    themeReq = new XMLHttpRequest();
    themeReq.open('GET', res.theme);
}

const path = {
    CHAR_FORWORD_SLASH : 47,
    CHAR_BACKWORD_SLASH : 92,
    CHAR_DOT : 46,
    get SPECIAL_CODE(){
        return {
            dot: 1,
            dotdot: 2,
            slash: 3,
        }
    },
    _isSlash(code) {
        return code === this.CHAR_FORWORD_SLASH || code === this.CHAR_BACKWORD_SLASH;
    },
    _controlChar (argu) {
    },
    _normalArgu (argu) {
        // start without '/' or '\'
        let idx = 0;
        for (;idx < argu.length; ++idx){
            if (!this._isSlash(argu.charCodeAt(idx) ) ) {
                break;
            }
        }
        if (idx === argu.length){
            return '';
        }

        // end without '/' or '\'
        let lidx = argu.length - 1;
        for (;lidx >= idx; --lidx) {
            if (!this._isSlash(argu.charCodeAt(lidx) ) ) {
                break;
            }
        }

        let na = argu.slice(idx, lidx + 1);
        na.replace('\\', '/'); // just '/'

        // computed special char
        na.replace('./', ''); // unwork char
        while (true) {
            let _idx = na.indexOf('/../');
            if (_idx == -1){
                break;
            } else {
                let _lidx = na.lastIndexOf('/', _idx -1);
                _lidx = _lidx ===-1? 0: _lidx;
                // todo remove str from _lidx to _idx
            }
        }

        return na;
    },
    _finalNormal (path, upflag) {
        if (path.length === 0){
            return '.';
        }
        let flagList = [];
        while (upflag--){
            flagList.push('..');
        }
        return flagList.join('/') + '/' + path
    },
    /**
     * 联合路径，至少返回  '.'
     * @param  {...string} paths 需要联合的路径
     * @returns 联合结果
     */
    join(...paths) {
        if (paths.length === 0){
            return '.';
        }
        let res = ''; // answer
        let lastSlash = -1;
        let upflag = 0; // number of cover ../
        for (let idx of paths){
            let _npath = this._normalArgu(paths[idx]);
            // control char
            let _idx;
            for (_idx = 0; _idx < _npath.length - 2; _idx +=3) {
                // '../'
                if (_npath.charCodeAt(_idx) == this.CHAR_DOT && 
                _npath.charCodeAt(_idx + 1) == this.CHAR_DOT &&
                this._isSlash(idx + 2)) {
                    
                    if (lastSlash === -1) {
                        upflag++;
                    } else {
                        res = res.slice(0, lastSlash);
                        lastSlash = res.lastIndexOf('/');
                    }
                }
            }
            if (_idx >= _npath.length) {
                continue; //just upflag
            }

            // lashSlash idx change
            if (_npath.length > 0){
                let _fSlashIdx = _npath.indexOf('/');
                if (_fSlashIdx > -1){
                    lastSlash = res.length + _fSlashIdx + 1;
                } else {
                    lastSlash = res.length;
                }
            }
            res += '/' + _npath;
        }
        return this._finalNormal(res, upflag);
    }
}

export default{
    path
}