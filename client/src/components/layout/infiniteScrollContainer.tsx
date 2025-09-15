"use client";

import React, { ReactNode, useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

interface InfiniteScrollProps<T> {
  queryKey: string[];
  queryFn: ({
    pageParam,
    queryParams,
  }: {
    pageParam?: number;
    queryParams?: any;
  }) => Promise<{
    data: T[];
    nextPage?: number | null;
  }>;
  queryParams?: any;
  children: (items: T[]) => ReactNode;
  loader?: ReactNode;
  onNotFoundContent?: () => ReactNode
  endMessage?: ReactNode;
}

export default function InfiniteScroll<T>({
  queryKey,
  queryFn,
  queryParams,
  children,
  onNotFoundContent,
  loader = <p className="text-center">Loading...</p>,
  endMessage = <p className="text-center">No more data</p>,
}: InfiniteScrollProps<T>) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: [...queryKey, queryParams],
    queryFn: ({ pageParam }) => queryFn({ pageParam, queryParams }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? null,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allItems = data?.pages.flatMap((page) => page.data) ?? [];
  if (status === "pending") return <div className="flex justify-center w-full ">{loader}</div>;
  if (status === "error") return <p className="text-center">Error: {(error as Error).message}</p>;
  if (status === "success" && !allItems.length) return onNotFoundContent ?
    onNotFoundContent() :
    <div className=" text-2xl font-bold w-full text-center"> not found content</div>


  return (
    <div>
      {children(allItems)}
      <div ref={observerRef} />
      {isFetchingNextPage && loader}
      {!hasNextPage && endMessage}
    </div>
  );
}
