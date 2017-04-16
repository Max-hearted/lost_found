function formatDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('-');
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatDate: formatDate,
  isNull: isNull,
  isNullAndToast: isNullAndToast,
  showLoading: showLoading,
  hideLoading: hideLoading
}

// loading提示
function showLoading(title = "请稍后") {
  wx.showLoading({
    title: title
  });
}

function hideLoading() {
  wx.hideLoading();
}

/**
 * 判断字符串是否为空或全是空格
 */
function isNull(str) {
  if (str == "") return true;
  var regu = "^[ ]+$";
  var re = new RegExp(regu);
  return re.test(str);
}

/**
 * 判断字符串是否为空并吐司
 */
function isNullAndToast(str, text) {
  if (isNull(str)) {
    wx.showToast({
      title: text
    });
    return;
  }
}