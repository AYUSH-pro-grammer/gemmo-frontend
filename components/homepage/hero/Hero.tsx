'use client'
import styles from "./hero.module.css"
import Lottie from "lottie-react";
import learnin from "@/public/lottie/learning.json"


export default function Hero(){
    return (
        <div className={styles.mainPage}>
            
            <div className={styles.insidePage} >
 
                <section className={styles.firstSection}>
 <h1>Research, learn, and build knowledge faster</h1>
                <p>Gemmo turns scattered information into an organized AI-powered workspace for studying, research, coding practice, and deep learning.</p>


<br /><br />
                <div className={styles.buttonHere}>
                    <button className={styles.loginBtn} >Login</button>
                    <button className={styles.get_started}>Signup</button>
                </div>
                </section>

               


                <section>
                                <Lottie
                                animationData={learnin}
                                loop={true}
                                
                                />
                </section>

            </div>
        </div>
    )
}