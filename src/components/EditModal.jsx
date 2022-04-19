import textColorCalculate from '@/modules/textColorCalculate';
import { Dialog, Transition } from '@headlessui/react';
import { capitalize } from 'lodash';
import { Fragment, useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { DebounceInput } from 'react-debounce-input';
import fontSize from '../modules/fontSize';

export default function EditModal({
    onEdit,
    forceUpdate,
    data,
    isOpen,
    closeModal,
    mode,
}) {
    const [color, setColor] = useState(data?.color || '#000000');
    const [url, setUrl] = useState(data?.img || '');
    const [name, setName] = useState(data?.value);
    useEffect(() => {
        if (!/^http:\/\//.test(url) && !/^https:\/\//.test(url) && url) {
            setUrl('http://' + url);
        }
    }, [url]);
    function resetModal() {
        setColor(data?.color);
        setName(data?.value);
        setUrl(data?.img);
    }
    const closeAndResetModal = () => {
        closeModal();
        setTimeout(resetModal, 1000);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as='div'
                className='fixed inset-0 overflow-y-auto z-[100]'
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
                            <form
                                className='mt-2'
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    let newData;
                                    if (mode == 'tier') {
                                        newData = {
                                            id: data.id,
                                            value: name,
                                            color,
                                            textColor:
                                                textColorCalculate(color),
                                        };
                                    } else if (mode == 'item') {
                                        newData = {
                                            id: data.id,
                                            value: name,
                                            img: url,
                                            textColor:
                                                textColorCalculate(color),
                                        };
                                    }
                                    onEdit(data.id, newData);
                                    closeModal();
                                    forceUpdate();
                                }}
                            >
                                <label className='block'>
                                    <span className='block text-sm font-medium text-slate-700'>
                                        {capitalize(mode)}'s Name
                                    </span>
                                    <input
                                        type='text'
                                        maxLength='20'
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    '
                                    />
                                </label>
                                {mode == 'tier' && (
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
                                                    fontSize:
                                                        parseFloat(
                                                            fontSize(name)
                                                        ) *
                                                            1.7 +
                                                        'rem',
                                                    wordBreak: 'break-word',
                                                }}
                                                className='overflow-hidden select-none relative text-center p-2 shadow-lg font-bold w-40 h-40 flex items-center justify-center rounded-lg'
                                            >
                                                {name}
                                            </div>
                                        </div>
                                    </label>
                                )}
                                {mode == 'item' && (
                                    <>
                                        <label className='block'>
                                            <span className='block text-sm mt-4 font-medium text-slate-700'>
                                                {capitalize(mode)}'s Image URL
                                            </span>
                                            <DebounceInput
                                                type='url'
                                                minLength={2}
                                                debounceTimeout={300}
                                                value={url}
                                                onChange={(e) =>
                                                    setUrl(e.target.value)
                                                }
                                                className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    '
                                            />
                                        </label>
                                        <div className='break-all overflow-hidden h-24 mx-auto border-2 mt-6 relative min-w-[6rem] max-w-[8rem] my-2 flex justify-center shadow-lg items-center bg-white rounded-md'>
                                            {url ? (
                                                <div className='rounded-md overflow-hidden h-full w-full'>
                                                    <img
                                                        src={url}
                                                        className='peer object-cover relative h-full w-full'
                                                        alt={name}
                                                    />
                                                </div>
                                            ) : (
                                                <>{name}</>
                                            )}
                                        </div>
                                    </>
                                )}
                                <div className='mt-4 flex flex-row-reverse'>
                                    <button
                                        type='submit'
                                        className='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-700 border border-transparent rounded-md hover:bg-indigo-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
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
}
