import { JwtPayload, jwtDecode } from "jwt-decode";

export const createOrGetUser = async (
  response: any
): Promise<JwtPayload | undefined | any> => {
  try {
    const decoded = jwtDecode(response.credential);
    // console.log(decoded);
    return decoded;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const userQuery = (userId: any) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};
