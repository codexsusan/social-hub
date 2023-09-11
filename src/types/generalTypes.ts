export type authMethod = "login" | "signup";

export type contentType = "post" | "comment";

export type OptionType = {
  displayStatus: boolean;
  label: string;
  icon: JSX.Element;
  action: () => void;
};
