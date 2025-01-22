import React from 'react';
import { Button } from "@/components/ui/button"
import PhoneNumber from '@/components/ui/PhoneNumber'; 
import LoginLink from '@/components/ui/loginlink';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



function App() {

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <Label htmlFor="email">Full Name</Label>
      <Input type="text" placeholder="Enter your name" className="w-40" />
      <Label htmlFor="email">Enter Phone Number</Label>
      <PhoneNumber />
      <Label htmlFor="email">Enter One Time Password</Label>
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      
      <Button variant="ours">Continue</Button>
      <h3>or</h3>
      <LoginLink /> 
    </div>

  )
}

export default App

