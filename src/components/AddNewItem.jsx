import React from 'react';
import { v4 as uuid } from 'uuid';
export default function AddNewItem({
    setData,
    data,
    setNewValInput,
    newValInput,
}) {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (newValInput) {
                    data.dataByTier['_placeholder'].push({
                        id: uuid(),
                        value: newValInput,
                    });
                    setData(data);
                    setNewValInput('');
                }
            }}
            className='m-4'
        >
            <div className='mx-auto p-0 flex items-center justify-center gap-10'>
                <input
                    type='text'
                    placeholder='New Item'
                    value={newValInput}
                    onChange={(e) => setNewValInput(e.target.value)}
                    className=''
                />
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
