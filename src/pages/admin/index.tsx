import { type NextPage } from "next";
import { useState } from "react";
import { Button, TextInput, Textarea } from "@mantine/core";

import AppLayout from "@/layouts/AppLayout";
import { api } from "@/utils/api";
import { errorHandler } from "@/helpers/handler";

const AdminPage: NextPage = () => {
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");

  const createAssistant = api.assistant.create.useMutation({
    onError: errorHandler,
  });

  return (
    <AppLayout>
      <main className="mx-auto max-w-xl p-4">
        <TextInput
          label="Name"
          placeholder="Assistant name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <Textarea
          mt="md"
          label="Instructions"
          placeholder="How should the assistant behave?"
          value={instructions}
          onChange={(e) => setInstructions(e.currentTarget.value)}
        />
        <Button
          mt="md"
          onClick={() =>
            void createAssistant.mutateAsync({ name, instructions })
          }
          loading={createAssistant.isLoading}
        >
          Create Assistant
        </Button>
      </main>
    </AppLayout>
  );
};

export default AdminPage;

