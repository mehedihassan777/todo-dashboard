"use client";

import { get } from "@/services/http";
import { getCookie } from "@/utils/cookie";
import { SingleObjectOutput } from "@/utils/type/single-object-output";
import { UserTypeEnum } from "@/utils/enum/referral.enum";
import React, { createContext, useContext, useEffect, useState } from "react";

export type LoggedInUser = {
  fullName: string;
  email: string;
  phone: string;
  image?: string;
};

type LoggedInUserContextType = {
  user: LoggedInUser | null;
  setUser: (user: LoggedInUser | null) => void;
};

const LoggedInUserContext = createContext<LoggedInUserContextType | undefined>(
  undefined
);

export const useLoggedInUser = () => {
  const ctx = useContext(LoggedInUserContext);
  if (!ctx)
    throw new Error("useLoggedInUser must be used within LoggedInUserProvider");
  return ctx;
};

export const LoggedInUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<LoggedInUser | null>(null);

  useEffect(() => {
    const token = getCookie("token");
    const userType = getCookie("ut");
    if (token && !user) {
      const infoApi =
        userType === UserTypeEnum.Community.toString()
          ? "/community/info"
          : "/customer/info";

      get<SingleObjectOutput<LoggedInUser>>(infoApi).then(({ data }) =>
        setUser(data.data)
      );
    }
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ user, setUser }}>
      {children}
    </LoggedInUserContext.Provider>
  );
};
