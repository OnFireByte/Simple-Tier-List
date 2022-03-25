import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import EditDropDown from './EditDropDown';
export default function Item({ itemData, index, onDeleteItem }) {
    return (
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
                    className='group relative h-16 min-w-[4rem] my-2 mx-1 px-4 flex justify-center items-center bg-white rounded-md'
                >
                    <div
                        className='group-hover:opacity-100 opacity-0 transition-all absolute flex justify-center items-center w-6 h-6 -right-2 -top-2 rounded-full bg-red-700 text-white cursor-pointer'
                        onClick={() => {
                            onDeleteItem(itemData.id);
                        }}
                    >
                        <EditDropDown
                            onDelete={onDeleteItem}
                            data={itemData}
                            mode='item'
                        />
                    </div>
                    {itemData.value}
                </div>
            )}
        </Draggable>
    );
}
