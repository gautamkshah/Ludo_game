import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import { memo } from 'react'
import Cell from './Cell'

const VerticalPath = ({cells,color}) => {
      const groupedCells= useMemo(()=>{
            const groups=[];
            for(let i=0;i<cells.length;i+=3){
                  groups.push(cells.slice(i,i+3));
            }
            return groups;
      },[cells]);
  return (
    <View style={{flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      width:'20%',
      height:'100%',
    }}>
     <View style={{flexDirection:'column', width:'100%', height:'100%'}}>
            {groupedCells.map((group,groupIndex)=>(
            <View key={`group-${groupIndex}`} style={{flexDirection:'row', width:'33.3%',height: '16.67%'}}>
                  {group.map((id,index)=>(
                  <Cell key={`cell-${id}`} cell={true} id={id} color={color} index={`${groupIndex},${index}`} />
                  ))}
            </View>
            ))}
      </View>
    </View>
  )
}

export default memo(VerticalPath)