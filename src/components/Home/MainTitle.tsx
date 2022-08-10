import { IonButton } from '@ionic/react'
import React from 'react'

type Props = {}

const MainTitle = (props: Props) => {
  return (
    <div className='main__title'>
      {/* <div className='main__hero'>
        <img src="/assets/main/hero.png" alt="" />
      </div> */}
      <h1>The Last Fugitive</h1>
      <IonButton color="primary" style={{width:'70%'}}
      size='large'>START</IonButton>
      <IonButton style={{width:'70%',color:'white'}}
      size='large' fill={'outline'}
      
      >CONNECT</IonButton>
    </div>
  )
}

export default MainTitle