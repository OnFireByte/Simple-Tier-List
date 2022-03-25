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
                    className='group relative h-24 min-w-[6rem] max-w-[8rem] my-2 mx-1 flex justify-center items-center bg-white rounded-md'
                >
                    {itemData.img ? (
                        <div className='rounded-md overflow-hidden h-full w-full'>
                            <img
                                src={itemData.img}
                                className='peer object-cover relative h-full w-full'
                            />
                        </div>
                    ) : (
                        <>{itemData.value}</>
                    )}
                    <div
                        className='group-hover:opacity-100 peer-hover:opacity-100 z-50 opacity-0 transition-all absolute flex justify-center items-center w-6 h-6 -right-2 -top-2 rounded-full bg-red-700 text-white cursor-pointer'
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
                </div>
            )}
        </Draggable>
    );
}
