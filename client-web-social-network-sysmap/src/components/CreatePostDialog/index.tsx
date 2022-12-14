import React, { FormEvent, useEffect, useState } from "react";
import api from "../../services/api";
import * as Dialog from "@radix-ui/react-dialog";
import { TextInput } from "../textInput";
import Button from "../Button";

interface CreatePostDialogProps {
  closeDialog: () => void;
}
interface ProfileModel {
  _id: string;
  name: string;
  user: string;
  myLikes: Array<string>;
  following: Array<string>;
  followers: Array<string>;
}
interface PostModel {
  _id: string;
  title: string;
  description: string;
  profile: ProfileModel;
  comments: [];
  likes: Array<string | null>;
}

interface PostFormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  description: HTMLInputElement;
}
interface PostFormElement extends HTMLFormElement {
  readonly elements: PostFormElements;
}

export default function CreatePostButton({
  closeDialog,
}: CreatePostDialogProps) {
  const token = localStorage.getItem("token");
  const profile = JSON.parse(
    localStorage.getItem("profile") || "{}"
  ) as ProfileModel;

  async function handleSubmit(event: FormEvent<PostFormElement>) {
    event.preventDefault();

    try {
      const form = event.currentTarget;
      const post = {
        title: form.elements.title.value,
        description: form.elements.description.value,
      };
      await api.post(`/post/${profile._id}`, post, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      closeDialog();
    } catch (error) {
      alert("erro ao criar post!");
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-2xl font-black">Novo Post</Dialog.Title>
        <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-semibold">
              Qual o título do post?
            </label>
            <TextInput.Input id="title" placeholder="Qual o título do post?" />

            <label htmlFor="description" className="font-semibold">
              O que você está pensando?
            </label>
            <TextInput.Input
              id="description"
              placeholder="Diga o que está pensando..."
            />
          </div>
          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.DialogClose
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 "
            >
              Fechar
            </Dialog.DialogClose>
            <Button type="submit" className=" flex-none w-48">
              Postar
            </Button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
