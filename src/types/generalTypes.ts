export type authMethod = "login" | "signup" | "otp-verify";

export type contentType = "post" | "comment";

export type OptionType = {
  displayStatus: boolean;
  label: string;
  icon: JSX.Element;
  action: () => void;
};

export type queryParamsType = {
  page?: number;
  limit?: number;
};
