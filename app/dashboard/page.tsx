"use client"
import styles from "./dashboard.module.css"
import { useEffect, useState } from "react"
import Navbar from "@/components/navbar/Page"


export default function Dashboard(){

    const [user, setUser] = useState(true)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [isOpen, setOpen] = useState(false)

    const [title, setTitle] = useState("")


    useEffect(()=>{
        const token = localStorage.getItem("access_token")

        if (!token){
            setUser(false);
        }
    })


    const createDocument = async() => {

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/docuemnt/create?title=${title}`
        const token = localStorage.getItem("access_token")

        const resp = await fetch(url,{
            method: "POST",
         

            headers:{
                    'Content-Type': 'application/json',
                    "authorization": `Bearer ${token}`
            }
        })

        console.log(resp)

        alert(title)

    }

    useEffect(()=>{

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/docuemnt`
        const token = localStorage.getItem("access_token")

        if (!token){
            alert("No token")
            return
        }

        const fetchDocuments = async() => {

            const resp = await fetch(url,{
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })

            
            if (resp){
                const respData = await resp.json()
                setData(respData)
                console.log(respData)
            }
            
        }

        fetchDocuments()

        setLoading(false)


    }, [])

    if (loading){
        return(
            <div>
                Loading...
            </div>
        )
    }

    if (user == false){
        return(
            <div>
                Not login, login from here,
                <a href="/login">login</a>
            </div>
        )
    }

    
    return (
        <div>

<Navbar/>

<section className={styles.boxybox}> 

    

 <button className={styles.box} onClick={()=>{setOpen(true)}}>
                <p>Add</p>
            </button>


{
    isOpen ? (
        <div className={styles.popupbox}>

    <button onClick={()=>{setOpen(false)}}>Close</button>

    <br /><br />

    <form action="" onSubmit={createDocument}>
        <label htmlFor="">Title</label>
        <input type="text" placeholder="title" onChange={(e) => {setTitle(e.target.value)}} />

        <button type="submit">Create</button>
    </form>

</div>
    ):(
        <></>
    )
}
    


{
    data.map((item:any) => {

        return(

            <a href={`./document/${item.id}`}>
                <div className={styles.box}>
                <h4>{item.title}</h4>
                <p>{item.date || "12 April 2026"}</p>
                <p>{item.source || "1"} Source</p>
            </div>
            </a>
            
        )

    })
}



</section>


        </div>
    )
}