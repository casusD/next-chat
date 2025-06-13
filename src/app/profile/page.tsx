'use client';

import PrivateRoute from '@/components/PrivateRoute';
import { useAuth } from '@/context/AuthContext';
import { logoutUser } from '@/services/authService';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
	const { user } = useAuth();
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// After mounting, we have access to the theme
	useEffect(() => setMounted(true), []);

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	return (
		<PrivateRoute>
			<div className='min-h-screen bg-[var(--background)] text-[var(--foreground)]'>
				{/* Header */}
				<div className='bg-[var(--card-bg)] border-b border-[var(--card-border)]'>
					<div className='max-w-4xl mx-auto px-4 py-4'>
						<div className='flex items-center justify-between'>
							<Link
								href='/chat'
								className='flex items-center space-x-2 text-[var(--button-text)] hover:text-[var(--foreground)] transition-colors'
							>
								<span>←</span>
								<span>Назад к чату</span>
							</Link>
							<h1 className='text-xl font-semibold text-[var(--foreground)]'>
								Профиль
							</h1>
							<div className='w-20'></div> {/* Spacer for centering */}
						</div>
					</div>
				</div>

				{/* Profile Content */}
				<div className='max-w-4xl mx-auto px-4 py-8'>
					<div className='bg-[var(--card-bg)] rounded-xl shadow-lg overflow-hidden border border-[var(--card-border)]'>
						{/* Profile Header */}
						<div className='bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] px-6 py-8'>
							<div className='flex items-center space-x-4'>
								<div className='w-20 h-20 bg-[var(--card-bg)] rounded-full flex items-center justify-center text-3xl shadow-lg'>
									👤
								</div>
								<div className='text-[var(--primary-text)]'>
									<h2 className='text-2xl font-bold'>{user?.displayName}</h2>
									<p className='text-[var(--primary-text)] opacity-80'>
										{user?.email}
									</p>
									<p className='text-[var(--primary-text)] opacity-60 text-sm mt-1'>
										С нами с {user?.metadata.creationTime}
									</p>
								</div>
							</div>
						</div>

						{/* Profile Details */}
						<div className='p-6 space-y-6'>
							<div>
								<h3 className='text-lg font-semibold text-[var(--foreground)] mb-4'>
									Информация о профиле
								</h3>

								<div className='space-y-4'>
									<div className='flex items-center justify-between py-3 px-4 bg-[var(--button-bg)] rounded-lg'>
										<div className='flex items-center space-x-3'>
											<span className='text-lg'>👤</span>
											<div>
												<p className='text-sm font-medium text-[var(--foreground)]'>
													Полное имя
												</p>
												<p className='text-sm text-[var(--button-text)]'>
													{user?.displayName}
												</p>
											</div>
										</div>
										<button className='text-[var(--primary)] hover:text-[var(--primary-hover)] text-sm'>
											Изменить
										</button>
									</div>

									<div className='flex items-center justify-between py-3 px-4 bg-[var(--button-bg)] rounded-lg'>
										<div className='flex items-center space-x-3'>
											<span className='text-lg'>📧</span>
											<div>
												<p className='text-sm font-medium text-[var(--foreground)]'>
													Email
												</p>
												<p className='text-sm text-[var(--button-text)]'>
													{user?.email}
												</p>
											</div>
										</div>
										<button className='text-[var(--primary)] hover:text-[var(--primary-hover)] text-sm'>
											Изменить
										</button>
									</div>

									<div className='flex items-center justify-between py-3 px-4 bg-[var(--button-bg)] rounded-lg'>
										<div className='flex items-center space-x-3'>
											<span className='text-lg'>🔒</span>
											<div>
												<p className='text-sm font-medium text-[var(--foreground)]'>
													Пароль
												</p>
												<p className='text-sm text-[var(--button-text)]'>
													••••••••
												</p>
											</div>
										</div>
										<button className='text-[var(--primary)] hover:text-[var(--primary-hover)] text-sm'>
											Изменить
										</button>
									</div>
								</div>
							</div>

							{/* Settings */}
							<div>
								<h3 className='text-lg font-semibold text-[var(--foreground)] mb-4'>
									Настройки
								</h3>

								<div className='space-y-4'>
									<button className='w-full flex items-center justify-between py-3 px-4 bg-[var(--button-bg)] hover:bg-[var(--button-hover)] rounded-lg transition-colors'>
										<div className='flex items-center space-x-3'>
											<span className='text-lg'>🔔</span>
											<span className='text-sm font-medium text-[var(--foreground)]'>
												Уведомления
											</span>
										</div>
										<span className='text-sm text-[var(--button-text)]'>→</span>
									</button>

									<button
										onClick={toggleTheme}
										className='w-full flex items-center justify-between py-3 px-4 bg-[var(--button-bg)] hover:bg-[var(--button-hover)] rounded-lg transition-colors'
									>
										<div className='flex items-center space-x-3'>
											<span className='text-lg'>
												{mounted && theme === 'dark' ? '🌙' : '☀️'}
											</span>
											<span className='text-sm font-medium text-[var(--foreground)]'>
												{mounted && theme === 'dark'
													? 'Тёмная тема'
													: 'Светлая тема'}
											</span>
										</div>
										<span className='text-sm text-[var(--button-text)]'>
											{mounted && theme === 'dark' ? '→' : '←'}
										</span>
									</button>
								</div>
							</div>

							{/* Logout Button */}
							<div className='pt-6 border-t border-[var(--card-border)]'>
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
