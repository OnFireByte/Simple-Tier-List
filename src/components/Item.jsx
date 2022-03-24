import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
export default function Item({ itemData, index }) {
    return (
        <div className=''>
            <Draggable
                key={itemData.id}
                draggableId={itemData.id}
                index={index}
                type='item'
            >
                {(provided) => (
                    <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        className='p-4 mr-4 h-full flex justify-center items-center bg-white rounded-md'
                    >
                        {itemData.value}
                    </div>
                )}
            </Draggable>
        </div>
    );
}
