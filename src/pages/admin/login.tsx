import { type NextPage } from "next";
import { useState } from "react";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { useRouter } from "next/router";

const AdminLogin: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      void router.push("/admin");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="flex w-72 flex-col gap-y-2"
      >
        <TextInput
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          required
        />
        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default AdminLogin;

