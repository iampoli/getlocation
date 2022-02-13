let clickBtn = document.getElementById("btn-click");

clickBtn.onclick = ()=>{
   if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onSuccess,onError);
   }else{
       clickBtn.innerText ="Browser not support";
   }
}

function onSuccess(position){
    let {latitude,longitude} = position.coords;
    getGeo({latitude,longitude});
}
function onError(err){
    if(err.code == 1){
    clickBtn.innerText ="You denied the request"; 
    }
    if(err.code == 2){
    clickBtn.innerText ="Location not available"; 
    }
    clickBtn.innerText ="Something went wrong"; 

}

function getGeo(position){
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${position.latitude}+${position.longitude}&key=07f8a5288c884e4aabb0fd9553e8f2fc`).then(res=>{
        return res.json();
    })
    .then(res=>{
        let details = res.results[0].components;
        let {county,state,country}= details;
        clickBtn.innerText = `${county}, ${state}, ${country}`;
    }).catch(err=>{
    clickBtn.innerText ="Something went wrong"; 
    })
}