import styles from "./navbar.module.css"


export default function Navbar(){
    return (
        <div className={styles.navbar}>
            <h2 className={styles.navbaricon}>Gemmo</h2>

            <div className={styles.iconsBox}>
                <button className={styles.settingButton}>Setting</button>
                <button className={styles.profilebtn}>PF</button>
            </div>
        </div>
    )
}