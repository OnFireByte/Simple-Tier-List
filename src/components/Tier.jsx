import Item from '@/components/Item';
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import AddIcon from '@/assets/add-symbol.svg?component';
export default function Tier({
    tierData,
    index,
    data,
    onDeleteTier,
    onDeleteItem,
}) {
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
                    <div className='p-1 drop-shadow-lg rounded-lg bg-gray-200 w-full flex flex-row items-center'>
                        <div
                            {...provided.dragHandleProps}
                            style={{ backgroundColor: tierData.color }}
                            className='group break-all text-xl text-center overflow-hidden font-bold text-black drop-shadow-md text-sh relative flex justify-center items-center p-1 mr-1 h-20 w-20 rounded-md'
                        >
                            {tierData.value}
                            <div
                                className='group-hover:opacity-100 opacity-0 transition-all absolute flex justify-center items-center w-6 h-6 -right-2 -top-2 rounded-full bg-red-700 text-white cursor-pointer'
                                onClick={() => {
                                    onDeleteTier(tierData.value);
                                }}
                            >
                                <AddIcon
                                    style={{
                                        transform: 'rotate(45deg)',
                                        height: '60%',
                                    }}
                                />
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
                                    className='px-1 w-full min-h-[5rem] transition-all rounded-md bg-gray-300 flex items-center'
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {data.dataByTier[tierData.value].map(
                                        (itemData, index) => (
                                            <Item
                                                itemData={itemData}
                                                index={index}
                                                key={itemData.id}
                                                onDeleteItem={onDeleteItem}
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
