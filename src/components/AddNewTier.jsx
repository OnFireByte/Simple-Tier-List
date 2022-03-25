import textColorCalculate from '@/modules/textColorCalculate';
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
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
            className='w-2/3 mx-auto my-4'
        >
            <div className='mx-auto p-0 flex items-center justify-center gap-6'>
                <input
                    type='text'
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
