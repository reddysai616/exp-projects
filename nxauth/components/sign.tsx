import { signIn } from "@/auth"
 
export function SignIn() {
  return (
<div>
  <form
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action={async (formData: any) => {
      "use server"
      await signIn("credentials", formData)
    }}
  >
    <label>
      Email
      <input name="email" type="email" />
    </label>
    <label>
      Password
      <input name="password" type="password" />
    </label>
    <input type="submit" value="Submit" />
  </form>
 </div>


  )
}