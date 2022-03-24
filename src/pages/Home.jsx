import AddNewItem from '@/components/AddNewItem';
import AddNewTier from '@/components/AddNewTier';
import Item from '@/components/Item';
import Tier from '@/components/Tier';
import randomColor from '@/modules/randomColor';
import React, { useCallback, useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';

export default function Home() {
    const [newTierInput, setNewTierInput] = useState('');
    const [newValInput, setNewValInput] = useState('');
    const [tierData, setTierData] = useState([
        { value: 'S', color: '#dc2626' },
        { value: 'A', color: '#ea580c' },
        { value: 'B', color: '#facc15' },
        { value: 'C', color: '#facc15' },
        { value: 'D', color: '#65a30d' },
        { value: 'F', color: '#365314' },
        { value: '_placeholder', color: '#facc15' },
    ]);
    const [data, setData] = useState({
        tiers: tierData,
        dataByTier: {},
    });
    tierData.forEach((v) => {
        if (!data.dataByTier[v.value]) {
            data.dataByTier[v.value] = [];
        }
    });

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    useEffect(() => {
        const dataKeys = Object.keys(data.dataByTier);
        data.tiers = tierData;
        tierData
            .filter((n) => !dataKeys.includes(n.value))
            .forEach((n) => {
                data.dataByTier[n.value] = [{ id: uuid(), value: n.value }];
            });
        setData(data);
        forceUpdate();
    }, [tierData]);
    useEffect(() => {
        forceUpdate();
    }, [data]);
    const onDragEnd = (e) => {
        if (!e.destination) {
            return;
        }
        let reordered;
        switch (e.type) {
            case 'tier':
                [reordered] = tierData.splice(e.source.index, 1);
                tierData.splice(e.destination.index, 0, reordered);
                setTierData(tierData);
                break;
            case 'item':
                [reordered] = data.dataByTier[e.source.droppableId].splice(
                    e.source.index,
                    1
                );
                data.dataByTier[e.destination.droppableId].splice(
                    e.destination.index,
                    0,
                    reordered
                );
                setData(data);
                break;
        }
    };

    return (
        <main>
            <h1 className='text-indigo-700 text-center my-2'>
                Simple Tier List
            </h1>
            <DragDropContext onDragEnd={onDragEnd} type='item'>
                <section className='p-4 w-2/3 mx-auto'>
                    <Droppable droppableId='tiers' type='tier' key='tiers'>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {data.tiers.map(
                                    (item, index) =>
                                        item.value != '_placeholder' && (
                                            <Tier
                                                tierData={item}
                                                index={index}
                                                data={data}
                                                key={index}
                                                onDeleteTier={(tierName) => {
                                                    const newTier =
                                                        tierData.filter(
                                                            (n) =>
                                                                n.value !=
                                                                tierName
                                                        );
                                                    setTierData(newTier);
                                                    delete data.dataByTier[
                                                        tierData
                                                    ];
                                                    setData(data);
                                                }}
                                            />
                                        )
                                )}

                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </section>
                <AddNewTier
                    newTierInput={newTierInput}
                    setTierData={setTierData}
                    tierData={tierData}
                    randomColor={randomColor}
                    setNewTierInput={setNewTierInput}
                />
                <PlaceholderField />
            </DragDropContext>
            <AddNewItem
                setData={setData}
                data={data}
                setNewValInput={setNewValInput}
                newValInput={newValInput}
            />
        </main>
    );

    function PlaceholderField() {
        return (
            <Droppable
                droppableId='_placeholder'
                key='_placeholder'
                direction='horizontal'
                isCombineEnabled={true}
                type='item'
            >
                {(provided) => (
                    <div
                        className='w-full h-20 p-4 rounded-md bg-red-200 flex'
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {data.dataByTier['_placeholder'].map(
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
        );
    }
}
