
const firebaseConfig = {
    apiKey: "AIzaSyAD4g_f0KNZomfPf2nlACNCO0E16rLaFc0",
    authDomain: "otp-verification-e3b2e.firebaseapp.com",
    projectId: "otp-verification-e3b2e",
    storageBucket: "otp-verification-e3b2e.appspot.com",
    messagingSenderId: "594597018524",
    appId: "1:594597018524:web:176faad98f7a48b2ed2659"
};


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();


function sendEmailOTP() {
    const email = document.getElementById('email').value;
    console.log("Sending email OTP to:", email);
    auth.sendSignInLinkToEmail(email, {
        url: window.location.href,
        handleCodeInApp: true
    })
    .then(() => {
        window.localStorage.setItem('emailForSignIn', email);
        alert('Email OTP sent!');
    })
    .catch((error) => {
        console.error("Error sending email OTP:", error);
    });
}


function verifyEmailOTP() {
    const email = window.localStorage.getItem('emailForSignIn');
    console.log("Verifying email OTP for:", email);
    if (auth.isSignInWithEmailLink(window.location.href)) {
        auth.signInWithEmailLink(email, window.location.href)
        .then((result) => {
            window.localStorage.removeItem('emailForSignIn');
            alert('Email verified!');
        })
        .catch((error) => {
            console.error("Error verifying email OTP:", error);
        });
    }
}


function sendMobileOTP() {
    const mobile = document.getElementById('mobile').value;
    console.log("Sending mobile OTP to:", mobile);
    const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        size: 'invisible'
    });

    appVerifier.render().then(function(widgetId) {
        window.recaptchaWidgetId = widgetId;
        return auth.signInWithPhoneNumber(mobile, appVerifier);
    })
    .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        alert('Mobile OTP sent!');
    })
    .catch((error) => {
        console.error("Error sending mobile OTP:", error);
    });
}


function verifyMobileOTP() {
    const mobileOtp = document.getElementById('mobileOtp').value;
    console.log("Verifying mobile OTP:", mobileOtp);
    window.confirmationResult.confirm(mobileOtp)
    .then((result) => {
        alert('Mobile verified!');
    })
    .catch((error) => {
        console.error("Error verifying mobile OTP:", error);
    });
}


document.getElementById('registrationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    console.log("Registering user:", { name, email, mobile, username });
    
    auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        
        db.collection('users').doc(user.uid).set({
            name: name,
            mobile: mobile,
            username: username
        });
        alert('User registered successfully!');
    })
    .catch((error) => {
        console.error("Error registering user:", error);
    });
});
