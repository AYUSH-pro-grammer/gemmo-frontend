'use client'
import { useEffect, useState } from "react"
import styles from "./openFlashcard.module.css"



type flashcard = {
    title: string
    document_id: number 
    desc: string 
    id:number 
    user_id: number
}

type propsData = {
    data: flashcard[]
    onClose: () => void
}


export default function OpenFlashCard({data, onClose}: propsData){

    const [open, setOpen] = useState(false)
    const [currentpage, set_currentpage] = useState(0)

    const next = () => {
        if ( currentpage + 1 == data.length){
            return;
        }

        set_currentpage(currentpage+1)

    }


    const prev = () => {
        if ( currentpage == 0){
            return;
        }

        set_currentpage(currentpage-1)

    }


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

            <section className={styles.boxybox}>


                <div className={styles.headers}>
                    <h4>Gemmo</h4>
                    <button className={styles.closeButton} onClick={handleOff} >Close</button>
                </div>



                <div className={styles.boxFlashcard}>
                

                    <h4> S.No:  {currentpage + 1} / {data.length}</h4>

                    <div className={styles.bigBox}>
                        {data[currentpage].title}
                    </div>
                </div>

                <div className={styles.buttonsForn}>
                    <button onClick={prev} >Prev</button>
                    <button onClick={next}>Next</button>
                </div>


<br /><br />
                <div>
                    Description: {data[currentpage].desc}
                </div>
                    {/* <div>{data[0].desc}</div> */}
                    



            


            </section>

            
        </div>
    )
}