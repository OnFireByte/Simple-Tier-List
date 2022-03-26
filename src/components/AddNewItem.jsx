import React, { useState, useCallback } from 'react';
import { generate as uuid } from 'short-uuid';

export default function AddNewItem({ setData, data, forceUpdate }) {
    const [newImgInput, setNewImgInput] = useState('');
    const [newValInput, setNewValInput] = useState('');

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (newValInput || newImgInput) {
                    data.dataByTier.get('_placeholder').push({
                        id: uuid(),
                        value: newValInput,
                        img: newImgInput,
                    });
                    forceUpdate();
                    setNewValInput('');
                    setNewImgInput('');
                    setData(data);
                }
            }}
            className='m-4 ring-2 ring-gray-200 box-border bg-white  px-4 h-24 border-insi rounded-md'
        >
            <div className='mx-auto p-0 flex h-full items-center justify-center gap-4 '>
                <div className='flex h-full flex-col gap-3 justify-center items-center'>
                    <input
                        type='text'
                        placeholder='New Item'
                        value={newValInput}
                        onChange={(e) => setNewValInput(e.target.value)}
                        className='h-8 p-1 rounded-md outline-none focus:ring-indigo-600 focus:ring-2'
                    />
                    <input
                        type='text'
                        placeholder="Item's Image URL"
                        value={newImgInput}
                        onChange={(e) => setNewImgInput(e.target.value)}
                        className='h-8 p-1 rounded-md outline-none focus:ring-indigo-600 focus:ring-2'
                    />
                </div>
                <button
                    type='submit'
                    className='rounded-md hover:bg-indigo-900 bg-indigo-700 text-white w-16 py-3 flex items-center justify-center font-bold'
                >
                    Add
                </button>
            </div>
        </form>
    );
}
