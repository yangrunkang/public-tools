let cotUtil = {

};

//遍历对象类型的
function getNeedRpStrByObj(obj,needReplaceStrs) {
  for (let key in obj) {
    let value = obj[key];
    if (typeof value === 'number' && value > 9007199254740992){
      needReplaceStrs.push({key:key});
    }
    loopFindArrOrObj(value,needReplaceStrs);
  }
}

//遍历数组类型的
function getNeedRpStrByArr(arr,needReplaceStrs) {
  for(let i=0; i<arr.length; i++){
    let value = arr[i];
    loopFindArrOrObj(value,needReplaceStrs);
  }
}

//递归遍历
function loopFindArrOrObj(value,needRpStrArr) {
  let valueTypeof = Object.prototype.toString.call(value);
  if (valueTypeof === '[object Object]') {
    needRpStrArr.concat(getNeedRpStrByObj(value,needRpStrArr));
  }
  if (valueTypeof === '[object Array]') {
    needRpStrArr.concat(getNeedRpStrByArr(value,needRpStrArr));
  }
}

//字符串转数组
cotUtil.revertStrToArr = function revertStrToArr(value) {
  let valueArr = [];
  value = (null === value|| undefined === value || ''=== value)? null: value;
  if(value !== null) {
    valueArr = value.toString().split(',');
  }
  return valueArr;
}

//主入口
cotUtil.getRealJsonData = function (baseStr) {
  if (!baseStr || typeof baseStr !== 'string') return;
  let jsonData = null;
  try {
    jsonData = JSON.parse(baseStr);
  } catch (err){
    return null;
  }
  let needReplaceStrs = [];
  loopFindArrOrObj(jsonData,needReplaceStrs);
  needReplaceStrs.forEach(function (replaceInfo) {
    let matchArr = baseStr.match(eval('/"'+ replaceInfo.key + '":[0-9]{15,}/'));
    if (matchArr) {
      let str = matchArr[0];
      let replaceStr = str.replace('"' + replaceInfo.key + '":','"' + replaceInfo.key + '":"');
      replaceStr += '"';
      baseStr = baseStr.replace(str,replaceStr);
    }
  });
  let returnJson = null;
  try {
    returnJson = JSON.parse(baseStr);
  }catch (err){
    return null;
  }
  return returnJson;
};



/**
 * 时间格式化
 * @param unixTime 时间戳
 * @returns {string} 格式化后获得时间字符串
 */
cotUtil.formatUnixTime = function(unixTime) {
  if(unixTime === 0 || unixTime === null ){
    return '-1';
  };
  let date = new Date(unixTime*1000);
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return Y + M + D + h + m + s;
};

export default cotUtil;
