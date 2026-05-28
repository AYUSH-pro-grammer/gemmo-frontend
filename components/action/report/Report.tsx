import styles from "./Repost.module.css"
import ReactMarkdown from "react-markdown"


export default function Report({data, onClose}: any){

    console.log("daat", data)
    return (
        <div className={styles.reportPage}>

            <div className={styles.insidePage}>

                <div className={styles.headers}>

                    <h2>Gemmo Report</h2>
                    <button onClick={onClose} >Back</button>



                </div>



                {
                    data.map((item: any) => {
                        return (
                            <div className={styles.reportText}>
                                <h2>{item.title}</h2>

                                <ReactMarkdown>{item.content}</ReactMarkdown>
                            </div>
                         
                        )
                    })
                }

            </div>
           
        </div>
    )
}