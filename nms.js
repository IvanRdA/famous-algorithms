/* 
O(N^2) time, O(1) space

Algorithm used on element recognition in images, mostly with data obtained by ML trained models that have generated some "rectangles" with detections, where we need to choose the most accurate option
(the one with most confidence value on the list).

First we create two anonimous functions to generate fake data for testing the algorithm. For this one, Created a box definition with x point, y point, rectangle width and rectangle height with Math.random in
a range of 0-256 and the confidence with a range of 0-1. And another one where can pass as an argument the number of boxes that want to be generated.
*/
const box = () => {
  return {
    box: {
      x: Math.random() * 256,
      y: Math.random() * 256,
      width: Math.random() * 256,
      height: Math.random() * 256,
    },
    confidence: Math.random(),
  };
};

const generateBoxes = (n) => {
  const resultList = [];
  for (let i = 0; i < n; i++) {
    resultList.push(box());
  }

  return resultList;
};

function NMS(detections, treshold = 0.5) {
  // First of all sort the input list by confidence value, meaning that the first element on the list will be the one with more confidence value (descending sort)
  detections.sort((a, b) => {
    return b.confidence - a.confidence;
  });

  const selectedDetections = [];

  /* Then iterate the resultant sorted list, for each detection rectangle on the list, compare the intersection over union against the next item on the list and, if the IoU is bigger than the given treshold 
  we desestimate the detection. If IoU is smaller than the treshold, we push the element to an empty list that will be returned in the end of the algorithm.
  */
  detections.forEach((detA, idx) => {
    let shouldKeep = true;

    for (let i = idx + 1; i < detections.length; i++) {
      const detB = detections[i];

      const iou = getIoU(detA.box, detB.box);

      if (iou >= treshold) {
        shouldKeep = false;
        break;
      }
    }

    if (shouldKeep) {
      selectedDetections.push(detA);
    }
  });

  return selectedDetections;
}

function getIoU(boxA, boxB) {
  /* Getting the Intersection Over Union on the two rectangles was the most difficult part for me because my non-background on advanced mathematics, but once got the idea the process was simple.
  First get the max on x and y coordinates for the two rectangles, then the max between the sum of that points on each rectangle. Then have to take the max value on the difference between widths and x and heights and y.
  That value will be the intersection area.
  
  Once have that values, the IoU equation looks like: Intersection area / (rectangleA area + rectangleB area - intersection area).
  This one is the value returned by the function.
  */
  const xA = Math.max(boxA.x, boxB.x);
  const yA = Math.max(boxA.y, boxA.y);
  const xB = Math.max(boxA.x + boxA.width, boxB.x + boxB.width);
  const yB = Math.max(boxA.y + boxA.height, boxB.y + boxB.height);

  const intersectionArea = Math.max(0, xB - xA) * Math.max(0, yB - yA);

  const aBoxArea = boxA.width * boxA.height;
  const bBoxArea = boxB.width * boxB.height;

  const iou = intersectionArea / (aBoxArea + bBoxArea - intersectionArea);

  return iou;
}

// Result data may will be mistaken because the fact of generating too small data and the way that this data is generated (math.random values)
const finalResult = NMS(generateBoxes(50));
console.log(finalResult);
