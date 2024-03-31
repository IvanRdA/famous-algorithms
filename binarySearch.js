/* 
O(log(n)) time, O(1) space

Binary search is one of the most famous algorithms for searching processes ALWAYS THAT WE GET A SORTED LIST. The idea is to divide and conquer concept and reduces the time amount for searching
an element in a list to a half.

First, instance a min value (first index on the list) and a max value (last index), then can get the middle point (the index at the half) and iterate from start to that mid point.
If target is equals to mid point return the value, you are finished. If not repeat the process (iteratively or recursively) changing max point to mid - 1 if target is smaller than mid and to mid + 1 if bigger.

The first constant generate a random value sorted list of length n for testing the algorithm.
*/

const generateSortedList = (n) => {
  const resultList = [];

  for (let i = 0; i < n; i++) {
    resultList.push(Math.floor(Math.random() * 1001));
  }

  resultList.sort((a, b) => {
    return a - b;
  });
  return resultList;
};

function binarySearch(array, target) {
  let min = 0;
  let max = array.length - 1;

  while (min <= max) {
    let mid = Math.floor(min + (max - min) / 2);
    if (target === array[mid]) {
      return mid;
    } else if (target > array[mid]) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }

  return -1;
}

const finalCheck = binarySearch(generateSortedList(15), 8);
console.log(finalCheck);
