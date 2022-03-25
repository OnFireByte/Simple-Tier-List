import Item from '@/components/Item';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import React from 'react';
import EditDropDown from './EditDropDown';

export default function Tier({
    tierData,
    index,
    data,
    onDeleteTier,
    onDeleteItem,
    onEditItem,
    onEditTier,
}) {
    return (
        <Draggable key={tierData.id} draggableId={tierData.id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className='p-1'
                >
                    <div className='p-1 rounded-lg bg-gray-200 w-full flex flex-row items-center'>
                        <div
                            {...provided.dragHandleProps}
                            style={{
                                backgroundColor: tierData.color,
                                color: tierData?.textColor,
                            }}
                            className='group mr-1 text-xl text-center font-bold text-sh relative h-20 w-20 rounded-md'
                        >
                            <div className='break-all overflow-hidden w-full h-full flex justify-center items-center p-1 mr-1'>
                                {tierData.value}
                            </div>
                            <EditDropDown
                                onDelete={onDeleteTier}
                                onEdit={onEditTier}
                                data={tierData}
                                mode='tier'
                            />
                        </div>

                        <Droppable
                            droppableId={tierData.id}
                            key={tierData.id}
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
                                    {data.dataByTier
                                        .get(tierData.id)
                                        .map((itemData, index) => (
                                            <Item
                                                itemData={itemData}
                                                index={index}
                                                key={itemData.id}
                                                onDeleteItem={onDeleteItem}
                                            />
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
