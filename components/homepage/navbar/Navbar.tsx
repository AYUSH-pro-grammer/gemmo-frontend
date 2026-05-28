import styles from "./navbar.module.css"


export default function Navbar(){
    return(
        <div className={styles.navbarCont}>


            <h2>Gemmo</h2>
            
            <section className={styles.sectionNavbar}>
                <ul>
                    <li>Home</li>
                    <li>How It Works</li>
                    <li>Support</li>
                    <li></li>
                </ul>



                <a href="/login">
                <button className={styles.signinButton}>Sign in</button>
                </a>

                <a href="/signup">
                <button className={styles.getStarted}>Get Started</button>

                </a>
            </section>

            <section className={styles.otherMianSection}>
                Menu
            </section>







            

        </div>
    )
}