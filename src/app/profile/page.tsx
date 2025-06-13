'use client';

import PrivateRoute from '@/components/PrivateRoute';
import { useAuth } from '@/context/AuthContext';
import { logoutUser } from '@/services/authService';
import Link from 'next/link';

export default function ProfilePage() {
	const { user } = useAuth();

	return (
		<PrivateRoute>
			<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
				{/* Header */}
				<div className='bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700'>
					<div className='max-w-4xl mx-auto px-4 py-4'>
						<div className='flex items-center justify-between'>
							<Link
								href='/chat'
								className='flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors'
							>
								<span>←</span>
								<span>Назад к чату</span>
							</Link>
							<h1 className='text-xl font-semibold text-gray-900 dark:text-white'>
								Профиль
							</h1>
							<div className='w-20'></div> {/* Spacer for centering */}
						</div>
					</div>
				</div>

				{/* Profile Content */}
				<div className='max-w-2xl mx-auto px-4 py-8'>
					<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden'>
						{/* Profile Header */}
						<div className='bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-8'>
							<div className='flex items-center space-x-4'>
								<div className='w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg'>
									{user?.photoURL}
								</div>
								<div className='text-white'>
									<h2 className='text-2xl font-bold'>{user?.displayName}</h2>
									<p className='text-indigo-100'>{user?.email}</p>
									<p className='text-indigo-200 text-sm mt-1'>
										С нами с {user?.metadata.creationTime}
									</p>
								</div>
							</div>
						</div>

						{/* Profile Details */}
						<div className='p-6 space-y-6'>
							<div>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
									Информация о профиле
								</h3>

								<div className='space-y-4'>
									<div className='flex items-center justify-between py-3 px-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
										<div className='flex items-center space-x-3'>
											<span className='text-lg'>👤</span>
											<div>
												<p className='text-sm font-medium text-gray-900 dark:text-white'>
													Полное имя
												</p>
												<p className='text-sm text-gray-500 dark:text-gray-400'>
													{user?.displayName}
												</p>
											</div>
										</div>
										<button className='text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 text-sm'>
											Изменить
										</button>
									</div>

									<div className='flex items-center justify-between py-3 px-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
										<div className='flex items-center space-x-3'>
											<span className='text-lg'>📧</span>
											<div>
												<p className='text-sm font-medium text-gray-900 dark:text-white'>
													Email
												</p>
												<p className='text-sm text-gray-500 dark:text-gray-400'>
													{user?.email}
												</p>
											</div>
										</div>
										<button className='text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 text-sm'>
											Изменить
										</button>
									</div>

									<div className='flex items-center justify-between py-3 px-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
										<div className='flex items-center space-x-3'>
											<span className='text-lg'>🔒</span>
											<div>
												<p className='text-sm font-medium text-gray-900 dark:text-white'>
													Пароль
												</p>
												<p className='text-sm text-gray-500 dark:text-gray-400'>
													••••••••
												</p>
											</div>
										</div>
										<button className='text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 text-sm'>
											Изменить
										</button>
									</div>
								</div>
							</div>

							{/* Settings */}
							<div>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
									Настройки
								</h3>

								<div className='space-y-3'>
									<button className='w-full flex items-center justify-between py-3 px-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'>
										<div className='flex items-center space-x-3'>
											<span className='text-lg'>🔔</span>
											<span className='text-sm font-medium text-gray-900 dark:text-white'>
												Уведомления
											</span>
										</div>
										<span className='text-sm text-gray-500 dark:text-gray-400'>
											→
										</span>
									</button>

									<button className='w-full flex items-center justify-between py-3 px-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'>
										<div className='flex items-center space-x-3'>
											<span className='text-lg'>🌙</span>
											<span className='text-sm font-medium text-gray-900 dark:text-white'>
												Тёмная тема
											</span>
										</div>
										<span className='text-sm text-gray-500 dark:text-gray-400'>
											→
										</span>
									</button>

									<button className='w-full flex items-center justify-between py-3 px-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'>
										<div className='flex items-center space-x-3'>
											<span className='text-lg'>🔐</span>
											<span className='text-sm font-medium text-gray-900 dark:text-white'>
												Приватность
											</span>
										</div>
										<span className='text-sm text-gray-500 dark:text-gray-400'>
											→
										</span>
									</button>
								</div>
							</div>

							{/* Logout Button */}
							<div className='pt-6 border-t border-gray-200 dark:border-gray-700'>
								<button
									onClick={() => logoutUser()}
									className='w-full flex items-center justify-center space-x-2 py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors'
								>
									<span className='text-lg'>🚪</span>
									<span className='font-medium'>Выйти из аккаунта</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PrivateRoute>
	);
}
