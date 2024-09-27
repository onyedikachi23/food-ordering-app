/** @format */

import { supabase } from "@/src/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function useInsertOrderListener() {
  const queryClient = useQueryClient();

  // subscribe to real time changes
  useEffect(() => {
    const ordersSubscription = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          queryClient.invalidateQueries(["orders"]);
        },
      )
      .subscribe();

    return () => {
      ordersSubscription.unsubscribe();
    };
  }, []);
}

export function useUpdateOrderSubscriptions(id: number) {
  const queryClient = useQueryClient();

  // subscribe to real time changes
  useEffect(() => {
    const orders = supabase
      .channel("custom-filter-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${id}`,
        },
        (payload) => {
          queryClient.invalidateQueries(["orders", id]);
        },
      )
      .subscribe();

    return () => {
      orders.unsubscribe();
    };
  }, []);
}
