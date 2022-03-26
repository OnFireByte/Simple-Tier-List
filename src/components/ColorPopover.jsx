import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { HexColorPicker } from 'react-colorful';

export default function ColorPopover({ color, setColor }) {
    return (
        <div>
            <Popover className='relative flex flex-col items-center'>
                {({ open }) => (
                    <>
                        <Popover.Button
                            className={`
                ${open ? '' : 'text-opacity-90'}
                text-gray-800 bg-gray-300 h-16 border-gray-800 shadow-lg group px-3 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                            <div
                                style={{ backgroundColor: color }}
                                className='shadow-lg w-8 h-8 rounded-full mr-2'
                            ></div>
                            <span>Pick Color</span>
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter='transition ease-out duration-200'
                            enterFrom='opacity-0 translate-y-1'
                            enterTo='opacity-100 translate-y-0'
                            leave='transition ease-in duration-150'
                            leaveFrom='opacity-100 translate-y-0'
                            leaveTo='opacity-0 translate-y-1'
                        >
                            <Popover.Panel className='absolute -top-[calc(53rem/4)] z-10 transform'>
                                <HexColorPicker
                                    color={color}
                                    onChange={setColor}
                                    className='shadow-lg'
                                />
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    );
}
