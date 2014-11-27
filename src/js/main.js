var skrollr = require('../../vendor/bower_components/skrollr/dist/skrollr.min');
require('../styl/main.styl'); // Just trigger CSS compilation & text extraction...

var shouldAnimateBirthTime = false, BIRTH_TIME_UPPER_LIMIT=1000,
    birthTimestamp = +(new Date(1954, 10, 27)),
    evacuateTimestamp = +(new Date(1955, 1, 8)),
    timeDelta = evacuateTimestamp - birthTimestamp;

var birthElem = document.getElementById('birth'),
    birthElemDate = birthElem.querySelector('.date'),
    birthElemAge = birthElem.querySelector('.age'),

    candidateElem = document.querySelector('.candidates'),
    kpElem = document.querySelector('.kp .placeholder'),
    lienElem = document.querySelector('.lien .placeholder');

window.addEventListener('load', function(){
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

      if(elem === candidateElem){
        kpElem.innerText = fetchKPData();
        lienElem.innerText = fetchLienData();
      }
    },
    render: function(data){
      if(shouldAnimateBirthTime){
        updateBirthTime(data.curTop);
      }
    }
  });


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

// Fake data sources, no time to apply for API lol
//
function fetchLienData(cb) {
  return sample([
    '我提出「以教育帶動臺北成為多元競爭力城市」，針對提高台北的城市多元競爭力，提出了相關的教育政策，包括：「鼓勵跨縣市交換學生」、「爭取國外知名學術機構來台北合作設置據點」、「國小每校至少一外籍老師」、「國際交換學生倍數成長」、「教師自行決定研習課程及補助教師國外參訪」等5項相關政策。 為增進台北市學童對在地文化的認識，體驗不同教育及生活環境，未來將鼓勵跨縣市的交換學生計畫。希望透過「跨縣市Long Play」計劃，讓台北市與其他縣市的學生，共同上課，共同生活，能產生更多連結，讓學童能夠快樂學習成長！ 此外，未來將極力爭取國外知名學術機構來台北合作設置據點，尤其是生化醫療、創意設計等領域的相關學術單位。在學生教育的部份，我們也提出每間國小至少聘請一位外籍教師，並要讓國際交換學生的名額倍增。過去曾試辦一校一外師，但是外籍教師的品質參差不齊，所以未來推動同時也將特別注意外籍教師的品質，此外，外籍教師將採契約聘任，所以不會排擠到既有教師任用的名額。',
    '我提出「犯罪零容忍，治安無死角」，因應台中市施姓商人撕票案件，除為亡者哀悼，並更針對重大刑案宣誓，將打造台北市成為一「零容忍、無死角」的安居城市，因此提出「強化反綁架小組、監視器安全聯盟、及建置犯罪熱點」三項治安防護網，讓安心生活在台北市是最基本的人身居住安全。 首先針對日前台中市施姓商人遭撕票案件，市府角色就是全體市民最強壯的保護者。未來將比照國外警察機構設置AKD(Anti-Kidnap Department，反綁架部門)，在台北市警察局下設立維安特勤小組，處理重大綁架刑案，台北市比照國際主要城市強化保安警察編組並納入鑑定小組、科技偵察、跨介面整合等，專門處理綁票、擄人等人身安危案件。除著重加強處理重大刑案應變能力，更重要是科技辦案技術與救援能力，把握綁架案發生的黃金救援期限，並與地方警察機關定期掌握相關情資，強化治安，使市民免於恐懼。',
    '我提出「適性發展，讓孩子做最好的自己」，雖然十二年國教的爭議現在已經逐漸平息，但事實上，政府教育的改革現在才正要開始面臨挑戰。根據兒福聯盟公佈的數據表示，目前有高達三成的弱勢孩子國中會考成績有四科或五科都拿C，且近六成五就讀私立高中，加重這些家庭的經濟負擔，因此，未來將針對於這群弱勢學生，加強扶助。 全面提倡小班制度 平均教育資源 幫助C得分群學童 目前台北市因為教育資源分配不均，使得國中、小「跨區就讀」的情況相當嚴重，因此，未來將透過「提倡小班制度」、「提升設備資源」、「加強學習落後學生的輔導」等方式，達到各校均優質化，從根本面去解決問題！ 打造「旗艦級」的技職教育 高中高職雙軌並行 因應十二年國教，要翻轉考試引導教學的思維，我認為「目前的教育體系卻仍以考試就學為主要目標，這樣的現況需要被改變，讓教育環境多元化，讓孩子能夠適性發展。」在具體做法上，要高中、高職教育要「雙軌並行」，打造「旗艦級」的技職教育，並協助每一座台北市的社區高中找到他們的特色。'
  ]);
}

