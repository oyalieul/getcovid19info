
var input ="";
var inputTrim="";
// calling all the necessary html element
var wholeDiv=document.getElementById('wholeDiv');
var wait=document.getElementById('wait');
var searchRes=document.getElementById('searchResult');
var pushDiv=document.getElementById('push');
var row=document.getElementById('row');
// creating first column
var display=document.createElement('div');
    display.setAttribute("id", "display");
    display.setAttribute( "class", "col-lg-4 col-md-6 col-12 d-flex justify-content-center my-4");
// creating second column
var display2=document.createElement('div');
    display2.setAttribute("id", "display2");
    display2.setAttribute("class", "col-lg-4 col-md-6 col-12 d-flex justify-content-center my-4");

// form event listener
document.getElementById('form')
    .addEventListener('submit',function(e){
        e.preventDefault(); start(); 
    });

//start the first covid api
function start(){
    input=document.getElementById('input').value;
    inputTrim=input.trim();
    wait.innerHTML=`<div><span class="loader"><span class="loader-inner"></span></span></div>
    <div style="color:white; font-size:110%; margin-top:10px;" class="animate__animated animate__flash animate__infinite animate__slower">Searching ...</div>`;

    // removing the result section 
    searchRes.innerHTML=""; 
    row.innerHTML=""; 
    pushDiv.innerHTML="";
    wholeDiv.setAttribute("style", "")
    connectAPI(inputTrim);
    // clearing window jump
    window.location.hash="top";
}
function jump(){
    // jump window to search 
    window.location.hash="";
    window.location.hash="top"; 
}

//  covid api
function connectAPI(x){
    fetch (`https://api.covid19api.com/live/country/${x}/status/confirmed`)
    .then (res=>res.json())
    .then (data=>nextStep(data))     
}

// covid api data
function nextStep (y){
    // checking search input valid or not
    if (y=="" || y.message=="Not Found" || inputTrim == ""){
        wait.innerHTML=`<p style="color:white;font-size:120%";>Sorry!! No information found</p>`;
        display.innerHTML=""; 
    }

    else{
        wait.innerHTML="";
        wholeDiv.setAttribute("style", "margin:100px 0;")
        var totalCases=(y[y.length-1].Confirmed).toLocaleString();
        var totalRecovered=y[y.length-1].Recovered.toLocaleString();
        var totalDeaths=y[y.length-1].Deaths.toLocaleString();
        var totalActive=y[y.length-1].Active.toLocaleString();
        // showing search result msg
        // geting date
        var today= new Date().toDateString();
        searchRes.innerHTML=`<p style="margin-top:40px">Showing result for "<b>${inputTrim}</b>" and "<b>${today}</b>"</p></p>`;
        
        // covid data
        var overallData= `<div class="p-4 self-databox animate__animated animate__fadeInUp">
          <p><b>Total Cases</b> <br>${totalCases}</p>
          <p><b> Total Recovered</b><br> ${totalRecovered}</p>
          <p><b>Total Deaths</b> <br>${totalDeaths}</p>
          <p><b>Total Active Cases</b><br> ${totalActive}</p>
          </div>`      
        // pushing data to first column
        display.innerHTML=overallData;
        // pushing first column to row
        row.appendChild(display);

        // pushing btn to second column
        display2.innerHTML=`<div class="p-4 self-btnbox">
          <button class="morebtn" onclick="start2()">Country Details</button></div>`
        // pushing second column to row
        row.appendChild(display2);
        
        //creating search again button
        var pushCont= `<button class="push" onclick="jump()">Search Again</button>`
        pushDiv.innerHTML= pushCont;
        //window jump to search result
        
        window.location.hash = "wholeDiv";
    }
}  

// start country api
function start2(){
    input=document.getElementById('input').value;
    inputTrim=input.trim();
    display2.innerHTML= `<div class="search3"><div style="color:black; font-size:110%;" class="animate__animated animate__flash animate__infinite animate__slower">Searching ...</div>`;
    connectAPI2(inputTrim);
    
}

// country api
function connectAPI2(x){
    fetch (`https://restcountries.com/v3.1/name/${x}`)
    .then (res=>res.json())
    .then (data=>nextStep2(data))
}    
// country api data
function nextStep2(x){
    var capital=x[0].capital[0];
    var area=x[0].area.toLocaleString();
    var population=x[0].population.toLocaleString();
    var currency= Object.values(x[0].currencies)[0].name;
    var flag = x[0].flags.png;
    // geting the country info
    var dis2Cont= `<div class="p-4 self-databox animate__animated animate__fadeInUp">
            <p><b>Capital</b> <br>${capital}</p>
            <p><b> Area</b><br> ${area}</p>
            <p><b>Population</b> <br>${population}</p>
            <p><b>Currency</b><br> ${currency}</p>
            </div>`;
    display2.innerHTML= dis2Cont;
    // creating third coloum
    var display3=document.createElement('div');
        display3.setAttribute("id", "display3");
        display3.setAttribute("class", "col-lg-4 col-md-6 col-12 d-flex justify-content-center my-4");
    // geting the flag
    var dis3Cont= 
            `<div class="p-4 self-databox animate__animated animate__fadeInUp">
            <p><b>Flag</b></p>
            <img class="self-flag" src="${flag}" width="250px">
            </div>`;
    display3.innerHTML= dis3Cont;
    row.appendChild(display3);
}