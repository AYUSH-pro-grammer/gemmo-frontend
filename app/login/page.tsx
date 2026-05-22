'use client'
import { useState } from "react"
import styles from "./login.module.css"



export default function LoginPage(){

    const [email, setEmail] = useState("string")
    const [password, setPassword] = useState("string")

    const submitForm = async() => {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`
        console.log(email, password, url)

        const resp = await fetch(url, {
            method: "POST",
            headers: {
    'Content-Type': 'application/json',
  },
            body: JSON.stringify(
                {
                    "email": email,
                    "password": password
                }
            )
            
        })

        if (resp.status == 401){
            alert("Unauthorized");
            return
        }

        if (resp.status == 200){
            console.log(resp)
            const data = await resp.json()
            console.log(data);

            localStorage.setItem("access_token", data.access_token)

        }



    }


    return(
        <div>
            <form action={submitForm}>
                <label htmlFor="">Email</label>
                <input onChange={(e) => {setEmail(e.target.value)}} type="text" placeholder="user@example.com" />

                <br />
                <label htmlFor="">Password</label>
                <input onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="password" />

                <br />
                <button>Submit</button>
            </form>
        </div>
    )
}
