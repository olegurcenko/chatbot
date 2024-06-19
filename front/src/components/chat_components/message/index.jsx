import styles from './scss/message.module.scss'
import user from './images/user.png'
import bot from './images/bot.png'

export const Message = ({message, dateTime, isUser}) => {
	return (
		<section className={styles.messageWrapper}>
			{ isUser ? <section className={styles.line}></section> : <></>}
		<section className={isUser ? styles.messageBodyUser : styles.messageBodyBot}>
          <div className={styles.messageContent}>{message}</div>
		  <ul className={ isUser ? styles.userMsgData : styles.botMsgData}>
			<li>
				{dateTime}
			</li>
				{isUser ? <li> <img src={user}/> <p>user</p> </li> : <li> <img className={styles.botImg} src={bot}/> <p>bot</p> </li>}
		  </ul>
        </section>
			{ isUser ? <section className={styles.line}></section> : <></>}
		</section>
	)
}