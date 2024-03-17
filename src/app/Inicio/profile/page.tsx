"use client";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { getAllFetchDataValues, patchEditVal } from "@/utils/api";
import { MessageEmployees } from "@/types/employees";
import { getCookie, processEnv } from "@/utils/cookies";
import jwt from "jsonwebtoken";
import EmployeeForm from "@/components/forms/EmployeeForm";

//@ts-ignore
export default function UserPage() {
  const [dataInitial, setDataInitial] = useState<MessageEmployees | null>(null);

  const getDataUser = async () => {
    const cookieId = await getCookie(processEnv.jtIdentity);
    if (cookieId == undefined) return null;
    // @ts-ignore
    const { _id } = jwt.decode(cookieId) as {
      username: string;
      role: string;
      _id: number;
      exp: number;
      iat: number;
    };

    const rec: MessageEmployees | null = await getAllFetchDataValues(
      `${processEnv.back}employee/${_id}`
    );
    setDataInitial(rec);
  };

  useEffect(() => {
    getDataUser();
  }, []);

  if (dataInitial == null) return <div></div>;
  return (
    <>
      <span></span>
      <EmployeeForm dataInitial={dataInitial} setDataInitial={setDataInitial} type="edit"/>
    </>
  );
}
