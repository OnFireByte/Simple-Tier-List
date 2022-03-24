import React from 'react';
import AddIcon from '@/assets/add-symbol.svg?component';
export default function AddNewTier({
    newTierInput,
    setTierData,
    tierData,
    randomColor,
    setNewTierInput,
}) {
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
                            value: newTierInput,
                            color: randomColor(),
                        },
                    ]);
                }

                setNewTierInput('');
            }}
            className='w-2/3 mx-auto my-4'
        >
            <div className='mx-auto p-0 flex items-center justify-center gap-10'>
                <input
                    type='text'
                    placeholder='New Tier'
                    value={newTierInput}
                    onChange={(e) => setNewTierInput(e.target.value)}
                    className='h-16 rounded-md focus:border-indigo-600'
                />
                <button className='rounded-md bg-indigo-700 text-white h-16 w-16 flex justify-center items-center font-bold'>
                    <AddIcon
                        style={{
                            height: '40%',
                            fill: '#FFFFFF',
                        }}
                    />
                </button>
            </div>
        </form>
    );
}
