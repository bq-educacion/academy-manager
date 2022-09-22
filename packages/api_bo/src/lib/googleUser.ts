import { axiod } from "axios";

export async function googleUser(
  token: string,
): Promise<{ name: string; email: string; picture: string }> {
  try {
    const googleUser = await axiod.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    const { email, name, picture } = await googleUser.data;

    return { email, name, picture };
  } catch (error) {
    throw new Error("500, " + error);
  }
}
