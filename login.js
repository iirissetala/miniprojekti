function check(form)/*function to check userid & password*/
{
    /*the following code checks whether the entered userid and password are matching*/
    if(form.userid.value == "myuserid" && form.pswrd.value == "mypswrd" || form.userid.value == "vieras" && form.pswrd.value =="vieras")
    {
        window.open('target.html')/*opens the target page while Id & password matches*/
    }
    else
    {
        alert("Error Password or Username")/*displays error message*/
    }
}
localStorage.setItem("userid", "")