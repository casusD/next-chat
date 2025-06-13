'use client';

import { loginUser } from '@/services/authService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const user = await loginUser(email, password);
			console.log(user);
			router.push('/chat');
		} catch (error) {
			console.error('Ошибка входа:', error);
		}
	};

	return (
		<div className='min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center p-4'>
			<div className='max-w-md w-full space-y-8'>
				<div className='text-center'>
					<h2 className='text-3xl font-bold text-[var(--foreground)]'>
						Вход в аккаунт
					</h2>
					<p className='mt-2 text-sm text-[var(--button-text)]'>
						Или{' '}
						<Link
							href='/register'
							className='font-medium text-[var(--primary)] hover:text-[var(--primary-hover)]'
						>
							создайте новый аккаунт
						</Link>
					</p>
				</div>

				<div className='bg-[var(--card-bg)] p-8 rounded-xl shadow-lg border border-[var(--card-border)]'>
					<form className='space-y-6' onSubmit={handleLogin}>
						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-[var(--foreground)]'
							>
								Email адрес
							</label>
							<input
								id='email'
								name='email'
								type='email'
								autoComplete='email'
								required
								value={email}
								onChange={e => setEmail(e.target.value)}
								className='mt-1 block w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-md shadow-sm placeholder-[var(--button-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)]'
								placeholder='your@email.com'
							/>
						</div>

						<div>
							<label
								htmlFor='password'
								className='block text-sm font-medium text-[var(--foreground)]'
							>
								Пароль
							</label>
							<input
								id='password'
								name='password'
								type='password'
								autoComplete='current-password'
								required
								value={password}
								onChange={e => setPassword(e.target.value)}
								className='mt-1 block w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-md shadow-sm placeholder-[var(--button-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-[var(--foreground)]'
								placeholder='••••••••'
							/>
						</div>

						{/* <div className='flex items-center justify-between'>
							<div className='flex items-center'>
								<input
									id='remember-me'
									name='remember-me'
									type='checkbox'
									className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
								/>
								<label
									htmlFor='remember-me'
									className='ml-2 block text-sm text-gray-900 dark:text-gray-300'
								>
									Запомнить меня
								</label>
							</div>

							<div className='text-sm'>
								<a
									href='#'
									className='font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400'
								>
									Забыли пароль?
								</a>
							</div>
						</div> */}

						<div>
							<button
								type='submit'
								className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[var(--primary-text)] bg-[var(--primary)] hover:bg-[var(--primary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] transition-colors'
							>
								Войти
							</button>
						</div>
					</form>

					<div className='mt-6'>
						<div className='relative'>
							<div className='absolute inset-0 flex items-center'>
								<div className='w-full border-t border-[var(--card-border)]' />
							</div>
							<div className='relative flex justify-center text-sm'>
								<span className='px-2 bg-[var(--card-bg)] text-[var(--button-text)]'>
									Или
								</span>
							</div>
						</div>

						<div className='mt-6'>
							<Link
								href='/'
								className='w-full flex justify-center py-2 px-4 border border-[var(--input-border)] rounded-md shadow-sm text-sm font-medium text-[var(--foreground)] bg-[var(--button-bg)] hover:bg-[var(--button-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] transition-colors'
							>
								← Назад на главную
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
