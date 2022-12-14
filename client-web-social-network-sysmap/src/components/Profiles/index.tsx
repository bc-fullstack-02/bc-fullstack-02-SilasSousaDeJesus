import { UserCircle } from "phosphor-react";
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { getAuthHeader } from "../../services/auth";
import Button from "../Button";
import Heading from "../Header";
import Text from "../Text";

interface ProfileCurrentModel {
  _id: string;
  name: string;
  user: string;
  myLikes: Array<string>;
  following: Array<string>;
  followers: Array<string>;
}

export default function Profiles() {
  const user = localStorage.getItem("user");
  const profileCurrent = JSON.parse(
    localStorage.getItem("profile") || "{}"
  ) as ProfileCurrentModel;
  const authHeader = getAuthHeader();
  const [profiles, setProfiles] = useState<ProfileCurrentModel[]>([]);

  useEffect(() => {
    (async () => await getProfiles())();
  }, []);

  const getProfiles = async () => {
    try {
      const response = await api.get("/profile/showAllProfile", authHeader);
      return setProfiles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  async function handleFollow(
    profileCurrentId: string,
    profileTargetId: string
  ) {
    try {
      await api.post(
        `/profile/follow/${profileCurrentId}/${profileTargetId}`,
        authHeader
      );
      return await getProfiles();
    } catch (error: any) {
      console.error(error.response.data);
    }
  }

  async function handleUnfollow(
    profileCurrentId: string,
    profileTargetId: string
  ) {
    try {
      await api.post(
        `/profile/unfollow/${profileCurrentId}/${profileTargetId}`,
        authHeader
      );
      return await getProfiles();
    } catch (error: any) {
      console.error(error.response.data);
    }
  }

  return (
    <div className="basis-5/6">
      <Heading className="border-b border-slate-400 mt-4">
        <Text size="lg" className="font-extrabold ml-5">
          Amigos
        </Text>
        <div className="flex flex-row items-center ml-5 my-2">
          <UserCircle size={48} weight="light" className="text-slate-50" />
          <Text className="font-extrabold ml-2">{user}</Text>
        </div>
      </Heading>
      <ul>
        {profiles.map((profile) => (
          <li
            className=" border-b border-slate-400 mt-4 pl-5"
            key={profile._id}
          >
            <div className="flex flex-row items-center ">
              <UserCircle size={48} height="light" className="text-slate-50" />
              <Text className="font-extrabold ml-2">{profile.name}</Text>
            </div>
            <footer className="mt-4 flex justify-start gap-4 mb-4">
              <Button
                type="submit"
                className="flex-none w-48"
                onClick={() => handleFollow(profileCurrent._id, profile._id)}
              >
                Seguir
              </Button>
              <button
                type="button"
                className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 focus:ring-2 ring-white"
                onClick={() => handleUnfollow(profileCurrent._id, profile._id)}
              >
                Deixar de seguir
              </button>
            </footer>
          </li>
        ))}
      </ul>
    </div>
  );
}
