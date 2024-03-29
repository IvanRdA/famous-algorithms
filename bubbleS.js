const generateList = (n) => {
  const resultList = [];

  for (let i = 0; i < n; i++) {
    resultList.push(Math.floor(Math.random() * 1001));
  }

  return resultList;
};

function bubbleSort(array) {
  let switches = 0;
  for (let i = 0; i <= array.length - 1; i++) {
    let current = array[i + 1];
    if (array[i] > array[i + 1]) {
      array[i + 1] = array[i];
      array[i] = current;
      switches++;
    }
  }

  if (switches !== 0) {
    bubbleSort(array);
  }

  return array;
}

const finalCheck = bubbleSort(generateList(20));
console.log(finalCheck);
