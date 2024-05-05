import { ReactNode } from "react";

import { ColumnCenter, Text } from "@pancakeswap/uikit";

export function InfoBox({ message, imgSrc }: { message?: ReactNode; imgSrc: string }) {
  return (
    <ColumnCenter style={{ height: "100%", justifyContent: "center" }}>
      <img src={imgSrc} height="80" width="80" alt="" />
      {message && (
        <Text pt="4px" textAlign="center" fontSize="20px" bold>
          {message}
        </Text>
      )}
    </ColumnCenter>
  );
}
