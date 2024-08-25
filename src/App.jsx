import { useState } from 'react'
import { Sidebar } from './Components/Sidebar/Sidebar'
import { Main } from './Components/Main/Main'
import { ThemeProvider } from './context/Theme'
import ThemeBtn from './Components/Main/Themebtn'
import { useEffect } from 'react'


function App() {
  const [count, setCount] = useState(0)
  const [themeMode,setThemeMode]=useState("light")
  const lightTheme=()=>{
    setThemeMode("light")
  }
  const darkTheme=()=>{
    setThemeMode("dark")
  }


   useEffect(()=>{
    document.querySelector('html').classList.remove("light","dark")
    document.querySelector("html").classList.add(themeMode)

  },[themeMode])

  return (
    <><ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>

        <Sidebar />
        <Main />
      
    </ThemeProvider>
    
    </>
  )
}


export default App
