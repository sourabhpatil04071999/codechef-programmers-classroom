function joinClass() {
    document.getElementById("joinClass").innerHTML = "Enter Unique Code"
    // document.getElementById("joinClass").classList.remove("alert alert-success") || document.getElementById("joinClass").classList.remove("alert alert-danger")

    document.getElementById("joinClassSubmit").style.display = 'block';
}

function joinMsg(msg) {
    var msgElement = document.getElementById("joinClass")
    if (msg == 1) {
        msgElement.innerHTML = "Join Success";
        msgElement.setAttribute("class", "alert alert-success");
        msgElement.setAttribute("role", "alert");
    } else {
        msgElement.innerHTML = "Join Failed";
        msgElement.setAttribute("class", "alert alert-danger");
        msgElement.setAttribute("role", "alert");
    }
    document.getElementById("joinClassSubmit").style.display = 'none';
    document.getElementsByClassName("join-class-effect")[0].value = null;
}