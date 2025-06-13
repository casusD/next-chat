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
			<div className='h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col'>
				{/* Header */}
				<div className='bg-[var(--card-bg)] border-b border-[var(--card-border)] p-4'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-3'>
							<div className='w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center text-[var(--primary-text)] font-medium'>
								💬
							</div>
							<div>
								<h1 className='text-lg font-semibold text-[var(--foreground)]'>
									Next Chat
								</h1>
								<p className='text-sm text-[var(--button-text)]'>Онлайн</p>
							</div>
						</div>
						<Link
							href='/profile'
							className='w-10 h-10 bg-[var(--button-bg)] hover:bg-[var(--button-hover)] rounded-full flex items-center justify-center transition-colors'
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
											? 'bg-[var(--primary)] text-[var(--primary-text)]'
											: 'bg-[var(--button-bg)] text-[var(--button-text)]'
									}`}
								>
									{message.isUser ? '🤖' : '👤'}
								</div>
								<div
									className={`px-4 py-2 rounded-lg ${
										message.isUser
											? 'bg-[var(--primary)] text-[var(--primary-text)]'
											: 'bg-[var(--card-bg)] text-[var(--foreground)] border border-[var(--card-border)]'
									}`}
								>
									<p className='text-sm'>{message.text}</p>
									<p
										className={`text-xs mt-1 flex justify-between gap-2 ${
											message.isUser
												? 'text-[var(--primary-text)] opacity-80'
												: 'text-[var(--button-text)]'
										}`}
									>
										<span>{message.displayName}</span>
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
				<form
					onSubmit={handleSendMessage}
					className='p-4 border-t border-[var(--card-border)] bg-[var(--card-bg)]'
				>
					<div className='flex space-x-4'>
						<input
							type='text'
							value={newMessage}
							onChange={e => setNewMessage(e.target.value)}
							placeholder='Введите сообщение...'
							className='flex-1 px-4 py-2 rounded-lg bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--foreground)] placeholder-[var(--button-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]'
						/>
						<button
							type='submit'
							className='px-6 py-2 bg-[var(--primary)] text-[var(--primary-text)] rounded-lg hover:bg-[var(--primary-hover)] transition-colors'
						>
							Отправить
						</button>
					</div>
				</form>
			</div>
		</PrivateRoute>
	);
}
