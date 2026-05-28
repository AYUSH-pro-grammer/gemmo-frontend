'use client'
import styles from "./action.module.css"
import OpenFlashCard from "./flashcards/OpenFlashcard"
import OpenQuiz from "./questions/OpenQuiz"

import { useState, useEffect } from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper, faFileCircleQuestion, faLaptopCode } from "@fortawesome/free-solid-svg-icons"

import OpenCodingQuestion from "./OpenCodingQuestion/OpenCodingQuestion"
type idProps = {
    id: number
}


export default function Action({id}:idProps){

    const [actions, setActions] = useState([])


    const [actionLoading, setActionLoading] = useState(false)
    const [showCodingQuestion, setShowCodingQuestion] = useState(false)

    const [quizLoading_c, setQuixLoading_c] = useState(false)
    const [flashcardLoading_c, setFlashcardLoading_c] = useState(false)
    const [codingLoading_c, setCodingLoading_c] = useState(false)

    const [selelcted_data, set_selected_data] = useState<any>(null)
    const [showFlashcard, setShowFlashcard] = useState(false)
    const [showQuestion, setShowQuestion] = useState(false)


    const CodingQuestionCreate = async() => {

    try{

        setCodingLoading_c(true)

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/compiler/generate`

        const resp = await fetch(url,{
            method: "POST",

            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            },

            body: JSON.stringify({
                document_id: id
            })
        })

        const data = await resp.json()

        console.log(data)

        loadActions()

    }catch(err){

        console.log(err)

    }finally{
        setCodingLoading_c(false)
    }
}

    const loadActions = async() => {

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/action/?document_id=${id}`
        const resp = await fetch(url,{
            headers:{
                "authorization" : `Bearer ${localStorage.getItem("access_token")}`
            }
        })

        console.log(resp)

        const data = await resp.json()
        setActions(data)

    }

    useEffect(() => {
        setActionLoading(true);
        loadActions();
        setActionLoading(false)
    }, [])

    const openAction = async(action_id: string, type:string) => {

        setShowFlashcard(false)
    setShowQuestion(false)
    setShowCodingQuestion(false)


    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/action/get/action?action_id=${action_id}`


        const resp = await fetch(url, {
        headers:{
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
    })

    console.log(resp)

    const data = await resp.json()
    console.log(data)

    if (type == "flashcard"){
    set_selected_data(data)
    setShowFlashcard(true)
    }

    if (type == "question"){
        set_selected_data(data)
        setShowQuestion(true)
    }

    if (type == "codingquestion"){

    set_selected_data(data)
    setShowCodingQuestion(true)

}



        
    }


    const FlashCards = async() => {

        setFlashcardLoading_c(true)
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/action/create/flashcards?document_id=${id}`
        const resp = await fetch(url,{
            method: "POST",
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        })

        loadActions()

        setFlashcardLoading_c(false)



    }



    const QuizCreate = async() => {

        setQuixLoading_c(true)
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/action/create/quiz?document_id=${id}`
        const resp = await fetch(url,{
            method: "POST",
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        })



        loadActions()

        setQuixLoading_c(false)



    }
    
    return(
        <div>
            <section className={styles.buttonCreateCont}>
                <button className={styles.buttonCreate} onClick={QuizCreate} >{quizLoading_c ? "Creating Quiz..." : "Create Quiz"}</button>
                <button className={styles.buttonCreatetwo} onClick={FlashCards} >{flashcardLoading_c ? "Creating Flashcards..." : "Create Flashcards"}</button>
                <button
    className={styles.buttonCreateThree}
    onClick={CodingQuestionCreate}
>
    {
        codingLoading_c
            ? "Creating Coding Question..."
            : "Add Coding Question"
    }
</button>

            </section>

            <br /><br />


            {
                actionLoading && <div>
                    Loading...
                </div>
            }


            <section className={styles.actionCont}>
                {
                    actions.map((items: any) => {
                        return (
                            <div className={styles.actionViewbOX} onClick={() => {openAction(items.id, items.type)}}>

                                { items.type == "question" ? (<FontAwesomeIcon icon={faNewspaper} />): null}
                                { items.type == "flashcard" ? (<FontAwesomeIcon icon={faFileCircleQuestion} />): null}
                                { items.type == "codingquestion" ? (<FontAwesomeIcon icon={faLaptopCode} />): null}

                                <h4>{items.title}</h4> 
                            </div>
                        )
                    })
                }


                {
    showFlashcard && (
        <OpenFlashCard
            data={selelcted_data}
            onClose={() => setShowFlashcard(false)}
        />
    )
                }


                {

                    showQuestion && (
                        <OpenQuiz

                        quiz = {selelcted_data}
                        onClose={() => setShowQuestion(false)}
                        
                        />
                    )

                }


                {
    showCodingQuestion && (

        <OpenCodingQuestion
            data={selelcted_data}
            onClose={() => setShowCodingQuestion(false)}
        />

    )
}

            </section>


        </div>

        
    )
}