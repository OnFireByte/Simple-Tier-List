import AddNewItem from '@/components/AddNewItem';
import AddNewTier from '@/components/AddNewTier';
import Item from '@/components/Item';
import Tier from '@/components/Tier';
import randomColor from '@/modules/randomColor';
import { toPng } from 'html-to-image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { generate as uuid } from 'short-uuid';

import { DownloadIcon } from '@heroicons/react/outline';
import textColorCalculate from '@/modules/textColorCalculate';
import HomeDropDownOption from '@/components/HomeDropDownOption';

export default function Home() {
    const [newTierInput, setNewTierInput] = useState('');
    const [tierData, setTierData] = useState([
        {
            id: uuid(),
            value: 'S',
            color: '#dc2626',
            textColor: 'black',
        },
        {
            id: uuid(),
            value: 'A',
            color: '#ea580c',
            textColor: 'black',
        },
        {
            id: uuid(),
            value: 'B',
            color: '#facc15',
            textColor: textColorCalculate('#facc15'),
        },
        {
            id: uuid(),
            value: 'C',
            color: '#f2e53b',
            textColor: textColorCalculate('#f2e53b'),
        },
        {
            id: uuid(),
            value: 'D',
            color: '#65a30d',
            textColor: textColorCalculate('#65a30d'),
        },
        {
            id: uuid(),
            value: 'F',
            color: '#557d25',
            textColor: 'black',
        },
        {
            id: '_placeholder',
            value: '_placeholder',
            color: '#FFFFFF',
            textColor: 'black',
        },
    ]);
    const [data, setData] = useState({
        tiers: tierData,
        dataByTier: new Map(),
    });
    tierData.forEach((v) => {
        if (!data.dataByTier.has(v.id)) {
            data.dataByTier.set(v.id, []);
        }
    });

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    useEffect(() => {
        const dataKeys = [...data.dataByTier.keys()];
        data.tiers = tierData;
        tierData
            .filter((n) => !dataKeys.includes(n.id))
            .forEach((n) => {
                data.dataByTier.set(n.id, [{ id: uuid(), value: n.value }]);
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
                [reordered] = data.dataByTier
                    .get(e.source.droppableId)
                    .splice(e.source.index, 1);
                data.dataByTier
                    .get(e.destination.droppableId)
                    .splice(e.destination.index, 0, reordered);
                setData(data);
                forceUpdate();
                break;
        }
    };

    const onDeleteItem = (itemID) => {
        let keys = [];
        for (let key of data.dataByTier) {
            keys.push(key[0]);
        }
        keys.forEach((tier) => {
            const res = data.dataByTier
                .get(tier)
                .filter((item) => item.id !== itemID);
            data.dataByTier.set(tier, res);
        });
        setData(data);
        forceUpdate();
    };

    const onDeleteTier = (tierID) => {
        const newTier = tierData.filter((n) => n.id != tierID);
        setTierData(newTier);
        data.tiers = newTier;
        data.dataByTier.delete(tierID);
        setData(data);
    };

    const onEditTier = (tierID, newdata) => {
        const index = tierData.findIndex((e) => e.id == tierID);
        const newTier = tierData.filter((n) => n.id != tierID);
        newTier.splice(index, 0, newdata);
        setTierData(newTier);
        data.tiers = newTier;
        setData(data);
    };

    const onEditItem = (itemID, newdata) => {
        [...data.dataByTier.keys()].forEach((key) => {
            const res = data.dataByTier
                .get(key)
                .map((e, i) => {
                    return { ...e, index: i };
                })
                .filter((item) => item.id === itemID)[0];
            if (res) {
                data.dataByTier.get(key)[res.index] = newdata;
                setData(data);
                return;
            }
        });
    };

    const ref = useRef(null);
    const downloadTierList = () => {
        if (ref.current === null) {
            return;
        }

        toPng(ref.current, {
            cacheBust: true,
            style: { margin: 0 },
        })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = 'TierList.png';
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <main>
            <h1 className='text-indigo-700 text-center my-2 text-[40px] font-bold'>
                Simple Tier List
            </h1>
            <DragDropContext onDragEnd={onDragEnd} type='item'>
                <div>
                    <div
                        ref={ref}
                        className='p-4 w-[60%]  mx-auto bg-white rounded-lg'
                    >
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
                                                    onDeleteItem={onDeleteItem}
                                                    onDeleteTier={onDeleteTier}
                                                    onEditTier={onEditTier}
                                                    onEditItem={onEditItem}
                                                    forceUpdate={forceUpdate}
                                                />
                                            )
                                    )}

                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>
                <div className='w-full flex justify-center'></div>
                <AddNewTier
                    newTierInput={newTierInput}
                    setTierData={setTierData}
                    tierData={tierData}
                    randomColor={randomColor}
                    setNewTierInput={setNewTierInput}
                />

                <div className='flex w-4/5 mx-auto items-center justify-center'>
                    <PlaceholderField />
                    <AddNewItem
                        setData={setData}
                        data={data}
                        forceUpdate={forceUpdate}
                        className='m-0'
                    />
                    <HomeDropDownOption
                        onDownload={downloadTierList}
                        setData={setData}
                        setTierData={setTierData}
                        data={data}
                        forceUpdate={forceUpdate}
                    />
                </div>
            </DragDropContext>
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
                        className='w-full min-h-[6rem] transition-all gap-2 px-1 rounded-md bg-gray-300 flex items-center flex-wrap'
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {data.dataByTier
                            .get('_placeholder')
                            .map((itemData, index) => (
                                <Item
                                    itemData={itemData}
                                    index={index}
                                    key={itemData.id}
                                    onDeleteItem={onDeleteItem}
                                    onEditItem={onEditItem}
                                    forceUpdate={forceUpdate}
                                />
                            ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }
}
