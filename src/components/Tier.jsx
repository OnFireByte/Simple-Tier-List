import Item from '@/components/Item';
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
export default function Tier({ tierData, index, data, onDeleteTier }) {
  return (
    <Draggable key={tierData} draggableId={tierData} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className='p-2'
        >
          <div className='p-2 rounded-lg bg-gray-200 w-full flex flex-row items-center'>
            <div
              {...provided.dragHandleProps}
              className='group relative flex justify-center items-center p-1 mr-4 h-20 w-20 bg-gray-400 rounded-md'
            >
              {tierData}
              <div
                className='group-hover:opacity-100 opacity-0 transition-all absolute flex justify-center items-center w-6 h-6 -right-2 -top-2 rounded-full bg-red-700 text-white cursor-pointer'
                onClick={() => {
                  onDeleteTier(tierData);
                }}
              >
                x
              </div>
            </div>

            <Droppable
              droppableId={tierData}
              key={tierData}
              direction='horizontal'
              isCombineEnabled={true}
              type='item'
            >
              {(provided) => (
                <div
                  className='w-full p-2 h-20 rounded-md bg-red-200 flex'
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {data.dataByTier[tierData].map((itemData, index) => (
                    <Item itemData={itemData} index={index} key={itemData.id} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      )}
    </Draggable>
  );
}
