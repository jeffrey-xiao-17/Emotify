import React from 'react';
import styles from '../../css/HistoryView.module.css'
import HistoryCell from './components/HistoryCell'

function HistoryView() {
  
  const tempData = [
    {date: "10/12/20", score: 7, simscore: 6},
    {date: "10/13/20", score: 8, simscore: 9},
    {date: "10/14/20", score: 9, simscore: 5},
  ]

  return (
    <div className={styles.mainContainer}>
      <h1> Interactions History</h1>
      <div className={styles.graphSquare}>
        {/* TODO: Graph */}
      </div>

      <div className={styles.historyList}>
        {tempData.map(element => (
          <HistoryCell element={element}/>
        ))}
      </div>
      
    </div>
  );
}

export default HistoryView;
