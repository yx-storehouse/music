const PubFn = {  
  // 播放量格式化函数  
  // 如果人数超过 10000，保留小数点后一位并显示 '万'  
  // 如果不超过，则显示原数  
  peoNum: (count) => {  
    // 将 count 转换为数字  
    let peoCount = Number(count);  
    // 检查 peoCount 是否为有效数字  
    if (!isNaN(peoCount)) {  
      // 如果 peoCount 大于 10000  
      if (peoCount > 10000) {  
        // 除以 10000，保留一位小数，并添加 '万'  
        return (peoCount / 10000).toFixed(1) + '万';  
      } else {  
        // 如果小于 10000，返回原数  
        return peoCount;  
      }  
    } else {  
      return 0;  
    }  
  },  
  // 秒格式化函数，将秒数格式化为 00:00 的格式  
  secondFormat: (second) => {  
    // 计算秒数的余数  
    var sec = second % 60;  
    // 计算分钟数  
    var min = Math.floor(second / 60);  
    // 如果分钟数小于两位，前面补充 '0'  
    if (min.toString().length < 2) {  
      min = '0' + min;  
    }  
    // 如果秒数小于两位，前面补充 '0'  
    if (sec.toString().length < 2) {  
      sec = '0' + sec;  
    }  
    // 返回 mm:ss 格式  
    return min + ':' + sec;  
  }  
};  

// 导出 PubFn 对象,保证从外部可以访问到 PubFn 对象里面的方法  
export default PubFn;