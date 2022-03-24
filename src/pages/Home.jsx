import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Tier from '@/components/Tier';
import Item from '@/components/Item';

export default function Home() {
  const [newTierInput, setNewTierInput] = useState('');
  const [newValInput, setNewValInput] = useState('');
  const [tierData, setTierData] = useState([
    'S',
    'A',
    'B',
    'C',
    '_placeholder',
  ]);
  const [data, setData] = useState({
    tiers: tierData,
    dataByTier: {
      S: [],
      A: [],
      B: [],
      C: [],
      _placeholder: [{ id: uuid(), value: '6' }],
    },
  });
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  useEffect(() => {
    const dataKeys = Object.keys(data.dataByTier);
    data.tiers = tierData;
    tierData
      .filter((n) => !dataKeys.includes(n))
      .forEach((n) => {
        data.dataByTier[n] = [];
      });
    setData(data);
    forceUpdate();
  }, [tierData]);

  const onDragTierEnd = (e) => {
    if (!e.destination) {
      return;
    }
  };

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
      <h1 className='text-indigo-700 text-center my-2'>Simple Tier List</h1>
      <DragDropContext onDragEnd={onDragEnd} type='item'>
        <section className='p-4'>
          <Droppable droppableId='tiers' type='tier' key='tiers'>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {data.tiers.map(
                  (item, index) =>
                    item != '_placeholder' && (
                      <Tier
                        tierData={item}
                        index={index}
                        data={data}
                        key={index}
                        onDeleteTier={(tierName) => {
                          const newTier = tierData.filter((n) => n != tierName);
                          setTierData(newTier);
                          delete data.dataByTier[tierData];
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
        <input
          type='text'
          placeholder='New Tier'
          value={newTierInput}
          onChange={(e) => setNewTierInput(e.target.value)}
        />
        <button
          onClick={() => {
            setTierData(Array.from(new Set([...tierData, newTierInput])));
            setNewTierInput('');
          }}
        >
          Go
        </button>
        <div className=''>
          <Droppable
            droppableId='_placeholder'
            key='_placeholder'
            direction='horizontal'
            isCombineEnabled={true}
            type='item'
          >
            {(provided) => (
              <div
                className='w-full p-4 rounded-md bg-red-200 flex'
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {data.dataByTier['_placeholder'].map((itemData, index) => (
                  <Item itemData={itemData} index={index} key={itemData.id} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
      <input
        type='text'
        placeholder='New Item'
        value={newValInput}
        onChange={(e) => setNewValInput(e.target.value)}
      />
      <button
        onClick={() => {
          data.dataByTier['_placeholder'].push({
            id: uuid(),
            value: newValInput,
          });
          console.log(data);
          setData(data);
          setNewValInput('');
        }}
      >
        Go
      </button>
    </main>
  );
}