function fetchKPData(cb) {
  return sample([
    '我主張主張全面檢討台北治安的病灶，「減少雜務，回歸本業」，將警政革新放在台北市治安第一位，「市長支持警察，警察專心治安」。我認為，台北市警政革新的第一條是以前市長都不敢去碰的，就是台北市警察局跟保安警察指揮權及勤務的劃分應該要明訂。我覺得是這樣啦，台北市時常有街頭抗爭，但對台北市警察而言，理論上最重要的工作應該是治安跟交通，可是每次面臨群眾抗爭時，都需要去支援，但這時的勤務劃分該做到甚麼程度就需要講清楚。 第二，針對警察局人力不足與待遇遇要提高的問題，我認為，目前台北市警察局的缺額還有八百名，待遇方面需要提供超勤加班費。但柯文哲認為有一個重要的概念，「Work smart , not work hard 」，不只是認真工作，更應該要聰明的工作。我認為過去對警察出勤時常太沒有效率了，不要把警察當作交差式的派遣，應該要更有效率的運作。 ',
    '我提出「北市社福事業，透過公益企業方式推動」，我認為，事實上，台北市不只是人口老化，很多的社會福利問題包括托嬰、托育、安親班、銀髮族照顧、長照，甚至是身心障礙的服務，如果單靠公家的社會福利去做都不足夠。 目前台灣的民間力量，包括宗教團體、宮廟、地方社區營造協會等，如何把這些輔導成社會企業，從另外一個角度來說，就是把社會企業當作創投來輔助它發展。我認為，有關社會企業的發展過程當中，政府把它當作創投來幫忙，所以要有這種社會企業的育成中心，提供必要的資金、空間、技術、法律、會計上的服務。營運的過程中，哪些是政府可以幫忙的，如柯P新政影片中這個學校，當時他去看的時候，他們說沒有空間，他就在想政府應該可以協助，利用假日學校沒有上課時釋出空間利用。我發現很多社會企業都可以透過募款解決70%到80%的費用，其他部分，需要政府幫忙把缺額補足，就能夠運作。這和我去史丹佛大學所看到矽谷創投會成功，不是因為他們輔導如何成功，而是他們確保失敗的時候，不會走投無路。政府對這些社會企業，尤其是推行社會福利的社會企業，也要建立安全網，在它們有需要的時候，出來做最後的支持。',
    '我提出「智慧城市新經濟」，主張將台北市全面智慧化，用新科技帶動新經濟，使未來的台北將充滿機會及可能性。網路時代來臨，政府對於smart city的做法其實不會花費非常多費用，最主要的是態度的改變，台北市政府會以更開放的態度面對網路時代新的產業觀念。我認為，政府存在的目的是建立平台，讓個人或企業可以方便運作，因此我提出「開放政府、全民參與、公開透明」的概念，這也是我的選戰主軸，將來把除了涉及國家機密以外的政府資料都開放上網，不僅給人看，也方便這些數據給其他軟體應用，「human readable and machine readable」，輸出的資料原則上越開放越好，除了政府的統計資料，還包括警察局搜集的交通流量資料、環保局搜集的空氣污染情況資料、氣象局搜集的台北市各區氣溫資料，儘量把政府手中搜集到的資料開放出來給大家使用，讓人民可以在這些資料中發現問題，甚至可以做其他商業用途。政府不要怕圖利人民，而是要勇敢地把資料開放給大家使用！'
  ]);
}

function sample(arr) {
  return arr[ Math.floor(arr.length * Math.random()) ];
}
