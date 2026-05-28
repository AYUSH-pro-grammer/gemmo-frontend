import styles from "./why.module.css"
import Image from "next/image"


export default function Why(){
    return(
        <div className={styles.pageCont}>

<br /><br />
            <h1 className={styles.heading}>Your AI-Powered Research Partner</h1>

<br /><br />

            <section >


                <div className={`${styles.box} $ ${styles.notsame}  `}>
                    <aside className={styles.sideboard1}>
                        <h4>Upload your sources</h4>
                        <p>Upload PDFs, websites, YouTube videos, audio files, Google Docs, Google Slides and more, and NotebookLM will summarize them and make interesting connections between topics, all powered by the latest version of Gemini’s multimodal understanding capabilities.</p>
                    </aside>

                    <aside className={`${styles.sideboard2} ${styles.notsame}`}>
                        <img className={styles.asideImage} src="
https://img.magnific.com/free-vector/technology-device-maintenance-support-concept-cartoon_18591-52511.jpg?t=st=1779716763~exp=1779720363~hmac=c8dc180b6ab3d0884cd1bd11cfdd227a86e0287edc3feeb2762ec5dc30212dac&w=2000
                        " alt="" />
                    </aside>
                </div>


                                <div className={styles.box}>
                    <aside className={styles.sideboard1}>
                        <h4>Generate quizzes & flashcards</h4>
                        <p>
Transform your study material into interactive quizzes and smart flashcards instantly. Practice active recall, test your understanding, and revise faster with AI-generated learning tools tailored to your content.
                        </p>
                    </aside>

                    <aside className={styles.sideboard2}>
                        <img className={styles.asideImage} src="
                        https://img.magnific.com/free-vector/organic-flat-people-asking-questions-illustration_52683-59850.jpg?t=st=1779714495~exp=1779718095~hmac=7d9609a76494b853ae66c828730748c1df6cf9c1e1afdeb98224ae5aed95e309&w=2000
                        " alt="" />
                    </aside>
                </div>


                
                
                <div className={`${styles.box} ${styles.newbox}`}>
                    <aside className={styles.sideboard1}>
                        <h4>Practice coding & problem solving</h4>
                        <p>
Generate coding questions, technical challenges, and interview-style exercises directly from your notes and programming resources. Learn concepts deeply with structured practice and AI-assisted explanations.                            
                            </p>
                    </aside>

                    <aside className={styles.sideboard2}>
                        <img className={styles.asideImage} src="
                        https://img.magnific.com/premium-vector/coding-flat-style-design-vector-illustration-stock-illustration_357500-1931.jpg?w=2000
                        
                        "/>
                    </aside>
                </div>








            </section>
            




        </div>
    )
}