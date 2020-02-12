let arr=[];
for(obj in window.localStorage){
console.log(window.localStorage[obj])
if( window.localStorage[obj] instanceof object){
    arr.push(window.localStorage[obj]);
}
}