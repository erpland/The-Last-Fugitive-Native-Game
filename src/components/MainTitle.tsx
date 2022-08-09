import { IonButton } from '@ionic/react'
import React from 'react'

type Props = {}

const MainTitle = (props: Props) => {
  return (
    <div className='main__title'>
      <h1>The Last Fugitive</h1>
      <IonButton color="primary"
      size='large'>START</IonButton>
      <IonButton color="primary"
      size='large' fill={'outline'}
      
      >CONNECT</IonButton>
    </div>
  )
}

export default MainTitle