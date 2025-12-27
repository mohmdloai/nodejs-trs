let height = [1,8,6,2,5,4,8,3,7]
var maxArea = function(height) {
  if (height.length== 0)  return;

  const maximum = Math.max(...height);
  console.log(maximum);
    let second = Math.max(...height.filter((x)=> x!==maximum));
  console.log(second);
  let ww = -( height.indexOf(maximum) - height.indexOf(second));
  
  console.log(ww)
    let vol = second * ww;
  console.log(vol);
    return vol;
  }




// console.log(maxArea(height));
maxArea(height)