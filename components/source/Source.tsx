'use client'
import { useEffect, useState } from "react"
import styles from "./source.module.css"
import { title } from "process"



type IdProps = {
    id: number
}



export default function Source({id}: IdProps){

    const [loading, setLoading] = useState(false)
    const [source, setSource] = useState([])

    const [source_title, set_source_title] = useState("")
    const [youtube_url, set_youtube_url] = useState("")

    const [add_source_pop, set_add_source_pop] = useState(false)



    const [is_detail_open, set_detail_open] = useState(false)
    const [detail_data, set_detail_data] = useState({})

    const fetchSource = async() => {

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/source/?document_id=${id}`

        const resp = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        })

        const data = await resp.json()
        setSource(data)

    }


    useEffect(() => {

        setLoading(true)
        fetchSource()
        setLoading(false)

    }, [])


    if (loading){
        return(
            <div>
                Loading...
            </div>
        )
    }


    const addSource = async() => {

        if (!youtube_url){
            alert("No url")
            return;
        }

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/source/add?document_id=${id}`
        const data = {
                            
                "type": "youtube",
                "url": youtube_url,
                "title": source_title,
            }

        const resp = await fetch(url,{
            method: "POST",
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        console.log(resp)

        fetchSource();
                        

    }

    return (
        <div>


            <section>
                <button onClick={() => {
                    set_add_source_pop(!add_source_pop)
                }}>Add Source</button>

                { add_source_pop &&

                    <div className={styles.popCont} onClick={() => {set_add_source_pop(false)}}>


                        <div className={styles.boxPop} onClick={(e)=>{
        e.stopPropagation()
    }}
    
    >                   <input type="text" placeholder="Add title" onChange={(e) => {set_source_title(e.target.value)}} />
                        <input type="" placeholder="Add youtube video" onChange={(e)=>{set_youtube_url(e.target.value)}}/>
                        <button

                        onClick={addSource}

                        
                        >Submit</button>
                        </div>


                    </div>

                }
            </section>








            <section>
                {
                    source.map((item: any) => {
                        return (
                            <div onClick={()=>{
                                set_detail_open(true);
                                const dataList = {
                                    "title": item.title,
                                    "data": item.url,
                                }

                                set_detail_data(dataList)
                            }}>
                                <h4>{item.title}</h4>                               
                            </div>
                        )
                    })
                }

                {
                    is_detail_open && (
                        <div className={styles.popUpdetailBox} onClick={()=>{set_detail_open(false)}}>

                            <div className={styles.innerBox} onClick={(e)=>{
        e.stopPropagation()
    }}>
{detail_data.title}
<br />
<br />
                            {detail_data.data}

                            hlelo
                            </div>

                            
                        </div>

                    )
                }


            </section>
        </div>
    )
}