import { useUnit } from 'effector-react';
import { sudokuModel } from '@/widgets/sudoku';
import { timerModel } from '@/features/timer';
import { Icon } from '@/shared/ui/icon';
import { EMPTY_CELL, TABLE_COLS } from '@/shared/config';
import { Cell } from './cell';

export const GameSection = () => {
  const { board, selectedCell, cellSelected, selectedRow, selectedColumn, mistakes, isRunning, startTimer } = useUnit({
    board: sudokuModel.$board,
    selectedCell: sudokuModel.$selectedCell,
    cellSelected: sudokuModel.cellSelected,
    selectedRow: sudokuModel.$selectedRow,
    selectedColumn: sudokuModel.$selectedColumn,
    mistakes: sudokuModel.$mistakes,
    isRunning: timerModel.isRunning,
    startTimer: timerModel.startTimer,
  });

  const rows = Array.from({ length: TABLE_COLS }, (_, v) => v);
  const grid = board.split('').map((value) => (value === EMPTY_CELL ? 0 : parseInt(value)));

  return (
    <div className="relative">
      {!isRunning && (
        <button
          onClick={startTimer}
          className="absolute z-10 left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 flex items-center justify-center rounded-full bg-blue-100 text-white w-14 h-14">
          <Icon className="fill-white w-[21px] h-[21px]" name="common/play" />
        </button>
      )}
      <table className="border-[2px] border-blue-900">
        <tbody>
          {rows.map((row) => (
            <tr className="[&:nth-child(3n)]:border-b-[2px] [&:nth-child(3n)]:border-blue-900" key={row}>
              {rows.map((column) => {
                const indexOfCell = row * 9 + column;
                const value = grid[indexOfCell];
                const isCellSelected = selectedCell === indexOfCell;
                const isRowSelected = selectedRow === row;
                const isColumnSelected = selectedColumn === column;
                const mistakesArray = [...mistakes];
                const isError = mistakesArray.includes(indexOfCell);

                return (
                  <Cell
                    isError={isError}
                    isHidden={!isRunning}
                    isCellSelected={isCellSelected}
                    isNeighbourOfSelected={isRowSelected || isColumnSelected}
                    onSelect={() => cellSelected({ indexOfCell })}
                    key={indexOfCell}
                    value={value}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
