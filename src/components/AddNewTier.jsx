import textColorCalculate from '@/modules/textColorCalculate';
import React, { useState } from 'react';
import { generate as uuid } from 'short-uuid';

import ColorPopover from './ColorPopover';
import randomColor from '@/modules/randomColor';

export default function AddNewTier({
    newTierInput,
    setTierData,
    tierData,
    setNewTierInput,
}) {
    const [color, setColor] = useState(randomColor());
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                if (
                    !tierData
                        .map((x) => x.value.toLowerCase())
                        .includes(newTierInput.toLowerCase()) &&
                    newTierInput
                ) {
                    setTierData([
                        ...tierData,
                        {
                            id: uuid(),
                            value: newTierInput,
                            color: color,
                            textColor: textColorCalculate(color),
                        },
                    ]);
                }

                setNewTierInput('');
            }}
            className='my-4'
        >
            <div className='p-0 flex flex-wrap items-center justify-center gap-6'>
                <input
                    type='text'
                    maxLength='30'
                    placeholder='New Tier'
                    value={newTierInput}
                    onChange={(e) => setNewTierInput(e.target.value)}
                    className='h-16 rounded-md bg-gray-200 p-2 placeholder-g focus:border-indigo-600'
                />
                <ColorPopover color={color} setColor={setColor} />
                <button className='rounded-md bg-indigo-700 text-white py-3 w-16 flex justify-center items-center font-bold'>
                    Add
                </button>
            </div>
        </form>
    );
}
