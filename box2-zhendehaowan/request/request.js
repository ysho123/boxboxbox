var util = require( '../utils/util.js' );
var api = require( './api.js' );

var app = getApp();

/**
 * 网络请求方法
 * @param url {string} 请求url
 * @param data {object} 参数
 * @param successCallback {function} 成功回调函数
 * @param errorCallback {function} 失败回调函数
 * @param completeCallback {function} 完成回调函数
 * @returns {void}
 */
 
 
function requestData(url, data, successCallback, errorCallback, completeCallback) {

  wx.request({
    url: url,
    data: data,
    header: { 'Content-Type': 'application/json' },
    success: function (res) {
      if (res.statusCode == 200)
        util.isFunction(successCallback) && successCallback(res.data);
      else
        util.isFunction(errorCallback) && errorCallback();
    },
    error: function () {
      util.isFunction(errorCallback) && errorCallback();
    },
    complete: function () {
      util.isFunction(completeCallback) && completeCallback();
    }
  });
}
function getOtherXcsInfo( data,successCallback, errorCallback, completeCallback ) {
  requestData(api.getOtherXcsInfo(),data, successCallback, errorCallback, completeCallback );
}
//创建活动
function saveVote( data,successCallback, errorCallback, completeCallback ) {
   requestData(api.saveVote(),data, successCallback, errorCallback, completeCallback );
}
function saveVoteResult(data, successCallback, errorCallback, completeCallback) {
  requestData(api.saveVoteResult(), data, successCallback, errorCallback, completeCallback);
}
function getVoteResult(data, successCallback, errorCallback, completeCallback) {
  requestData(api.getVoteResult(), data, successCallback, errorCallback, completeCallback);
}
//获取我的页面数据
function getMyVote(data, successCallback, errorCallback, completeCallback) {
   requestData(api.getMyVote(), data, successCallback, errorCallback, completeCallback);
}
//添加用户信息
function saveUserInfo(data, successCallback, errorCallback, completeCallback) {
  requestData(api.saveUserInfo(), data, successCallback, errorCallback, completeCallback);
}
//删除发布
function deleteMyVote(data, successCallback, errorCallback, completeCallback) {
   requestData(api.deleteMyVote(), data, successCallback, errorCallback, completeCallback);
}
//创建投票发送模板消息
function msg(data, successCallback, errorCallback, completeCallback) {
   requestData(api.msg(), data, successCallback, errorCallback, completeCallback);
}
function getQrcode(data, successCallback, errorCallback, completeCallback) {
  requestData(api.getQrcode(), data, successCallback, errorCallback, completeCallback);
}
function getPtQrcode(data, successCallback, errorCallback, completeCallback) {
  requestData(api.getPtQrcode(), data, successCallback, errorCallback, completeCallback);
}
function getNewXcx(data, successCallback, errorCallback, completeCallback) {
  requestData(api.getNewXcx(), data, successCallback, errorCallback, completeCallback);
}
function getTzxcxInfo(data, successCallback, errorCallback, completeCallback) {
  requestData(api.getTzxcxInfo(), data, successCallback, errorCallback, completeCallback);
}
function getIndexHide(data, successCallback, errorCallback, completeCallback) {
  requestData(api.getIndexHide(), data, successCallback, errorCallback, completeCallback);
}
function checkUserInfo(data, successCallback, errorCallback, completeCallback) {
  requestData(api.checkUserInfo(), data, successCallback, errorCallback, completeCallback);
}
module.exports = {
  getOtherXcsInfo: getOtherXcsInfo,
  saveVote: saveVote,
  saveVoteResult: saveVoteResult,
  getVoteResult: getVoteResult,
  getMyVote:getMyVote,
  saveUserInfo: saveUserInfo,
  deleteMyVote: deleteMyVote,
  msg: msg,
  getQrcode: getQrcode,
  getPtQrcode: getPtQrcode,
  getNewXcx: getNewXcx,
  getTzxcxInfo: getTzxcxInfo,
  getIndexHide: getIndexHide,
  checkUserInfo
};