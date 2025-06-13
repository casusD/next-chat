'use client';

import { registerUser } from '@/services/authService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const user = await registerUser(
				formData.email,
				formData.password,
				formData.name
			);
			console.log(user);
			router.push('/chat');
		} catch (error) {
			console.error('Ошибка регистрации:', error);
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4'>
			<div className='max-w-md w-full space-y-8'>
				<div className='text-center'>
					<h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
						Создать аккаунт
					</h2>
					<p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
						Или{' '}
						<Link
							href='/login'
							className='font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400'
						>
							войдите в существующий
						</Link>
					</p>
				</div>

				<div className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg'>
					<form className='space-y-6' onSubmit={handleRegister}>
						<div>
							<label
								htmlFor='name'
								className='block text-sm font-medium text-gray-700 dark:text-gray-300'
							>
								Полное имя
							</label>
							<input
								id='name'
								name='name'
								type='text'
								autoComplete='name'
								required
								value={formData.name}
								onChange={handleChange}
								className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
								placeholder='Иван Иванов'
							/>
						</div>

						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-gray-700 dark:text-gray-300'
							>
								Email адрес
							</label>
							<input
								id='email'
								name='email'
								type='email'
								autoComplete='email'
								required
								value={formData.email}
								onChange={handleChange}
								className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
								placeholder='your@email.com'
							/>
						</div>

						<div>
							<label
								htmlFor='password'
								className='block text-sm font-medium text-gray-700 dark:text-gray-300'
							>
								Пароль
							</label>
							<input
								id='password'
								name='password'
								type='password'
								autoComplete='new-password'
								required
								value={formData.password}
								onChange={handleChange}
								className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
								placeholder='••••••••'
							/>
						</div>

						<div>
							<label
								htmlFor='confirmPassword'
								className='block text-sm font-medium text-gray-700 dark:text-gray-300'
							>
								Подтвердите пароль
							</label>
							<input
								id='confirmPassword'
								name='confirmPassword'
								type='password'
								autoComplete='new-password'
								required
								value={formData.confirmPassword}
								onChange={handleChange}
								className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
								placeholder='••••••••'
							/>
						</div>

						<div className='flex items-center'>
							<input
								id='agree-terms'
								name='agree-terms'
								type='checkbox'
								required
								className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
							/>
							<label
								htmlFor='agree-terms'
								className='ml-2 block text-sm text-gray-900 dark:text-gray-300'
							>
								Я согласен с{' '}
								<a
									href='#'
									className='text-indigo-600 hover:text-indigo-500 dark:text-indigo-400'
								>
									условиями использования
								</a>{' '}
								и{' '}
								<a
									href='#'
									className='text-indigo-600 hover:text-indigo-500 dark:text-indigo-400'
								>
									политикой конфиденциальности
								</a>
							</label>
						</div>

						<div>
							<button
								type='submit'
								className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors'
							>
								Создать аккаунт
							</button>
						</div>
					</form>

					<div className='mt-6'>
						<div className='relative'>
							<div className='absolute inset-0 flex items-center'>
								<div className='w-full border-t border-gray-300 dark:border-gray-600' />
							</div>
							<div className='relative flex justify-center text-sm'>
								<span className='px-2 bg-white dark:bg-gray-800 text-gray-500'>
									Или
								</span>
							</div>
						</div>

						<div className='mt-6'>
							<Link
								href='/'
								className='w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors'
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
