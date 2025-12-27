var findMedianSortedArrays = function(nums1, nums2) {
    /*
    
    */
    
  var mergedArr = [...nums1, ...nums2];
  let len = mergedArr.length;
  if(len %2 !== 0){
    let med = mergedArr[Math.floor(len / 2)];
    return med
  }else if(len %2 === 0){
    let x1 = mergedArr[len / 2];
    let x2 = mergedArr[(len / 2 )- 1];
    let med = (x1 + x2) / 2;
    return med;
  }

};

console.log(findMedianSortedArrays([1,3,5],[6,7,8]));