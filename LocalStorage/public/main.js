//alert();
// sessionStorage.setItem('twitter', '@sessionStorage');
// localStorage.setItem('twitter','@localStorage');

// var sStorage = sessionStorage.getItem('twitter');
// var lStorage = localStorage.getItem('twitter');
// alert(sStorage + ',' + lStorage);
localStorage.setItem('obj', JSON.stringify({
    name: 'Ivan',
    age: '22'
}));

//localStorage.removeItem('twitter');

var lStorage = localStorage.getItem('obj');
lStorage = JSON.parse(lStorage);
alert(lStorage);
localStorage.clear();