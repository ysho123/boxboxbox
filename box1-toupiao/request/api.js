var API_BASE1 ="https://xcx.xc29.cn/source/plugin/toupiao/";
// 本地
// var API_BASE1 = "http://localhost/xcs/xcs_service/source/plugin/toupiao/";

function getOtherXcsInfo() {
  return API_BASE1 + 'getOtherXcsInfo.php';
}
//创建活动
function saveVote() {
   return API_BASE1 + 'saveVote.php';
} 
function saveVoteResult() {
  return API_BASE1 + 'saveVoteResult.php';
}
function getVoteResult() {
  return API_BASE1 + 'getVoteResult.php';
}
//获取我的页面内容
function getMyVote() {
   return API_BASE1 + 'getMyVote.php';
}
//添加用户信息
function saveUserInfo() {
  return API_BASE1 + 'saveUserInfo.php';
}
//删除发布
function deleteMyVote() {
   return API_BASE1 + 'deleteMyVote.php';
}
//创建投票发送模板消息
function msg() {
   return API_BASE1 + 'msg.php';
}
// 获取小程序码
function getQrcode(){
  return API_BASE1 + 'getQrcode.php';
}
// 获取二维码
function getPtQrcode() {
  return API_BASE1 + 'getPtQrcode.php';
} 
function getNewXcx() {
  return API_BASE1 + 'getNewXcx.php';
}

function getTzxcxInfo() {
  return API_BASE1 + 'getTzxcxInfo.php';
}
function getIndexHide() {
  return API_BASE1 + 'getIndexHide.php';
}
function checkUserInfo(){
  return API_BASE1 + 'checkUserInfo.php';
}

module.exports = {
  getOtherXcsInfo: getOtherXcsInfo,
  saveVote: saveVote,
  saveVoteResult: saveVoteResult,
  getVoteResult: getVoteResult,
  getMyVote: getMyVote,
  saveUserInfo: saveUserInfo,
  deleteMyVote: deleteMyVote,
  getQrcode:getQrcode,
  msg: msg,
  getPtQrcode: getPtQrcode,
  getNewXcx: getNewXcx,
  getTzxcxInfo: getTzxcxInfo,
  getIndexHide: getIndexHide,
  checkUserInfo
};
