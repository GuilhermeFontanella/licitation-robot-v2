'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import Button from "@mui/material/Button";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styles from './Login.module.css'



export default function Login() {
    const theme = useTheme();
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="flex flex-col gap-10 justify-center items-center h-96">
            <Link href="/" >
                <div className="m-auto w-fit mb-4">

                    <span style={{ fontSize: '24px' }} className="text-gray-800 dark:text-white/90">Bem-vindo ao</span>
                </div>
                <div className="flex" style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        src={theme.theme === 'light' ? "/images/logo/radar-light.svg" : "/images/logo/radar-dark.svg"}
                        alt="Logo"
                        width={50}
                        height={32}
                    />
                    <p className="text-2xl text-gray-800 dark:text-white/90" style={{ margin: 'auto', paddingLeft: '8px' }}>
                        RadarLicit
                    </p>
                </div>
            </Link>
            {!showForm ? (
                <button
                    onClick={() => signIn("google")}
                    className="bg-white border border-gray-300 px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition"
                >
                    <img src="https://authjs.dev/img/providers/google.svg" width="20" />
                    Entrar com Google
                </button>

            ) : (
                <Box
                className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md"
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <div className="flex flex-col">
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
          className={theme.theme === 'dark' ? styles.inputDark : ''}
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="Disabled"
          defaultValue="Hello World"
        />
      </div>
      
 
    </Box>
            )}
            <Button variant="text" onClick={() => setShowForm(true)}>Entrar com E-mail</Button>
        </div>
    )

}