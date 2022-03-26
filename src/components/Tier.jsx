import Item from '@/components/Item';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import React from 'react';
import EditDropDown from './EditDropDown';
import fontSize from '../modules/fontSize';

export default function Tier({
    tierData,
    index,
    data,
    onDeleteTier,
    onDeleteItem,
    onEditItem,
    onEditTier,
    forceUpdate,
    // isDraging,
}) {
    return (
        <Draggable
            key={tierData.id}
            draggableId={tierData.id}
            index={index}
            className='p-1 mx-auto'
        >
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className='p-1 w-[66vw] mx-auto'
                >
                    <div className='p-2 rounded-lg bg-slate-200 flex flex-row items-center'>
                        <div
                            {...provided.dragHandleProps}
                            style={{
                                backgroundColor: tierData.color,
                                color: tierData?.textColor,
                                fontSize: fontSize(tierData.value),
                            }}
                            className='group mr-2  flex-shrink-0 text-center font-bold relative h-24 w-24 rounded-md'
                        >
                            <div className='select-none break-all overflow-hidden w-full h-full flex justify-center items-center p-1 mr-1'>
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
                            className='overflow-scroll w-52'
                        >
                            {(provided) => (
                                <div
                                    className='px-1 h-24 tier-scrollbar grow transition-all rounded-md bg-slate-300 flex scroll items-center'
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {data.dataByTier
                                        .get(tierData.id)
                                        .map((itemData, index) => (
                                            <>
                                                <Item
                                                    itemData={itemData}
                                                    index={index}
                                                    key={itemData.id}
                                                    onDeleteItem={onDeleteItem}
                                                    onEditItem={onEditItem}
                                                    forceUpdate={forceUpdate}
                                                />
                                            </>
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
