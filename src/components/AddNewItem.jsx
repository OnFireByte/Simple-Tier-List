import React, { useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
export default function AddNewItem({
    setData,
    data,
    newValInput,
    setNewValInput,
}) {
    const [newImgInput, setNewImgInput] = useState('');

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (newValInput) {
                    data.dataByTier.get('_placeholder').push({
                        id: uuid(),
                        value: newValInput,
                        img: newImgInput,
                    });
                    // forceUpdate();
                    setNewValInput('');
                    setNewImgInput('');
                    setData(data);
                }
            }}
            className='m-4'
        >
            <div className='mx-auto p-0 flex items-center justify-center gap-10'>
                <div className='flex flex-col gap-2'>
                    <input
                        type='text'
                        placeholder='New Item'
                        value={newValInput}
                        onChange={(e) => setNewValInput(e.target.value)}
                        className='h-10 p-1 rounded-md focus:border-indigo-600'
                    />
                    <input
                        type='text'
                        placeholder="Item's Image URL"
                        value={newImgInput}
                        onChange={(e) => setNewImgInput(e.target.value)}
                        className='h-10 p-1 rounded-md focus:border-indigo-600'
                    />
                </div>
                <button
                    type='submit'
                    className='rounded-md bg-indigo-700 text-white p-6 font-bold'
                >
                    Go
                </button>
            </div>
        </form>
    );
}
