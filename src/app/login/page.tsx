'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import { saveToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Card, CardBody, CardHeader, Input, Button, Divider } from "@heroui/react";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const router = useRouter();

    const sumbit = async () => {
        try {
            const res = await api.post('/auth/login', { email, password });
            saveToken(res.data.access_token);
            router.push('/profile');
            console.log("Успешно");
        } catch {
            console.log("Не найдено");
        }
    };

    return (
        <div className="container mx-auto px-4 min-h-[85vh] flex items-center justify-center max-w-md">
            <Card className="w-full rounded-2xl p-6 bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800" shadow="lg">
                <CardHeader className="flex flex-col items-center pb-4">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">
                        Войти в аккаунт
                    </h1>
                </CardHeader>
                
                <Divider className="my-2 bg-neutral-800" />

                <CardBody className="flex flex-col gap-6 pt-4">
                    <Input
                        type="email"
                        label={<span className="text-neutral-200 font-medium">Email</span>}
                        placeholder="example@mail.com"
                        labelPlacement="outside"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        variant="bordered"
                        className="w-full"
                        classNames={{
                            input: "text-white placeholder:text-neutral-500",
                            inputWrapper: "border-neutral-700 hover:border-neutral-500 focus-within:!border-success"
                        }}
                    />

                    <Input
                        type="password"
                        label={<span className="text-neutral-200 font-medium">Пароль</span>}
                        placeholder="••••••••"
                        labelPlacement="outside"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        variant="bordered"
                        className="w-full"
                        classNames={{
                            input: "text-white placeholder:text-neutral-500",
                            inputWrapper: "border-neutral-700 hover:border-neutral-500 focus-within:!border-success"
                        }}
                    />

                    <Button 
                        color="success"
                        className="rounded-full w-full mt-4 font-bold text-black bg-emerald-400 hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-500/20 py-6 text-base"
                        onPress={sumbit}
                    >
                        Подтвердить
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
}
