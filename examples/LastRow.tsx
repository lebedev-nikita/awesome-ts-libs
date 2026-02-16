import { CircularProgress, TableCell, TableRow } from "@mui/material";
import clsx from "clsx";
import type { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

export type Props = {
  loading: boolean;
  hasMore: boolean;
  onMore?: () => void;
  children?: ReactNode;
};

export default function LastRow({ hasMore, onMore, ...props }: Props) {
  const [ref] = useInView({
    onChange: (inView) => void (inView && !props.loading && hasMore && onMore && onMore()),
  });

  return (
    <TableRow ref={ref}>
      {hasMore || props.loading ? (
        <TableCell
          className={clsx("sticky bottom-0 p-0", props.loading || "invisible")}
          colSpan={100}
        >
          <div className="flex items-center justify-center p-1">
            <CircularProgress />
          </div>
        </TableCell>
      ) : (
        props.children && (
          <TableCell align="center" colSpan={100}>
            {props.children}
          </TableCell>
        )
      )}
    </TableRow>
  );
}
