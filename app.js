const addButton = document.getElementById('add-btn');
const yo = document.getElementById('yo-btn');

const deleteButton = document.getElementById('delete-btn');
const removeButton = document.getElementById('remove-btn');
const barsContainer = document.getElementById('bars-container');
const bubbleSortButton = document.getElementById('bubble-sort');
const insertionSort = document.getElementById('insertion-sort');
const selectionSort = document.getElementById('selection-sort');
const mSort = document.getElementById('merge-sort');
const speed = document.getElementById('speedBar');
let delay = 100; 


addButton.addEventListener("mousedown", function() {
  isButtonPressed = true;
  intervalId = setInterval(function() {
    if (isButtonPressed) {
      const newBar = document.createElement("div");
      newBar.classList.add("bar");

      const minWidth = 20;
      const maxWidth = 1200;
      const randomWidth = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
      newBar.style.width = randomWidth + "px";

      barsContainer.appendChild(newBar);
    }
  }, 200); 
});

addButton.addEventListener("mouseup", function() {
  isButtonPressed = false;
  clearInterval(intervalId);
});


deleteButton.addEventListener('click', function () {
    const bars = barsContainer.getElementsByClassName('bar');
    const lastBar = bars[bars.length - 1];
    if (lastBar) {
        lastBar.remove();
    }
})

removeButton.addEventListener('click', function() {
    while (barsContainer.firstChild) {
        barsContainer.removeChild(barsContainer.firstChild);
    }
});

speed.addEventListener('click', function() {
    delay = parseInt(speed); 
});

 bubbleSortButton.addEventListener('click', function() {
    const bars = Array.from(barsContainer.getElementsByClassName('bar'));
    bubbleSort(bars);
});

async function bubbleSort(arr) {
    const len = arr.length;

    for (let i = 0; i < len - 1; i++) {
        let swapped = false;

        for (let j = 0; j < len - i - 1; j++) {
            const currentBar = arr[j];
            const nextBar = arr[j + 1];

            const currentWidth = parseInt(currentBar.style.width);
            const nextWidth = parseInt(nextBar.style.width);

            // Compare widths and swap if necessary
            if (currentWidth > nextWidth) {
                await swapBars(currentBar, nextBar);
                swapped = true;
            }
        }

        if (!swapped) {
            break;
        }
    }
}

insertionSort.addEventListener('click', function() {
    const bars = Array.from(barsContainer.getElementsByClassName('bar'));
    insertSort(bars);
});

async function insertSort(arr) {
    const n = arr.length;

    for (let i = 1; i < n; i++) {
        const key = parseInt(arr[i].style.width);
        let j = i - 1;

        while (j >= 0 && parseInt(arr[j].style.width) > key) {
            await swapBars(arr[j + 1], arr[j]);
            j--;
        }

        arr[j + 1].style.width = key.toString() + "px";
    }
}

selectionSort.addEventListener('click', function() {
    const bars = Array.from(barsContainer.getElementsByClassName('bar'));
    selectSort(bars);
});

async function selectSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++){
        let minIndex = i;
        for (let j = i + 1; j < n; j++){
            if (parseInt(arr[j].style.width) < parseInt(arr[minIndex].style.width)) {
                minIndex = j;
            }
        }

        await swapBars(arr[i], arr[minIndex]);
    }
}

mSort.addEventListener('click', function() {
    const bars = Array.from(barsContainer.getElementsByClassName('bar'));
    mergeSort(bars);
});

async function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  const sortedLeft = await mergeSort(left);
  const sortedRight = await mergeSort(right);

  return await merge(sortedLeft, sortedRight);
}

async function merge(left, right) {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    const leftValue = parseInt(left[leftIndex].style.width);
    const rightValue = parseInt(right[rightIndex].style.width);

    if (leftValue < rightValue) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }

  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }

  await animateMerge(result);

  return result;
}

async function animateMerge(result) {
  // Perform animation here (e.g., swapping bars visually)
  // You can customize this based on your visualization needs
  for (let i = 0; i < result.length; i++) {
    const bar = result[i];
    // Perform animation (e.g., change bar position, color, etc.)
    await sleep(100); // Delay for visualization purposes
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// function mergeSort(array) {
//   const half = array.length / 2

//   if (array.length < 2){
//     return array
//   }

//   const left = array.splice(0, half)
//   return merge(mergeSort(left),mergeSort(array))
// }

// function merge(left, right) {
//     let arr = []

//     while (left.length && right.length) {
//         if (left[0] < right[0]) {
//             arr.push(left.shift())
//         } else {
//             arr.push(right.shift())
//         }
//     }

//     return [ ...arr, ...left, ...right ]
// }

function swapBars(bar1, bar2) {
    return new Promise(resolve => {
        const tempWidth = bar1.style.width;
        bar1.style.width = bar2.style.width;
        bar2.style.width = tempWidth;

        // Delay to visualize the sorting process
        setTimeout(resolve, 400);
    });
}



