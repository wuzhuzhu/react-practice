/**
 * 快速排序
 *
 * @param arr {Array} 待排序数组
 *
 * @returns {Array}
 */
function quickSort(arr) {
  // 判断边界条件
  if (!arr) throw new Error('请输入合法参数')
  if (arr && arr.length < 2) return arr
  // 初始化左右分区
  let left = []
  let right = []
  // 设定中位数
  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr.splice(pivotIndex, 1)[0];
  // 循环输入数组将比中位数小的数放入左侧，否则放入右侧
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  // 对左侧和右侧分别调用函数自身最终获得排序结果
  return quickSort(left).concat([pivot], quickSort(right));
}

console.log(quickSort([1,2]))
console.log(quickSort([1,2,123,43,5,3,12]))
console.log(quickSort([-1,2,0,-123,43,-5,3,12]))
