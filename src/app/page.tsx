import Link from 'next/link';

export default function Home() {
	return (
		<div className='min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center p-4'>
			<div className='max-w-md w-full space-y-8 text-center'>
				<div>
					<h1 className='text-4xl font-bold text-[var(--foreground)]'>
						Next Chat
					</h1>
					<p className='text-lg text-[var(--foreground)] opacity-80'>
						Современный UI для чата
					</p>
				</div>

				<div className='space-y-4'>
					<Link
						href='/login'
						className='w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-[var(--primary-text)] bg-[var(--primary)] hover:bg-[var(--primary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors'
					>
						Войти
					</Link>

					<Link
						href='/register'
						className='w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-[var(--primary-text)] bg-[var(--primary)] hover:bg-[var(--primary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors'
					>
						Зарегистрироваться
					</Link>
				</div>
			</div>
		</div>
	);
}
