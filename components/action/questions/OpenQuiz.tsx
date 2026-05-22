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

    useEffect(()=>{
        setShow(true)

      
    }, [])

    const handleClose = () => {

        setShow(false)

          setTimeout(()=>{
            onClose()
        }, 3000)
    }


    
    return (
        <div className={`${styles.box} ${show ? styles.open : styles.close} `}>
            <section className={styles.page}>


                <button onClick={handleClose}>Close</button>


                {
                    quiz.map((items) => {
                        return (
                            <div>

                                <h4>Question: {items.title}</h4>

                                <ul>
                                    <li>1. {items.option1}</li>
                                    <li>2. {items.option2}</li>
                                    <li>3. {items.option3}</li>
                                    <li>4. {items.option4}</li>
                                </ul>

                                
                                {items.id}
                            </div>
                        )
                    })
                }






            </section>
        </div>
    )
}