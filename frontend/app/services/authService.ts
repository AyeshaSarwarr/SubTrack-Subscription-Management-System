interface authProps{
    email: string,
    password: string,
    rememberMe: boolean
}

export default async function LogIn({ email, password, rememberMe }: authProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
        rememberMe,
      }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Login failed."
    );
  }

  return result;
}