import React, { useContext, useState, useEffect } from "react";
import styles from './scss/chat_page.module.scss'
import axios from "axios";
import { Message } from "../chat_components/message";
import { ThemeContext } from "../../context/theme_context";
import light from './images/light.png'
import dark from './images/dark.png'
import { SendButton } from "../chat_components/send_btn";

const ChatbotApp = () => {
  const [prompt, setPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const { darkTheme, toggleTheme } = useContext(ThemeContext);
  const [themeOnBtn, setThemeOnBtn] = useState(1);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkTheme ? "dark" : "light"
    );
    darkTheme ? setThemeOnBtn(1) : setThemeOnBtn(0)
  }, [darkTheme]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    setPrompt('')

    const textarea = document.querySelector('textarea');
  if (textarea) {
    textarea.style.height = '70px';
  }

    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes}`;
  
    const userMsg = [prompt, formattedTime, 1];
    setApiResponse([...apiResponse, userMsg]);
    setLoading(true);
  
    try {
      const response = await axios.post('http://localhost:3001/send-message', {
        messages: [
          {
            role: 'assistant',
            content: prompt
          }
        ],
        model: "gpt-3.5-turbo"
      });
      const date = new Date(response.data.created);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes}`;
      const botMsg = [response.data.choices[0].message.content, formattedTime, 0];
      setApiResponse(prevState => [...prevState, botMsg]);
    } catch (error) {
      console.error(error);
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes}`;
      setApiResponse(prevState => [...prevState, ["Something went wrong. Please try again.", formattedTime, 0]]);
    }
  
    setLoading(false);
  };
  const handleChangeHeight = (e) => {
    const textarea = e.target;
    textarea.style.height = 0;
    textarea.style.height = textarea.scrollHeight + 'px';
  }
  

  return (
    <div className={styles.chatPage}>  
      <section className={styles.themeBtnWrapper}>
        <button className={styles.themeBtn} onClick={toggleTheme}>
          {themeOnBtn ? 
            <img className={styles.moon} src={dark} alt="" /> :
            <img className={styles.sun} src={light} alt="" />
          }
        </button>
      </section>
	    <ul className={styles.messagesList}>
        {apiResponse.map((response, index) => (
          <Message key={index} message={response[0]} dateTime={response[1]} isUser={response[2]}/>
        ))}
	    </ul>
      <form className={styles.formInput} onSubmit={handleSubmit}>
        <section className={styles.inputWrapper}>

          <textarea
            className={styles.inputText}
            type="text"
            value={prompt}
            placeholder="Please ask AI Bot"
            onChange={(e) => { setPrompt(e.target.value); handleChangeHeight(e); }}
            onKeyDown={handleKeyDown}
          >
          </textarea>
        </section>
          <SendButton isDisabled={loading || prompt.length === 0} loading={loading} themeOnBtn={themeOnBtn}/>
      </form>
    </div>
  );
};

export default ChatbotApp;