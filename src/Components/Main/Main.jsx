import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { Context } from '../../Context/Context';
import { ThemeContext } from '../../context/Theme';
import ThemeBtn from './Themebtn';

export const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
    const { themeMode } = useContext(ThemeContext);

    const formatResponse = (response) => {
        if (!response) return "No data available";
        
        // Example: Applying formatting to the Python code response
        let formattedResponse = response
            .replace(/```python\n([\s\S]*?)\n```/g, '<pre><code class="language-python">$1</code></pre>')
            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
            .replace(/\n\n/g, '<br><br>')  // Line breaks for paragraphs
            .replace(/- (.*?)\n/g, '<li>$1</li>');  // Bullet points
        
        return formattedResponse;
    };

    return (
        <div className={`flex flex-col flex-1 min-h-[90vh] pb-[15vh] relative ${themeMode === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
            <div className="flex items-center justify-between text-[22px] p-5 text-[#585858]">
                <p className="text-[18px] sm:text-[22px]">Gemini</p>
                <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                    <ThemeBtn />
                </div>
                <img src={assets.user_icon} alt='' className="w-[30px] sm:w-[40px] rounded-full" />
            </div>

            <div className="max-w-[900px] mx-auto px-4">
                {!showResult ? (
                    <>
                        <div className="my-[30px] sm:my-[50px] text-[35px] sm:text-[55px] text-[#c4c7c5] font-medium p-5">
                            <p>
                                <span className="bg-gradient-to-r from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent">Hello, dev.</span>
                            </p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="flex flex-wrap gap-4 p-5 justify-center">
                            <div className={`h-[100px] p-4 rounded-[5%] cursor-pointer relative w-full sm:w-[48%] lg:w-[23%] ${themeMode === "dark" ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-[#f0f4f9] hover:bg-gray-300 text-[#585858]"}`}>
                                <p className="text-[15px] sm:text-[17px]">Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt='' className="w-[30px] sm:w-[35px] p-[5px] absolute  bg-white rounded-[20px] bottom-[10px] right-[10px]" />
                            </div>
                            <div className={`h-[100px] p-4 rounded-[5%] cursor-pointer relative w-full sm:w-[48%] lg:w-[23%] ${themeMode === "dark" ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-[#f0f4f9] hover:bg-gray-300 text-[#585858]"}`}>
                                <p className="text-[15px] sm:text-[17px]">Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt='' className="w-[30px] sm:w-[35px] p-[5px] absolute bg-white rounded-[20px] bottom-[10px] right-[10px]" />
                            </div>
                            <div className={`h-[100px] p-4 rounded-[5%] cursor-pointer relative w-full sm:w-[48%] lg:w-[23%] ${themeMode === "dark" ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-[#f0f4f9] hover:bg-gray-300 text-[#585858]"}`}>
                                <p className="text-[15px] sm:text-[17px]">Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt='' className="w-[30px] sm:w-[35px] p-[5px] absolute bg-white rounded-[20px] bottom-[10px] right-[10px]" />
                            </div>
                            <div className={`h-[100px] p-4 rounded-[5%] cursor-pointer relative w-full sm:w-[48%] lg:w-[23%] ${themeMode === "dark" ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-[#f0f4f9] hover:bg-gray-300 text-[#585858]"}`}>
                                <p className="text-[15px] sm:text-[17px]">Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt='' className="w-[30px] sm:w-[35px] p-[5px] absolute bg-white rounded-[20px] bottom-[10px] right-[10px]" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="p-5">
                        <div className="flex items-center gap-5 mb-4">
                            <img src={assets.user_icon} alt='' className="w-[30px] sm:w-[40px] rounded-full" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="flex items-start gap-5">
                            <img src={assets.gemini_icon} alt='' className="w-[30px] sm:w-[40px]" />
                            {loading ? (
                                <div className="w-full flex flex-col gap-2 items-center">
                                    <hr className="rounded-[4px] border-none bg-gradient-to-r from-[#9ed7ff] to-[#ffffff] bg-[800px_50px] h-[20px] w-full animate-loader" />
                                    <hr className="rounded-[4px] border-none bg-gradient-to-r from-[#9ed7ff] to-[#ffffff] bg-[800px_50px] h-[20px] w-full animate-loader" />
                                    <hr className="rounded-[4px] border-none bg-gradient-to-r from-[#9ed7ff] to-[#ffffff] bg-[800px_50px] h-[20px] w-full animate-loader" />
                                </div>
                            ) : (
                                <div dangerouslySetInnerHTML={{ __html: formatResponse(resultData) }}></div>
                            )}
                        </div>
                    </div>
                )}
            </div>
                
            <div className="absolute bottom-0 w-full mx-auto p-5">
                <div className={`flex items-center max-w-[900px] mx-auto justify-between gap-2 sm:gap-5 p-1 rounded-full ${themeMode === "dark" ? "bg-gray-500" : "bg-[#f0f4f9]"}`}>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type='text'
                        placeholder='Enter prompt here'
                        className={`flex-1 bg-transparent border rounded-full outline-none p-2 text-[16px] sm:text-[18px] ${themeMode === "dark" ? "text-white placeholder-gray-400 bg-gray-700" : "text-black placeholder-gray-500"} focus:outline-none focus:ring-2 focus:ring-gray-300` }
                    />
                    <div className="flex items-center gap-2 sm:gap-4">
                        <img src={assets.gallery_icon} alt='' className="w-[20px] sm:w-[24px] cursor-pointer" />
                        <img src={assets.mic_icon} alt='' className="w-[20px] sm:w-[24px] cursor-pointer" />
                        <img onClick={onSent} src={assets.send_icon} alt='' className="w-[20px] sm:w-[24px] cursor-pointer" />
                    </div>
                </div>
                <p className="text-[11px] sm:text-[13px] text-center my-4">
                    Gemini may display info, including about people, so double check its responses. Your privacy and Gemini apps.@rana
                </p>
            </div>
        </div>
    );
};
