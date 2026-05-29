'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRole, getToken } from '@/lib/auth';

export default function RequireAuth({
  children,
  admin,
}: {
  children: React.ReactNode;
  admin?: boolean;
}) {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      router.replace('/login');
      return;
    }
    if (admin && getRole() !== 'admin') {
      router.replace('/');
      return;
    }
    setOk(true);
  }, [router, admin]);

  if (!ok) return null;
  return children;
}
