'use client'
import styles from "./document.module.css"
import { useParams } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import Source from "@/components/source/Source"

import Action from "@/components/action/Action"


import { useEffect, useState



 } from "react"




export default function DocumentPage(){
    const {id} = useParams()


    const [contentActive, setContentActive] = useState(true)
    const [actionActive, setActionActive] = useState(true)
    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState("")
    const [sending, setSending] = useState(false)

    const [chat, setChat] = useState("")

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/docuemnt/document/${id}`


    useEffect(()=>{

        const fetchData = async() => {

            const resp = await fetch(url,{
                method: "GET",
                headers: {
                    "authorization": `Bearer ${localStorage.getItem("access_token")}`
                }
            })

            console.log(resp)

            const data = await resp.json()

            setContent(data)
        }

        try{
            fetchData()
        } catch {
            setLoading(false)
        }

        setLoading(false)

    }, [])


    const askai = async(e: any) => {

        setSending(true)
        e.preventDefault()

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/docuemnt/ask/ai?document_id=${id}&prompt=${chat}`

        const resp = await fetch(url, {
            method: "POST",
            headers: {
                "accept": "application/json",
                "authorization": `bearer ${localStorage.getItem("access_token")}`
            }
        })

        console.log(resp)
        const data = await resp.json()
        console.log(data)

        setSending(false)
    }
  

    return(

        <div className={styles.gridpage}>

            <aside className={ contentActive ? (styles.source):(styles.sourceCollapse)}>
               <Source id={id}/> 
                <button
                onClick={()=>{setContentActive(!contentActive)}}
                
                > Collapse </button>






            </aside>



            <aside className={styles.content}>
                {
                    loading ? (
                        <div>Loading Content...</div>
                    ):(
                        <div className={styles.contentHolder}>

                            <h4>
                                {content["title"]}
                            </h4>

                            <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            >

                        {
                        content?.content
                        }

                            </ReactMarkdown>

                            <br /><br />

                            <form action="" className={styles.chatFormBox} onSubmit={(e:any) => askai(e)}>
                                <input type="text" placeholder="chat"  onChange={(e)=>{setChat(e.target.value)}}/>
                                <button>{
                                    sending ? "sending" : "send"
}</button>
                            </form>
                            
                            
                        
                        </div>
                    )
                }
            </aside>




            <aside className={actionActive ? (styles.action):(styles.actionCollapse)}>
                <Action id={id}/>
                <button
                onClick={()=>{setActionActive(!actionActive)}}


                
                > Collapse </button>


            </aside>

        </div>

    )
}