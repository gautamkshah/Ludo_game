import { View } from 'react-native';
import React, { useMemo } from 'react';
import { memo } from 'react';
import Cell from './Cell';

const HorizontalPath = ({ cells, color }) => {
  const groupedCells = useMemo(() => {
    const groups = [];
    for (let i = 0; i < cells.length; i += 6) {
      groups.push(cells.slice(i, i + 6));
    }
    return groups;
  }, [cells]);

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '40%',
      }}
    >
      <View style={{ flexDirection: 'column', width: '100%', height: '100%' }}>
        {groupedCells.map((group, groupIndex) => (
          <View
            key={`group-${groupIndex}`}
            style={{
              flexDirection: 'row',
              height: '33.3%',
              width: '16.67%',
            }}
          >
            {group.map((id, index) => (
              <Cell
                key={`cell-${id}`}
                cell={true}
                id={id}
                color={color}
                index={`${groupIndex},${index}`}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default memo(HorizontalPath);
