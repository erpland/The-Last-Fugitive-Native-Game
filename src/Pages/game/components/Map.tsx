import React from 'react'
import { useLevelContext } from '../../context/LevelContext'
import '../styles/map.scss'
import {tempLevel} from '../temp.js'
import {TILE_SIZE} from '../constants/contants'
type Props = {}

const Map:React.FC = (props: Props) => {
  // const {allLevels} = useLevelContext()
  // const level = allLevels[0]
  // const {map} = level
  const {map} = tempLevel

  // const levelMap = map.map(row=> row.map(col=><MapBox boxSize={boxSize}/>))
  // console.log(map)
  const levelMap = map.map((row,index)=>{ return (
    <MapRow row={row} index={index} key={index}/>
    )})
    return (
      <div style={{color:'white'}} className='map-container'>
      <div className='map__cells'>
        {levelMap}
      </div>
    </div>
  )
}

export default Map

export const MapRow = (props : any)=>{
  const rows =  props.row.map((col:any,index:any)=>{
    return <MapBox col={col} index={index} rowIndex={props.index} key={[props.index,index]}/>
  })
  return( 
  <div className='map-row'>
    {rows}
  </div>
  )
}

export const MapBox = (props: any) => {
  return (
    <div className='map-box' style={{height: TILE_SIZE,width:TILE_SIZE}}>
      
    </div>
  )
}
