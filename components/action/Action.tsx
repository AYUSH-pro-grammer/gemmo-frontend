'use client'
import styles from "./action.module.css"
import OpenFlashCard from "./flashcards/OpenFlashcard"
import OpenQuiz from "./questions/OpenQuiz"

import { useState, useEffect } from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper, faFileCircleQuestion, faLaptopCode } from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"
import Report from "./report/Report"


import coding from "@/public/icon/coding.png"
import question from "@/public/icon/question.png"
import flascard from "@/public/icon/flashcard.png"
import report from "@/public/icon/report.png"


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
    const [report_c, setReport_c] = useState(false)

    const [selelcted_data, set_selected_data] = useState<any>(null)
    const [showFlashcard, setShowFlashcard] = useState(false)
    const [showQuestion, setShowQuestion] = useState(false)
    const [showReport, setShowReport] = useState(false)

    const [reportData, setReportData] = useState([]);

    const [report_popup, set_report_popup] = useState(false)
    const [create_report, set_create_report] = useState(false)

    const [description, setDescription] = useState("")

    const [despData, setDespData] = useState([
        "Create a comprehensive briefing document that synthesizes the main themes and ideas from the sources. Start with a concise Executive Summary that presents the most critical takeaways upfront. The body of the document must provide a detailed and thorough examination of the main themes, evidence, and conclusions found in the sources. This analysis should be structured logically with headings and bullet points to ensure clarity. The tone must be objective and incisive.",
        "You are a highly capable research assistant and tutor. Create a detailed study guide designed to review understanding of the sources. Create a quiz with ten short-answer questions (2-3 sentences each) and include a separate answer key. Suggest five essay format questions, but do not supply answers. Also conclude with a comprehensive glossary of key terms with definitions.",
        "Act as a thoughtful writer and synthesizer of ideas, tasked with creating an engaging and readable blog post for a popular online publishing platform known for its clean aesthetic and insightful content. Your goal is to distill the top most surprising, counter-intuitive, or impactful takeaways from the provided source materials into a compelling listicle. The writing style should be clean, accessible, and highly scannable, employing a conversational yet intelligent tone. Craft a compelling, click-worthy headline. Begin the article with a short introduction that hooks the reader by establishing a relatable problem or curiosity, then present each of the takeaway points as a distinct section with a clear, bolded subheading. Within each section, use short paragraphs to explain the concept clearly, and don't just summarize; offer a brief analysis or a reflection on why this point is so interesting or important, and if a powerful quote exists in the sources, feature it in a blockquote for emphasis. Conclude the post with a brief, forward-looking summary that leaves the reader with a final thought-provoking question or a powerful takeaway to ponder."
    ])


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

    if (type == "report"){
        set_selected_data(data)
        setShowReport(true)
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


    const ReportCard = async() => {
        setReport_c(true)
        try{
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/report/create/report?document_id=${id}&description=${description}`
        set_report_popup(false)
        
        const resp = await fetch(url, {
            method: "POST",
            headers: {
                "accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        })

        const data = await resp.json()
        setReportData(data)
    
    }

        catch (e){
            set_report_popup(false)
            alert(e)
            setReport_c(false)
        }

    setReport_c(false)
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
        <div className={styles.newclass}> 
            <section className={styles.buttonCreateCont}>
                <button className={styles.buttonCreate} onClick={QuizCreate} >{quizLoading_c ? "Creating Quiz..." : "Create Quiz"}</button>
                <button className={styles.buttonCreatetwo} onClick={FlashCards} >{flashcardLoading_c ? "Creating Flashcards..." : "Create Flashcards"}</button>
                <button className={styles.buttonCreateFOUR} onClick={()=>{set_report_popup(true)}} >{report_c ? "Creating Report..." : "Create Report"}</button>
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





{
    report_popup ? (
        <div className={styles.popupReport} onClick={()=>{set_report_popup(false)}}>

            <section className={styles.formReport} onClick={(e)=>{e.stopPropagation()}}>

                <div className={styles.headerReport}>


            <h2>Create Report</h2>
            <button onClick={()=>{set_report_popup(false)}} >X</button>


                </div>



            <div>



{
    create_report ?  (
        <div className={styles.reportForm}>
            <button onClick={()=>{set_create_report(false)}} className={styles.repertfORMbACK} >←</button>
            <textarea rows={5} cols={100} defaultValue={description} />
            <button  className={styles.createReport}  onClick={ReportCard} >Create Report</button>
        </div>
    ):(

<div>


                <h4 className={styles.formatName}>Format</h4>

                <section className={styles.formatSection}>
                    <div onClick={()=>{ set_create_report(true)}}>
                        <h4>Create Your Own</h4>
                        <p>Craft reports your way by specifying structure, style, tone, and more</p>
                    </div>

                    <div onClick={()=>{setDescription(despData[0]); set_create_report(true)}}>
                        <h4>Briefing Doc</h4>
                        <p>Overview of your sources featuring key insights and quotes</p>
                    </div>

                    <div onClick={()=>{setDescription(despData[1]);set_create_report(true)}}>
                        <h4>Study Guide</h4>
                        <p>Short-answer quiz, suggested essay questions, and glossary of key terms</p>
                    </div>

                    <div onClick={()=>{setDescription(despData[2]); set_create_report(true)}}>
                        <h4>Blog Post</h4>
                        <p>Insightful takeaways distilled into a highly readable article</p>
                    </div>





                </section>
</div>

    )
}


            </div>




            </section>
        </div>
    ):""
}


            </section>



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

                                { items.type == "question" ? (<Image alt="fs" src={question} height={20} width={20}/>): null}
                                { items.type == "flashcard" ? (<Image  alt="fs" src={flascard} height={20} width={20}/>): null}
                                { items.type == "codingquestion" ? (<Image  alt="fs" src={coding} height={20} width={20}/>): null}
                                { items.type == "report" ? (<Image  alt="fs" src={report} height={20} width={20}/>): null}

                                <h4 className={styles.notmorethanline}>{items.title}</h4> 

                            </div>
                        )
                    })
                }


{

    showReport && (
        <Report

        data={selelcted_data}
        onClose={()=>setShowReport(false)}

        
        />
    )
    
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