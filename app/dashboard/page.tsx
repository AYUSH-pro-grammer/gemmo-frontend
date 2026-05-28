"use client"
import styles from "./dashboard.module.css"
import { useEffect, useState, useRef } from "react"
import Navbar from "@/components/navbar/Page"

import staticFolder from "@/public/icon/staticFolder.png"
import animatedFolder from "@/public/icon/gitFolder.gif"
import Image from "next/image"
import Link from "next/link"

import { useRouter } from "next/navigation"



export default function Dashboard(){
    const router = useRouter()

    const [user, setUser] = useState(true)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [isOpen, setOpen] = useState(false)

    const [menuOpenId, setMenuOpenid] = useState(null)




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

    <section className={styles.createNew}>

        <h2 >My Notebooks</h2>

         <button className={styles.addbutton} onClick={()=>{setOpen(true)}}>
                    Create New Notebook
            </button>


{
    isOpen ? (

        <div className={styles.popCont}

        onClick={
            ()=>{setOpen(false)}
        }
        
        >

   <div className={styles.popupbox} 

   onClick={(e)=>{e.stopPropagation()}}
   
   >

    <button onClick={()=>{setOpen(false)}}>Close</button>

    <br /><br />

    <form action="" onSubmit={createDocument}>
        <label htmlFor="">Title</label>
        <input type="text" placeholder="title" onChange={(e) => {setTitle(e.target.value)}} />

        <button type="submit">Create</button>
    </form>

</div>

        </div>
     
    ):null
}
    

    </section>

    



<div>

</div>



<section className={styles.boxCont}>



    <table className={styles.table}>

        <thead>
        <tr>
            <td>Sno.</td>
            <td>Title</td>
            <td>Source</td>
            <td>Created</td>
            <td>Action</td>
        </tr>
        </thead>


<tbody>



    {
    data.map((item:any, index) => {

        return(

            <tr key={item.id} className={styles.trData}

            onClick={()=>{
                router.push(`/document/${item.id}`)
            }}
            
            
            >

                <td>{index+1}</td>


                <td className={styles.title}>
                    {item.title}</td>

                <td>{item.source || "1 Source"}</td>

                <td>{item.data || "12 April 2025"}</td>

                <td>
                        <button
                onClick={(e) => {
                    e.stopPropagation()


                    if (menuOpenId === item.id) {
                        setMenuOpenid(null)
                    } else {
                        setMenuOpenid(item.id)
                    }
                }}
                className={styles.detailButton}
                
                >


                    Detail
                </button>

                      {
                    menuOpenId === item.id && (
                        <div className={styles.menu}>

                            <button
                            onClick={()=>{alert(`edit ${item.id}`)}}>Edit</button>

                        <button
                            onClick={()=>{alert(`delete ${item.id}`)}}>Delete</button>
                        
                        </div>
                    )
                }

                </td>

            
          
            </tr>
                    
            

            
        )

    })
}


</tbody>










    </table>



</section>





</section>


        </div>
    )
}