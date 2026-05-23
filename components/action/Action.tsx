'use client'
import styles from "./action.module.css"
import OpenFlashCard from "./flashcards/OpenFlashcard"
import OpenQuiz from "./questions/OpenQuiz"

import { useState, useEffect } from "react"


type idProps = {
    id: number
}


export default function Action({id}:idProps){

    const [actions, setActions] = useState([])
    const [actionLoading, setActionLoading] = useState(false)

    const [selelcted_data, set_selected_data] = useState([])
    const [showFlashcard, setShowFlashcard] = useState(false)
    const [showQuestion, setShowQuestion] = useState(false)


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


        
    }


    const FlashCards = async() => {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/action/create/flashcards?document_id=${id}`
        const resp = await fetch(url,{
            method: "POST",
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        })

        loadActions()



    }



    const QuizCreate = async() => {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/action/create/quiz?document_id=${id}`
        const resp = await fetch(url,{
            method: "POST",
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        })



        loadActions()



    }
    
    return(
        <div>
            <section>
                <button onClick={QuizCreate} >Create Quiz</button>
                <br />
                <button onClick={FlashCards} >Create Flashcards</button>
            </section>

            <br /><br />


            <section>
                {
                    actions.map((items: any) => {
                        return (
                            <div className={styles.actionViewbOX} onClick={() => {openAction(items.id, items.type)}}>
                                <h4>{items.type}</h4>
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

            </section>


        </div>

        
    )
}