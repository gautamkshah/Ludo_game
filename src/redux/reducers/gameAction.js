const delay = ms => new Promise(res => setTimeout(res, ms));
import {disableTouch, unfreezeDice} from './gameSlice';
import {turningPoints} from '../../helpers/PlotData';
import {playSound} from '../../helpers/SoundUtility';
import {updatePlayerPieceValue} from './gameSlice';

import {selectDiceNo} from './gameSelector';
// import {selectCurrentPosition} from './gameSelector';
import {SafeSpots, StarSpots} from '../../helpers/PlotData';
import {victoryStart} from '../../helpers/PlotData';
import {startingPoints} from '../../helpers/PlotData';
import {updatePlayerChance} from './gameSlice';
import {announceWinner} from './gameSlice';
import {updateFireworks} from './gameSlice';
import { Alert } from 'react-native';
import { selectCurrentPositions } from './gameSelector';


function checkWinningCriteria(pieces) {
  for (let piece of pieces) {
    if (piece.travelCount < 57) {
      return false;
    }
  }
  return true;
}

export const handleForwardThunk =
  (playerNo, id, pos) => async (dispatch, getState) => {
    // console.log('Calling thunk - playerNo:', playerNo, 'pieceId:', id, 'id:', pos);
    const state = getState();
    const plottedPieces = selectCurrentPositions(state);
    const diceNo = selectDiceNo(state);

    const piecesAtPosition = plottedPieces.filter(item => item.pos === pos);
    // console.log("dd",plottedPieces);
    // Alert.alert('piecesAtPosition', JSON.stringify(piecesAtPosition));

    let alpha =
      playerNo == 1 ? 'A' : playerNo == 2 ? 'B' : playerNo == 3 ? 'C' : 'D';

    const piece =
      piecesAtPosition[
        piecesAtPosition.findIndex(item => item.id.slice(0, 1) == alpha)
      ];

    dispatch(disableTouch());

    let finalPath = piece.pos;

    const beforePlayerPiece = state.game[`player${playerNo}`].find(
      item => item.id == id,
    );

    let travelCount = beforePlayerPiece.travelCount;

    for (let i = 0; i < diceNo; i++) {
      const updatedPosition = getState();
      const playerPiece = updatedPosition.game[`player${playerNo}`].find(
        item => item.id === id,
      );

      let path = playerPiece.pos + 1;

      if (turningPoints.includes(path) && turningPoints[playerNo - 1] == path) {
        path = victoryStart[playerNo - 1];
      }

      if (path == 53) {
        path = 1;
      }

      finalPath = path;
      travelCount += 1;
      dispatch(
        updatePlayerPieceValue({
          playerNo: `player${playerNo}`, 
          pieceId: playerPiece.id,
          pos: path,
          travelCount: travelCount,
        }),
      );

      playSound('pile_move');
      await delay(200); 
    }

    const updatedState = getState();
    const updatedPlottedPieces = selectCurrentPositions(updatedState);

    const finalPlot = updatedPlottedPieces.filter(
      item => item.pos == finalPath,
    );

    const ids = finalPlot?.map(item => item.id[0]) ;
    const uniqueIds = new Set(ids);
    const areDifferentIds = uniqueIds.size > 1;

    if (SafeSpots.includes(finalPath) || StarSpots.includes(finalPath)) {
      playSound('safe_spot');
    }
    if (
      areDifferentIds &&
      !SafeSpots.includes(finalPlot[0].pos) &&
      !StarSpots.includes(finalPlot[0].pos)
    ) {
      const enemyPiece = finalPlot.find(piece => piece.id[0] !== id[0]);
      const enemyId = enemyPiece.id[0];
      let no =
        enemyId === 'A' ? 1 : enemyId === 'B' ? 2 : enemyId === 'C' ? 3 : 4;

      let backwardPath = startingPoints[no - 1];
      let i = enemyPiece.pos;
      playSound('collide');
      while (i !== backwardPath) {
        dispatch(
          updatePlayerPieceValue({
            playerNo: `player${no}`,
            pieceId: enemyPiece.id,
            pos: i,
            travelCount: 0,
          }),
        );

        await delay(0.4); // Consider reducing delay if possible
        i -= 1;
        if (i === 0) {
          i = 52; // Reset i to 52 if it reaches 0
        }
      }
      dispatch(
        updatePlayerPieceValue({
          playerNo: `player${no}`,
          pieceId: enemyPiece.id,
          pos: 0,
          travelCount: 0,
        }),
      );
      dispatch(unfreezeDice());
      return;
    }
    // console.log("travel",travelCount);
    // console.log("dice number",diceNo);
    // console.log("playerNo",playerNo);
    if (diceNo === 6 || travelCount == 57) {
      dispatch(updatePlayerChance({chancePlayer: playerNo}));
      if (travelCount == 57) {
        playSound('home_win');
        const finalPlayerState = getState();
        const playerAllPieces = finalPlayerState.game[`player${playerNo}`];
  
        if (checkWinningCriteria(playerAllPieces)) {
          dispatch(announceWinner(playerNo));
          playSound('cheer', true);
          return;
        }
        dispatch(updateFireworks(true));
        dispatch(unfreezeDice());
        return;
      }
    }
    else {
      let chancePlayer = playerNo + 1;
      if (chancePlayer > 4) {
        chancePlayer = 1;
      }
      // console.log('chancePlayer:', chancePlayer);
      dispatch(updatePlayerChance({ chancePlayer }));
    }
  };
