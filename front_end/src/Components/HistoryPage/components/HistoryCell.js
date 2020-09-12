import React from 'react'
import styles from '../../../css/HistoryView.module.css'

function HistoryCell({element}) {
    const date = element.date
    const score = element.score
    const simscore = element.simscore
    
    return (
        <div className= {styles.HistoryCell}>
            <p>Date: {date}</p>
            <p>Your Score: {score}</p>
            <p>Simulated Score: {simscore}</p>
        </div>
    )
}

export default HistoryCell