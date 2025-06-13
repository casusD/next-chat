import Link from 'next/link';

export default function Home() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4'>
			<div className='max-w-md w-full space-y-8 text-center'>
				<div>
					<h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-2'>
						💬 Next Chat
					</h1>
					<p className='text-lg text-gray-600 dark:text-gray-300'>
						Современный UI для чата
					</p>
				</div>

				<div className='space-y-4'>
					<Link
						href='/login'
						className='w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors'
					>
						Войти
					</Link>

					<Link
						href='/register'
						className='w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors'
					>
						Зарегистрироваться
					</Link>
				</div>
			</div>
		</div>
	);
}
