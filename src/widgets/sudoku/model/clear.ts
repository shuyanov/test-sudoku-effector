import { createEvent, sample } from 'effector';
import { EMPTY_CELL } from '@/shared/config';
import { $selectedCell } from './cell';
import { $board } from './start';
import { isCellHasMistake, updateBoardWithKey } from '../lib';
import { $mistakes } from './mistakes';
import { hotkey } from 'effector-hotkey';
import { timerModel } from '@/features/timer';

export const clearClicked = createEvent();

hotkey({ key: 'Ctrl+x', target: clearClicked, filter: timerModel.isRunning });

sample({
  clock: clearClicked,
  filter: isCellHasMistake,
  source: { indexOfCell: $selectedCell, mistakes: $mistakes, board: $board },
  fn: ({ board, indexOfCell }) => updateBoardWithKey({ board, indexOfCell, key: EMPTY_CELL }),
  target: $board,
});
