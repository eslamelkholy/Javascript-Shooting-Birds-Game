$(":submit").on("click",function() {
    localStorage.setItem("name",$(":text").val())
    localStorage.setItem("level",$("select").val())
    console.log(
        localStorage.getItem("name"),
        localStorage.getItem("level")
    );
    
})