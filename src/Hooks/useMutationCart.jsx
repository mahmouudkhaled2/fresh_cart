import { useMutation } from "@tanstack/react-query";

export default function useMutationCart(fn) {
    return useMutation({ mutationFn: fn });
}