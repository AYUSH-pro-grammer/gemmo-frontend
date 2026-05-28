'use client'
import styles from "./openquiz.module.css"
import { useEffect, useState } from "react"


type QuestionProps = {
    id: number
    title: string
    option1: string
    option2: string
    option3: string
    option4: string
    correct_ans: string
    explaination: string
}

type QuizProps = {
    quiz: QuestionProps[]
    onClose: () => void
}




export default function OpenQuiz({quiz, onClose}: QuizProps){


    const [show, setShow] = useState(false)
    const [questionNumber, set_QuestionNumber] = useState(0)

    useEffect(()=>{
        setShow(true)

      
    }, [])

    const handleClose = () => {

        setShow(false)

          setTimeout(()=>{
            onClose()
        }, 3000)
    }

    const next = () => {
        if (questionNumber + 1 == quiz.length){
            return;
        }
        set_QuestionNumber(questionNumber+1)
    }
    

    const prev = () => {
        if (questionNumber == 0){
            return;
        }
        set_QuestionNumber(questionNumber-1)
    }


    
    return (
        <div className={`${styles.box} ${show ? styles.open : styles.close} `}>
            <section className={styles.page}>



                <div className={styles.headers}>

                    <h4>Gemmo</h4>
                <button onClick={handleClose}>Close</button>


                </div>


                    <div className={styles.questionCont}>

                        <h4>Question: {quiz[questionNumber].title}</h4>

                        <ul className={styles.optionsCont}>
                            <li>1. {quiz[questionNumber].option1}</li>
                            <li>2. {quiz[questionNumber].option2}</li>
                            <li>3. {quiz[questionNumber].option3}</li>
                            <li>4. {quiz[questionNumber].option4}</li>
                        </ul>

                        

                        <div className={styles.buttonComts}>
                        <button className={styles.btnPrev} onClick={prev}>Previous</button>
                        <button className={styles.nextBtn} onClick={next} >Next</button>
                    </div>
                        


                    </div>


                    

                






            </section>
        </div>
    )
}