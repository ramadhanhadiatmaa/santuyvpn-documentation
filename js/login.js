const login = document.getElementById("login");
const emailfield = document.getElementById("mail");
const passwordfield = document.getElementById("password");

// const auth = firebase.auth();

const loginFunction = () => {

    const auth = firebase.auth();
    const email = emailfield.value;
    const password = passwordfield.value;

    auth.signInWithEmailAndPassword( email, password)
    .then(() => {
        window.location.assign('./addserver.html');
        sessionStorage.setItem('email', email);
    })
    .catch(error => {
        alert("Login Failed, Try Again");
        console.error(error);
    })

}

login.addEventListener('click', loginFunction);

