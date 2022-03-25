import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Menu, Transition, Dialog } from '@headlessui/react';
import { capitalize } from 'lodash';
import textColorCalculate from '@/modules/textColorCalculate';

import { CogIcon, PencilIcon, TrashIcon } from '@heroicons/react/Outline';
import { HexColorPicker } from 'react-colorful';
export default function EditDropDown({
    onDelete,
    onEdit = () => {},
    data,
    mode,
}) {
    const [isOpen, setIsOpen] = useState(false);
    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            <div className='absolute -right-2 -top-2'>
                <Menu
                    as='div'
                    className='relative flex flex-col justify-center m-0 ring-0'
                >
                    <div>
                        <Menu.Button className='outline-0 w-9 h-9 flex items-center justify-center'>
                            {({ active }) => (
                                <CogIcon
                                    className={`group-hover:opacity-100 w-8 h-8 p-1 ${
                                        active ? 'opacity-100' : 'opacity-0'
                                    } transition-all border border-slate-200 outline-none ease-in-out rounded-full bg-white text-gray-800 cursor-pointer`}
                                />
                            )}
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                    >
                        <div className='shadow-lg rounded-md m-0 cursor-pointer bg-white border border-slate-200 '>
                            <Menu.Items className='outline-none'>
                                <div className='p-1 py-1 gap-1 flex-col flex'>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <div
                                                className={`${
                                                    active
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'text-gray-900'
                                                } p-1 rounded-md`}
                                            >
                                                <PencilIcon
                                                    className='h-4'
                                                    onClick={openModal}
                                                />
                                            </div>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <div
                                                className={`${
                                                    active
                                                        ? 'bg-red-700 text-white'
                                                        : 'text-gray-900'
                                                } p-1 rounded-md`}
                                            >
                                                <TrashIcon
                                                    className='h-4'
                                                    onClick={() => {
                                                        onDelete(data.id);
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </div>
                    </Transition>
                </Menu>
            </div>
            <EditModal
                isOpen={isOpen}
                onEdit={onEdit}
                data={data}
                closeModal={closeModal}
                mode={mode}
            />
        </>
    );
}

function EditModal({ onEdit, data, isOpen, closeModal, mode }) {
    const [color, setColor] = useState(data?.color);
    const [name, setName] = useState(data?.value);
    function resetModal() {
        setColor(data?.color);
        setName(data?.value);
    }
    const closeAndResetModal = () => {
        closeModal();
        setTimeout(resetModal, 500);
    };
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as='div'
                className='fixed inset-0 z-10 overflow-y-auto'
                onClose={closeAndResetModal}
            >
                <div className='min-h-screen px-4 text-center'>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <Dialog.Overlay className='fixed inset-0' />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className='inline-block h-screen align-middle'
                        aria-hidden='true'
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 scale-95'
                        enterTo='opacity-100 scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'
                    >
                        <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                            <Dialog.Title
                                as='h3'
                                className='text-lg font-medium leading-6 text-gray-900'
                            >
                                Edit {capitalize(mode)}
                            </Dialog.Title>
                            <form className='mt-2'>
                                <label className='block'>
                                    <span className='block text-sm font-medium text-slate-700'>
                                        {capitalize(mode)}'s Name
                                    </span>
                                    <input
                                        type='text'
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        required
                                        className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    '
                                    />
                                </label>
                                <label className='block'>
                                    <span className='block text-sm font-medium text-slate-700 mt-4'>
                                        {capitalize(mode)}'s Color
                                    </span>
                                    <div className='flex items-center gap-4'>
                                        <HexColorPicker
                                            color={color}
                                            onChange={setColor}
                                            className='p-1'
                                        />
                                        <div
                                            style={{
                                                backgroundColor: color,
                                                color: textColorCalculate(
                                                    color
                                                ),
                                            }}
                                            className='text-[3rem] overflow-hidden text-center p-2 break-all shadow-lg font-bold w-40 h-40 flex items-center justify-center rounded-lg'
                                        >
                                            {name}
                                        </div>
                                    </div>
                                </label>
                            </form>

                            {mode === 'tier' && (
                                <div className='mt-4 flex flex-row-reverse'>
                                    <button
                                        type='button'
                                        className='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-700 border border-transparent rounded-md hover:bg-indigo-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                                        onClick={() => {
                                            onEdit(data.id, {
                                                id: data.id,
                                                value: name,
                                                color,
                                                textColor:
                                                    textColorCalculate(color),
                                            });
                                            closeModal();
                                        }}
                                    >
                                        Submit
                                    </button>
                                </div>
                            )}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}
