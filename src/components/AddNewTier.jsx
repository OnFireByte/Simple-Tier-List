import React from 'react';
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
                        .includes(newTierInput.toLowerCase())
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
            <input
                type='text'
                placeholder='New Tier'
                value={newTierInput}
                onChange={(e) => setNewTierInput(e.target.value)}
            />
            <button className='rounded-md bg-indigo-700 text-white p-6 font-bold'>
                Go
            </button>
        </form>
    );
}
