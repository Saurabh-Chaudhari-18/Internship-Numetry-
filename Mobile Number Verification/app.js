
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyAD4g_f0KNZomfPf2nlACNCO0E16rLaFc0",
    authDomain: "otp-verification-e3b2e.firebaseapp.com",
    projectId: "otp-verification-e3b2e",
    storageBucket: "otp-verification-e3b2e.appspot.com",
    messagingSenderId: "594597018524",
    appId: "1:594597018524:web:176faad98f7a48b2ed2659"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.onload = function() {
    renderRecaptcha();
};

function renderRecaptcha() {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {
            console.log('reCAPTCHA resolved, you can send OTP now.');
            document.getElementById('send-otp-button').disabled = false; 
        },
        'expired-callback': () => {
            console.log('reCAPTCHA expired, please solve it again.');
            document.getElementById('send-otp-button').disabled = true; 
        }
    }, auth);
    
    recaptchaVerifier.render().then(widgetId => {
        window.recaptchaWidgetId = widgetId;
        console.log('reCAPTCHA rendered');
    }).catch(error => {
        console.error('Error rendering reCAPTCHA:', error);
    });
}

function sendOTP() {
    var phoneNumber = document.getElementById('phone-number').value;
    var appVerifier = window.recaptchaVerifier;

    console.log('Sending OTP to:', phoneNumber);
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult; 
            document.getElementById('otp-section').style.display = 'block'; 
            alert('OTP sent successfully');
        }).catch((error) => {
            console.error('Error sending OTP:', error);
            alert('Error sending OTP: ' + error.message); 
        });
}

function verifyOTP() {
    var otp = document.getElementById('otp').value;
    
    console.log('Verifying OTP:', otp);
    window.confirmationResult.confirm(otp).then((result) => {
        var user = result.user;
        alert('User is verified!');
        document.getElementById('otp-section').style.display = 'none'; 
    }).catch((error) => {
        console.error('Error verifying OTP:', error);
        alert('Error verifying OTP: ' + error.message); 
    });
}


document.getElementById('send-otp-button').addEventListener('click', sendOTP);
document.getElementById('verify-otp-button').addEventListener('click', verifyOTP);
