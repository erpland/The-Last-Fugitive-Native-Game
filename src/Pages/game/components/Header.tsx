import { IonButton } from '@ionic/react'
import React from 'react'
import '../styles/header.scss'
type Props = {}

const Header:React.FC = () => {
  return (
    <div className='header-container'>
      <span>Steps: 1</span>
      <span>Turn: You</span>
      <IonButton fill='outline'>
        Hint
      </IonButton>
      </div>
  )
}

export default Header