'use client';

import PrivateRoute from '@/components/PrivateRoute';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import {
	addDoc,
	collection,
	orderBy,
	query,
	serverTimestamp,
} from 'firebase/firestore';
import Link from 'next/link';
import { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function ChatPage() {
	const [newMessage, setNewMessage] = useState('');
	const { user } = useAuth();

	const messagesQuery = query(collection(db, 'messages'), orderBy('createdAt'));

	const [messages] = useCollectionData(messagesQuery);

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newMessage.trim()) return;

		await addDoc(collection(db, 'messages'), {
			text: newMessage,
			displayName: user?.displayName,
			photoURL: user?.photoURL,
			createdAt: serverTimestamp(),
			userId: user?.uid,
		});

		setNewMessage('');
	};

	return (
		<PrivateRoute>
			<div className='h-screen bg-gray-50 dark:bg-gray-900 flex flex-col'>
				{/* Header */}
				<div className='bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-3'>
							<div className='w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-medium'>
								💬
							</div>
							<div>
								<h1 className='text-lg font-semibold text-gray-900 dark:text-white'>
									Next Chat
								</h1>
								<p className='text-sm text-gray-500 dark:text-gray-400'>
									Онлайн
								</p>
							</div>
						</div>
						<Link
							href='/profile'
							className='w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
						>
							<span className='text-lg'>👤</span>
						</Link>
					</div>
				</div>

				{/* Messages */}
				<div className='flex-1 overflow-y-auto p-4 space-y-4'>
					{messages?.map((message, index) => (
						<div
							key={index}
							className={`flex ${
								message.userId === user?.uid ? 'justify-end' : 'justify-start'
							} animate-fade-in`}
						>
							<div
								className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
									message.isUser ? 'flex-row-reverse space-x-reverse' : ''
								}`}
							>
								<div
									className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
										message.isUser
											? 'bg-indigo-600 text-white'
											: 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
									}`}
								>
									{message.isUser ? '👤' : '🤖'}
								</div>
								<div
									className={`px-4 py-2 rounded-lg ${
										message.isUser
											? 'bg-indigo-600 text-white'
											: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-gray-700'
									}`}
								>
									<p className='text-sm'>{message.text}</p>
									<p
										className={`text-xs mt-1 ${
											message.isUser
												? 'text-indigo-200'
												: 'text-gray-500 dark:text-gray-400'
										}`}
									>
										{message.createdAt
											? message.createdAt.toDate().toLocaleTimeString()
											: '...'}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Message Input */}
				<div className='bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4'>
					<form onSubmit={handleSendMessage} className='flex space-x-3'>
						<input
							type='text'
							value={newMessage}
							onChange={e => setNewMessage(e.target.value)}
							placeholder='Напишите сообщение...'
							className='flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
						/>
						<button
							type='submit'
							disabled={!newMessage.trim()}
							className='px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
						>
							Отправить
						</button>
					</form>
				</div>
			</div>
		</PrivateRoute>
	);
}
