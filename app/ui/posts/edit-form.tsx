'use client';

import { PostForm } from '@/app/lib/definitions';
import {
	CheckIcon,
	ClockIcon,
	CurrencyDollarIcon,
	UserCircleIcon,
	UserGroupIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updatePost } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { formatSQLTimeForInput, reverseGeocode } from '@/app/lib/utils';
import React, { useState, useEffect } from 'react';

export default function EditPostForm({
	post,
}: {
	post: PostForm;
}) {
	// this not necessary, and invoice.id is the argument need
	const initialState = { message: null, errors: {} };
	const updatePostWithId = updatePost.bind(null, post.id);
	const [state, dispatch] = useFormState(
		updatePostWithId,
		initialState
	);

	const [startLocation, setStartLocation] = useState('');
    const [endLocation, setEndLocation] = useState('');

    useEffect(() => {
        if (post.start_latitude && post.start_longitude) {
            reverseGeocode(post.start_latitude, post.start_longitude)
                .then(address => setStartLocation(address))
                .catch(error => console.error(error));
        }
        if (post.end_latitude && post.end_longitude) {
            reverseGeocode(post.end_latitude, post.end_longitude)
                .then(address => setEndLocation(address))
                .catch(error => console.error(error));
        }
    }, [post.start_latitude, post.start_longitude, post.end_latitude, post.end_longitude]);

	return (
		<form action={dispatch}>
			<div className='rounded-md bg-gray-50 p-4 md:p-6'>

				{/* Carpooler Number */}
				<div className='mb-4'>
					<label
						htmlFor='carpoolers'
						className='mb-2 block text-sm font-medium'>
						Choose the number of people you are looking for:
					</label>
					<div className='relative mt-2 rounded-md'>
						<div className='relative'>
							<input
								id='carpoolers'
								name='carpoolers'
								type='number'
								defaultValue={post.carpoolers}
								step='1'
								placeholder='Enter the number of people you are looking for'
								className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
								aria-describedby='carpooler-error'
							/>
							<UserGroupIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
						</div>
					</div>
					{state.errors?.carpoolers ? (
						<div
							id='carpooler-error'
							aria-live='polite'
							className='mt-2 text-sm text-red-500'>
							{state.errors.carpoolers.map((error: string) => (
								<p key={error}>{error}</p>
							))}
						</div>
					) : null}
				</div>

				{/* Post Status */}
				<fieldset>
					<legend className='mb-2 block text-sm font-medium'>
						Set the post status
					</legend>
					<div className='rounded-md border border-gray-200 bg-white px-[14px] py-3'>
						<div className='flex gap-4'>
							<div className='flex items-center'>
								<input
									id='open'
									name='status'
									type='radio'
									value='open'
									defaultChecked={post.status === 'open'}
									className='h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600'
									aria-describedby='status-error'
								/>
								<label
									htmlFor='open'
									className='ml-2 flex items-center gap-1.5 rounded-full bg-green-500 text-white px-3 py-1.5 text-xs font-medium'>
									Open <ClockIcon className='h-4 w-4' />
								</label>
							</div>
							<div className='flex items-center'>
								<input
									id='closed'
									name='status'
									type='radio'
									value='closed'
									defaultChecked={post.status === 'closed'}
									className='h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600'
									aria-describedby='status-error'
								/>
								<label
									htmlFor='closed'
									className='ml-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-gray-500 text-xs font-medium'>
									Closed <CheckIcon className='h-4 w-4' />
								</label>
							</div>
						</div>
					</div>
				</fieldset>
				{state.errors?.status ? (
					<div
						id='status-error'
						aria-live='polite'
						className='mt-2 text-sm text-red-500'>
						{state.errors.status.map((error: string) => (
							<p key={error}>{error}</p>
						))}
					</div>
				) : null}

				{/* Locations */}
				<div className='mb-4'>
					<label
						htmlFor='startLocation'
						className='mb-2 block text-sm font-medium'>
						Choose start location
					</label>
					<div className='relative mt-2 rounded-md'>
						<div className='relative'>
							<input
								id='startLocation'
								name='startLocation'
								type='text'
								defaultValue={startLocation}
								className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
								aria-describedby='start-location-error'
							/>
							{/* <CurrencyDollarIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' /> */}
						</div>
					</div>
					{state.errors?.startLocation ? (
						<div
							id='start-location-error'
							aria-live='polite'
							className='mt-2 text-sm text-red-500'>
							{state.errors.startLocation.map((error: string) => (
								<p key={error}>{error}</p>
							))}
						</div>
					) : null}
				</div>
				<div className='mb-4'>
					<label
						htmlFor='endLocation'
						className='mb-2 block text-sm font-medium'>
						Choose end location
					</label>
					<div className='relative mt-2 rounded-md'>
						<div className='relative'>
							<input
								id='endLocation'
								name='endLocation'
								type='text'
								defaultValue={endLocation}
								className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
								aria-describedby='end-location-error'
							/>
							{/* <CurrencyDollarIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' /> */}
						</div>
					</div>
					{state.errors?.endLocation ? (
						<div
							id='end-location-error'
							aria-live='polite'
							className='mt-2 text-sm text-red-500'>
							{state.errors.endLocation.map((error: string) => (
								<p key={error}>{error}</p>
							))}
						</div>
					) : null}
				</div>

				{/* Ride Service Dropdown */}
				<div className='mb-4'>
					<label
						htmlFor='rideService'
						className='mb-2 block text-sm font-medium'>
						Choose ride service
					</label>
					<div className='relative'>
						<select
							id='rideService'
							name='rideService'
							className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
							defaultValue={post.ride_service}
							aria-describedby='ride-service-error'>
							<option
								value=''
								disabled>
								Select a ride service
							</option>
							<option value='Grab'>Grab</option>
							<option value='Gojek'>Gojek</option>
							<option value='Ryde'>Ryde</option>
							<option value='ComfortDelGro'>ComfortDelGro</option>
							<option value='TADA'>TADA</option>
						</select>
					</div>
					{state.errors?.rideService ? (
						<div
							id='ride-service-error'
							aria-live='polite'
							className='mt-2 text-sm text-red-500'>
							{state.errors.rideService.map((error: string) => (
								<p key={error}>{error}</p>
							))}
						</div>
					) : null}
				</div>

				{/* Ride Time Input */}
				<div className='mb-4'>
					<label
						htmlFor='rideTime'
						className='mb-2 block text-sm font-medium'>
						Choose ride starting time
					</label>
					<input
						id='rideTime'
						name='rideTime'
						type='datetime-local'
						defaultValue={formatSQLTimeForInput(post.ride_time)}
						className='block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 pl-10'
						aria-describedby='ride-time-error'
					/>
				</div>
				{state.errors?.rideTime ? (
					<div
						id='ride-time-error'
						aria-live='polite'
						className='mt-2 text-sm text-red-500'>
						{state.errors.rideTime.map((error: string) => (
							<p key={error}>{error}</p>
						))}
					</div>
				) : null}

				{/* Optional description */}
				<div className='mb-4'>
					<label
						htmlFor='description'
						className='mb-2 block text-sm font-medium'>
						Description (e.g. price range, smoking policy etc.)
					</label>
					<div className='relative mt-2 rounded-md'>
						<div className='relative'>
							<input
								id='description'
								name='description'
								type='text'
								defaultValue={post.description}
								className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
							/>
							{/* <CurrencyDollarIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' /> */}
						</div>
					</div>
					{state.message ? (
						<div
							id='message-error'
							aria-live='polite'
							className='mt-2 text-sm text-red-500'>
							<p key={state.message}>{state.message}</p>
						</div>
					) : null}
				</div>
			</div>

			<div className='mt-6 flex justify-center md:justify-end gap-4'>
				<Link
					href='/dashboard/posts'
					className='flex w-full text-lg md:w-auto justify-center h-10 items-center rounded-lg bg-gray-100 px-4 md:text-sm md:font-medium text-gray-600 transition-colors hover:bg-gray-200'>
					Cancel
				</Link>
				<Button
					type='submit'
					className='w-full md:w-auto text-center flex justify-center text-lg md:text-sm md:font-medium'>
					Post
				</Button>
			</div>
		</form>
	);
}
