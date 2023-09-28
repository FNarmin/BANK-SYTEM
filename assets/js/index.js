var form = document.querySelector("#qeydiyyatFormasi");
class EmptyInput extends Error {}
class NameError extends Error{}
class SurnameError extends Error{}
class EmailError extends Error{}
class PasswordError extends Error{}
class SamePasswordError extends Error{}
class QeydiyyatFormasi {
    validateName (x) {
        if (x.value.length<3 || x.value.length>9) {
            x.value = x.value.trim();
        if (!x.value) {
            throw new EmptyInput("Adınızı qeyd etmeyi unutmusunuz!"); 
        } else {
            throw new NameError("Adınız düzgün daxil edilməyib(3-9 hərfdən təşkil olunmalıdır)!");
        }} else if (x.value.length>3 && x.value.length<9) {
            for (let i = 0; i<x.value.length; i++) {
                var code = x.value.charCodeAt(i);
                if ((code>=65 && code<=90) || (code>=97 && code<=122)) {
                    continue;
                } else {
                throw new NameError("Ad yalnız hərflərdən ibarət olmalıdır.");
                }}
                x.classList.remove("error");
                const p = x.parentNode.querySelector("p.error-text");
                if (p) {
                    x.parentNode.removeChild(p);
                }
}}
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
                const p = x.parentNode.querySelector("p.error-text");
                if (p) {
                    x.parentNode.removeChild(p);
                }
                }
    }
validateEmail (x) {
    x.value = x.value.trim();
    if (!x.value) {
        throw new EmptyInput("Emaili qeyd etmeyi unutmusunuz!"); 
    } else if (!x.value.includes("@")) {
        throw new EmailError("Email formatı səhvdir!");
    } else {
        x.classList.remove("error");
        const p = x.parentNode.querySelector("p.error-text")
        if (p) {
            x.parentNode.removeChild(p);
        }
    }   
}
validatePassword (x) {
    x.value = x.value.trim();
    if (!x.value) {
        throw new EmptyInput("Şifrəni daxil etməyi unutmusunuz.");
    } else if (x.value.length <8 || x.value.length>12) {
      throw new PasswordError("Şifrə 8-12 elementdən təşkil olunmalıdır.");
    } else {
        x.classList.remove("error");
        const p = x.parentNode.querySelector("p.error-text");
        if (p) {
            x.parentNode.removeChild(p);
        }
    }
}
validateRetypePassword (x, y) {
    x.value = x.value.trim();
    if(!x.value) {
        throw new EmptyInput("Şifrəni təkrar daxil etməyi unutmusunuz.");
    } else if (x.value!==y.value)  {
        throw new SamePasswordError("Təkrar şifrə doğru deyil.");
    } else {
        x.classList.remove("error");
         const p = x.parentNode.querySelector("p.error-text");
        console.log(p.innerText);
        if (p) {
            x.parentNode.removeChild(p);
        } 
    }
}
showError (inp, xeta) {
    inp.classList.add('error');
   var  p =inp.parentNode.querySelector("p");
   console.log(p);
    if (!p) {
     p = document.createElement('p');
       inp.parentNode.append(p);
    } 
    p.classList.add('error-text');
    p.innerText = xeta.toString();
    console.log(p.innerText);
}
}
const qeydiyyatFormasi = new QeydiyyatFormasi();
form.addEventListener("submit", function(e){
    e.preventDefault();
    var f = e.target;
try {
     qeydiyyatFormasi.validateName(f.name);
     window.localStorage.setItem("name", f.name.value);

} catch (err) {
    qeydiyyatFormasi.showError(f.name, err);
}

try{
    qeydiyyatFormasi.validateSurname(f.surname);
    window.localStorage.setItem("surname", f.surname.value);
} catch(err) {
    qeydiyyatFormasi.showError(f.surname, err);
}

try{
  qeydiyyatFormasi.validateEmail(f.email);
  window.localStorage.setItem("email", f.email.value);
} catch(err) {
  qeydiyyatFormasi.showError(f.email, err);
}

try {
qeydiyyatFormasi.validatePassword(f.password);
window.localStorage.setItem("password", f.password.value)
} catch (err) {
qeydiyyatFormasi.showError(f.password, err);
}
 try {
    qeydiyyatFormasi.validateRetypePassword(f.password1, f.password);
 } catch(err) {
    qeydiyyatFormasi.showError(f.password1, err);
 }
})
//  if(!showError(f.name, err) && !showError(f.surname, err) && !showError(!f.email, err) && !showError(f.password, err) && !showError(f.password1, err)) {
// window.location.href="./../../../entry_page.html";
//  }
// })

