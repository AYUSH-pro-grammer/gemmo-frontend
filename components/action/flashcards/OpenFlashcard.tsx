'use client'
import { useEffect, useState } from "react"
import styles from "./openFlashcard.module.css"



type flashcard = {
    title: string
    document_id: number 
    desp: string 
    id:number 
    user_id: number
}

type propsData = {
    data: flashcard[]
    onClose: () => void
}


export default function OpenFlashCard({data, onClose}: propsData){

    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(true)
    }, [])



    const handleOff = () => {
        setOpen(false)

        setTimeout(()=>{
            onClose()
        }, 300)
    }

    


    return (
        <div className={`${styles.box} ${open ? styles.open : styles.close}`}>
            Opened 

            {data.map((i)=>{
                return(
                    <div>{i.title}</div>
                )
            })}

            <button onClick={handleOff} >Close</button>
        </div>
    )
}