import { Menu, Transition } from '@headlessui/react';
import { CogIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline';
import { Fragment, useState } from 'react';
import EditModal from './EditModal';

export default function EditDropDown({
    onDelete,
    onEdit,
    data,
    mode,
    forceUpdate,
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
                                                onClick={openModal}
                                            >
                                                <PencilIcon className='h-4 mx-auto' />
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
                                                onClick={() => {
                                                    onDelete(data.id);
                                                }}
                                            >
                                                <TrashIcon className='h-4 mx-auto' />
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
                forceUpdate={forceUpdate}
            />
        </>
    );
}
