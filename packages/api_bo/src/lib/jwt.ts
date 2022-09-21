import { create, Header, Payload, verify } from "jwt";

const encoder = new TextEncoder();

async function generateKey(secretKey: string): Promise<CryptoKey> {
  const keyBuf = encoder.encode(secretKey);
  return await crypto.subtle.importKey(
    "raw",
    keyBuf,
    { name: "HMAC", hash: "SHA-256" },
    true,
    ["sign", "verify"],
  );
}

export async function signJwt({
  userEmail,
  secretKey,
}: {
  userEmail: string;
  secretKey: string;
}): Promise<string> {
  const payload: Payload = {
    sub: userEmail,
  };

  const header: Header = {
    alg: "HS256",
  };

  const key = await generateKey(secretKey);

  return create(header, payload, key);
}

export async function verifyJwt(
  token: string,
  secretKey: string,
): Promise<Payload> {
  try {
    const key = await generateKey(secretKey);
    return await verify(token, key);
  } catch (error) {
    return error.message;
  }
}
