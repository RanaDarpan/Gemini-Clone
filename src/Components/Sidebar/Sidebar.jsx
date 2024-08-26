import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { Context } from '../../Context/Context';
import {ThemeContext} from '../../Context/Theme';

export const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompt, setRecentPrompt } = useContext(Context);
    const { themeMode } = useContext(ThemeContext);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    return (
        <div className={`min-h-screen flex flex-col justify-between ${themeMode === 'dark' ? 'bg-gray-500 text-white' : 'bg-azure text-black'} p-4 sm:p-6`}>
            <div className='flex flex-col'>
                <img 
                    onClick={() => setExtended(prev => !prev)} 
                    className='w-5 mt-2 sm:mt-10 ml-2 cursor-pointer' 
                    src={assets.menu_icon} 
                    alt="Menu" 
                />
                <div className={`flex items-center gap-2 mt-4 p-2 ${themeMode === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-[#e6eaf1] text-gray-500'} rounded-full cursor-pointer`}>
                    <img src={assets.plus_icon} className='w-5' alt="New Chat" />
                    {extended && <p className='text-gray-400'>New Chat</p>}
                </div>

                {extended && (
                    <div className='flex flex-col'>
                        <p className='recent-title mt-8 mb-2 font-bold'>Recent</p>
                        {Array.isArray(prevPrompt) && prevPrompt.length > 0 ? (
                            prevPrompt.map((item, index) => (
                                typeof item === 'string' || typeof item === 'number' ? (
                                    <div 
                                        key={index} 
                                        onClick={() => loadPrompt(item)} 
                                        className={`recent-entry flex items-start gap-2 p-2 pr-10 rounded-full cursor-pointer ${themeMode === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-[#282828] hover:bg-[#e2e6eb]'}`}
                                    >
                                        <img src={assets.message_icon} className='w-5' alt="Recent Prompt" />
                                        <p className='text-sm sm:text-base'>{item.toString().slice(0, 20)}...</p>
                                    </div>
                                ) : null
                            ))
                        ) : (
                            <p>No recent prompts</p>
                        )}
                    </div>
                )}
            </div>

            <div className='flex flex-col mb-4'>
                <div className={`bottom-item flex items-center gap-2 rounded-full p-2 cursor-pointer ${themeMode === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-[#e2e6eb]'}`}>
                    <img src={assets.question_icon} className='w-5' alt="Help" />
                    {extended && <p className='text-sm sm:text-base'>Help</p>}
                </div>
                <div className={`bottom-item flex items-center gap-2 rounded-full p-2 cursor-pointer ${themeMode === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-[#e2e6eb]'}`}>
                    <img src={assets.history_icon} className='w-5' alt="Activity" />
                    {extended && <p className='text-sm sm:text-base'>Activity</p>}
                </div>
                <div className={`bottom-item flex items-center gap-2 rounded-full p-2 cursor-pointer ${themeMode === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-[#e2e6eb]'}`}>
                    <img src={assets.setting_icon} className='w-5' alt="Settings" />
                    {extended && <p className='text-sm sm:text-base'>Settings</p>}
                </div>
            </div>
        </div>
    );
};
