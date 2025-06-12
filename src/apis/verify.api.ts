import { fetchData } from "@core";
import { Verify } from "@types";

export const verifyEmail = async (params: Verify) => fetchData<Verify>('post', '/verify/email', params);

export const generateEmailCode = async (params: Verify) => fetchData<Verify>('post', '/verify/generateEmailCode', params);
