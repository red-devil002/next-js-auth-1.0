'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { use, useEffect, useState } from "react"
import axios from "axios"
import toast, { Toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function loginPage() {

    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)

    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/login', user)
            console.log("Login Success", response.data);
            
            router.push('/profile')

        } catch (error: any) {
            console.log("Login Failed");
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false)
        } else{
            setButtonDisabled(true)
        }
    }, [user])

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full">
        <TabsTrigger value="account">Login In</TabsTrigger>
        {/* <TabsTrigger value="password">Login</TabsTrigger> */}
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>{loading ? "Processing" : "Login"}</CardTitle>
            <CardDescription>
              Welcome back Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="xyz@eg.com"
              value={user.email}
              onChange={(ev) => setUser({...user, email: ev.target.value})} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="password"
              value={user.password}
              onChange={(ev) => setUser({...user, password: ev.target.value})} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={onLogin}>{buttonDisabled ? "Fill the form": "Login"}
            {loading ? "Processing" : "Login"}
            </Button>
          </CardFooter>
          <Button><Link href={'/signup'}>Visit Signup Page</Link></Button>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
