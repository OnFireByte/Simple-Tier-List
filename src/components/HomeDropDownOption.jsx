import { Menu, Transition, Dialog } from '@headlessui/react';
import { Fragment, useState } from 'react';
import {
    CogIcon,
    DownloadIcon,
    DocumentDuplicateIcon,
    DocumentDownloadIcon,
} from '@heroicons/react/solid';

const Modal = ({ isOpen, closeModal, setData, setTierData }) => {
    const [value, setValue] = useState('');
    function reviver(key, value) {
        if (typeof value === 'object' && value !== null) {
            if (value.dataType === 'Map') {
                return new Map(value.value);
            }
        }
        return value;
    }
    const submitHandler = (e) => {
        e.preventDefault();
        const importObj = JSON.parse(value, reviver);
        const tiers = importObj.tiers;
        console.log(importObj);
        setTierData(tiers);
        setData(importObj);
        setValue('');
        closeModal();
    };
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as='div'
                className='fixed inset-0 z-10 overflow-y-auto'
                onClose={closeModal}
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
                                Import Config
                            </Dialog.Title>

                            <form onSubmit={submitHandler}>
                                <div className='mt-2'>
                                    <textarea
                                        id='w3review'
                                        name='w3review'
                                        required
                                        style={{ resize: 'None' }}
                                        autoFocus
                                        placeholder='Paste your config here'
                                        className='p-3 w-full h-36 bg-gray-100 outline-none rounded-md border-gray-300 focus:border-gray-400'
                                        value={value}
                                        onChange={(e) =>
                                            setValue(e.target.value)
                                        }
                                    ></textarea>
                                </div>
                                <div className='mt-4 flex flex-row-reverse'>
                                    <button
                                        type='submit'
                                        className='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-700 border border-transparent rounded-md hover:bg-indigo-900 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default function HomeDropDownOption({
    onDownload,
    data,
    setData,
    setTierData,
    forceUpdate,
}) {
    let [isOpen, setIsOpen] = useState(true);
    function replacer(key, value) {
        if (value instanceof Map) {
            return {
                dataType: 'Map',
                value: Array.from(value.entries()), // or with spread: value: [...value]
            };
        } else {
            return value;
        }
    }
    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }
    return (
        <>
            <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                closeModal={closeModal}
                setData={setData}
                setTierData={setTierData}
            />
            <Menu as='div' className='relative inline-flex flex-col'>
                <div>
                    <Menu.Button className='group h-11 flex justify-center items-center w-full px-2 py-2 bg-indigo-700 mx-2 rounded-md text-white font-bold'>
                        <CogIcon
                            className='h-5 mr-2 text-white group-hover:rotate-180 transition-all ease-in'
                            aria-hidden='true'
                        />
                        Options
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
                    <Menu.Items className='absolute flex flex-col-reverse -right-[2.25rem] bottom-[3.25rem] w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${
                                        active
                                            ? 'bg-indigo-700 text-white'
                                            : 'text-gray-900'
                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    onClick={onDownload}
                                >
                                    <DownloadIcon className='h-5 mr-2' />
                                    Download Tier List
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${
                                        active
                                            ? 'bg-indigo-700 text-white'
                                            : 'text-gray-900'
                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                >
                                    <DocumentDuplicateIcon className='h-5 mr-2' />
                                    Download Config
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${
                                        active
                                            ? 'bg-indigo-700 text-white'
                                            : 'text-gray-900'
                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    onClick={() => {
                                        forceUpdate();
                                        console.log(
                                            JSON.stringify(
                                                data.dataByTier,
                                                replacer
                                            )
                                        );
                                        navigator.clipboard.writeText(
                                            JSON.stringify(data, replacer)
                                        );
                                    }}
                                >
                                    <DocumentDuplicateIcon className='h-5 mr-2' />
                                    Copy Config
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${
                                        active
                                            ? 'bg-indigo-700 text-white'
                                            : 'text-gray-900'
                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    onClick={openModal}
                                >
                                    <DocumentDownloadIcon className='h-5 mr-2' />
                                    Import Config
                                </button>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    );
}
