"use client"
import { Form, Input, Card, CardHeader, CardBody, Button, TableHeader, Table, TableColumn, TableBody, TableRow, TableCell, Chip, Avatar } from "@heroui/react";
import { useState, useEffect } from "react";
import {api} from '@/lib/api';
import { UserPlus, Trash2, Shield, User as UserIcon, Mail, Lock } from 'lucide-react';

interface User {
    email: string,
    role: string,
    id: string,
    password: string;
}

const AdminPanel = () => {

    const [users, setUsers] = useState<User[]>([])

    const [email,setEmail]=useState('');
    const [password,setPasword]=useState(''); 
    const [role, setRole]=useState('');

    const [formData, setFormData] = useState({
        password: '',
        email: '',
        role: 'user'
    })

    const reloadUsers = async () => {
        const res2 = await api.get('/auth/getAll');
        setUsers(res2.data.status);
    };
    
    useEffect(() => {
        reloadUsers();
    }, [])
      
    const [errors, setErrors] = useState<{[key: string]: string}>({})

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validateForm = () => {
        const newErrors : {[key: string]: string} = {}

        if(!formData.password.trim()) {
            newErrors.password = "Пароль обязателен"
        } else if(formData.password.length < 6) {
            newErrors.password = "Пароль должен содержать минимум 6 символов"
        }

        if(!formData.email.trim()) {
            newErrors.email = "Email обязателен"
        } 
        else if(!validateEmail(formData.email)) {
            newErrors.email = "Некорректный email"
        }
        else if(users.some(user => user.email === formData.email)) {
            newErrors.email = "Пользователь с таким email уже существует"
        }
        
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if(!validateForm()) {
            return
        }

        const role = formData.role === 'mod' ? 'seller' : formData.role;

        await api.post('/auth/register', {
            email: formData.email,
            password: formData.password,
            role,
        });
        await reloadUsers();
        setFormData({email: '', role: 'user', password: ''})
        setErrors({})
    }

    const handleDeleteUser = async(userId: string, email: string) => {
        await api.post('/auth/delete', { email});
        await reloadUsers();
    }

    const getRoleColor = (role: string) => {
        switch(role) {
            case 'admin':
                return 'danger';
            case 'seller':
                return 'warning';
            default:
                return 'primary';
        }
    }

    const getRoleIcon = (role: string) => {
        switch(role) {
            case 'admin':
                return <Shield size={14} />;
            case 'seller':
                return <Shield size={14} />;
            default:
                return <UserIcon size={14} />;
        }
    }

    const getRoleLabel = (role: string) => {
        switch(role) {
            case 'admin':
                return 'Администратор';
            case 'seller':
                return 'Продавец';
            default:
                return 'Пользователь';
        }
    }

    return ( 
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="mb-10 text-center">
              
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-white bg-clip-text text-transparent mb-2">
                    Админ панель
                </h1>
                <p className="text-gray-500">Управление пользователями системы</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                <Card className="w-full border-0 shadow-xl rounded-2xl overflow-hidden">
   
                    <CardHeader className="pb-0 pt-6">
                        <div className="flex items-center gap-2">
                     
                            <h2 className="text-xl font-bold text-black">Добавить пользователя</h2>
                        </div>
                    </CardHeader>
                    <CardBody className="py-6">
                        <Form className="w-full" onSubmit={handleSubmit}>
                            <div className="space-y-5 w-full">
                                <Input 
                                    label="Email"
                                    placeholder="ivan@example.com"
                                    startContent={<Mail size={16} className="text-gray-400" />}
                                    value={formData.email}
                                    classNames={{
                                        inputWrapper: 'bg-gray-50 rounded-xl border-1 border-gray-200 hover:border-gray-300 transition-colors',
                                        input: 'text-sm text-black focus:outline-none',
                                        label: 'text-gray-700 font-medium'
                                    }}
                                    onChange={(e) => setFormData({...formData, email: e.target.value })}
                                    isInvalid={!!errors.email}
                                    errorMessage={errors.email}
                                />
                                <Input 
                                    label="Пароль"
                                    placeholder="Минимум 6 символов"
                                    type="password"
                                    startContent={<Lock size={16} className="text-gray-400" />}
                                    value={formData.password}
                                    classNames={{
                                        inputWrapper: 'bg-gray-50 rounded-xl border-1 border-gray-200 hover:border-gray-300 transition-colors',
                                        input: 'text-sm text-black focus:outline-none',
                                        label: 'text-gray-700 font-medium'
                                    }} 
                                    onChange={(e) => setFormData({...formData, password: e.target.value })}
                                    isInvalid={!!errors.password}
                                    errorMessage={errors.password}
                                />
                                
                                <div className="space-y-2">
                                    <label className="text-gray-700 font-medium text-sm">Роль</label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({...formData, role: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 border-1 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700"
                                    >
                                        <option value="user">Пользователь</option>
                                        <option value="admin">Администратор</option>
                                        <option value="seller">Продавец</option>
                                    </select>
                                </div>

                                <Button 
                                    color="primary" 
                                    type="submit"
                                    className="w-full rounded-xl bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                                    size="lg"
                                >
                                    Добавить пользователя
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>


                <Card className="w-full border-0 shadow-xl rounded-2xl overflow-hidden">
                    <CardHeader className="pb-0 pt-6">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                           
                                <h2 className="text-xl font-bold text-black">Список пользователей</h2>
                            </div>
                            <Chip color="primary" variant="flat" className="rounded-full">
                                Всего: {users.length}
                            </Chip>
                        </div>
                    </CardHeader>
                    <CardBody className="py-6 h-[330px] flex flex-col"> 

                        <div className="h-full min-h-0 overflow-y-auto">
                        <Table 
                    aria-label="Список пользователей"
                    isHeaderSticky 
                    classNames={{
                        wrapper: 'rounded-xl shadow-none max-h-full', 
                        th: 'bg-gray-50 text-gray-700 font-semibold',
                        td: 'py-3'}}>
                                <TableHeader>
                                    <TableColumn className="font-semibold">ПОЛЬЗОВАТЕЛЬ</TableColumn>
                                    <TableColumn className="font-semibold">РОЛЬ</TableColumn>
                                    <TableColumn className="font-semibold text-center">ДЕЙСТВИЕ</TableColumn>
                                </TableHeader>
                                <TableBody emptyContent={"Нет пользователей"}>
                                    {users.map((user, index) => (
                                        <TableRow key={user.id} className="hover:bg-gray-50 transition-colors">
                                            <TableCell>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-800">{user.email}</p>
                                                    </div>
                                                
                                            </TableCell>
                                            <TableCell>
                                                <Chip 
                                                    color={getRoleColor(user.role)}
                                                    variant="flat"
                                                    size="sm"
                                                    startContent={getRoleIcon(user.role)}
                                                    className="rounded-full px-3"
                                                >
                                                    {getRoleLabel(user.role)}
                                                </Chip>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Button 
                                                    isIconOnly
                                                    color="danger" 
                                                    size="sm" 
                                                    variant="light"
                                                    onPress={() => handleDeleteUser(user.id, user.email)}
                                                    className="hover:bg-red-50 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
 
export default AdminPanel;