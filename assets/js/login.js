var form = document.querySelector("#register-form");
var registerForm = {
// email ve passwordun dogrulugu yoxlanir 
checkInputError : function(x, y) {
if (window.localStorage.getItem(email)!==x.value.trim) {
        throw new Error("email və ya şifrə səhvdir!");
    } 
else if (window.localStorage.getItem(password)!==y.value.trim()) {
        throw new Error("email və ya şifrə səhvdir!");
 } 
else {
    x.classList.remove("error");
    const p = x.parentNode.querySelector("p");
    if (p) {
        p.remove();
    }
    return 'ok'  
}

},
// xanalarin bos buraxilmasi askar edilir
validateEmptyEmail: function(x) {  
   
    if (!x.value.trim()) {
        throw new Error("email ve ya password xanasi boş ola bilməz!");
    } else {
        x.classList.remove("error");
        const p = x.parentNode.querySelector("p");
        if (p) {
            p.remove();
        }
      return "ok"
    }
},
validateEmptyPassword: function(x) {
    if (!x.value.trim()) {
        throw new Error("şifrə boş ola bilməz!");
    } 
    else {
        x.classList.remove("error");
        const p = x.parentNode.querySelector("p");
        if (p) {
            p.remove();
        }
      return "ok"
    }
},
// yadda saxlamagimiz ucun chekboxa check edilerek tesdiq edilmesi hadisesi
validateAgree: function(x, y) {
if(x.checked) {
    x.value = window.localStorage.getItem(email);
    y.value = window.localStorage.getItem(password);
}
},
showError: function(inp, error) {
    inp.classList.add('error');
    var p =inp.parentNode.querySelector("p");
        if(!p) {
            p = document.createElement('p');
           inp.parentNode.append(p);
              }
       p.style.color = "red";
       p.style.fontSize = "0.8em";
    p.innerText = error.toString();
    console.log(p.innerText);
}
}
// submit olunarken
form.addEventListener("submit", function(e) {
e.preventDefault();
var f = e.target;
// errorlar varsa  gosterilir
try {
    registerForm.checkInputError(f.email, f.password);
} catch(err) {
    registerForm.showError(f.email, f.password, err);
}
try {
registerForm.validateEmptyEmail(f.email);
} catch (err) {
registerForm.showError(f.email, err);
}
try {
    registerForm.validateEmptyPassword(f.password);
    } catch (err) {
    registerForm.showError(f.password, err);
    }
// eger her sey ok dirse yeni profil.html sehifesine kecir
if (registerForm.validateEmptyEmail(f.email)=="ok" && registerForm.validateEmptyPassword(f.password) == "ok") {
    window.location.href = "./profile.html"
}
})