'use client';

import React, { useEffect, useState } from 'react';
import { useSlideStore } from '@/store/useSlideStore';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

interface Props {
  content: string[][];
  onChange: (newContent: string[][]) => void;
  isPreview?: boolean;
  isEditable?: boolean;
  initialRowSize?: number;
  initialColSize?: number;
}

const Table = ({
  content,
  onChange,
  initialColSize,
  initialRowSize,
  isEditable,
  isPreview,
}: Props) => {
  const [colSizes, setColSizes] = useState<number[]>([]);
  const [rowSizes, setRowSizes] = useState<number[]>([]);
  const [tableData, setTableData] = useState<string[][]>(() => {
    if (content.length === 0 || content.length === 0) {
      return Array(initialRowSize).fill(Array(initialColSize)).fill('');
    }
    return content;
  });
  const { currentTheme } = useSlideStore();

  function handleResizeCol(index: number, newSize: number) {
    if (!isEditable) return;
    const newSizes = [...colSizes];
    newSizes[index] = newSize;
    setColSizes(newSizes);
  }

  function updateCell(rowIndex: number, colIndex: number, value: string) {
    if (!isEditable) return;
    const newData = tableData.map((row, rIndex) =>
      rIndex === rowIndex ? row.map((cell, cIndex) => (cIndex === colIndex ? value : cell)) : row
    );

    setTableData(newData);
    onChange(newData);
  }

  useEffect(() => {
    setRowSizes(new Array(tableData.length).fill(100 / tableData.length));
    setColSizes(new Array(tableData[0].length).fill(100 / tableData[0].length));
  }, [tableData]);

  if (isPreview) {
    return (
      <div className="w-full overflow-x-auto text-xs p-2">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {tableData[0].map((cell, index) => (
                <th
                  key={index}
                  className="p-1 sm:p-2 border text-left"
                  style={{ width: `${colSizes[index]}%` }}
                >
                  {cell || 'Escreva aqui...'}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex} style={{ width: `${rowSizes[rowIndex + 1]}%` }}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="p-1 sm:p-2 border">
                    {cell || 'Escreva aqui...'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div
      className="size-full relative p-2"
      style={{
        background: currentTheme.gradientBackground || currentTheme.backgroundColor,
        borderRadius: '8px',
      }}
    >
      <ResizablePanelGroup
        direction="vertical"
        className={`size-full rounded-lg border
          ${
            initialColSize === 2
              ? 'min-h-[100px]'
              : initialColSize === 3
              ? 'min-h-[150px]'
              : initialColSize === 4
              ? 'min-h-[200px]'
              : 'min-h-[100px]'
          }`}
        onLayout={(sizes) => setRowSizes(sizes)}
      >
        {tableData.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {rowIndex > 0 && <ResizableHandle />}

            <ResizablePanelGroup
              direction="horizontal"
              onLayout={(sizes) => setColSizes(sizes)}
              className="size-full"
            >
              {row.map((cell, colIndex) => (
                <React.Fragment key={colIndex}>
                  {colIndex > 0 && <ResizableHandle />}
                  <ResizablePanel
                    defaultSize={colSizes[colIndex]}
                    onResize={(size) => handleResizeCol(colIndex, size)}
                    className="size-full min-h-9"
                  >
                    <div className="size-full relative min-h-3 p-1">
                      <input
                        value={cell}
                        onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                        className="w-full h-full p-2 sm:p-4 !bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md text-sm sm:text-base"
                        style={{
                          color: currentTheme.fontColor,
                        }}
                        placeholder="Escreva aqui..."
                        readOnly={!isEditable}
                      />
                    </div>
                  </ResizablePanel>
                </React.Fragment>
              ))}
            </ResizablePanelGroup>
          </React.Fragment>
        ))}
      </ResizablePanelGroup>
    </div>
  );
};

export default Table;
