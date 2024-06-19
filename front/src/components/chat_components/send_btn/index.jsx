import send_btn from './images/send_btn.png'
import styles from './scss/button.module.scss'

export const SendButton = ({isDisabled, loading, themeOnBtn}) => {

return (

	<button className={styles.submitBtn} disabled={isDisabled} type="submit">
          {loading ?  
            <div className={styles.wave}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </div>
            :
            (themeOnBtn ? 
                <img className={styles.darkBtn} src={send_btn}/> :
                <img src={send_btn}/> 
			)
		}
        </button>
	)	
}