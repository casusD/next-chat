'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PrivateRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (user === null) {
			router.push('/login');
		}
	}, [user, router]);

	if (!user) {
		return <div>Загрузка...</div>;
	}

	return <>{children}</>;
}
