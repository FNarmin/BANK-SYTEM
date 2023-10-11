var form = document.querySelector("#qeydiyyatFormasi");
class EmptyInput extends Error {}
class NameError extends Error{}
class SurnameError extends Error{}
class EmailError extends Error{}
class PasswordError extends Error{}
class SamePasswordError extends Error{}
class notAgreeError extends Error{}
class QeydiyyatFormasi {
    validateName (x) {
        // adin duzgunluyunu yoxlayiriq
        if (x.value.length<3 || x.value.length>9) {
            x.value = x.value.trim();
            console.log(x.value.length);
        if (!x.value) {
            throw new EmptyInput("Adınızı qeyd etmeyi unutmusunuz!"); 
        } else{
            throw new NameError("Adınız düzgün daxil edilməyib(3-9 hərfdən təşkil olunmalıdır)!");
        }} else if (x.value.length>3 && x.value.length<9) {
            for (let i = 0; i<x.value.length; i++) {
                var code = x.value.charCodeAt(i);
                if ((code>=65 && code<=90) || (code>=97 && code<=122)) {
                    continue;
                } else {
                throw new NameError("Ad yalnız hərflərdən ibarət olmalıdır.");
                }}}
                    x.classList.remove("error");
                    const p = x.nextElementSibling;
                    if (p) {
                        p.remove();
                    }
                    return "ok";
                }   
//soyadin duzgunluyunu yoxlayiriq 
validateSurname (x) {
    if (x.value.length<3 || x.value.length>15) {
        x.value = x.value.trim();
        if (!x.value) {
            throw new EmptyInput("Soyadınızı qeyd etmeyi unutmusunuz!"); 
        } else {
            throw new SurnameError("Soyadınız düzgün daxil edilməyib(3-15 hərfdən təşkil olunmalıdır)!");
        }} else if (x.value.length>3 && x.value.length<15) {
            for (let i = 0; i<x.value.length; i++) {
                var code = x.value.charCodeAt(i);
                if ((code>=65 && code<=90) || (code>=97 && code<=122)){
                    continue;
                } else {
                    throw new SurnameError("Soyad yalnız hərflərdən ibarət olmalıdır.");
                    }
            }        
               x.classList.remove("error");
               const p = x.nextElementSibling;
                    if (p) {
                        p.remove(p, x.nextElementSibling);
                    }
                    return "ok"
                }
    }
// emailin duzgunluyunu yoxlayiriq
validateEmail (x) {
    x.value = x.value.trim();
    if (!x.value) {
        throw new EmptyInput("Emaili qeyd etmeyi unutmusunuz!"); 
    } else if (!x.value.includes("@")) {
        throw new EmailError("Email formatı səhvdir!");
    } else {
        x.classList.remove("error");
        const p = x.nextElementSibling;
        if (p) {
            p.remove();
        }
        return "ok"
    }   
}
// passwordun duzgunluyunu yoxlayiriq
validatePassword (x) {
    x.value = x.value.trim();
    if (!x.value) {
        throw new EmptyInput("Şifrəni daxil etməyi unutmusunuz.");
    } else if (x.value.length <8 || x.value.length>12) {
      throw new PasswordError("Şifrə 8-12 elementdən təşkil olunmalıdır.");
    }  else {
        x.classList.remove("error");
        const p = x.nextElementSibling;
        if (p) {
           p.innerText = "";
        }
        return "ok"
    }   
}
// tekrar passwordun uygunlugunu yoxlayiriq
validateRetypePassword (x, y) {
    x.value = x.value.trim();
    if(!x.value) {
        throw new EmptyInput("Şifrəni təkrar daxil etməyi unutmusunuz.");
    } else if (x.value!==y.value)  {
        throw new SamePasswordError("Təkrar şifrə doğru deyil.");
    } else {
        x.classList.remove("error");
        const p = x.nextElementSibling;
            if (p) {
                 p.remove();
             }
             return "ok"
    }
}
// qaydalarla razi olub olunmadigini yoxlayiriq
validateCheckbox (x) {
    if (!x.checked) {
        throw new notAgreeError("Qaydalarla razı deyilsiniz!");
    } else {
        x.classList.remove("error");
        const p = x.nextElementSibling;
        if (p) {
            p.remove();
        }
      return "ok"
    }
}
// errorlar chixanda neler bash vermeli oldugu qeyd edilib
showError (inp, xeta) {
    inp.classList.add('error');
    var p =inp.nextElementSibling;
       console.log(p);
       if(!p) {
     p = document.createElement('p');
    inp.parentNode.insertBefore(p, inp.nextElementSibling);
       }
       p.style.color = "red";
       p.style.fontSize = "0.8em";
    p.innerText = xeta.toString();
    console.log(p.innerText);
}
}
// class yeni json obyektine menimsedilib
const qeydiyyatFormasi = new QeydiyyatFormasi();
form.addEventListener("submit", function(e){
    e.preventDefault();
    var f = e.target;
// errorlar askar edilir 
try {
     qeydiyyatFormasi.validateName(f.name);
} catch (err) {
    qeydiyyatFormasi.showError(f.name, err); 
}

try{
    qeydiyyatFormasi.validateSurname(f.surname);
} catch(err) {
    qeydiyyatFormasi.showError(f.surname, err);
}

try{
  qeydiyyatFormasi.validateEmail(f.email);  
} catch(err) {
  qeydiyyatFormasi.showError(f.email, err);
}

try {
qeydiyyatFormasi.validatePassword(f.password);

} catch (err) {
qeydiyyatFormasi.showError(f.password, err);
}
 try {
    qeydiyyatFormasi.validateRetypePassword(f.password1, f.password);
 } catch(err) {
    qeydiyyatFormasi.showError(f.password1, err);
 }
 try {
    qeydiyyatFormasi.validateCheckbox(f.agree);
 } catch (err) {
    qeydiyyatFormasi.showError(f.agree, err);
 }
//  eger error yoxdursa hamisi ok dirse onda email ve password localda saxlanilir ve yeni sehifeye kecir
 if (qeydiyyatFormasi.validateName(f.name) == "ok" && qeydiyyatFormasi.validateSurname(f.surname) == "ok" && qeydiyyatFormasi.validateEmail(f.email)== "ok" && qeydiyyatFormasi.validatePassword(f.password) == "ok" && qeydiyyatFormasi.validateRetypePassword(f.password1, f.password) == "ok" && qeydiyyatFormasi.validateCheckbox(f.agree)=="ok") {
    window.localStorage.setItem("email", f.email.value);
    window.localStorage.setItem("password", f.password.value);
    window.location.href = "./assets/pages/login.html"
 }
})


