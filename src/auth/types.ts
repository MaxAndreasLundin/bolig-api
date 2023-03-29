export type SignTokenPayload = {
  sub: number;
  email: string;
};

export type AccessTokenResponse = {
  access_token: string;
};
