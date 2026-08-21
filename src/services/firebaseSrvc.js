import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { firebaseConfig } from "../config/firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);

export const initRecaptcha = async () => {
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(firebaseAuth, "recaptcha-container",
            {
                size: "invisible"
            }
        );
    }
    await window.recaptchaVerifier.render();
};

export const sendMobileOTP = async (phone) => {
    await initRecaptcha();
    const confirmationResult = await signInWithPhoneNumber(
        firebaseAuth,
        phone,
        window.recaptchaVerifier
    );
    window.confirmationResult = confirmationResult;
};