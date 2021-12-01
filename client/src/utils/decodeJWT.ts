/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-buffer-constructor */
export const decode = (
  token: string
): { user: { email: string; name: string; _id: string } } => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url!.replace(/-/g, "+").replace(/_/g, "/");
  const buff = new Buffer(base64, "base64");
  const payloadinit = buff.toString("ascii");
  const payload = JSON.parse(payloadinit);
  return payload;
};
