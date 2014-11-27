var skrollr = require('../../vendor/bower_components/skrollr/dist/skrollr.min');
require('../styl/main.styl'); // Just trigger CSS compilation & text extraction...

var shouldAnimateBirthTime = false, BIRTH_TIME_UPPER_LIMIT=1000,
    birthTimestamp = +(new Date(1954, 10, 27)),
    evacuateTimestamp = +(new Date(1955, 1, 8)),
    timeDelta = evacuateTimestamp - birthTimestamp;

var birthElem = document.getElementById('birth'),
    birthElemDate = birthElem.querySelector('.date'),
    birthElemAge = birthElem.querySelector('.age');

skrollr.init({
  keyframe: function(elem, name, direction){
    if(elem === birthElem){
      shouldAnimateBirthTime = (name === 'data0' && direction === 'down') ||
                               (name === 'data'+BIRTH_TIME_UPPER_LIMIT && direction === 'up')
      if(!shouldAnimateBirthTime) {
        if(name === 'data0') updateBirthTime(0);
        if(name === 'data'+BIRTH_TIME_UPPER_LIMIT) updateBirthTime(BIRTH_TIME_UPPER_LIMIT);
      }

    }
  },
  render: function(data){
    if(shouldAnimateBirthTime){
      updateBirthTime(data.curTop);
    }
  }
});

window.addEventListener('load', function(){
  document.body.classList.add('is-loaded');
  setTimeout(function(){
    document.querySelector('.loading').remove();
  }, 500);
});

function updateBirthTime(curTop) {
  var date = new Date(curTop/BIRTH_TIME_UPPER_LIMIT * timeDelta + birthTimestamp),
      monthCount = (date.getMonth() - 10 + 12)%12;
  birthElemDate.innerText = date.getFullYear() + '.' + (date.getMonth()+1) + '.' + date.getDate();
  if(monthCount > 0){
    birthElemAge.innerText = "0 歲 " + monthCount + " 個月";
  }else{
    birthElemAge.innerText = "0 歲"
  }
  // console.log(birthTimestamp, newTimestamp, evacuateTimestamp);
}