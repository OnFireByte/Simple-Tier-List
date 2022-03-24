import Item from '@/components/Item';
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
export default function Tier({ tierData, index, data, onDeleteTier }) {
    return (
        <Draggable
            key={tierData.value}
            draggableId={tierData.value}
            index={index}
        >
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className='p-1'
                >
                    <div className='p-1 rounded-lg bg-gray-200 w-full flex flex-row items-center'>
                        <div
                            {...provided.dragHandleProps}
                            style={{ backgroundColor: tierData.color }}
                            className={`group relative flex justify-center items-center p-1 mr-1 h-16 w-16 rounded-md`}
                        >
                            {tierData.value}
                            <div
                                className='group-hover:opacity-100 opacity-0 transition-all absolute flex justify-center items-center w-6 h-6 -right-2 -top-2 rounded-full bg-red-700 text-white cursor-pointer'
                                onClick={() => {
                                    onDeleteTier(tierData.value);
                                }}
                            >
                                x
                            </div>
                        </div>

                        <Droppable
                            droppableId={tierData.value}
                            key={tierData.value}
                            direction='horizontal'
                            isCombineEnabled={true}
                            type='item'
                        >
                            {(provided) => (
                                <div
                                    className='w-full p-2 h-16 rounded-md bg-red-200 flex'
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {data.dataByTier[tierData.value].map(
                                        (itemData, index) => (
                                            <Item
                                                itemData={itemData}
                                                index={index}
                                                key={itemData.id}
                                            />
                                        )
                                    )}
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
