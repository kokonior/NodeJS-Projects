/**
 * @param {number[]} nums e.g. [2,7,11,15]
 * @param {number} target e.g. 9
 * @return {number[]} returns an indexes of it e.g. [0, 1]
 */
var twoSum = function (nums, target) {
  const dict = {}
  for (let i = 0; i < nums.length; i++) {
    if (dict[nums[i]] === undefined) {
      dict[target - nums[i]] = i
    } else {
      return [dict[nums[i]], i]
    }
  }
};
