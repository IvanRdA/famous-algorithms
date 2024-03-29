const generateList = (n) => {
  const resultList = [];

  for (let i = 0; i < n; i++) {
    resultList.push(Math.floor(Math.random() * 1001));
  }
  return resultList;
};

function quickSort(array) {
  if (!array[0]) {
    return [];
  }

  if (array.length === 1) {
    return [array[0]];
  }

  if (array.length === 2) {
    if (array[0] <= array[1]) {
      return array;
    } else {
      return [array[1], array[0]];
    }
  }

  const pivot = array[0];
  const leftArr = [];
  const rigthArr = [];

  for (let i = 1; i <= array.length - 1; i++) {
    if (array[i] <= pivot) {
      leftArr.push(array[i]);
    } else {
      rigthArr.push(array[i]);
    }
  }

  const left = quickSort(leftArr);
  const right = quickSort(rigthArr);

  if (!leftArr[0]) {
    return [pivot, ...right];
  } else if (!rigthArr[0]) {
    return [...left, pivot];
  } else {
    return [...left, pivot, ...right];
  }
}

const finalCheck = quickSort(generateList(20));
console.log(finalCheck);
