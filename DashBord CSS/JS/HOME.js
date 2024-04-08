var but_menu = document.getElementById("but_menu");
var menu = document.getElementById("menu");

but_menu.addEventListerner("click", function() {
    if (menu.style.display == "block"){
        menu.style.display = "none"
    }else{
        menu.style.display = "block"
    }
});