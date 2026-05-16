"use client"
import { Form, Input, Card, CardHeader, CardBody, Button, TableHeader, Table, TableColumn, TableBody, TableRow, TableCell, form } from "@heroui/react";
import { useState, useEffect } from "react";
import {api} from '@/lib/api';

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
  useEffect(() => {const GetUsers = async() => {
        const res2 = await api.get('/auth/getAll')
        console.log(res2.data.status)
        setUsers(res2.data.status)
    };
    GetUsers();
},[])
const AddUser = async() => {
    const email = formData.email;
    const password = formData.password;
    const role = formData.role;
    
    const res = await api.post('/auth/register', { email, password, role });
    console.log(res.data);
}
      
    const [errors, setErrors] = useState<{[key: string]: string}>({})

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors : {[key: string]: string} = {}

    if(!formData.password.trim()) {
        newErrors.password = "Пароль обязателен"
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(!validateForm()) {
        return
    }

    const newUser: User = {
        id: Date.now().toString(),
        email: formData.email,
        role: formData.role,
        password: formData.password
    }

    setUsers([...users, newUser])

    setFormData({email: '', role: 'user', password: ''})

    setErrors({})
  }


    const handleDeleteUser = (userId: string) => {
        setUsers(users.filter(user => user.id !== userId))
    }

    return ( 
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-center mb-2.5">Админ панель</h1>
                <p className="text-center">Управление пользователями системы</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 place-items-center">
                <Card className="w-full">
                    <CardHeader>
                        <h2 className="text-xl font-semibold blackc">Добавить пользователя</h2>
                    </CardHeader>
                    <CardBody>
                        <Form className="w-full" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <Input 
                                    label="Email"
                                    placeholder="Введите почту"
                                    value={formData.email}
                                    classNames={{
                                        inputWrapper: 'bg-default-100',
                                        input: 'text-sm text-black focus: outline-none',
                                        label: 'text-black'
                                    }}
                                    onChange={(e) => setFormData({...formData, email: e.target.value })}
                                    isInvalid={!!errors.email}
                                    errorMessage={errors.email}
                                />
                                <Input 
                                    label="Пароль"
                                    placeholder="Введите пароль"
                                    value={formData.password}
                                    classNames={{
                                        inputWrapper: 'bg-default-100',
                                        input: 'text-sm text-black focus: outline-none',
                                        label: 'text-black',
                                        
                                    }} 
                                    onChange={(e) => setFormData({...formData, password: e.target.value })}
                                    isInvalid={!!errors.name}
                                    errorMessage={errors.name}
                                />
                                <div>
                                    <select
                                    value={formData.role}
                                     onChange={(e) => setFormData({...formData, role: e.target.value })}
                                     className="w-full border-grey rounded-lg bg-default  blackc"
                                    >
                                        <option value="user">Пользователь</option>
                                        <option value="admin">Админ</option>
                                    </select>
                                </div>

                                <Button color="primary"  onPress={AddUser} className="w-full">
                                    Добавить пользователя
                                </Button>

                            </div>
                        </Form>
                    </CardBody>
                </Card>
                <Card className="w-full">
                    <CardHeader>
                        <h2 className="text-xl font-semibold blackc">Список пользователей</h2>
                    </CardHeader>
                    <CardBody>
                        <div className="">
                            <Table>
                                <TableHeader>
                                    <TableColumn className="font-semibold blackc">EMAIL</TableColumn>
                                    <TableColumn className="font-semibold blackc">РОЛЬ</TableColumn>
                                    <TableColumn className="font-semibold blackc">ДЕЙСТВИЕ</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="blackc">{user.email}</TableCell>
                                            <TableCell>
                                                <span className={`{${user.role === "admin" ? "bg-red-200 text-red-700" : user.role === "moderator" ? "bg-blue-200 text-blue-600" : "bg-blue-200 text-blue-600"}`}>
                                                    {user.role === 'admin' ? 'Администратор' : user.role === 'mod' ? 'Модератор' : 'Пользователь'}
                                                </span>
                                            </TableCell>

                                            <TableCell>
                                                <Button color="danger" size="sm" onPress={() => handleDeleteUser(user.id)}>
                                                Удалить
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