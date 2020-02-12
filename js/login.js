let arr = [];
let tbodyObj = document.querySelector("tbody");
for (var i = 0; i < localStorage.length; i++) {
    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
}
arr.sort((a, b) => a.score - b.score);
for (var i = 0; i <arr.length; i++) {
    let trObject = document.createElement("tr");
    let tdObjectName = document.createElement("td");
    let tdObjectScore=document.createElement("td");
    tdObjectName.innerText = arr[i].name;
    tdObjectScore.innerText=arr[i].score;
    trObject.appendChild(tdObjectName);
    trObject.appendChild(tdObjectScore);
    tbodyObj.appendChild(trObject);

}