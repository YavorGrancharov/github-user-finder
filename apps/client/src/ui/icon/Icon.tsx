import IcomoonReact from "icomoon-react";
import iconSet from "./selection.json";

export type IconValue = "prev_page" | "next_page" | "last_page" | "first_page";

export type IconProps = {
  icon: IconValue;
  size?: number;
  color?: string;
  className?: string;
};

export const Icon = ({ icon, size = 26, className, ...rest }: IconProps) => {
  return (
    <IcomoonReact
      {...rest}
      icon={icon}
      iconSet={iconSet}
      size={size}
      className={className}
    />
  );
};

export default Icon;
