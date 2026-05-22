"use client"

import styles from "./action.module.css"
import { useState, useEffect, use } from "react"
import OpenQuiz from "./questions/OpenQuiz"
import OpenFlashCard from "./flashcards/OpenFlashcard"

type props = {
    id: number
}
export default function Action({id}: props){

    const [quiz, setQuiz] = useState(null)
    const [flashcards, setFlashCard] = useState(null)




    const [create_quiz_loading, set_create_quiz_loading] = useState(false)
    const [delete_quiz_loading, set_delete_quiz_loading] = useState(false)

    const [open_quiz, set_open_quiz] = useState(false)
    const [open_flashcard, set_flashcard] = useState(false)


    const fetchDataQuiz = async() => {

            try{
            const quizurl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/quiz/${id}/quiz`

            const resp = await fetch(quizurl, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                }
                
            })

            console.log(resp)

            if (resp.status == 404){
            } else if (resp.status == 200){
                const data = await resp.json()

               

                    console.log("data: ", data.length, data)
 

                setQuiz(data);

            } else {
                alert(`error: ${resp.status}`)
            }

 

} catch (err){
    alert(err)
}

            
        }


    useEffect(() => {
        fetchDataQuiz()

    }, [])


    useEffect(() => {

        console.log("flashcard running")

        const fetchData = async() => {
            const flashcardurl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/flashcard/${id}`

        console.log("flashcard got url", flashcardurl, localStorage.getItem("access_token"))


            const flash_resp = await fetch(flashcardurl,{
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                }}
            )

        console.log("flashcard got resp")


            if (flash_resp.status == 200){


                const fl_data = await flash_resp.json()

                if (fl_data.length == 0){
                    return;
                }
                setFlashCard(fl_data)
            } else {
                alert(`error: ${flash_resp.status}`)
            }

        }

        fetchData()
    }, [])

    const createQuiz = async() => {

        set_create_quiz_loading(true)

        try{

                    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/quiz/${id}/create/quiz`

        const resp = await fetch(url,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                }
            }
        )

        alert(resp.status)

        } catch (err){
            alert(err)
        }

        set_create_quiz_loading(false)
        fetchDataQuiz()


    }

    const deleteQuiz = async() => {

        set_delete_quiz_loading(true)
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/quiz/${id}/delete/quiz`

        const resp = await fetch(url, {
            method: "DELETE",
            headers:{
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        })

        if (resp.status == 200){
            alert("done")
        }

        set_delete_quiz_loading(false)
        fetchDataQuiz()

    }

    const createFlashCard = async() => {

    }

    return (
        <div>

            <section>

                <button onClick={createQuiz}>{

                    create_quiz_loading ? "Creting...":"Create Quiz"
}</button>
            <button>Create Flashcards</button>

            

            </section>


            <section>

                {quiz ? (
                    <div>
                        Quiz

                        <button onClick={()=>{set_open_quiz(!open_quiz)}}>Open Quiz</button>

                        {
                            open_quiz ? <OpenQuiz

                            quiz={quiz}
                            onClose={()=>{set_open_quiz(!open_quiz)}}
                            
                            />: null
                        }

                        
                        <button onClick={deleteQuiz}>{delete_quiz_loading ? "deleting...":"delete quiz"}</button>
                    </div>
                ):(
                    <></>
                )}


                {flashcards ? (
                    <div>
                        Flashcard

                        <button onClick={() => {set_flashcard(!open_flashcard)}}>Open Flashcard</button>

                        {
                            open_flashcard ?  <OpenFlashCard

                            data = {
                                flashcards
                            }

                            onClose={() => {set_flashcard(!open_flashcard)}}
                            
                            /> : null

                        }

                    </div>
                ):(
                    <></>
                )}


            </section>


            


        </div>
    )
}