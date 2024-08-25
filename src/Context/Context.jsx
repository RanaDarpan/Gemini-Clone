import { createContext, useState } from "react";
import run from '../Config/Gemini';


export const Context = createContext();

const ContextProvider = (props)=>{
  
  const [input ,setInput]=useState("");
  const [recentPrompt , setRecentPrompmt]=useState('');
  const [prevPrompt, setPrevPrompt]= useState('');
  const [showResult,setShowResult]=useState(false);
  const [loading,setLoading]=useState(false);
  const [resultData,setResultData]=useState("");

  const delayPara = (index,nextword)=>{
        setTimeout(() => {
            setResultData(prev=>prev+nextword);
        },75*index);
  }
  
  
    const onSent=async (prompt)=>{
 
        setResultData("")
        setLoading(true)
        setShowResult(true)
        // let response=await run(input);
        // try {
        //     response = await run(prompt);
        
        //     // Ensure response is iterable (a string)
        //     if (typeof response !== 'string') {
        //         throw new Error("Invalid response: expected a string.");
        //     }
        
        // } catch (error) {
        //     console.error("Error fetching response:", error);
        //     setLoading(false);
        //     return;
        // }
        
        
        setPrevPrompt(prev=>[...prev,input])
        const response=await run(input);
        let responseArray=response.split('**');
        let newResponse="";
        for (let i=0;i<responseArray.length;i++){
            if(i===0 || i%2!==1){
                newResponse+=responseArray[i];
            }
            else{
                newResponse+="<b>"+responseArray[i]+"</b>";
            }
        }
        let newResponse2=newResponse.split("*").join("</br>")
        let newResponseArray=newResponse2.split(" ");
        // setResultData(newResponse)
        

        for (let i=0;i<newResponseArray.length;i++){
            const nextword=newResponseArray[i];
            delayPara(i,nextword+" ")
        }
        
        setLoading(false);
        setInput("");

    }
    // const contextValue={

    // }
     
    const contextValue={
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompmt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;