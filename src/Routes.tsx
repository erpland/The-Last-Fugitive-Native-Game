import React from 'react'
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import Home from './Pages/Home';
import Game from './Pages/Game';

type Props = {}

const Routes : React.FC = (props: Props) => {

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/" component={Home} />
         <Route path= {`/game/:level`} component={Game} />
      </IonRouterOutlet>
    </IonReactRouter>
  )
}

export default Routes